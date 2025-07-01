import React from 'react';
import { Box, Typography, Card, Paper, Divider, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import Slide from '../components/Slide';
import StorageIcon from '@mui/icons-material/Storage';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckIcon from '@mui/icons-material/Check';

const RagVisualizationSlide: React.FC<{ theme: any }> = ({ theme }) => {
  return (
    <Slide key="rag-visualization" title="How RAG Works">
      <Box className="main-card">
        <Box className="content-card" sx={{ height: 'calc(100% - 16px)', margin: '16px', padding: '0 !important' }}>
          <Box sx={{ 
            position: 'relative', 
            height: '100%', 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            {/* Main animation container */}
            <Box sx={{ 
              position: 'relative',
              height: '60%', // Reduced from 70%
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {/* Clinical Document - Starting point */}
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                style={{ 
                  position: 'absolute', 
                  left: '5%', 
                  width: '200px', /* Reduced from 220px */
                  zIndex: 5
                }}
              >
                <Paper 
                  elevation={3} 
                  sx={{ 
                    p: 2, 
                    borderRadius: '8px', 
                    backgroundColor: '#fff',
                    border: '1px solid #e0e0e0',
                    height: '250px', /* Reduced from 300px */
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold" sx={{ color: theme.palette.secondary.main, mb: 1 }}>
                    Clinical Protocol
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.7rem', mb: 2 }}>
                    Source document
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ 
                      width: '100%', 
                      height: '8px', 
                      backgroundColor: '#f0f0f0', 
                      mb: 1, 
                      borderRadius: '4px' 
                    }} />
                    <Box sx={{ 
                      width: '80%', 
                      height: '8px', 
                      backgroundColor: '#f0f0f0', 
                      mb: 1, 
                      borderRadius: '4px' 
                    }} />
                    <Box sx={{ 
                      width: '90%', 
                      height: '8px', 
                      backgroundColor: '#f0f0f0', 
                      mb: 2, 
                      borderRadius: '4px' 
                    }} />
                    
                    {/* Text that will be highlighted and chunked */}
                    <motion.div 
                      initial={{ backgroundColor: 'transparent' }}
                      animate={{ 
                        backgroundColor: ['transparent', theme.palette.primary.main + '20', 'transparent'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                    >
                      <Typography variant="body2" fontWeight={500} sx={{ color: 'text.primary', mb: 1, fontSize: '0.75rem', lineHeight: 1.4 }}>
                        "SECTION 4: STUDY POPULATION

4.1 INCLUSION CRITERIA
4.1.1 Adult subjects (≥18 years) with inadequately controlled Type 2 Diabetes Mellitus may be enrolled if they demonstrate fasting plasma glucose ≥126 mg/dL (7.0 mmol/L) at screening.
4.1.2 Glycated hemoglobin A1c must be between 7.5-10.0% inclusive at screening.
4.1.3 Body mass index (BMI) between 23.0-40.0 kg/m² at screening.

4.2 PRIOR AND CONCOMITANT THERAPY
4.2.1 All subjects must have been receiving stable metformin therapy at a dose ≥1500 mg daily (or maximum tolerated dose documented if lower) for a minimum period of 8 weeks prior to randomization.
4.2.2 The use of other glucose-lowering medications including insulin, GLP-1 receptor agonists, SGLT-2 inhibitors, sulfonylureas, and DPP-4 inhibitors is prohibited during the study period.

4.3 SPECIAL POPULATIONS AND RENAL FUNCTION REQUIREMENTS
4.3.1 Laboratory values must indicate adequate renal function defined as estimated glomerular filtration rate (eGFR) &gt;60 mL/min/1.73m² using the CKD-EPI formula.
4.3.2 For subjects aged ≥75 years, a lower eGFR threshold of &gt;50 mL/min/1.73m² may be permitted after consultation with the medical monitor.
4.3.3 Female subjects of childbearing potential must agree to use highly effective contraception throughout the study period and for 30 days after the last dose of investigational product.

Reference: Cai H, et al. Inclusion Criteria Optimization for Type 2 Diabetes Clinical Trials: A Systematic Review. Journal of Diabetes Research (2023); Zhang et al. Age-adjusted eGFR thresholds in diabetes clinical trials. J Am Soc Nephrol (2024)."
                      </Typography>
                    </motion.div>
                    
                    <Box sx={{ 
                      width: '100%', 
                      height: '8px', 
                      backgroundColor: '#f0f0f0', 
                      mb: 1, 
                      mt: 1,
                      borderRadius: '4px' 
                    }} />
                    <Box sx={{ 
                      width: '70%', 
                      height: '8px', 
                      backgroundColor: '#f0f0f0', 
                      mb: 1, 
                      borderRadius: '4px' 
                    }} />
                    <Box sx={{ 
                      width: '85%', 
                      height: '8px', 
                      backgroundColor: '#f0f0f0', 
                      borderRadius: '4px' 
                    }} />
                  </Box>
                </Paper>
              </motion.div>
              
              {/* Document Chunking Animation */}
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                style={{
                  position: 'absolute',
                  top: '30%',
                  left: '32%',
                  zIndex: 10
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  {/* Animated arrow */}
                  <motion.div
                    animate={{
                      x: [0, 10, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  >
                    <Typography 
                      variant="h5" 
                      sx={{ color: theme.palette.primary.main, transform: 'rotate(0deg)', mb: 1 }}
                    >
                      →
                    </Typography>
                  </motion.div>
                  
                  <Card sx={{ 
                    bgcolor: theme.palette.primary.main + '15', 
                    p: 1.5, 
                    borderRadius: '8px',
                    width: '140px',
                  }}>
                    <Typography variant="caption" fontWeight="bold" sx={{ color: theme.palette.primary.main, display: 'block', mb: 0.5 }}>
                      PROCESSING
                    </Typography>
                    <Typography variant="body2" fontSize="0.8rem" fontWeight={500}>
                      Text Chunking
                    </Typography>
                  </Card>
                </Box>
              </motion.div>
              
              {/* Vector Storage */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 2.0 }}
                style={{ 
                  position: 'absolute', 
                  top: '8%', 
                  left: '50%',
                  zIndex: 15
                }}
              >
                <Card sx={{ 
                  width: '170px', /* Reduced from 180px */
                  bgcolor: theme.palette.secondary.main + '10', 
                  p: 1.5, /* Reduced from p: 2 */
                  borderRadius: '12px',
                  border: `1px solid ${theme.palette.secondary.main + '30'}`
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <StorageIcon sx={{ color: theme.palette.secondary.main, mr: 1, fontSize: '1.1rem' }}/>
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ color: theme.palette.secondary.main, fontSize: '0.9rem' }}>
                      Vector Database
                    </Typography>
                  </Box>
                  
                  {/* Animated chunks being stored */}
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 0.8, /* Reduced from gap: 1 */
                    position: 'relative',
                    height: '90px' /* Reduced from 100px */
                  }}>
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 2.5, duration: 0.5 }}
                    >
                      <Paper elevation={1} sx={{ p: 0.7, borderRadius: '4px' }}>
                        <Typography variant="caption" sx={{ fontSize: '0.65rem', lineHeight: 1.2, display: 'block' }}>
                          "4.1 Inclusion Criteria: Adult subjects with T2DM may be enrolled if HbA1c 7.5-10.0% and BMI 23-40 kg/m²."
                        </Typography>
                      </Paper>
                    </motion.div>
                    
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 2.7, duration: 0.5 }}
                    >
                      <Paper elevation={1} sx={{ p: 0.7, borderRadius: '4px' }}>
                        <Typography variant="caption" sx={{ fontSize: '0.65rem', lineHeight: 1.2, display: 'block' }}>
                          "4.2 Prior Therapy: Stable metformin ≥1500mg for 8 weeks. Other glucose-lowering medications prohibited."
                        </Typography>
                      </Paper>
                    </motion.div>
                    
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 2.9, duration: 0.5 }}
                    >
                      <Paper elevation={1} sx={{ p: 0.7, borderRadius: '4px' }}>
                        <Typography variant="caption" sx={{ fontSize: '0.65rem', lineHeight: 1.2, display: 'block' }}>
                          "4.3 Special Populations: eGFR &gt;60 mL/min required. For patients ≥75 years, lower threshold of &gt;50 mL/min permitted with approval."
                        </Typography>
                      </Paper>
                    </motion.div>
                  </Box>
                </Card>
              </motion.div>
              
              {/* User Query */}
              <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 3.5 }}
                style={{ 
                  position: 'absolute', 
                  bottom: '15%',
                  left: '50%',
                  zIndex: 20
                }}
              >
                <Card sx={{ 
                  bgcolor: 'white', 
                  p: 2, 
                  borderRadius: '12px', 
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  width: '220px'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar 
                      sx={{ 
                        width: 28, 
                        height: 28, 
                        bgcolor: theme.palette.primary.main, 
                        fontSize: '0.9rem',
                        mr: 1.5
                      }}
                    >
                      Q
                    </Avatar>
                    <Typography variant="subtitle2" fontWeight="bold">User Query</Typography>
                  </Box>
                  
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    "What are the eGFR requirements for elderly patients with diabetes in this study, and how do they differ from standard criteria?"
                  </Typography>
                  
                  <motion.div
                    animate={{
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                    style={{ 
                      width: '100%',
                      textAlign: 'center',
                      marginTop: '8px'
                    }}
                  >
                    <Typography variant="caption" sx={{ color: theme.palette.primary.main }}>
                      Searching for relevant context...
                    </Typography>
                  </motion.div>
                </Card>
              </motion.div>
              
              {/* LLM Generation */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 4.5 }}
                style={{ 
                  position: 'absolute', 
                  right: '5%',
                  zIndex: 25,
                  width: '250px'
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <Card sx={{ 
                    p: 2.5, 
                    borderRadius: '12px', 
                    boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box 
                        sx={{ 
                          borderRadius: '50%', 
                          bgcolor: theme.palette.primary.main,
                          p: 1,
                          display: 'flex',
                          mr: 2
                        }}
                      >
                        <AutoAwesomeIcon sx={{ color: 'white', fontSize: '1.2rem' }} />
                      </Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        LLM Response
                      </Typography>
                    </Box>
                    
                    <Divider sx={{ mb: 2 }} />
                    
                    <Typography variant="body2" sx={{ mb: 1, fontSize: '0.9rem' }}>
                      The study protocol specifies different eGFR requirements based on age. For standard patients, adequate renal function is defined as eGFR &gt;60 mL/min/1.73m² using the CKD-EPI formula. However, elderly patients (≥75 years) have a modified requirement with a lower threshold of eGFR &gt;50 mL/min/1.73m² permitted after consultation with the medical monitor. This adjustment acknowledges the natural decline in renal function with age while maintaining safety parameters for the study medication.
                    </Typography>
                    
                    <Box sx={{ 
                      mt: 2, 
                      p: 1, 
                      borderRadius: '6px', 
                      bgcolor: theme.palette.secondary.light + '10',
                      borderLeft: `3px solid ${theme.palette.secondary.main}`
                    }}>
                      <Typography variant="caption" sx={{ color: theme.palette.secondary.main, display: 'block', mb: 0.5, fontWeight: 'bold' }}>
                        Sources:
                      </Typography>
                      <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
                        Protocol Section 4.1.2: "Laboratory values must indicate adequate renal function defined as estimated glomerular filtration rate (eGFR) &gt;60 mL/min/1.73m² using the CKD-EPI formula."
                      </Typography>
                      <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
                        Protocol Section 4.1.2: "For subjects aged ≥75 years, a lower eGFR threshold of &gt;50 mL/min/1.73m² may be permitted after consultation with the medical monitor."
                      </Typography>
                      <Typography variant="caption" sx={{ display: 'block', fontStyle: 'italic', mt: 1, fontSize: '0.65rem' }}>
                        See also: Zhang et al. "Age-adjusted eGFR thresholds in diabetes clinical trials", J Am Soc Nephrol (2024)
                      </Typography>
                    </Box>
                  </Card>
                  
                  <Box sx={{ position: 'absolute', left: '20px', bottom: '-15px' }}>
                    <motion.div
                      animate={{
                        y: [0, -5, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      <Box sx={{ 
                        borderRadius: '50%', 
                        bgcolor: '#fff',
                        border: `2px solid ${theme.palette.primary.main}`,
                        p: 0.8,
                        display: 'flex'
                      }}>
                        <CheckIcon sx={{ color: theme.palette.primary.main, fontSize: '1rem' }} />
                      </Box>
                    </motion.div>
                  </Box>
                </Box>
              </motion.div>
              
              {/* Connection lines */}
              <svg 
                width="100%" 
                height="100%" 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 1,
                  pointerEvents: 'none'
                }}
              >
                {/* Animated line from Vector DB to Query */}
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 3.8 }}
                  d="M 420 150 Q 470 250 420 300"
                  fill="transparent"
                  stroke={theme.palette.secondary.main}
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
                
                {/* Animated line from Query to LLM */}
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 4.3 }}
                  d="M 580 300 Q 670 300 750 200"
                  fill="transparent"
                  stroke={theme.palette.primary.main}
                  strokeWidth="2"
                />
              </svg>
            </Box>
            
            {/* Bottom explanation */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 5 }}
            >
              <Typography variant="body2" align="center" sx={{ mt: 2, maxWidth: '75%', mx: 'auto', fontSize: '0.9rem' }}>
                The Study Protocol Assistant uses RAG technology to deliver evidence-based answers by retrieving relevant content from your clinical documents and generating accurate responses.
              </Typography>
            </motion.div>
          </Box>
        </Box>
      </Box>
    </Slide>
  );
};

export default RagVisualizationSlide;