#### generate complete dummy data ####
library(tidyverse)

set.seed(89757)

n_subj <- 500
n_visit <- 29

# define the proportion of the categorical variables
category_count = list(TRT01PN = c(0.45, 0.55), REGIONN = c(0.4, 0.3, 0.2, 0.1), BLBMIG1N = c(0.8, 0.2))

# basic information of subjects
adsl <- data.frame(
  SUBJID = paste0("DUMMY",str_pad(seq(1:n_subj),4,pad=0)),
  REGIONN = factor(sample(1:4, size = n_subj, replace = TRUE, prob = c(category_count$REGIONN))),
  TRT01PN = relevel(factor(sample(1:2, size = n_subj, replace = TRUE, prob = c(category_count$TRT01PN))), ref = 2),
  BLBMIG1N = factor(sample(1:2, size = n_subj, replace = TRUE, prob = c(category_count$BLBMIG1N))),
  BASE = runif(n_subj, min=5, max=7)
)

# visit timepoints
visits <- paste0("WEEK", seq(0, 56, by = 2))

# create a long data
long_data <- adsl[rep(1:n_subj, each = n_visit), ]
long_data$AVISIT <- factor(rep(visits, n_subj), levels = visits)

# define the effect of each variable
## coefficient
coef_visit <- 0.03  # increase by week
coef_trt <- 1       # group 2 is 1 score higher than group 1
coef_region <- c(0, 0.5, -0.4, 0.2)
coef_bmi <- 0.8     # group 2 is 0.8 score higher than group 1
coef_baseline <- 0.7  # adjust baseline effect
error_sd <- 0.5

# generate the scores
long_data$AVAL <- with(long_data,
                        coef_baseline * BASE +
                          coef_trt * (TRT01PN == 2) +
                          coef_region[REGIONN] +
                          coef_bmi * (BLBMIG1N == 2) +
                          coef_visit * as.numeric(gsub("WEEK", "", AVISIT)) +
                          rnorm(nrow(long_data), 0, error_sd)
)
long_data$AVAL <- pmin(pmax(long_data$AVAL, 0), 10)  # limit the score within 0-10

long_data <- long_data %>% # mutate(AVAL = ifelse(AVISIT=="WEEK0", BASE, AVAL)) %>% 
  mutate(TRT01P = case_when(TRT01PN==1 ~ "TRT",
                            TRT01PN==2 ~ "PLACEBO"),
         AVISITN = as.numeric(gsub("WEEK", "", AVISIT)),
         CHG = AVAL - BASE
         )  %>% 
  filter(AVISITN != 0)

# Save the complete, fully observed data as data_complete
data_complete <- long_data

# # Set the reference level for treatment group (numeric) as group 2
# data_complete$TRT01PN <- relevel(factor(data_complete$TRT01PN), ref = 2)
# 
# # Set the reference level for treatment group (label) as "PLACEBO"
# data_complete$TRT01P <- relevel(factor(data_complete$TRT01P), ref = "PLACEBO")
# 
# # Ensure BLBMIG1N and REGIONN are factors
# data_complete$BLBMIG1N <- factor(data_complete$BLBMIG1N)
# data_complete$REGIONN <- factor(data_complete$REGIONN)
# 
# # use the ANCOVA to get the results
# ancova_nomi <- function(data) {
#   lm_fit <- stats::lm(formula = stats::as.formula("CHG ~ TRT01PN + BASE + BLBMIG1N + REGIONN"), 
#                       data = data)
#   emmeans_fit <- emmeans::emmeans(
#     lm_fit,
#     # Specify here the group variable over which EMM are desired.
#     specs = "TRT01PN",
#     weights = "proportional"
#     # Pass the data again so that the factor levels of the arm variable can be inferred.
#     # data = data
#   )
#   emmeans_contrasts <- emmeans::contrast(
#     emmeans_fit,
#     # Compare dummy arms versus the control arm.
#     method = "trt.vs.ctrl",
#     # Take the arm factor from .ref_group as the control arm.
#     ref = 2,
#     level = 0.95
#   )
#   sum_contrasts <- summary(
#     emmeans_contrasts,
#     # Derive confidence intervals, t-tests and p-values.
#     infer = TRUE,
#     # Do not adjust the p-values for multiplicity.
#     adjust = "none"
#   )
#   return(sum_contrasts)
# }
# 
# library(broom)
# 
# results_nomi <- data_complete %>% 
#   filter(AVISITN > 0) %>% 
#   group_by(AVISITN) %>% 
#   do(ancova_nomi(data = .))

#### create missing values ####
subjid <- unique(long_data$SUBJID)

# assign three types of subjects randomly
all_obs_ids <- sample(subjid, size = round(0.5 * n_subj))
monotone_ids <- sample(setdiff(subjid, all_obs_ids), size = round(0.3 * n_subj))
monorand_ids <- setdiff(subjid, c(all_obs_ids, monotone_ids))

# 1) all non-missing
# all_obs_ids

# 2) Monotone missing (all missing after WEEKx with in one subject)
for (sid in monotone_ids) {
  person_data <- long_data %>% filter(SUBJID == sid)
  # select a start timepoint of monotone (exclude WEEK0 and WEEK56)
  miss_start <- sample(2:28, 1)
  miss_visits <- levels(long_data$AVISIT)[miss_start:length(levels(long_data$AVISIT))]
  long_data$AVAL[long_data$SUBJID == sid & long_data$AVISIT %in% miss_visits] <- NA
  long_data$CHG[long_data$SUBJID == sid & long_data$AVISIT %in% miss_visits] <- NA
}

# 3) Monotone + Missing at random
for (sid in monorand_ids) {
  person_data <- long_data %>% filter(SUBJID == sid)
  # Monotone
  miss_start <- sample(2:28, 1)
  miss_visits_mono <- levels(long_data$AVISIT)[miss_start:length(levels(long_data$AVISIT))]
  long_data$AVAL[long_data$SUBJID == sid & long_data$AVISIT %in% miss_visits_mono] <- NA
  long_data$CHG[long_data$SUBJID == sid & long_data$AVISIT %in% miss_visits_mono] <- NA
  # Missing at random
  obs_visits <- setdiff(levels(long_data$AVISIT), miss_visits_mono)
  random_miss <- sample(obs_visits, size = sample(1:min(length(obs_visits), 3), 1))
  long_data$AVAL[long_data$SUBJID == sid & long_data$AVISIT %in% random_miss] <- NA
  long_data$CHG[long_data$SUBJID == sid & long_data$AVISIT %in% random_miss] <- NA
}

adqs <- long_data %>% 
  mutate(DCTFL = case_when(SUBJID %in% all_obs_ids ~ "N",
                           .default = "Y"))

#### check the missing pattern ####
library(mice)
md.pattern(adqs)
wide_data <- pivot_wider(adqs, id_cols = c(SUBJID, REGIONN, TRT01PN, TRT01P, BLBMIG1N, BASE, DCTFL), 
                         names_from = AVISIT, values_from = CHG) %>% 
  mutate(TRT01PN = as.character(TRT01PN),
         REGIONN = as.character(REGIONN),
         BLBMIG1N = as.character(BLBMIG1N))
md.pattern(wide_data)

# save(adqs, adsl, data_complete, wide_data, file = "dummy.RData")
