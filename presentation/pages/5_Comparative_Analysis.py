import streamlit as st
import pandas as pd
import numpy as np
from utils import create_navigation_buttons # Assuming this utility is available
from streamlit_mermaid import st_mermaid

st.set_page_config(layout="wide")
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

st.title("5. Comparative Analysis: R vs. SAS")
st.markdown("""
We conducted a rigorous comparison between R and SAS implementations using a comprehensive dummy dataset with simulated missingness to evaluate their consistency.
""")

st.subheader("5.1 Generation of Dummy Data with Simulated Missingness")
st.markdown("""
To enable a controlled and transparent comparison between R and SAS in both imputation and subsequent analysis,
we first generated a comprehensive dummy dataset (`data_complete`) without any missing values.
This synthetic dataset mirrors the typical structure of longitudinal clinical trial data.
""")

st.markdown("#### Data Generation Assumptions and Process")
st.markdown("""
*   **Sample size and visits:** The dataset simulates 500 subjects, each assessed at 28 evenly spaced timepoints (weeks 2 to 56, every 2 weeks).
*   **Covariates:** We specified three categorical variables—treatment group (`TRT01PN`), geographic region (`REGIONN`), and baseline BMI variable (`BLBMIG1N`)—with predefined proportions reflecting realistic clinical trial scenarios. In addition, a continuous baseline measurement (`BASE`) was randomly assigned from a uniform distribution (5 to 7).
*   **Regression structure:** The outcome for each subject and timepoint (`AVAL`) was generated using a prespecified linear model incorporating main effects for baseline, treatment, region, BMI, and visit, as well as normally distributed random noise. Each covariate influence was set by predetermined coefficients to mimic plausible clinical effect sizes.
*   **Score limits:** To ensure clinical plausibility and data integrity, simulated scores were restricted to the range of 0 to 10.
*   **Data arrangement:** The data were structured in long format, with one row per subject per visit. Derived variables such as change from baseline (`CHG`) and visit indicators were also included.
""")
flow_chart = """
flowchart TD
    A[Define sample size and visits]
    B[Generate baseline covariates: treatment group, region, BMI, baseline value]
    C[Simulate outcome using linear model with random noise]
    D[Restrict scores to range 0 to 10]
    E[Arrange data in long format with derived variables]

    A --> B
    B --> C
    C --> D
    D --> E
"""

st_mermaid(flow_chart)
st.caption("Data Generation Process Flowchart")
# st.image("fig/generate_dummy.svg", caption="Data Generation Process Flowchart")

st.markdown("""
After generating the complete dummy dataset, we deliberately introduced missingness following a controlled, hybrid pattern designed to reflect typical longitudinal clinical trial data challenges.
Specifically, all 500 subjects were randomly assigned to one of three missing data patterns:
*   ~50% completely observed.
*   ~30% monotone missing pattern (simulating patient dropout).
*   ~20% monotone plus intermittent missing pattern (a mixture of dropout and MAR mechanisms).
""")
st.markdown("""
This controlled and transparent assignment of missingness allowed us to precisely benchmark the imputation procedures under a range of realistic and challenging patterns.
""")

st.markdown("---")
st.subheader("5.2 Consistency Check of ANCOVA and Rubin’s Rule Pooling between R and SAS")
st.markdown("""
We first performed multiple imputation on the dummy dataset with missing values using the workflow described previously in R.
            We then exported the fully imputed dataset and conducted ANCOVA with Rubin's rule pooling on both R and SAS platforms.
            The comparison of ANCOVA and Rubin's Rule pooling showed almost identical estimates, standard errors, and t-values.
            However, noticeable discrepancies were observed in the reported **degrees of freedom (df)**,
            which led to differences in **confidence intervals** and **p-values**.
""")
st.image("fig/result compare EDF null.png",
         caption="Comparison Results when EDF is Null")

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

col_df, col_p, col_ci = st.columns(3)

if edf_setting == "Default (Infinite)":
    p_value = "1.61024E-36" # Conceptual value for demonstration
    df_value = "293.46043166"
    ci_range = "[-1.221521347, -0.930615437]" # Conceptual value
    col_p.metric("Conceptual P-value (EDF=Inf)", p_value)
    col_ci.metric("Conceptual CI (EDF=Inf)", ci_range)
    col_df.metric("Conceptual DF (EDF=Inf)", df_value)
    st.warning("With default infinite DF in SAS, confidence intervals and p-values has a little difference.")
