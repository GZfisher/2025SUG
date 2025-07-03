import streamlit as st
from utils import create_navigation_buttons

st.set_page_config(
    page_title="PharmaSUG China 2025 - Paper SA-105",
    layout="wide",
    initial_sidebar_state="collapsed"
)

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
    p {
        font-size: 1.2em !important;
    }
    li {
        font-size: 1.2em !important;
        line-height: 1.2em !important;
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

st.title("PharmaSUG China 2025 - Paper SA-105")
st.header("Implementing Multiple Imputation and ANCOVA with Rubin's Rule in R: A Comparative Study with SAS")
st.write("**Zifan Guo, AstraZeneca**")
st.write("Email: zifan.guo@astrazeneca.com or gzfchong0815@163.com")
st.markdown("---")
st.caption("""
This Streamlit application serves as an **interactive companion** for the presentation on **Multiple Imputation (MI) and ANCOVA with Rubin's Rule in R**, contrasting its implementation with traditional SAS procedures.

Use the navigation on the left sidebar to explore the different sections of the paper and interactive demonstrations.
""")
st.markdown("---")
st.header("Abstract")
st.info("""
Accurate handling of missing data is vital in clinical trials and research. Multiple imputation, a robust statistical method, is traditionally executed using SAS software. However, with R's growing popularity as an open-source alternative, implementing these processes in R is increasingly desirable for flexibility and accessibility. This paper details the implementation of multiple imputation and ANCOVA analysis using Rubin's rule in R, replicating established SAS procedures. Leveraging R's statistical libraries, we recreate the multiple imputation process and apply Rubin's rule to imputed datasets. Our comparative analysis, using dummy data, validates the consistency of R's results with those from SAS, attributing differences solely to inherent randomness in the imputation. Our findings confirm R's viability as an alternative to SAS, offering added flexibility without compromising accuracy. This work not only validates R for multiple imputation but also provides a practical guide for researchers transitioning from SAS to R. Key R packages used include "mice" and "norm" for imputation, and "stats" and "emmeans" for ANCOVA with Rubin’s rule.
""")

st.markdown("---")
st.markdown("### How to Use This App:")
st.markdown("""
1.  **Navigate:** Use the sidebar on the left to jump between sections of the paper.
2.  **Expand Code:** Click on the "Show Code" expanders to reveal detailed R or SAS code snippets.
3.  **Interact:** On certain pages (e.g., "5. Comparative Analysis" or "7. Interactive Demo"), adjust sliders and inputs to conceptually demonstrate the impact of different parameters or scenarios.
4.  **Full Screen:** For the best presentation experience, consider using your browser's full-screen mode.
""")

st.markdown("---") # Add a separator below the buttons
create_navigation_buttons(__file__, 'lower')