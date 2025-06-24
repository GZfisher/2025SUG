load("imputation.RData")
load("ancova.RData")
load("dummy.RData")

library(dplyr)
haven::write_xpt(complete_long %>% filter(impno != 0), "imp100.xpt", version = 5)
haven::write_xpt(wide_data, "dummy.xpt", version = 5)
