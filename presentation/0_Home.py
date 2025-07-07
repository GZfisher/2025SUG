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
# st.info("""
# Accurate handling of missing data is vital in clinical trials and research. Multiple imputation, a robust statistical method, is traditionally executed using SAS software. 
#         However, with R's growing popularity as an open-source alternative, implementing these processes in R is increasingly desirable for flexibility and accessibility. 
#         This paper details the implementation of **multiple imputation and ANCOVA analysis using Rubin's rule** in R, replicating established SAS procedures. 
#         Leveraging R's statistical libraries, we recreate the multiple imputation process and apply Rubin's rule to imputed datasets. 
#         Our comparative analysis, using dummy data, validates the consistency of R's results with those from SAS, attributing differences **solely to inherent randomness** in the imputation. 
#         Our findings confirm R's viability as an alternative to SAS, offering added flexibility without compromising accuracy. 
#         This work not only validates R for multiple imputation but also provides a practical guide for researchers transitioning from SAS to R. 
#         Key R packages used include "mice" and "norm" for imputation, and "stats" and "emmeans" for ANCOVA with Rubin's rule.
#         The analyses were conducted using SAS version 9.04.01 and R version 4.4.1. 
#         Detailed R package versions are provided in the renv.lock file in the project repository (https://github.com/GZfisher/mi_ancova_pooling).
# """)
# st.markdown("""
# #### Key Highlights of Our Research:

# *   **Crucial Problem:** Accurate handling of missing data is vital in clinical trials and research.
# *   **Traditional Approach:** Multiple Imputation (MI), a robust statistical method, has been traditionally executed using **SAS software**.
# *   **Our Motivation:** R's growing popularity as an open-source alternative offers **flexibility and accessibility**, driving the need to implement MI and ANCOVA in R.

# #### What We Did:

# *   **Implementation:** We detailed the implementation of **Multiple Imputation** and **ANCOVA analysis using Rubin's rule in R**.
# *   **Replication:** Our R implementation directly **replicates established SAS procedures**.
# *   **Key Packages:** We leveraged essential R packages including:
#     *   `mice` and `norm` for imputation.
#     *   `stats` and `emmeans` for ANCOVA with Rubin's rule.

# #### Our Findings:

# *   **Validation:** Our comparative analysis (using dummy data) **validates the consistency of R's results with those from SAS**.
# *   **Attribution:** Observed differences are solely attributed to **inherent randomness** in the imputation, not methodological discrepancies.
# *   **R's Viability:** This confirms **R's strong viability as an alternative to SAS**, offering added flexibility without compromising accuracy.

# #### Impact & Reproducibility:

# *   **Practical Guide:** This work provides a **practical guide for researchers transitioning from SAS to R**.
# *   **Software Versions:** Analyses were conducted using **SAS version 9.04.01** and **R version 4.4.1**.
# *   **Detailed Reproducibility:** Detailed R package versions are provided in the `renv.lock` file in our project repository: [https://github.com/GZfisher/mi_ancova_pooling](https://github.com/GZfisher/mi_ancova_pooling).
# """)

from streamlit_extras.stylable_container import stylable_container

# 主要问题板块
with stylable_container(
    key="problem",
    css_styles="""
        {
            background-color: #f9efff;
            border-radius: 0.5rem;
            padding: 1.2rem;
            margin-bottom: 1.5rem;
            border: 1px solid #e1bee7;
        }
    """,
):
    st.markdown(
        """
        #### 🔍 Key Highlights of Our Research:
        *   **Crucial Problem:** Accurate handling of missing data is vital in clinical trials and research.
        *   **Traditional Approach:** Multiple Imputation (MI), a robust statistical method, has been traditionally executed using **SAS software**.
        *   **Our Motivation:** R's growing popularity as an open-source alternative offers **flexibility and accessibility**, driving the need to implement MI and ANCOVA in R.
        """
    )

# “What We Did” 板块
with stylable_container(
    key="what_we_did",
    css_styles="""
        {
            background: linear-gradient(90deg, #e3ffe8 0%, #ffffff 100%);
            border-radius: 0.5rem;
            padding: 1.2rem;
            margin-bottom: 1.5rem;
            border: 1px solid #b8f2c9;
        }
    """,
):
    st.markdown("<h4>📝 What We Did</h4>", unsafe_allow_html=True)
    st.markdown(
        """
        *   **Implementation:** We detailed the implementation of **Multiple Imputation** and **ANCOVA analysis using Rubin's rule in R**.
        *   **Replication:** Our R implementation directly **replicates established SAS procedures**.
        *   **Key Packages:** We leveraged essential R packages including:
            *   `mice` and `norm` for imputation.
            *   `stats` and `emmeans` for ANCOVA with Rubin's rule.
        """
    )

# 结果展示板块
with stylable_container(
    key="findings",
    css_styles="""
        {
            background: linear-gradient(90deg, #fffbe7 0%, #ffffff 100%);
            border-radius: 0.5rem;
            padding: 1.2rem;
            margin-bottom: 1.5rem;
            border: 1px solid #ffe4b5;
        }
    """,
):
    st.markdown("<h4>📊 Findings</h4>", unsafe_allow_html=True)
    st.markdown(
        """
        <ul>
        <li><b>Validation:</b> Comparative analysis with dummy data <b>validates the consistency</b> of R vs. SAS.</li>
        <li><b>Attribution:</b> Differences are due to <b>imputation randomness</b>, not methodological issues.</li>
        <li><b>R's Viability:</b> Confirms <b>R is a strong and flexible alternative to SAS</b>.</li>
        </ul>
        """,
        unsafe_allow_html=True,
    )

# 影响与可复现性板块
with stylable_container(
    key="impact",
    css_styles="""
        {
            background: linear-gradient(90deg, #e7f2ff 0%, #ffffff 100%);
            border-radius: 0.5rem;
            padding: 1.2rem;
            border: 1px solid #b3d7ff;
        }
    """,
):
    st.markdown("<h4>🌟 Impact & Reproducibility</h4>", unsafe_allow_html=True)
    st.markdown(
        """
        *   **Practical Guide:** This work provides a **practical guide for researchers transitioning from SAS to R**.
        *   **Software Versions:** Analyses were conducted using **SAS version 9.04.01** and **R version 4.4.1**.
        *   **Detailed Reproducibility:** Detailed R package versions are provided in the `renv.lock` file in our project repository: [https://github.com/GZfisher/mi_ancova_pooling](https://github.com/GZfisher/mi_ancova_pooling).

        """
    )

st.markdown("---")
st.markdown("#### How to Use This App:")
st.markdown("""
1.  **Navigate:** Use the sidebar on the left to jump between sections of the paper.
2.  **Expand Code:** Click on the "Show Code" expanders to reveal detailed R or SAS code snippets.
3.  **Interact:** On certain pages (e.g., "5. Comparative Analysis" or "7. Interactive Demo"), adjust sliders and inputs to conceptually demonstrate the impact of different parameters or scenarios.
4.  **Full Screen:** For the best presentation experience, consider using your browser's full-screen mode.
""")

st.markdown("---") # Add a separator below the buttons
create_navigation_buttons(__file__, 'lower')