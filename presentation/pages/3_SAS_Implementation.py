import streamlit as st
from utils import create_navigation_buttons

st.set_page_config(layout="wide")
# Custom CSS for larger font size
st.markdown("""
<style>
    /* Global font size increase for all text */
    body {
        font-size: 1.5em; /* Base font size. You can adjust this value (e.g., 1.1em, 1.2em, 1.3em) */
        line-height: 1; /* Improve readability with more line spacing */
    }

    /* Adjust specific Streamlit elements to inherit or have slightly different sizes */
    .stMarkdown, .stText, .stAlert, .stInfo, .stSuccess, .stWarning {
        font-size: inherit; /* Inherit the global font size */
    }

    /* Headings */
    h1 {
        font-size: 2.2em !important; /* For main titles */
        line-height: 1 !important;
    }
    h2 {
        font-size: 2em !important; /* For section titles */
    }
    h3 {
        font-size: 1.8em !important; /* For sub-sections */
    }
    h4 {
        font-size: 1.5em !important; /* For sub-sections */
    }        
    p {
        font-size: 1.2em !important;
        line-height: 1.5em !important;
    }
    li {
        font-size: 1.2em !important;
        line-height: 1.5em !important;
    }

    /* Code blocks - often benefit from being slightly smaller than body text for readability of code itself */
    pre, code {
        font-size: 0.85em !important; /* Slightly smaller than body text for code snippets */
        line-height: 1;
    }

    /* For the sidebar navigation links */
    .st-emotion-cache-1f8d951 a { /* Target sidebar links */
        font-size: 1.1em; /* Make sidebar links slightly larger */
    }
    .st-emotion-cache-vk33as { /* Target sidebar text elements */
        font-size: 1.1em;
    }


</style>
""", unsafe_allow_html=True) # Important: This allows injecting HTML/CSS

create_navigation_buttons(__file__, 'upper')
st.markdown("---") # Add a separator below the buttons

st.title("3. Implementation in SAS")
st.markdown("""
In SAS, handling missing data typically involves a well-established, standardized two-step imputation process followed by statistical analysis.
""")

st.image("fig/SAS flow.svg",
         caption="SAS Workflow for Multiple Imputation and ANCOVA Using MCMC and Monotone Regression",
         use_container_width=True)
st.subheader("Visualizing the Missing Data Imputation Workflow")
st.markdown("""
This animation conceptually illustrates the process of transforming a non-monotone missing data pattern into a monotone structure via MCMC, followed by sequential imputation using monotone regression.
""")

# --- 在这里添加你的 GIF 图片 ---
st.image(
    "./fig/missing_data_imputation_process.gif", # 替换为你的 GIF 文件路径
    caption="From Non-Monotone to Imputed Data: MCMC and Monotone Regression"
)
st.markdown("""
_**Key Steps Shown:**_
1.  **Initial State:** Non-monotone missing data.
2.  **MCMC Pre-processing:** Transformation to a monotone missing pattern.
3.  **Monotone Regression:** Sequential imputation of missing values visit by visit.
4.  **Final State:** Fully imputed dataset.
""")
# --- GIF 添加结束 ---

st.subheader("SAS Example Code for Multiple Imputation")
st.markdown("A two-step imputation workflow in SAS using generalized code:")
with st.expander("Show SAS Imputation Code"):
    st.code("""
/* Step 1: Use MCMC to convert non-monotone missingness to a monotone structure */
PROC MI DATA=<input_data> NIMPUTE=<num_imputations> SEED=<mcmc_seed> OUT=<mcmc_output>;
VAR <treatment_group> <covariate(s)> <baseline_variable> <visit_variables>;
MCMC CHAIN=SINGLE NBITER=200 NITER=100 IMPUTE=MONOTONE;
RUN;

/* Step 2: Use monotone regression for final imputation */
PROC MI DATA=<mcmc_output> NIMPUTE=1 SEED=<reg_seed> OUT=<final_imputed_data> (rename=(_imputation_=imputation_number));
BY _imputation_;
CLASS <treatment_group> <categorical_covariate(s)>;
VAR <treatment_group> <categorical_covariate(s)> <baseline_variable> <visit_variables>;
MONOTONE REG(<last_visit_variable> = <treatment_group> <categorical_covariate(s)> <previous_visit_variables>);
RUN;
    """, language="sas")

st.subheader("SAS Example Code for ANCOVA and Rubin's Rule")
st.markdown("Typical workflow for conducting ANCOVA analysis on multiple imputed datasets in SAS:")
with st.expander("Show SAS ANCOVA & Pooling Code"):
    st.code("""
/* Step 1: Fit ANCOVA model to each imputed dataset */
ods output lsmeans=lsmeans_out diffs=diffs_out;
proc mixed data=<imputed_data> method=REML noclprint;
class <subject_id> <treatment_group> <categorical_covariates>;
model <change_variable> = <treatment_group> <baseline_var> <other_covariates> / solution;
lsmeans <treatment_group> / cl diff e obsmargins;
by <imputation_index> <visit_variable>;
run;

/* Step 2: Pool lsmeans using Rubin's Rule */
proc mianalyze data=lsmeans_out;
by <visit_variable> <treatment_group>;
modeleffects estimate;
stderr stderr;
ods output ParameterEstimates=lsmeans_pooled;
run;

/* Step 3: Pool treatment differences using Rubin's Rule */
proc mianalyze data=diffs_out;
by <visit_variable> <treatment_group>;
modeleffects estimate;
stderr stderr;
ods output ParameterEstimates=diffs_pooled;
run;
    """, language="sas")

st.markdown("---") # Add a separator below the buttons
create_navigation_buttons(__file__, 'lower')