else: # Corrected (EDF=493)
    p_value = "2.285806E-28" # Conceptual value
    df_value = "120.97"
    ci_range = "[-1.222385109, -0.929751676]" # Conceptual value
    col_p.metric("Conceptual P-value (EDF=493)", p_value)
    col_ci.metric("Conceptual CI (EDF=493)", ci_range)
    col_df.metric("Conceptual DF (EDF=493)", df_value)
    st.success("By correctly specifying EDF, R and SAS yield fully consistent results for ANCOVA with Rubin's Rule pooling.")

st.image("fig/result compare EDF 493.png",
         caption="Comparison Results when EDF = 493")

st.markdown("---")
st.subheader("5.3 Comparative Evaluation of Imputation Performance and Analytical Results")
st.markdown("""
We independently applied the MCMC and monotone regression imputation workflow in both software environments and evaluated their accuracy against the original gold-standard dataset.
""")

st.markdown("#### Imputation Results Comparison")
st.markdown("""
Adjust the slider below to observe how MAE and MSE vary over different visit timepoints for R and SAS.
""")

num_visits = 28 # Based on paper
visit_points = np.arange(1, num_visits + 1)
mae_r = [0.5013491, 0.5682386, 0.5510682, 0.5893913, 0.5832965, 0.5750889, 0.5827270,
0.5136055, 0.5577019, 0.5922436, 0.5542919, 0.5999328, 0.6015073, 0.5960374,
0.5540343, 0.5797067, 0.5916288, 0.5693115, 0.5888431, 0.5835375, 0.5811179,
0.6082429, 0.6145044, 0.5573734, 0.5879220, 0.6166312, 0.6191577, 0.5965692]
mae_sas = [0.5286977, 0.5887160, 0.5640399, 0.5851556, 0.5912348, 0.5844003, 0.5909127,
0.5174683, 0.5571698, 0.6160600, 0.5514591, 0.6010527, 0.6078436, 0.5984795,
0.5519349, 0.5770066, 0.5944033, 0.5737189, 0.5890256, 0.5831026, 0.5887542,
0.6018429, 0.6093846, 0.5616017, 0.5868516, 0.6200199, 0.6085000, 0.6018533]
mse_r = [0.3903029, 0.5099169, 0.4829675, 0.5340385, 0.5340944, 0.5219378, 0.5300563,
0.4138469, 0.4891598, 0.5525677, 0.4886122, 0.5530403, 0.5682484, 0.5529409,
0.4801849, 0.5355933, 0.5508354, 0.5077505, 0.5413095, 0.5351368, 0.5341891,
0.5798357, 0.6007157, 0.4847413, 0.5455158, 0.5997564, 0.6007702, 0.5559243]
mse_sas = [0.4299428, 0.5480918, 0.5022097, 0.5303119, 0.5560830, 0.5343936, 0.5429839,
0.4174874, 0.4839720, 0.5968949, 0.4786445, 0.5575234, 0.5818784, 0.5578108,
0.4773675, 0.5273627, 0.5556925, 0.5125390, 0.5429138, 0.5326726, 0.5478360,
0.5698932, 0.5831032, 0.4906064, 0.5409541, 0.6076947, 0.5803675, 0.5691869]

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
    st.caption("MAE Comparison between R and SAS.")
else:
    st.line_chart(df_mse)
    st.caption("MSE Comparison between R and SAS.")

st.info("R and SAS achieved highly similar imputation performance. The minor differences are largely attributed to inherent randomness and not substantive methodological differences.")

st.markdown("""
#### Analytical Results (Estimates and CIs) Comparison
Point estimates and confidence intervals from R and SAS were overall quite close across all visit timepoints. While perfect replication was not possible due to differences in underlying random number generation, the observed differences were minor and primarily attributed to the inherent stochasticity in the imputation process.
""")
st.image("fig/ANCOVA_forest.png",
         caption="Comparison of Estimates and CIs between SAS and R (Your presentation figure goes here)")
st.error("""
           It is important to note that perfect replication between the two platforms was **not possible** due to differences in their underlying random number generation. 
           These randomization mechanisms can lead to small discrepancies in the imputed datasets, which subsequently affect the **analytic results**. 
           This effect becomes especially pronounced when **confidence intervals are close to the null hypothesis value**: 
           in such cases, one software may produce a confidence interval that marginally includes the null value, while the other does not, 
           potentially leading to **divergent conclusions** regarding statistical significance.
           """)

st.markdown("---") # Add a separator below the buttons
create_navigation_buttons(__file__, 'lower')
