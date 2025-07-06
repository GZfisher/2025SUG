# 这是一个概念性示例，需要你根据实际数据和需求进行调整

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from PIL import Image # 需要安装 Pillow: pip install Pillow
import io

# 1. 模拟数据 (概念性)
np.random.seed(42)
n_subjects = 10
n_visits = 5
data = pd.DataFrame(np.random.rand(n_subjects, n_visits) * 100, columns=[f'Visit_{i+1}' for i in range(n_visits)])

# 模拟非单调缺失
missing_indices = [(0, 2), (0, 3), (0, 4), (1, 1), (1, 3), (1, 4), (2, 4), (3, 0), (3, 2), (3, 3), (3, 4), 
                   (4, 1), (4, 2), (4, 3), (4, 4), (5, 3), (5, 4), (6, 0), (6, 2), (6, 3), (6, 4), (7, 1), (7, 4)]
for r, c in missing_indices:
    data.iloc[r, c] = np.nan

# 准备保存帧的列表
frames = []

# --- 帧 1: 初始非单调缺失 ---
fig, ax = plt.subplots(figsize=(8, 6))
ax.imshow(data.isna(), cmap='gray_r', aspect='auto') # 白色是数据，黑色是缺失
for i in range(n_subjects):
    for j in range(n_visits):
        if pd.isna(data.iloc[i,j]):
            ax.text(j, i, 'NA', ha='center', va='center', color='red', fontsize=10)
        else:
            ax.text(j, i, f'{data.iloc[i,j]:.0f}', ha='center', va='center', color='black', fontsize=8)
ax.set_title("1. Initial Non-Monotone Missing Data", fontsize=14)
ax.set_xticks(np.arange(n_visits))
ax.set_yticks(np.arange(n_subjects))
ax.set_xticklabels(data.columns)
ax.set_yticklabels([f'Subj {i+1}' for i in range(n_subjects)])
ax.grid(False)
plt.tight_layout()
fig.canvas.draw()
# 将 Figure 渲染到 BytesIO 缓冲区
buf = io.BytesIO()
fig.savefig(buf, format='png')
buf.seek(0)

# 使用 PIL.Image 打开
image = Image.open(buf)
frames.append(image)
plt.close(fig) # 关闭图形以释放内存

# --- 帧 2: MCMC 预处理后，转化为单调缺失 (概念性) ---
# 复制数据，模拟 MCMC 预处理后的单调化
data_mono = data.copy()
# for i in range(n_subjects):
#     first_nan_idx = -1
#     for j in range(n_visits):
#         if pd.isna(data_mono.iloc[i, j]):
#             if first_nan_idx == -1: # 找到第一个NaN
#                 first_nan_idx = j
#             data_mono.iloc[i, j:] = np.nan # 设置其后的都为NaN
#             break # 找到第一个NaN后，这一行就单调了
#     if first_nan_idx != -1: # 如果这行有NaN，且其后非NaN，则置为NaN
#         for k in range(first_nan_idx, n_visits):
#             if not pd.isna(data.iloc[i,k]): # 原始数据这里有值，但MCMC后要变为NaN
#                 data_mono.iloc[i,k] = np.nan # 强制单调

for r, c in missing_indices:
    data_mono.iloc[r, c] = np.random.rand(1,1)[0] *100 # Fill with simulated data
monotone_transformed_data = data_mono.copy()
transformed_cells = []
for i in range(n_subjects):
    last_observed_idx = -1
    # Find the last observed (non-NA) value in the original data
    original_row = data.iloc[i]
    if original_row.notna().any():
        last_observed_idx = original_row.notna().sum() # Sum of True values gives count of non-NAs
        # If the last observed value is not the last column,
        # then all values after that in the *original data* were NA (or part of dropout)
        # In the *filled data*, these now need to be conceptually NA again for monotone regression
        for j in range(last_observed_idx + 1, n_visits):
            if pd.notna(monotone_transformed_data.iloc[i,j]): # Only set to NA if it's currently filled
                monotone_transformed_data.iloc[i,j] = np.nan
                transformed_cells.append((i,j))
    last_actual_obs_idx = -1
    if original_row.notna().any():
        for j in range(n_visits):
            if pd.notna(original_row.iloc[j]):
                last_actual_obs_idx = j
    
    for j in range(last_actual_obs_idx + 1, n_visits):
        if pd.notna(monotone_transformed_data.iloc[i, j]): # If MCMC filled this but original was dropout
            monotone_transformed_data.iloc[i, j] = np.nan
            transformed_cells.append((i, j))
