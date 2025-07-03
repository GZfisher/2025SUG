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

st.title("2. Methods Overview")
st.markdown("""
This section outlines the core statistical methods and techniques used in our study for handling missing data and performing subsequent analyses.
""")

st.markdown("---") # 添加分隔线增加视觉区隔

# 第一行：MCMC 和 Monotone Regression
col1, col2 = st.columns(2)

with col1:
    with st.expander("✨ **2.1 Markov Chain Monte Carlo (MCMC) Imputation**", expanded=True):
        st.success("""
        **What is it?** MCMC is a stochastic simulation method widely used for multiple imputation of missing data. It generates plausible values for missing entries by iteratively drawing samples from the posterior distributions for the missing data, conditional on the observed data and model parameters.
        """)
        st.info("""
        **Why use it?** MCMC is especially suitable in situations where data are missing in an arbitrary (non-monotone) fashion and the relationships among variables are complex, as it preserves multivariate structures and correlations.
        """)
        st.subheader("MCMC Conceptual Diagram")
        st.image(
            "fig/MCMC process.svg",
            caption="Conceptual illustration of MCMC sampling",
            use_container_width=True
        )

with col2:
    with st.expander("📝 **2.2 Monotone Regression Imputation**", expanded=True):
        st.success("""
        **What is it?** This method is designed for datasets in which the missing data follow a monotone pattern—meaning if a value is missing at a certain time point, all subsequent values for that subject are also missing. Regression models are fit sequentially to impute missing values.
        """)
        st.info("""
        **Why use it?** It's computationally efficient and leverages the ordered nature of longitudinal or follow-up data, explicitly handling the monotone structure of missingness.
        """)
        st.subheader("Monotone Regression Conceptual Diagram")
        st.image(
            "fig/Monotone regression.svg",
            caption="Conceptual illustration of Monotone Regression",
            use_container_width=True
        )

st.markdown("---") # 添加分隔线增加视觉区隔

# 第二行：ANCOVA 和 Rubin's Rule
col3, col4 = st.columns(2)

with col3:
    with st.expander("📊 **2.3 Analysis of Covariance (ANCOVA)**", expanded=True):
        st.success("""
        **What is it?** ANCOVA is a statistical technique commonly used in clinical trials to compare treatment effects while adjusting for baseline values or other covariates.
        """)
        st.info("""
        **How it's used here:** After handling missing data through multiple imputation, ANCOVA is applied separately to each imputed dataset. This helps to improve the precision of treatment effect estimates and ensures more robust results.
        """)
        st.subheader("ANCOVA Key Points Diagram")
        st.image(
            "fig/ANCOVA.svg",
            caption="Key Points of ANCOVA",
            use_container_width=True
        )

with col4:
    with st.expander("🔗 **2.4 Rubin's Rule for Pooling Estimates**", expanded=True):
        st.success("""
        **What is it?** Rubin's Rule provides a framework for combining parameter estimates and standard errors across multiple imputed datasets. It reflects both within-imputation and between-imputation variability.
        """)
        st.info("""
        **Why is it crucial?** Following separate analyses on each imputed dataset, Rubin’s Rule aggregates the estimates to produce valid statistical inferences that account for uncertainty due to missing data. This is essential for obtaining correct confidence intervals and p-values in multiple imputation analyses.
        """)
        st.subheader("Rubin's Rule Pooling Conceptual Diagram")
        st.image(
            "fig/Rubin's Rule.svg",
            caption="Conceptual illustration of Rubin's Rule Pooling",
            use_container_width=True
        )

st.markdown("---") # Add a separator below the buttons
create_navigation_buttons(__file__, 'lower')