import streamlit as st
import numpy as np
import pandas as pd
import altair as alt
from utils import create_navigation_buttons

st.set_page_config(layout="wide")
create_navigation_buttons(__file__, 'upper')
st.markdown("---") # Add a separator below the buttons

st.title("7. Interactive Demo: Conceptual Impact of Imputation Parameters")
st.markdown("""
This section provides a conceptual demonstration of how varying parameters in multiple imputation might influence the stability and precision of results. This is for illustrative purposes only and does not run real statistical models.
""")

st.subheader("Simulate Data Characteristics (Conceptual)")
col_sim1, col_sim2 = st.columns(2)
with col_sim1:
    sample_size = st.slider("Conceptual Sample Size", 100, 1000, 500, 50)
with col_sim2:
    missing_percent = st.slider("Conceptual Missing Data (%)", 0, 50, 20, 5)

st.subheader("Multiple Imputation Parameters (Conceptual)")
col_imp1, col_imp2 = st.columns(2)
with col_imp1:
    num_imputations = st.slider(
        "Number of Imputations (m)",
        min_value=5,
        max_value=100,
        value=20,
        step=5,
        help="More imputations generally lead to more stable estimates and more accurate standard errors."
    )
with col_imp2:
    model_complexity = st.slider(
        "Conceptual Model Complexity",
        min_value=1,
        max_value=10,
        value=5,
        step=1,
        help="Represents the number of parameters in the analysis model. Higher complexity can affect DF."
    )

st.markdown("---")
st.subheader("Conceptual Results Visualization")

# Conceptual simulation of results based on sliders
np.random.seed(42) # for reproducibility of conceptual demo

# Effect estimate and CI width will vary conceptually
# Wider CI for smaller sample size, more missing data, fewer imputations, higher complexity
base_effect = 2.0
base_ci_width = 1.5

# Adjustments based on inputs
effect_adjustment_ss = (500 / sample_size) * 0.1
effect_adjustment_mp = (missing_percent / 100) * 0.5
ci_width_adjustment_m = (100 / num_imputations) * 0.1
ci_width_adjustment_comp = (model_complexity / 10) * 0.2

# Introduce some random jitter for visual effect
random_jitter = np.random.normal(0, 0.1)

pooled_estimate = base_effect + random_jitter - effect_adjustment_ss + effect_adjustment_mp
ci_half_width = (base_ci_width + ci_width_adjustment_m + ci_width_adjustment_comp) / 2

lower_ci = pooled_estimate - ci_half_width
upper_ci = pooled_estimate + ci_half_width

st.write(f"**Conceptual Pooled Estimate:** {pooled_estimate:.2f}")
st.write(f"**Conceptual 95% Confidence Interval:** [{lower_ci:.2f}, {upper_ci:.2f}]")

# Create dummy data for the chart
chart_data = pd.DataFrame({
    "Estimate": [pooled_estimate],
    "Lower CI": [lower_ci],
    "Upper CI": [upper_ci]
})

# Altair chart for confidence interval
chart = alt.Chart(chart_data).mark_point().encode(
    x=alt.X('Estimate', title='Effect Estimate', scale=alt.Scale(domain=[min(0, lower_ci-0.5), max(4, upper_ci+0.5)])),
    y=alt.value(50), # Center the single point vertically
    tooltip=['Estimate', 'Lower CI', 'Upper CI']
) + alt.Chart(chart_data).mark_rule().encode(
    x=alt.X('Lower CI', title=''),
    x2='Upper CI',
    y=alt.value(50)
)

st.altair_chart(chart, use_container_width=True)

st.info("""
**Interpretation of this Conceptual Visualization:**
*   **Effect Estimate (dot):** Represents the primary outcome.
*   **Confidence Interval (line):** Shows the precision of the estimate.
    *   **Wider CI:** Indicates less precision (e.g., due to more missing data, fewer imputations, smaller sample size).
    *   **Narrower CI:** Indicates greater precision.
*   This helps conceptualize how varying imputation and data characteristics impact the final results and their uncertainty.
""")

st.markdown("---") # Add a separator below the buttons
create_navigation_buttons(__file__, 'lower')