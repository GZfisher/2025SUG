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
        font-size: 0.95em !important; /* Slightly smaller than body text for code snippets */
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

st.title("1. Introduction")

st.markdown("""
In clinical trials and other research fields, handling missing data effectively is crucial to ensure accurate results. **Multiple Imputation (MI)**, a robust statistical method, is commonly employed for this purpose.

Traditionally, **SAS** has been the go-to software for executing multiple imputation and subsequent analysis. However, with the growing popularity of **R**, an open-source software environment, there is a growing need to implement these statistical processes in R to offer flexibility and accessibility for exploratory analysis.

---

#### Our Paper's Focus:

1. This paper focuses on implementing multiple imputation using both **MCMC** and **monotone regression** methods in R, followed by **ANCOVA analysis using Rubin’s rule**—all while paralleling established SAS procedures.
2. Through a detailed comparison using dummy data, we validate the consistency of results between R and SAS, demonstrating that any observed differences are attributed solely to inherent randomness in the imputation process rather than methodological discrepancies.
3. This work not only contributes to the validation of R as a tool for multiple imputation but also serves as a practical guide for researchers aiming to transition from SAS to R for their statistical analyses.
""")

st.markdown("---") # Add a separator below the buttons
create_navigation_buttons(__file__, 'lower')