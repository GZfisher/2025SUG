import streamlit as st
from utils import create_navigation_buttons

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

st.title("4. Development and Implementation in R")
st.markdown("""
Compared with SAS, implementing these steps in R often presents additional challenges due to the need for careful selection of appropriate packages and functions, or custom code development. Our work demonstrates how to achieve this alignment.
""")

st.info("Full reproducible R code used in the paper is available at: [https://github.com/GZfisher/mi_ancova_pooling](https://github.com/GZfisher/mi_ancova_pooling)")

st.subheader("4.1 MCMC Imputation in R")
st.markdown("""
By reviewing the literature and the SAS documentation, the MCMC approach for multiple imputation is essentially a **data augmentation procedure**, which consists of two key steps: 
            the **I step (Imputation step)** and the **P step (Posterior step)**. 
            Specifically, the I step involves drawing plausible values for missing data given the observed data and current parameter values, 
            while the P step updates the parameters based on the complete dataset obtained from the I step. 
            This iterative process is the foundation of the MCMC algorithm for handling arbitrary missing patterns.
""")

st.info("In R, the `norm` package offers the function `mda.norm` for implementing data augmentation.")

with st.expander("**Challenges and Solutions**"):
    st.markdown("""
    The `norm` package encountered significant limitations with higher-dimensional data, primarily due to precision issues within the `prelim.norm` function. Specifically, the use of `as.integer` for computing missing data patterns restricted precision, limiting the number of variables it could handle. We addressed this by modifying the data type to `as.double` to accommodate more variables.
    """)

    st.code("""
# Original problematic line (conceptual):
prelim.norm <- function(x) {
  ...
  # index the missing data patterns
  mdp <- as.integer((r%*%(2^((1:ncol(x))-1)))+1)
  ...
}

# Our modified line:
prelim.norm.new <- function (x) {
  ...
  mdp <- as.double((r %*% (2^((1:ncol(x)) - 1))) + 1)
  ...
}
    """, language="r")

with st.expander("**Core MCMC function**"):
    st.markdown("""
We developed a core function `mda_r` that alternately performs the I-step and P-step as described above. 
                This function is based on, and extends, the `mda.norm` function from the `norm` package, 
                with modifications designed to address the limitations observed when handling higher-dimensional data.
    """)
    st.code("""
# complete I-step and P-step
mda_r <- function (s, theta, steps = 1, showits = FALSE) {
  s$x <- .na.to.snglcode(s$x, as.double(999))
  tobs <- tobsmn(s$p, s$psi, s$n, s$x, s$npatt, s$r, s$mdpst,
  s$nmdp, s$last, integer(s$p), s$sj, s$layer, s$nlayer, s$d)
  if (showits)
      cat(paste("Steps of Monotone Data Augmentation:", "\\n"))
  for (i in 1:steps) {
      if (showits)
        cat(paste(format(i), "...", sep = ""))
      # I-step: impute missing data given current parameters
      s$x <- is2n(s$d, theta, s$p, s$psi, s$n,
                  s$x, s$npatt, s$r, s$mdpst, s$nmdp, s$sj, s$last,
                  integer(s$p), integer(s$p), double(s$p), theta, rnorm(n=1))
      # P-step: update parameters given completed data
      theta <- ps2n(s$p, s$psi, s$n, s$x, s$npatt,
                    s$r, s$mdpst, s$nmdp, integer(s$p), integer(s$p),
                    s$nmon, s$sj, s$nlayer, s$d, tobs, numeric(s$d),
                    numeric(s$d), numeric(s$p + 1), numeric(s$d))
  }
  if (showits)
    cat("\\n")
  theta
}
""", language="r")

