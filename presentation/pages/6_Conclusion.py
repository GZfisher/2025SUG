import streamlit as st
from utils import create_navigation_buttons

st.set_page_config(layout="wide")

# Apply custom CSS for enhanced styling
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
    p {
        font-size: 1.2em !important;
        line-height: 1.5em !important;
    }
    /* 针对顶级列表项 (直接位于 div.stMarkdown ul 或 div.stMarkdown ol 下) */
    li {
        font-size: 1.2em !important;
        line-height: 1.5em !important;
    }

    /* 针对所有更深层嵌套的列表项，让它们恢复 Streamlit 默认的相对大小 */
    /* 或者明确指定它们相对父级的大小 */
    div.stMarkdown ul ul li,
    div.stMarkdown ol ol li,
    div.stMarkdown ul ol li,
    div.stMarkdown ol ul li {
        font-size: 0.9em !important; /* 强制嵌套列表项更小，例如 0.9em */
        /* 或者可以尝试：font-size: inherit !important; 让它们继承 */
        line-height: 1.5em !important;
    }



    /* Code blocks - often benefit from being slightly smaller than body text for readability of code itself */
    pre, code {
        font-size: 0.8em !important; /* Slightly smaller than body text for code snippets */
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

st.title("6. Conclusion")

st.markdown("""
This study provides a systematic comparison of multiple imputation and ANCOVA analysis using Rubin’s Rule
as implemented in both R and SAS, focusing on complex longitudinal missing data patterns typical of clinical trials.
""")

st.markdown("---") # Visual separator

st.subheader("Key Findings") # Use st.header for a more prominent section title

st.markdown("""
-   **High Similarity:** When equivalent imputation methods and model specifications are used, R and SAS deliver highly similar performance
    in terms of both imputed values and downstream analytical results.
    -   Metrics like Mean Absolute Error (MAE) and Mean Squared Error (MSE) showed nearly indistinguishable imputed values.
    -   Comparison of ANCOVA results (point estimates and confidence intervals) further confirmed this consistency.
-   **Stochasticity is Key:** Any minor differences observed were primarily attributable to inherent stochasticity in the imputation process
    (e.g., differences in random number generation across platforms) rather than fundamental methodological or computational discrepancies.
-   **Degrees of Freedom (DF) Alignment:** We identified a crucial aspect regarding the `EDF` (complete-data degrees of freedom) setting in SAS.
    When aligned with R's internal calculations, this resulted in perfect consistency of inferential statistics,
    highlighting the importance of understanding underlying defaults.
-   **Impact of Stochastic Variation:** We noted that in rare scenarios—such as when confidence intervals are very close to the null hypothesis—
    minor imputation differences may lead to slightly divergent statistical significance conclusions.
    This underscores the impact of inherent stochastic variation in multiple imputation.
""")

st.markdown("---") # Visual separator

st.subheader("Final Takeaway") # Use st.header for consistency

st.info("""
In summary, our comparative evaluation confirms that both R and SAS provide **robust, reliable, and methodologically consistent frameworks**
for multiple imputation and subsequent ANCOVA analyses in clinical trial settings.

The choice between platforms may therefore be guided by other practical factors
(e.g., open-source preference, existing infrastructure, team expertise) rather than imputation or analysis performance.
""")

st.markdown("---") # Add a separator below the buttons
create_navigation_buttons(__file__, 'lower')
