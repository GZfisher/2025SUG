import streamlit as st
import pandas as pd
import numpy as np
from utils import create_navigation_buttons

st.set_page_config(layout="wide")
create_navigation_buttons(__file__, 'upper')
st.markdown("---") # Add a separator below the buttons

st.title("5. Comparative Analysis: R vs. SAS")
st.markdown("""
We conducted a rigorous comparison between R and SAS implementations using a comprehensive dummy dataset with simulated missingness to evaluate their consistency.
""")

st.subheader("5.1 Generation of Dummy Data with Simulated Missingness")
st.markdown("""
A synthetic dataset (500 subjects, 28 timepoints) mimicking clinical trial data was generated. Missingness was deliberately introduced following controlled, hybrid patterns:
*   ~50% completely observed.
*   ~30% monotone missing pattern (simulating patient dropout).
*   ~20% monotone plus intermittent missing pattern (a mixture of dropout and MAR mechanisms).
""")

st.markdown("---")
st.subheader("5.2 Consistency Check of ANCOVA and Rubin’s Rule Pooling between R and SAS")
st.markdown("""
Initial comparison of ANCOVA and Rubin's Rule pooling showed almost identical estimates, standard errors, and t-values. However, noticeable discrepancies were observed in the reported **degrees of freedom (df)**, which led to differences in confidence intervals and p-values.
""")
st.image("https://via.placeholder.com/800x400?text=Figure+2:+Comparison+Results+when+EDF+is+Null",
         caption="Figure 2. Comparison Results when EDF is Null (Your presentation figure goes here)")

st.markdown("### Interactive: The Impact of Degrees of Freedom (DF)")
st.markdown("""
The discrepancy was traced to how "complete-data degrees of freedom" (EDF) are handled:
*   **SAS's `PROC MIANALYZE`:** `EDF` option set to infinity by default unless specified.
*   **R's `emmeans` package:** Internally computes EDF based on sample size and estimated parameters.

For our dummy data (500 subjects, 7 model parameters), the correct complete-data degrees of freedom should be **500 - 7 = 493**.
""")

edf_setting = st.radio(
    "Select SAS EDF Setting (Conceptual)",
    ("Default (Infinite)", "Corrected (EDF=493)"),
    index=1, # Default to corrected as it's the right way
    help="Observe how the conceptual P-value and Confidence Interval change based on the EDF setting."
)

col_p, col_ci = st.columns(2)

if edf_setting == "Default (Infinite)":
    p_value = "0.01" # Conceptual value for demonstration
    ci_range = "[0.5, 3.5]" # Conceptual value
    col_p.metric("Conceptual P-value (DF=Inf)", p_value + " (Potentially misleading)")
    col_ci.metric("Conceptual CI (DF=Inf)", ci_range + " (Wider, less precise)")
    st.warning("With default infinite DF in SAS, confidence intervals can be wider and p-values less precise if the effective degrees of freedom are much smaller.")
else: # Corrected (EDF=493)
    p_value = "0.04" # Conceptual value
    ci_range = "[0.1, 2.8]" # Conceptual value
    col_p.metric("Conceptual P-value (DF=493)", p_value + " (Accurate)")
    col_ci.metric("Conceptual CI (DF=493)", ci_range + " (More precise)")
    st.success("By correctly specifying EDF, R and SAS yield fully consistent results for ANCOVA with Rubin’s Rule pooling.")

st.image("https://via.placeholder.com/800x400?text=Figure+3:+Comparison+Results+when+EDF+=+493",
         caption="Figure 3. Comparison Results when EDF = 493 (Your presentation figure goes here)")

st.markdown("---")
st.subheader("5.3 Comparative Evaluation of Imputation Performance and Analytical Results")
st.markdown("""
We independently applied the MCMC and monotone regression imputation workflow in both software environments and evaluated their accuracy against the original gold-standard dataset.
""")

st.markdown("### Interactive: Conceptual Imputation Accuracy")
st.markdown("""
Adjust the slider below to observe how conceptual MAE and MSE might vary over different visit timepoints for R and SAS, simulating the trends shown in our paper.
""")

num_visits = 28 # Based on paper
visit_points = np.arange(1, num_visits + 1)
mae_r = 0.1 + 0.05 * np.sin(visit_points / 3) + 0.01 * np.random.randn(num_visits)
mae_sas = 0.1 + 0.05 * np.sin(visit_points / 3 - 0.1) + 0.01 * np.random.randn(num_visits)
mse_r = 0.02 + 0.01 * np.cos(visit_points / 4) + 0.005 * np.random.randn(num_visits)
mse_sas = 0.02 + 0.01 * np.cos(visit_points / 4 - 0.15) + 0.005 * np.random.randn(num_visits)

df_mae = pd.DataFrame({
    "Visit": visit_points,
    "R (MAE)": mae_r,
    "SAS (MAE)": mae_sas
}).set_index("Visit")

df_mse = pd.DataFrame({
    "Visit": visit_points,
    "R (MSE)": mse_r,
    "SAS (MSE)": mse_sas
}).set_index("Visit")

metric_choice = st.radio(
    "Select Metric to Visualize",
    ("Mean Absolute Error (MAE)", "Mean Squared Error (MSE)")
)

if metric_choice == "Mean Absolute Error (MAE)":
    st.line_chart(df_mae)
    st.caption("Conceptual MAE Comparison between R and SAS. (Simulated data)")
else:
    st.line_chart(df_mse)
    st.caption("Conceptual MSE Comparison between R and SAS. (Simulated data)")

st.info("R and SAS achieved highly similar imputation performance. The minor differences are largely attributed to inherent randomness and not substantive methodological differences.")
st.image("https://via.placeholder.com/800x400?text=Figure+4:+MAE+and+MSE+Comparison+between+R+and+SAS",
         caption="Figure 4. MAE and MSE Comparison between R and SAS (Your presentation figure goes here)")


st.markdown("""
**Analytical Results (Estimates and CIs):**
Point estimates and confidence intervals from R and SAS were overall quite close across all visit timepoints. While perfect replication was not possible due to differences in underlying random number generation, the observed differences were minor and primarily attributed to the inherent stochasticity in the imputation process.
""")
st.image("https://via.placeholder.com/800x400?text=Figure+5:+Comparison+of+Estimates+and+CIs+between+SAS+and+R",
         caption="Figure 5. Comparison of Estimates and CIs between SAS and R (Your presentation figure goes here)")

st.markdown("---") # Add a separator below the buttons
create_navigation_buttons(__file__, 'lower')