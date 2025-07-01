import React, { useState } from 'react';
import { Box, Typography, Card, Paper, Stepper, Step, StepLabel, StepContent, StepIconProps, StepConnector, stepConnectorClasses, Avatar } from '@mui/material';
import Slide from '../components/Slide';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/material/styles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import DescriptionIcon from '@mui/icons-material/Description';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PsychologyIcon from '@mui/icons-material/Psychology';
import StorageIcon from '@mui/icons-material/Storage';

// Custom step connector for the stepper
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        `linear-gradient(95deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        `linear-gradient(95deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      `linear-gradient(136deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.primary.dark} 100%)`,
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      `linear-gradient(136deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.primary.dark} 100%)`,
  }),
}));

// Custom step icons
function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;
  
  const icons: { [index: string]: React.ReactElement } = {
    1: <LiveHelpIcon />,
    2: <DescriptionIcon />,
    3: <SearchIcon />,
    4: <TextSnippetIcon />,
    5: <CheckCircleIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const SPAProcessSlide: React.FC<{ theme: any }> = ({ theme }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [animation, setAnimation] = useState({
    searching: false,
    found: false,
    complete: false
  });
  
  // Steps in the SPA process
  const steps = [
    {
      label: 'Formulate Query',
      description: 'User submits a clinical protocol question about study design, eligibility criteria, procedures, endpoints, or adverse event management.',
      icon: <LiveHelpIcon />,
      detail: 'The system accepts both operational and clinical questions from various roles: physicians, clinical scientists, CRAs, and MSLs.'
    },
    {
      label: 'Select Study Documents',
      description: 'SPA accesses all relevant study documentation, including protocol, investigator brochure, TMG, lab manuals, and more.',
      icon: <DescriptionIcon />,
      detail: 'The system navigates through 18+ document types totaling over 1,100 pages per study.'
    },
    {
      label: 'AI Search & Analysis',
      description: 'Vector search retrieves relevant content across documents based on semantic similarity to the query.',
      icon: <SearchIcon />,
      detail: 'Advanced retrieval-augmented generation (RAG) using Claude on Amazon Bedrock combines document knowledge with AI reasoning.'
    },
    {
      label: 'Generate Response',
      description: 'SPA synthesizes information from relevant sections into a comprehensive, structured answer with citations.',
      icon: <TextSnippetIcon />,
      detail: 'Responses include direct links to source documents and specific paragraphs for verification.'
    },
    {
      label: 'Deliver Answer',
      description: 'User receives the answer with full traceability to source documents, typically in under 5 minutes.',
      icon: <CheckCircleIcon />,
      detail: '91% time reduction compared to traditional methods while maintaining or improving response accuracy.'
    },
  ];
  
  // Handle clicking on a step
  const handleStepClick = (index: number) => {
    setActiveStep(index);
    
    // Reset animations
    setAnimation({
      searching: false,
      found: false,
      complete: false
    });
    
    // Trigger animations in sequence
    if (index === 2) {
      setTimeout(() => setAnimation(prev => ({ ...prev, searching: true })), 500);
      setTimeout(() => setAnimation(prev => ({ ...prev, found: true })), 1500);
    }
  };
  
  // Document types being searched
  const documentTypes = [
    "Clinical Study Protocol", 
    "Investigator Brochure",
    "Toxicity Management Guide",
    "Informed Consent Form",
    "Laboratory Manual",
    "Trial Management Plan",
    "Statistical Analysis Plan",
    "Recruitment Plan",
    "Quality Plan",
    "Protocol Deviations",
    "Operational Procedure",
    "Monitoring Plan",
    "IRT User Manual",
    "Diagnostic Testing Manual",
    "Data Management Plan",
    "IP Handling Instructions",
    "Medical Monitoring Plan"
  ];

  return (
    <Slide key="spa-process" title="Study Protocol Assistant: Workflow">
      <Box sx={{ display: 'flex', height: '100%', gap: 3 }}>
        {/* Left side: Interactive process stepper */}
        <Box sx={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600, fontSize: '1rem' }}>
            SPA Process Workflow
          </Typography>
          
          <Card elevation={3} sx={{ p: 2, height: '100%', overflow: 'auto' }}>
            <Stepper activeStep={activeStep} orientation="vertical" connector={<ColorlibConnector />}>
              {steps.map((step, index) => (
                <Step key={step.label} onClick={() => handleStepClick(index)} sx={{ cursor: 'pointer' }}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        fontWeight: activeStep === index ? 600 : 400,
                        color: activeStep === index ? theme.palette.primary.main : 'inherit'
                      }}
                    >
                      {step.label}
                    </Typography>
                  </StepLabel>
                  
                  <StepContent>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2">{step.description}</Typography>
                      
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          mt: 1.5, 
                          fontStyle: 'italic', 
                          color: theme.palette.primary.main,
                          fontSize: '0.85rem',
                          borderLeft: `3px solid ${theme.palette.primary.main}`,
                          pl: 1.5,
                          py: 0.5
                        }}
                      >
                        {step.detail}
                      </Typography>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            
            <Box sx={{ 
              width: '100%', 
              height: 5, 
              mt: 3,
              borderRadius: 5, 
              bgcolor: '#f0f0f0', 
              overflow: 'hidden',
              position: 'relative'
            }}>
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${(activeStep + 1) / steps.length * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{
                  height: '100%',
                  background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  borderRadius: 5
                }}
              />
            </Box>
            
            <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>Step {activeStep + 1} of {steps.length}</Typography>
              <Typography 
                variant="caption" 
                sx={{ color: 'text.secondary' }}
              >
                {activeStep < 4 ? "Processing..." : "Complete"}
              </Typography>
            </Box>
          </Card>
        </Box>
        
        {/* Right side: Visual representation */}
        <Box sx={{ flex: 1.2, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600, fontSize: '1rem' }}>
            Visualization
          </Typography>
          
          <Card elevation={3} sx={{ p: 2, height: '100%', position: 'relative', overflow: 'hidden' }}>
            <AnimatePresence mode="wait">
              {activeStep === 0 && (
                <motion.div
                  key="query-step"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                    Example Clinical Protocol Questions
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                    {[
                      "What are the inclusion criteria for elderly patients?",
                      "How should we manage Grade 3 hypertension?",
                      "Can we allow prior immunotherapy?",
                      "What labs need to be drawn at baseline?",
                      "Do we need PK samples at this visit?",
                      "What is the dose modification protocol?",
                      "Are brain metastases allowed?",
                      "Can we enroll patients with eGFR < 45?"
                    ].map((query, i) => (
                      <motion.div 
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setHoveredCard(hoveredCard === i ? null : i)}
                      >
                        <Paper
                          elevation={hoveredCard === i ? 3 : 1}
                          sx={{
                            p: 1.5,
                            cursor: 'pointer',
                            borderLeft: `3px solid ${hoveredCard === i ? theme.palette.primary.main : '#ddd'}`,
                            bgcolor: hoveredCard === i ? theme.palette.primary.main + '08' : 'background.paper',
                            transition: 'all 0.3s ease',
                            minWidth: '230px'
                          }}
                        >
                          <Typography variant="body2">{query}</Typography>
                        </Paper>
                      </motion.div>
                    ))}
                  </Box>
                  
                  <Box 
                    sx={{ 
                      mt: 'auto', 
                      pt: 2, 
                      borderTop: '1px dashed #ddd',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar
                        src="/images/avatar-male.png"
                        alt="Clinical Scientist"
                        sx={{ width: 32, height: 32 }}
                      />
                      <Box>
                        <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontSize: '0.7rem' }}>
                          Clinical Scientist
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.85rem' }}>
                          "Does the protocol allow for dose reductions after adverse events?"
                        </Typography>
                      </Box>
                    </Box>
                    
                    <motion.div
                      animate={{
                        x: [0, 10, 0],
                        opacity: [0.8, 1, 0.8]
                      }}
                      transition={{
                        duration: 2,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 0.5
                      }}
                    >
                      <ChevronRightIcon sx={{ color: theme.palette.primary.main }} />
                    </motion.div>
                  </Box>
                </motion.div>
              )}
              
              {activeStep === 1 && (
                <motion.div
                  key="documents-step"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                    Protocol Document Database
                  </Typography>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    height: 'calc(100% - 40px)'
                  }}>
                    <Box sx={{ 
                      p: 2,
                      backgroundColor: 'rgba(0,0,0,0.02)',
                      borderRadius: 1,
                      mb: 2
                    }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="caption">Total Pages:</Typography>
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>1,100+</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="caption">Primary Protocol:</Typography>
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>250+ pages</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="caption">Ancillary Documents:</Typography>
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>850+ pages</Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ flex: 1, display: 'flex', gap: 4, justifyContent: 'center', alignItems: 'center' }}>
                      {/* Clinical Study Protocol */}
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                      >
                        <Paper
                          elevation={4}
                          sx={{
                            width: '180px',
                            height: '240px',
                            bgcolor: theme.palette.primary.main + '20',
                            border: `1px solid ${theme.palette.primary.main}`,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            p: 2,
                            position: 'relative'
                          }}
                        >
                          <DescriptionIcon 
                            sx={{ 
                              fontSize: '2.5rem', 
                              color: theme.palette.primary.main,
                              mb: 2
                            }} 
                          />
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, textAlign: 'center', mb: 1 }}>
                            Clinical Study Protocol
                          </Typography>
                          <Typography variant="caption" sx={{ textAlign: 'center' }}>
                            Core clinical trial document with eligibility criteria, study design, and procedures
                          </Typography>
                          <Box sx={{ 
                            position: 'absolute', 
                            bottom: 10, 
                            left: 0, 
                            right: 0, 
                            textAlign: 'center' 
                          }}>
                            <Typography variant="caption" sx={{ fontWeight: 500 }}>
                              250+ pages
                            </Typography>
                          </Box>
                        </Paper>
                      </motion.div>
                      
                      {/* Investigator Brochure */}
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                      >
                        <Paper
                          elevation={4}
                          sx={{
                            width: '180px',
                            height: '240px',
                            bgcolor: theme.palette.secondary.main + '20',
                            border: `1px solid ${theme.palette.secondary.main}`,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            p: 2,
                            position: 'relative'
                          }}
                        >
                          <DescriptionIcon 
                            sx={{ 
                              fontSize: '2.5rem', 
                              color: theme.palette.secondary.main,
                              mb: 2
                            }} 
                          />
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, textAlign: 'center', mb: 1 }}>
                            Investigator Brochure
                          </Typography>
                          <Typography variant="caption" sx={{ textAlign: 'center' }}>
                            Contains drug information, safety data, and clinical findings for investigators
                          </Typography>
                          <Box sx={{ 
                            position: 'absolute', 
                            bottom: 10, 
                            left: 0, 
                            right: 0, 
                            textAlign: 'center' 
                          }}>
                            <Typography variant="caption" sx={{ fontWeight: 500 }}>
                              180+ pages
                            </Typography>
                          </Box>
                        </Paper>
                      </motion.div>
                    </Box>
                    
                    <Box sx={{ mt: 2, p: 2, borderTop: '1px dashed #ddd' }}>
                      <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontStyle: 'italic' }}>
                        Plus 16+ additional document types (Toxicity Management Guidelines, Informed Consent Forms, Laboratory Manuals, etc.)
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                        All documents processed by Claude on Amazon Bedrock
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              )}
              
              {activeStep === 2 && (
                <motion.div
                  key="search-step"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                    AI Search Process
                  </Typography>
                  
                  <Box sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'calc(100% - 40px)',
                  }}>
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                      <Paper 
                        elevation={2} 
                        sx={{ 
                          p: 1.5, 
                          flex: 1,
                          borderLeft: `3px solid ${theme.palette.primary.main}`
                        }}
                      >
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                          User Query:
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          "Does the protocol allow for dose reductions after adverse events?"
                        </Typography>
                      </Paper>
                    </Box>
                    
                    <Box 
                      sx={{ 
                        position: 'relative', 
                        flex: 1, 
                        border: '1px solid #e0e0e0',
                        borderRadius: 1,
                        overflow: 'hidden'
                      }}
                    >
                      {/* Documents visualization */}
                      <Box sx={{ height: '100%', position: 'relative', p: 1 }}>
                        {/* Floating document icons */}
                        {Array.from({ length: 12 }).map((_, idx) => (
                          <Box
                            key={idx}
                            component={motion.div}
                            initial={{
                              x: 100 + Math.random() * 400,
                              y: 20 + Math.random() * 200,
                              opacity: 0.5 + Math.random() * 0.5
                            }}
                            animate={animation.searching ? {
                              x: Math.random() * 400,
                              y: Math.random() * 200,
                              opacity: [0.3, 0.8, 0.3],
                              scale: [0.9, 1.1, 0.9]
                            } : {}}
                            transition={{
                              duration: 3 + Math.random() * 2,
                              repeat: Infinity,
                              repeatType: 'reverse'
                            }}
                            sx={{
                              position: 'absolute',
                              width: 30 + Math.random() * 20,
                              height: 40 + Math.random() * 20,
                              backgroundColor: 
                                idx % 3 === 0 ? theme.palette.primary.main + '20' :
                                idx % 3 === 1 ? theme.palette.secondary.main + '20' :
                                theme.palette.error.main + '20',
                              border: '1px solid #e0e0e0',
                              borderRadius: 1,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <DescriptionIcon sx={{ fontSize: '1rem', opacity: 0.7 }} />
                          </Box>
                        ))}
                        
                        {/* Search beam visualization */}
                        {animation.searching && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              zIndex: 10
                            }}
                          >
                            <motion.div
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.7, 0.4, 0.7]
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                              style={{
                                width: 60,
                                height: 60,
                                borderRadius: '50%',
                                background: `radial-gradient(${theme.palette.primary.main}70, transparent)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <SearchIcon sx={{ color: theme.palette.primary.main }} />
                            </motion.div>
                            
                            <motion.div
                              animate={{
                                opacity: [0.1, 0.3, 0.1]
                              }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '70%',
                                height: 2,
                                backgroundColor: theme.palette.primary.main + '40',
                              }}
                            />
                            
                            <motion.div
                              animate={{
                                opacity: [0.1, 0.3, 0.1],
                                rotate: 90
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                              style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%) rotate(90deg)',
                                width: '70%',
                                height: 2,
                                backgroundColor: theme.palette.primary.main + '40',
                              }}
                            />
                          </motion.div>
                        )}
                        
                        {/* Found results */}
                        {animation.found && (
                          <Box sx={{ 
                            position: 'absolute', 
                            bottom: 10, 
                            left: 10, 
                            right: 10, 
                            p: 1,
                            backgroundColor: 'rgba(255,255,255,0.9)',
                            borderRadius: 1,
                            border: '1px solid #e0e0e0'
                          }}>
                            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                              Relevant sections found:
                            </Typography>
                            
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                              <Box sx={{ 
                                p: 0.5, 
                                backgroundColor: '#36e09e20', 
                                borderLeft: '3px solid #36e09e',
                                borderRadius: '0 4px 4px 0'
                              }}>
                                <Typography variant="caption" sx={{ display: 'block', fontWeight: 600, fontSize: '0.75rem' }}>
                                  Protocol Section 5.3 - Dose Modifications (Score: 0.92)
                                </Typography>
                                <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                                  "For Grade 3 adverse events, dose reductions of 25% are permitted..."
                                </Typography>
                              </Box>
                              
                              <Box sx={{ 
                                p: 0.5, 
                                backgroundColor: theme.palette.info.main + '20', 
                                borderLeft: `3px solid ${theme.palette.info.main}`,
                                borderRadius: '0 4px 4px 0'
                              }}>
                                <Typography variant="caption" sx={{ display: 'block', fontWeight: 600, fontSize: '0.75rem' }}>
                                  Toxicity Management Guide - Section 2.1 (Score: 0.78)
                                </Typography>
                                <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                                  "Management of specific adverse events includes dose modifications..."
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        )}
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Vector search
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {animation.found ? 'Found 2 relevant sections' : animation.searching ? 'Searching...' : 'Ready'}
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              )}
              
              {activeStep === 3 && (
                <motion.div
                  key="response-step"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                    Response Generation
                  </Typography>
                  
                  <Box sx={{ display: 'flex', height: 'calc(100% - 40px)', gap: 2 }}>
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Paper 
                        elevation={2} 
                        sx={{ 
                          p: 1.5, 
                          borderLeft: `3px solid ${theme.palette.primary.main}`
                        }}
                      >
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                          User Query:
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          "Does the protocol allow for dose reductions after adverse events?"
                        </Typography>
                      </Paper>
                      
                      <Box 
                        sx={{ 
                          flex: 1, 
                          border: '1px solid #e0e0e0',
                          borderRadius: 1,
                          p: 1.5,
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                      >
                        <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 0.5 }}>
                          Extracted Information:
                        </Typography>
                        
                        <Box sx={{ height: '100%', overflow: 'auto' }}>
                          <Box sx={{ mb: 1.5 }}>
                            <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', color: theme.palette.primary.main }}>
                              Protocol Section 5.3 - Dose Modifications
                            </Typography>
                            <Paper
                              elevation={0}
                              sx={{ 
                                p: 1, 
                                bgcolor: theme.palette.primary.main + '08',
                                fontSize: '0.75rem'
                              }}
                            >
                              "For Grade 3 adverse events, dose reductions of 25% are permitted after resolution to Grade ≤1. A maximum of 2 dose reductions are allowed per participant. Specific guidance for immune-related adverse events is provided in Section 5.3.2. Dose reductions below 50% of the starting dose are not permitted. If a participant requires dose reductions exceeding these limits, the participant should discontinue study treatment."
                            </Paper>
                          </Box>
                          
                          <Box sx={{ mb: 1.5 }}>
                            <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', color: theme.palette.info.main }}>
                              Toxicity Management Guide - Section 2.1
                            </Typography>
                            <Paper
                              elevation={0}
                              sx={{ 
                                p: 1, 
                                bgcolor: theme.palette.info.main + '08',
                                fontSize: '0.75rem'
                              }}
                            >
                              "Management of specific adverse events includes dose modifications as follows: For non-hematologic toxicities of Grade 3 or higher, hold treatment until resolution to Grade ≤1, then resume with dose reduction. For hematologic toxicities, refer to Table 4 for specific parameters requiring dose modifications."
                            </Paper>
                          </Box>
                        </Box>
                        
                        <Box 
                          component={motion.div}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0.2, 0.5, 0.2] }}
                          transition={{ duration: 3, repeat: Infinity }}
                          sx={{ 
                            position: 'absolute', 
                            bottom: 0, 
                            left: 0, 
                            right: 0,
                            height: '40px',
                            background: 'linear-gradient(to bottom, transparent, white)'
                          }}
                        />
                      </Box>
                    </Box>
                    
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ 
                        p: 1.5,
                        borderRadius: 1,
                        bgcolor: '#36e09e20',
                        border: '1px solid #36e09e',
                        height: '100%',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                      }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="caption" sx={{ fontWeight: 600 }}>
                            AI Processing
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <motion.div
                              animate={{
                                opacity: [0.5, 1, 0.5]
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatType: 'reverse'
                              }}
                            >
                              <PsychologyIcon sx={{ fontSize: '0.9rem', color: '#36e09e' }} />
                            </motion.div>
                            <Typography variant="caption" sx={{ color: '#36e09e' }}>
                              Synthesizing
                            </Typography>
                          </Box>
                        </Box>
                        
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ 
                            duration: 1.5,
                          }}
                          style={{ height: '100%' }}
                        >
                          <Box sx={{ p: 1.5, height: '100%', overflowY: 'auto' }}>
                            <Typography variant="body2" sx={{ mb: 2 }}>
                              <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                style={{ display: 'inline' }}
                              >
                                Yes, the protocol does allow for dose reductions after adverse events. According to Section 5.3 of the Protocol:
                              </motion.span>
                            </Typography>
                            
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 1.2, duration: 0.5 }}
                            >
                              <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                                <li>
                                  <Typography variant="body2">
                                    For Grade 3 adverse events, a 25% dose reduction is permitted after resolution to Grade ≤1
                                  </Typography>
                                </li>
                                <li>
                                  <Typography variant="body2">
                                    A maximum of 2 dose reductions are allowed per participant
                                  </Typography>
                                </li>
                                <li>
                                  <Typography variant="body2">
                                    Dose reductions below 50% of starting dose are not permitted
                                  </Typography>
                                </li>
                              </Box>
                            </motion.div>
                            
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 2.0, duration: 0.5 }}
                            >
                              <Typography variant="body2" sx={{ mb: 1 }}>
                                Additional guidance from the Toxicity Management Guide (Section 2.1) states:
                              </Typography>
                              
                              <Box component="ul" sx={{ pl: 2 }}>
                                <li>
                                  <Typography variant="body2">
                                    For non-hematologic toxicities of Grade 3 or higher, treatment should be held until resolution to Grade ≤1
                                  </Typography>
                                </li>
                                <li>
                                  <Typography variant="body2">
                                    For hematologic toxicities, specific parameters for dose modifications are provided in Table 4
                                  </Typography>
                                </li>
                              </Box>
                            </motion.div>
                            
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 2.8, duration: 0.5 }}
                            >
                              <Box 
                                sx={{ 
                                  mt: 2, 
                                  pt: 1, 
                                  borderTop: '1px dashed rgba(54, 224, 158, 0.3)',
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center'
                                }}
                              >
                                <Typography variant="caption" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                                  Sources: Protocol 5.3, TMG 2.1
                                </Typography>
                                
                                <Typography variant="caption" sx={{ color: '#36e09e', fontWeight: 600 }}>
                                  Response time: 4.2s
                                </Typography>
                              </Box>
                            </motion.div>
                          </Box>
                        </motion.div>
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              )}
              
              {activeStep === 4 && (
                <motion.div
                  key="final-step"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                    Final Answer with Sources
                  </Typography>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    height: 'calc(100% - 40px)',
                    gap: 2
                  }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      {/* Query card */}
                      <Paper 
                        elevation={2} 
                        sx={{ 
                          p: 1.5, 
                          flex: 1,
                          borderLeft: `3px solid ${theme.palette.primary.main}`
                        }}
                      >
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                          User Query:
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          "Does the protocol allow for dose reductions after adverse events?"
                        </Typography>
                      </Paper>
                      
                      {/* Time saving info */}
                      <Paper 
                        elevation={2} 
                        sx={{ 
                          p: 1.5, 
                          minWidth: '180px',
                          borderLeft: `3px solid #36e09e`,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center'
                        }}
                      >
                        <Typography variant="body2" sx={{ color: '#36e09e', fontWeight: 600, fontSize: '1.2rem', textAlign: 'center' }}>
                          <AccessTimeIcon sx={{ fontSize: '1rem', mr: 0.5 }} />
                          4.2 seconds
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                          vs. 73 min traditional
                        </Typography>
                      </Paper>
                    </Box>
                    
                    {/* Answer with sources */}
                    <Paper
                      elevation={3}
                      sx={{ 
                        p: 2, 
                        flex: 1,
                        overflow: 'hidden',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <Box sx={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        right: 0, 
                        height: '4px',
                        background: `linear-gradient(90deg, #36e09e, ${theme.palette.primary.main})`
                      }} />
                      
                      <Typography variant="body2" sx={{ mb: 1.5 }}>
                        Yes, the protocol does allow for dose reductions after adverse events. According to Section 5.3 of the Protocol:
                      </Typography>
                      
                      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                        <li>
                          <Typography variant="body2" sx={{ mb: 0.5 }}>
                            For Grade 3 adverse events, a 25% dose reduction is permitted after resolution to Grade ≤1
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="body2" sx={{ mb: 0.5 }}>
                            A maximum of 2 dose reductions are allowed per participant
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="body2" sx={{ mb: 0.5 }}>
                            Dose reductions below 50% of starting dose are not permitted
                          </Typography>
                        </li>
                      </Box>
                      
                      <Typography variant="body2" sx={{ mb: 1.5 }}>
                        Additional guidance from the Toxicity Management Guide (Section 2.1) states:
                      </Typography>
                      
                      <Box component="ul" sx={{ pl: 3 }}>
                        <li>
                          <Typography variant="body2" sx={{ mb: 0.5 }}>
                            For non-hematologic toxicities of Grade 3 or higher, treatment should be held until resolution to Grade ≤1
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="body2" sx={{ mb: 0.5 }}>
                            For hematologic toxicities, specific parameters for dose modifications are provided in Table 4
                          </Typography>
                        </li>
                      </Box>
                      
                      {/* Sources section */}
                      <Box sx={{ mt: 'auto', pt: 2 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1, fontSize: '0.8rem' }}>
                          Source Documents:
                        </Typography>
                        
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <Paper
                            elevation={1}
                            sx={{ 
                              p: 1.5, 
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                              bgcolor: 'rgba(0,0,0,0.02)'
                            }}
                          >
                            <DescriptionIcon sx={{ fontSize: '1.2rem', color: theme.palette.primary.main }} />
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.8rem' }}>
                                Protocol XYZ-1001 v3.0
                              </Typography>
                              <Typography variant="caption">
                                Section 5.3 - Dose Modifications, Page 42
                              </Typography>
                            </Box>
                            <Box 
                              component={motion.div}
                              whileHover={{ scale: 1.05 }}
                              sx={{ 
                                ml: 'auto',
                                bgcolor: theme.palette.primary.main,
                                color: 'white',
                                borderRadius: '4px',
                                p: '4px 8px',
                                fontSize: '0.7rem',
                                fontWeight: 600,
                                cursor: 'pointer'
                              }}
                            >
                              View
                            </Box>
                          </Paper>
                          
                          <Paper
                            elevation={1}
                            sx={{ 
                              p: 1.5, 
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                              bgcolor: 'rgba(0,0,0,0.02)'
                            }}
                          >
                            <DescriptionIcon sx={{ fontSize: '1.2rem', color: theme.palette.secondary.main }} />
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.8rem' }}>
                                Toxicity Management Guide v2.1
                              </Typography>
                              <Typography variant="caption">
                                Section 2.1 - Management of AEs, Page 15
                              </Typography>
                            </Box>
                            <Box 
                              component={motion.div}
                              whileHover={{ scale: 1.05 }}
                              sx={{ 
                                ml: 'auto',
                                bgcolor: theme.palette.secondary.main,
                                color: 'white',
                                borderRadius: '4px',
                                p: '4px 8px',
                                fontSize: '0.7rem',
                                fontWeight: 600,
                                cursor: 'pointer'
                              }}
                            >
                              View
                            </Box>
                          </Paper>
                        </Box>
                      </Box>
                    </Paper>
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </Box>
      </Box>
    </Slide>
  );
};

export default SPAProcessSlide;