with st.expander("**MCMC Imputation Workflow**"):
    st.markdown("""
The `step1` function then orchestrates the MCMC imputation workflow, preparing data, getting initial parameters, running `mda_r`, and generating multiple imputed datasets while ensuring a monotone structure.
    """)
    st.code("""
# MCMC imputation function
step1 <- function(data, nimpute, emmaxits, maxits, seed) {
  s <- prelim.norm.new(data) # Prepare data for norm package
  thetahat <- em.norm(s, maxits = emmaxits) # Get initial parameters using EM algorithm
  rngseed(seed) # Set random seed
  theta <- mda_r(s, thetahat, steps = maxits, showits = TRUE) # Run MCMC to update parameters

  all_mono_new <- data.frame(data)
  all_mono_new[,"impno"] <- 0 # Add imputation indicator for original data

  for (i in 1:nimpute) {
    all_mono_one_time <- data.frame(imp.norm(s, theta, data)) # Impute missing values
    # Ensure monotone structure by setting post-missing values to NA for each row
    for (j in 1:nrow(data)) {
      last_num <- max(which(!is.na(data[j,])))
      if (last_num < ncol(data)) {
        all_mono_one_time[j, (last_num+1):ncol(data)] <- "is.na<-"(all_mono_one_time[j, (last_num+1):ncol(data)])
      }
    }
    all_mono_one_time$impno <- i # Add imputation number
    all_mono_new <- rbind(all_mono_new, all_mono_one_time) # Append result
    print(paste0("MCMC imputation: ", i, "..."))
  }
  return(all_mono_new)
}
    """, language="r")
    st.markdown("""
This code `all_mono_one_time[j, (last_num+1):ncol(data)] <- "is.na<-"(all_mono_one_time[j, (last_num+1):ncol(data)])`
                sets all values following the last observed (non-missing) value in each row back to missing. 
                This step ensures that MCMC imputation only fills in the internal missing values and does not impute values beyond a subject's last observed visit. 
                In effect, this operation mirrors the behavior of the `IMPUTE=MONOTONE` option in SAS, 
                transforming the dataset into a **monotone missing** data pattern in preparation for subsequent monotone regression imputation.
""")

st.subheader("4.2 Monotone Regression Imputation in R")
st.markdown("""
To perform the monotone regression imputation step in R, we developed a function, 
            which utilizes the `mice` package to impute the remaining missing values under a monotone pattern.
""")
with st.expander("**Monotone Regression**"):
    st.markdown("""
The `step2` function utilizes the `mice` package for monotone regression imputation. 
    """)
    st.code("""
# Monotone regression imputation using mice
step2 <- function(data, nimpute, method, formula_list, seed) {
  reg <- list()
  for (i in 1:nimpute) {
    seed = seed + 1
    # Filter data for current imputation
    reg[[paste0("x", i)]] <- data %>% filter(impno == i)
    # Sequentially apply regression formulas
    for (j in 1:length(formula_list)) {
      x <- mice::mice(reg[[paste0("x", i)]], m = 1, method = method,
      formulas = formula_list[j], seed = seed)
      reg[[paste0("x", i)]] <- mice::complete(x)
    }
  }

  complete <- do.call(rbind, reg) # Combine imputed datasets
  return(complete)
}
""", language="r")
    st.markdown("""
A key aspect is the **dynamic construction of regression formulas** (`formula_list`), 
                ensuring each variable with missing values is imputed using all relevant covariates, including previously imputed or observed visit variables.
""")
    st.code("""
# Define covariate columns for modeling
cov_cols <- c('TRT01PN'...)
# Identify visit variables that need imputation or modeling
visit_cols = ...
# Initialize model formula list for each step
formula_list <- c()
# Dynamically construct the formula for each visit variable,
# each time adding the current visit as a predictor in subsequent formulas
for (i in 1:length(visit_cols)) {
  now_visit_col <- visit_cols[i]

  # If the current visit column has missing values:
  if (any(is.na(data[[now_visit_col]]))) {
    response <- now_visit_col
    formula_list <- c(
      formula_list,
      as.formula(paste0(response,"~",paste(cov_cols,collapse = '+')))
    )
    # Add this column to covariates for the next steps
    cov_cols <- c(cov_cols, now_visit_col)
  }
# If the column is complete, just add it to covariates
  else {
    cov_cols <- c(cov_cols, now_visit_col)
  }
}
""", language="r")

