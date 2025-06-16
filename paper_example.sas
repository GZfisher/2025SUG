/* Step 1: Use MCMC to convert non-monotone missingness to a monotone structure */
PROC MI DATA=<input_data> NIMPUTE=<num_imputations> SEED=<mcmc_seed> OUT=<mcmc_output>;
    VAR <treatment_group> <categorical_covariate(s)> <baseline_variable> <visit_variables>;
    MCMC CHAIN=SINGLE NBITER=200 NITER=100 IMPUTE=MONOTONE;
RUN;

/* Step 2: Use monotone regression for final imputation */
PROC MI DATA=<mcmc_output> NIMPUTE=1 SEED=<reg_seed> OUT=<final_imputed_data> (rename=(_imputation_=imputation_number));
    BY _imputation_;
    CLASS <treatment_group> <categorical_covariate(s)>;
    VAR <treatment_group> <categorical_covariate(s)> <baseline_variable> <visit_variables>;
    MONOTONE REG(<last_visit_variable> = <treatment_group> <categorical_covariate(s)> <previous_visit_variables>);
RUN;



/* Step 1: Fit ANCOVA model to each imputed dataset */
ods output lsmeans=lsmeans_out diffs=diffs_out;

proc mixed data=<imputed_data> method=REML noclprint;
    class <subject_id> <treatment_group> <categorical_covariates>;
    model <change_variable> = <treatment_group> <baseline_var> <other_covariates> / solution;
    lsmeans <treatment_group> / cl diff e obsmargins;
    by <imputation_index> <visit_variable>;
run;

/* Step 2: Sort output for pooling */
proc sort data=lsmeans_out;
    by <visit_variable> <treatment_group>;
run;

/* Step 3: Pool lsmeans using Rubin's Rule */
proc mianalyze data=lsmeans_out;
    modeleffects estimate;
    stderr stderr;
    ods output ParameterEstimates=lsmeans_pooled;
    by <visit_variable> <treatment_group>;
run;

proc sort data=diffs_out;
    by <visit_variable> <treatment_group>;
run;

/* Step 4: Pool treatment differences using Rubin's Rule */
proc mianalyze data=diffs_out;
    modeleffects estimate;
    stderr stderr;
    ods output ParameterEstimates=diffs_pooled;
    by <visit_variable> <treatment_group>;
run;