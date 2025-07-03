import streamlit as st
from utils import create_navigation_buttons

st.set_page_config(layout="wide")
create_navigation_buttons(__file__, 'upper')
st.markdown("---") # Add a separator below the buttons

st.title("6. Conclusion")

st.markdown("""
This study provides a systematic comparison of multiple imputation and ANCOVA analysis using Rubin’s Rule as implemented in both R and SAS, focusing on complex longitudinal missing data patterns typical of clinical trials.

---

### Key Findings:

*   **High Similarity:** When equivalent imputation methods and model specifications are used, R and SAS deliver highly similar performance in terms of both imputed values and downstream analytical results.
    *   Metrics like Mean Absolute Error (MAE) and Mean Squared Error (MSE) showed nearly indistinguishable imputed values.
    *   Comparison of ANCOVA results (point estimates and confidence intervals) further confirmed this consistency.

*   **Stochasticity is Key:** Any minor differences observed were primarily attributable to inherent stochasticity in the imputation process (e.g., differences in random number generation across platforms) rather than fundamental methodological or computational discrepancies.

*   **Degrees of Freedom:** We identified a crucial aspect regarding the `EDF` (complete-data degrees of freedom) setting in SAS that, when aligned with R's internal calculations, resulted in perfect consistency of inferential statistics. This highlights the importance of understanding underlying defaults.

*   **Impact of Stochastic Variation:** We noted that in rare scenarios—such as when confidence intervals are very close to the null hypothesis—minor imputation differences may lead to slightly divergent statistical significance conclusions. This underscores the impact of inherent stochastic variation in multiple imputation.

---

### Final Takeaway:

In summary, our comparative evaluation confirms that both R and SAS provide **robust, reliable, and methodologically consistent frameworks** for multiple imputation and subsequent ANCOVA analyses in clinical trial settings.

The choice between platforms may therefore be guided by other practical factors (e.g., open-source preference, existing infrastructure, team expertise) rather than imputation or analysis performance.
""")
st.markdown("---") # Add a separator below the buttons
create_navigation_buttons(__file__, 'lower')