st.subheader("4.3 Performing ANCOVA & Combining Results Using Rubin's Rule in R")
st.markdown("""
While `mice::pool()` and `mitools::MIcombine()` have limitations for clinical trial analyses (no CI or P-values), 
            the `emmeans` package provides robust Rubin's Rule functionality for models fitted across multiply imputed datasets. 
            We demonstrate how to obtain pooled estimates, confidence intervals, and hypothesis tests.
""")
with st.expander("**ANCOVA and Pooling**"):
    st.markdown("""
Using `emmeans::emmeans`, it is possible to obtain pooled estimates, confidence intervals, 
                and hypothesis tests for adjusted group means and contrasts—all within a consistent and flexible framework. 
                Importantly, our comparison of results from emmeans in R and the corresponding SAS procedures showed that differences were negligible (see the next section).
                """)
    st.code("""
ancova_res <- function(imp, formula, trt_var, ref) {
  lm_fit <- with(data=imp,exp=stats::lm(
    formula = stats::as.formula(formula)
  )) # Fit model based on each imputation
  emmeans_fit <- emmeans::emmeans(
    lm_fit,
    # Specify here the group variable over which EMM are desired.
    specs = trt_var,
    weights = "proportional"
  )
  emmeans_contrasts <- emmeans::contrast(
    emmeans_fit,
    # Compare dummy arms versus the control arm.
    method = "trt.vs.ctrl",
    # Take the arm factor from param “ref” as the control arm.
    ref = ref,
    level = 0.95
  )
  sum_contrasts <- summary(
    emmeans_contrasts,
    # Derive confidence intervals, t-tests and p-values.
    infer = TRUE,
    # Do not adjust the p-values for multiplicity.
    adjust = "none"
  )
  return(list(contrasts=sum_contrasts, lm_fit=lm_fit))
}
""", language="r")

st.markdown("""
A crucial data transformation step involves converting the imputed data to a 'long' format and then into a `mids` object, making it compatible with `with()` and `emmeans()` functions for multiply imputed analyses.
""")
with st.expander("**Data Transformation to `mids` Object**"):
    st.markdown("""
After monotone regression imputation, the dataset (initially in **wide** format with separate columns for each visit) is first converted to **long** format so that each row corresponds to a subject and a visit. 
                Derived variables, such as the analysis value (AVAL), are calculated as needed. 
                The combined and reshaped data are then converted into the `mids` class using the `mice::as.mids` function.
""")
    st.code("""
# Function to convert imputed and original (with missing values) data from wide to long format,
# and compute analysis variables and a unique subject-visit ID
convert_long <- function(imputed_data, original_data, visit_prefix = "VISIT", subj_col = "SUBJID",
base_col = "BASE", target_var = "CHG", imp_col = "impno") {
  # Combine original data (with missing values) and imputed data
  combined <- rbind(original_data, imputed_data)

  # Pivot to long format: each row is a subject-visit combination
  long <- combined %>%
    pivot_longer(
      cols = starts_with(visit_prefix), # Visit columns (e.g., VISIT1, VISIT2, ...)
      names_to = "AVISIT", # Name for visit variable
      values_to = target_var # Name for change-from-baseline (or other measure)
    ) %>%
    mutate(
      AVAL = !!sym(base_col) + !!sym(target_var), # Calculate analysis value
      id = paste0(!!sym(subj_col), "_", AVISIT) # Create unique ID per subject-visit
    )
  return(long)
}

# Example usage:
# original_data should be the initial dataset containing missing values
# imputed_data is the completed data after imputation steps
complete_long <- convert_long(imputed_data = complete100, original_data = ori_data,
visit_prefix = "WEEK", subj_col = "SUBJID", base_col = "BASE", target_var = "CHG")
# Convert to 'mids' object for multiply imputed analysis
complete_imp <- mice::as.mids(long_data, .imp = "impno", .id = "id")
""", language="r")

st.markdown("---") # Add a separator below the buttons
create_navigation_buttons(__file__, 'lower')
