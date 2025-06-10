load("dummy.RData")

library(norm)
library(dplyr)
source("function/two_step_imputation.R")
source("function/Fortran_function.R")

convert_imp <- function(data, ref) {
  complete_all <- rbind(ori_data, data %>% select(USUBJID,PARAM,TRT01P,REGIONN,BLBMIG2N,starts_with("VISIT"),impno))
  complete_long <<- complete_all %>% 
    mutate(BASE=VISIT0) %>% 
    pivot_longer(
      cols = starts_with("VISIT"),
      names_to = "AVISIT",
      values_to = "AVAL"
    ) %>% 
    filter(AVISIT != "VISIT0") %>% 
    mutate(CHG=AVAL-BASE,id=paste0(USUBJID,AVISIT))
  
  complete_long$REGIONN <- relevel(factor(complete_long$REGIONN),ref=4)
  complete_long$BLBMIG2N <- relevel(factor(complete_long$BLBMIG2N),ref=2)
  complete_long$TRT01P <- relevel(factor(complete_long$TRT01P),ref=ref)
  imp <- mice::as.mids(complete_long, .imp="impno", .id="id")
  return(imp)
}

adqs_mono <- wide_data[,c("TRT01PN","REGIONN","BLBMIG1N","BASE",colnames(wide_data)[8:35])]