fig, ax = plt.subplots(figsize=(8, 6))
ax.imshow(monotone_transformed_data.isna(), cmap='gray_r', aspect='auto')
for i in range(n_subjects):
    for j in range(n_visits):
        if pd.isna(monotone_transformed_data.iloc[i,j]):
            ax.text(j, i, 'NA', ha='center', va='center', color='red', fontsize=10)
        else:
            ax.text(j, i, f'{monotone_transformed_data.iloc[i,j]:.0f}', ha='center', va='center', color='black', fontsize=8)
ax.set_title("2. After MCMC Pre-processing (Monotone Pattern)", fontsize=14)
ax.set_xticks(np.arange(n_visits))
ax.set_yticks(np.arange(n_subjects))
ax.set_xticklabels(monotone_transformed_data.columns)
ax.set_yticklabels([f'Subj {i+1}' for i in range(n_subjects)])
ax.grid(False)
plt.tight_layout()
fig.canvas.draw()
# 将 Figure 渲染到 BytesIO 缓冲区
buf = io.BytesIO()
fig.savefig(buf, format='png')
buf.seek(0)

# 使用 PIL.Image 打开
image = Image.open(buf)
frames.append(image)
plt.close(fig)

# --- 帧 3-N: 单调回归，逐个填充 ---
imputed_data = monotone_transformed_data.copy()
for visit_col_idx in range(n_visits): # 逐个 visit 列填充
    current_visit_col = monotone_transformed_data.columns[visit_col_idx]
    if imputed_data[current_visit_col].isna().any(): # 如果这列有缺失值
        # 概念性填充：这里可以是你实际的回归模型填充逻辑
        # 简单模拟：用前一个 visit 的均值填充，或者随机填充
        mean_val = imputed_data.iloc[:, :visit_col_idx].mean().mean() if visit_col_idx > 0 else 50 # 简单平均或默认值
        # 找到需要填充的行
        rows_to_impute = imputed_data[current_visit_col].isna()

        temp_data = imputed_data.copy()
        temp_data.loc[rows_to_impute, current_visit_col] = np.round(mean_val + np.random.randn(rows_to_impute.sum()) * 5, 0) # 模拟填充

        fig, ax = plt.subplots(figsize=(8, 6))
        ax.imshow(temp_data.isna(), cmap='gray_r', aspect='auto')
        for i in range(n_subjects):
            for j in range(n_visits):
                if pd.isna(temp_data.iloc[i,j]):
                    ax.text(j, i, 'NA', ha='center', va='center', color='red', fontsize=10)
                else:
                    color = 'blue' if j == visit_col_idx and rows_to_impute.iloc[i] else 'black' # 突出显示填充的
                    ax.text(j, i, f'{temp_data.iloc[i,j]:.0f}', ha='center', va='center', color=color, fontsize=8)

        ax.set_title(f"3. Monotone Regression: Imputing {current_visit_col}", fontsize=14)
        ax.set_xticks(np.arange(n_visits))
        ax.set_yticks(np.arange(n_subjects))
        ax.set_xticklabels(data.columns)
        ax.set_yticklabels([f'Subj {i+1}' for i in range(n_subjects)])
        ax.grid(False)
        plt.tight_layout()
        fig.canvas.draw()
        # 将 Figure 渲染到 BytesIO 缓冲区
        buf = io.BytesIO()
        fig.savefig(buf, format='png')
        buf.seek(0)

        # 使用 PIL.Image 打开
        image = Image.open(buf)
        frames.append(image)
        plt.close(fig)

        imputed_data = temp_data # 更新数据以便下一轮填充基于已填充的

# --- 帧 N+1: 最终填充完成 ---
fig, ax = plt.subplots(figsize=(8, 6))
ax.imshow(imputed_data.isna(), cmap='gray_r', aspect='auto') # 应该都是白的
for i in range(n_subjects):
    for j in range(n_visits):
        ax.text(j, i, f'{imputed_data.iloc[i,j]:.0f}', ha='center', va='center', color='black', fontsize=8)
ax.set_title("4. Fully Imputed Dataset", fontsize=14)
ax.set_xticks(np.arange(n_visits))
ax.set_yticks(np.arange(n_subjects))
ax.set_xticklabels(data.columns)
ax.set_yticklabels([f'Subj {i+1}' for i in range(n_subjects)])
ax.grid(False)
plt.tight_layout()
fig.canvas.draw()
buf = io.BytesIO()
fig.savefig(buf, format='png')
buf.seek(0)

# 使用 PIL.Image 打开
image = Image.open(buf)
frames.append(image)
plt.close(fig)

# 保存为 GIF
output_gif_path = "./fig/missing_data_imputation_process.gif"
frames[0].save(output_gif_path, save_all=True, append_images=frames[1:], optimize=False, duration=1500, loop=0) # duration in ms, loop=0 means loop forever

print(f"GIF saved to {output_gif_path}")
