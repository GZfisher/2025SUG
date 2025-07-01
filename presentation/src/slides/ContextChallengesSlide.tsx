import React, { useState } from 'react';
import { Box, Typography, Card, Link, Divider, Chip, Grid, IconButton, Button, Tooltip, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import Slide from '../components/Slide';
import MemoryIcon from '@mui/icons-material/Memory';
import SearchIcon from '@mui/icons-material/Search';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SpeedIcon from '@mui/icons-material/Speed';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import FlipIcon from '@mui/icons-material/Cached';
import WarningIcon from '@mui/icons-material/Warning';
import ArticleIcon from '@mui/icons-material/Article';
import ComputerIcon from '@mui/icons-material/Computer';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import CodeIcon from '@mui/icons-material/Code';
import InfoIcon from '@mui/icons-material/Info';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import LoopIcon from '@mui/icons-material/Loop';
import SettingsIcon from '@mui/icons-material/Settings';

// Define the needle in haystack heatmap data
// Values represent approximate retrieval success rates at different positions and context lengths
const retrievalHeatmapData = [
  // [1K, 5K, 20K, 50K, 100K] context lengths
  [100, 100, 90, 75, 60], // 0% (top of document)
  [100, 90, 80, 60, 50],  // 25%
  [100, 85, 70, 50, 40],  // 50% (middle of document)
  [100, 90, 80, 65, 55],  // 75%
  [100, 100, 90, 85, 75]  // 100% (end of document)
];

// Model comparison data for single/multi needle tasks
const modelComparisonData = [
  {
    model: "Claude 3",
    singleNeedle: 92,
    multiNeedle: 78,
    multiReason: 65,
    color: "#6b8eff"
  },
  {
    model: "GPT-4",
    singleNeedle: 94,
    multiNeedle: 75,
    multiReason: 62,
    color: "#36e09e"
  },
  {
    model: "Llama 3",
    singleNeedle: 88,
    multiNeedle: 72,
    multiReason: 58,
    color: "#ff9b6b"
  },
  {
    model: "Mistral",
    singleNeedle: 90,
    multiNeedle: 70,
    multiReason: 56,
    color: "#ff6b6b"
  }
];

// Research papers related to needle in haystack problem
const researchPapers = [
  {
    title: "Needle In A Haystack: Testing LLMs on Knowledge Retrieval",
    author: "Greg Kamradt",
    year: 2023,
    url: "https://github.com/gkamradt/LLMTest_NeedleInAHaystack",
    description: "Original study testing GPT-4 and Claude on finding specific facts in long contexts",
    highlightColor: "#ff6b6b"
  },
  {
    title: "Lost in the Middle: How LLMs Forget Information in Context",
    author: "Liu et al.",
    year: 2023,
    url: "https://arxiv.org/abs/2307.03172",
    description: "Found that retrieval accuracy drops significantly for information in middle positions",
    highlightColor: "#ffb76b"
  },
  {
    title: "In Search of Needles in a 11M Haystack",
    author: "Kuratov et al.",
    year: 2024,
    url: "https://arxiv.org/abs/2402.18490",
    description: "Testing extremely long contexts, showing standard models fail beyond 10K elements",
    highlightColor: "#36e09e"
  }
];

// Additional research papers with flippable card presentation
const keyResearchPapers = [
  {
    title: "Lost in the Middle: How Language Models Use Long Contexts",
    authors: "Liu, Levy, et al.",
    journal: "arXiv:2307.03172",
    year: 2023,
    findings: "Found that information in the middle sections of long documents is harder to retrieve than information at the beginning or end.",
    link: "https://arxiv.org/abs/2307.03172"
  },
  {
    title: "Focused Transformer: Contrastive Training for Context Scaling",
    authors: "Chen, Chen, et al.",
    journal: "arXiv:2307.03170",
    year: 2023,
    findings: "Demonstrated that standard attention mechanisms degrade with long contexts and proposed contrastive training for improvement.",
    link: "https://arxiv.org/abs/2307.03170"
  },
  {
    title: "Landmark Attention: Random-Access Infinite Context Length for Transformers",
    authors: "Mohtashami & Jaggi",
    journal: "arXiv:2305.16300",
    year: 2023,
    findings: "Introduced a new attention mechanism that can efficiently handle much longer contexts with improved information retrieval.",
    link: "https://arxiv.org/abs/2305.16300"
  }
];

// Multiple needle in haystack examples
const needleExamples = [
  {
    haystack: `PROTOCOL: XYZ-1001. VERSION 3.0. DATE: JAN 15, 2025.

DOSING AND ADMINISTRATION:
XYZ-101 dosing is weight-based with standard adult dosing of 100mg once daily. Pediatric dosing is adjusted according to Table 2 in Appendix B. Drug should be administered with food to increase bioavailability by approximately 28%. Missed doses should not be made up; instead, patients should resume dosing on the following day.

DOSAGE MODIFICATIONS FOR ADVERSE EVENTS:
Treatment interruption or dose adjustment may be required for grade 3 or higher adverse reactions. See Table 4 for specific guidance. Treatment should be permanently discontinued in patients who are unable to tolerate the lowest recommended dose.

GERIATRIC USE:
Clinical studies included 127 patients aged 60-75 years and 86 patients over 75 years. No overall differences in safety were observed between younger and older patients. Pharmacokinetic studies indicate age-related decreases in renal clearance. For patients ≥65 years of age, initial dose should be reduced by 25% due to increased risk of adverse events.

DRUG INTERACTIONS:
Concomitant use with CYP3A4 inhibitors may increase plasma concentrations of XYZ-101. Consider dose reduction and monitor closely for toxicity. Strong inducers of P-glycoprotein may decrease drug exposure and should be avoided. Refer to Section 7 for complete list of potential drug interactions.`,
    needle: "For patients ≥65 years of age, initial dose should be reduced by 25% due to increased risk of adverse events.",
    question: "Elderly dosing adjustments?",
    location: "Middle"
  },
  {
    haystack: `PROTOCOL: ABC-2023. VERSION 1.2. DATE: FEB 5, 2025.

8.3 LABORATORY ASSESSMENTS:
The following laboratory tests must be performed within 7 days prior to randomization: complete blood count, comprehensive metabolic panel, lipid profile, urinalysis, and pregnancy test for women of childbearing potential. Results must be reviewed by the investigator before study drug administration.

8.4 CARDIAC MONITORING:
Patients must undergo 12-lead ECG at screening and at Weeks 1, 4, 8, and 12. Additional ECGs should be performed as clinically indicated. Several medications in this class have demonstrated QT prolongation in prior studies. QTc interval and rhythm should be closely monitored.

8.5 EXCLUSION PARAMETERS:
Patients with hemoglobin <9 g/dL, ANC <1500/μL, or platelet count <100,000/μL will be excluded. Patients with QTcF interval >470 ms on screening ECG or history of QT prolongation should be excluded from study participation. Patients with NYHA Class III-IV heart failure are not eligible.

8.6 IMAGING REQUIREMENTS:
CT scans with contrast of chest, abdomen, and pelvis should be performed at screening and every 8 weeks. MRI may be substituted in patients with contrast allergy or renal insufficiency. RECIST 1.1 criteria will be used for response assessment.`,
    needle: "Patients with QTcF interval >470 ms on screening ECG or history of QT prolongation should be excluded from study participation.",
    question: "QT interval exclusion criteria?",
    location: "Middle"
  },
  {
    haystack: `Drug PKX-102 has demonstrated potent anti-tumor activity with a half-life of 36 hours, according to preclinical studies by Sharma et al. (Nature Medicine, 2024).

IMPORTANT: Administration should be temporarily suspended for any Grade 3 or higher hematological toxicity until recovery to Grade 1 or baseline.

DOSE INTERRUPTIONS:
In the event of significant non-hematological toxicity (Grade 2 or higher), treatment should be withheld until resolution to Grade 1 or baseline. Re-escalation to the original dose may be considered after consultation with the medical monitor. Patients experiencing recurrent Grade 3 toxicities should have their dose permanently reduced by one dose level.

TOXICITY MANAGEMENT:
For management of specific toxicities, refer to Section 12 and follow guidelines from Chang et al. (Lancet Oncology, 2023). Grade 4 toxicities or any grade toxicity lasting >28 days despite optimal management will result in permanent discontinuation. Appropriate supportive care measures should be instituted according to institutional standards.

MONITORING REQUIREMENTS:
Complete blood count must be conducted weekly during Cycles 1-2, then every 2 weeks thereafter. Liver function tests should be performed every 2 weeks for the first 3 months. Any Grade 3-4 laboratory abnormalities should be confirmed with repeat testing within 72 hours.`,
    needle: "Administration should be temporarily suspended for any Grade 3 or higher hematological toxicity until recovery to Grade 1 or baseline.",
    question: "When to stop due to toxicity?",
    location: "Beginning"
  },
  {
    haystack: `10. EFFICACY ASSESSMENT

10.1 PRIMARY EFFICACY ENDPOINT:
The primary endpoint is overall survival (OS), defined as the time from randomization until death from any cause. Patients still alive at the data cutoff date will be censored at their last date of known survival.

10.2 SECONDARY ENDPOINTS:
Secondary endpoints include progression-free survival, objective response rate, and duration of response. These will be assessed by blinded independent central review according to RECIST v1.1 criteria.

10.3 EXPLORATORY ENDPOINTS:
Patient-reported outcomes will be assessed using the EORTC QLQ-C30 questionnaire at baseline and every 4 weeks thereafter. Biomarker analyses will be conducted on tumor tissue and plasma samples to identify predictive markers of response.

10.4 STATISTICAL CONSIDERATIONS:
Analysis of the secondary endpoint will use a two-sided significance level of 0.05 with no multiplicity adjustment. The study has 90% power to detect a hazard ratio of 0.70 for the primary endpoint with approximately 290 events.`,
    needle: "Analysis of the secondary endpoint will use a two-sided significance level of 0.05 with no multiplicity adjustment.",
    question: "Statistical approach for secondary endpoints?",
    location: "End"
  },
  {
    haystack: `7. STUDY PROCEDURES

7.1 SCREENING PERIOD:
Screening evaluations must be performed within 21 days prior to randomization. Written informed consent must be obtained before any study-specific procedures are performed. Screening may be extended by up to 7 days with written approval from the sponsor.

7.2 TREATMENT PHASE:
Study drug will be administered daily for 28-day cycles until disease progression, unacceptable toxicity, or withdrawal of consent. Tumor assessments will be performed every 8 weeks (±7 days) regardless of treatment delays.

7.3 FOLLOW-UP PERIOD:
After treatment discontinuation, patients will be followed for safety for 30 days or until resolution/stabilization of all treatment-related toxicities. Survival follow-up will continue every 12 weeks until death or study closure.

7.4 VISIT WINDOW:
Study visit procedures must be performed within ±2 days of the scheduled visit day for weekly visits, and within ±3 days for monthly visits. Assessments outside these windows will be considered protocol deviations.`,
    needle: "Study visit procedures must be performed within ±2 days of the scheduled visit day for weekly visits, and within ±3 days for monthly visits.",
    question: "Visit schedule flexibility?",
    location: "Middle"
  }
];

// Additional challenge cards for bottom section
const additionalChallenges = [
  {
    title: "High Cost & Latency",
    icon: <AttachMoneyIcon />,
    color: "#ff6b6b",
    content: "Larger contexts cost more tokens and processing time scales with context length. A 100K token context could cost 20-30x more and take 5-10x longer to process."
  },
  {
    title: "Limited Availability",
    icon: <WarningIcon />,
    color: "#ff9b6b",
    content: "Most commercial LLM APIs have context limits below 50K tokens. Models with larger windows (100K+) are less widely available and often in limited preview."
  },
  {
    title: "Technical Limitations",
    icon: <SettingsIcon />,
    color: "#ffb76b",
    content: "Traditional attention mechanisms scale quadratically with sequence length (O(n²)), creating hardware limitations and diminishing returns."
  }
];

const ContextChallengesSlide: React.FC<{ theme: any }> = ({ theme }) => {
  // State for interactive elements
  const [activeTab, setActiveTab] = useState('heatmap'); // 'heatmap', 'models', or 'research'
  const [hoveredCell, setHoveredCell] = useState<number[]>([]);
  const [showNeedle, setShowNeedle] = useState(false);
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [flippedPaperIndex, setFlippedPaperIndex] = useState<number | null>(null);
  
  // Change examples periodically - auto-cycle enabled by default
  const [autoCycle, setAutoCycle] = useState(true);
  
  // Handle flipping paper cards
  const handlePaperFlip = (index: number) => {
    if (flippedPaperIndex === index) {
      setFlippedPaperIndex(null);
    } else {
      setFlippedPaperIndex(index);
    }
  };
  
  // Random example function
  const nextExample = () => {
    const randomIndex = Math.floor(Math.random() * needleExamples.length);
    setCurrentExampleIndex(randomIndex);
  };
  
  // Colors for heatmap
  const getHeatmapColor = (value: number) => {
    if (value >= 90) return 'rgba(54, 224, 158, 0.9)';
    if (value >= 80) return 'rgba(54, 224, 158, 0.7)';
    if (value >= 70) return 'rgba(54, 224, 158, 0.5)';
    if (value >= 60) return 'rgba(255, 183, 107, 0.6)';
    if (value >= 50) return 'rgba(255, 183, 107, 0.8)';
    return 'rgba(255, 107, 107, 0.8)';
  };
  
  // Auto-cycle examples every 6 seconds if enabled, but don't auto-show needle
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (autoCycle) {
      timer = setInterval(() => {
        nextExample();
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [autoCycle]);
  
  // Reset needle visibility when changing examples
  React.useEffect(() => {
    setShowNeedle(false);
  }, [currentExampleIndex]);

  return (
    <Slide key="context-challenges" title="Challenge: The Needle in a Haystack Problem">
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        
        {/* Top section: Interactive visualization */}
        <Box sx={{
          flex: 3,
          display: 'flex', 
          flexDirection: 'column',
          mb: 1 // Reduced from mb: 2
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <SearchIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.primary.main, fontSize: '1.1rem' }}>
              Finding Critical Information in Large Documents
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', height: '100%', gap: 2 }}>
            {/* Left side - visualization */}
            <Box sx={{
              width: '60%',
              border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: 2,
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              height: '100%'
            }}>
              {/* Header info */}
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                bgcolor: 'rgba(0,0,0,0.03)',
                p: 1.5,
                borderBottom: '1px solid rgba(0,0,0,0.1)'
              }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Interactive Demo: Find the Needle
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Location: {needleExamples[currentExampleIndex].location} of document
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={nextExample}
                    sx={{ minWidth: 0, p: 0.5, lineHeight: 1 }}
                  >
                    <SwapHorizIcon sx={{ fontSize: '1rem' }} />
                  </Button>
                  
                  <Button
                    size="small"
                    color={autoCycle ? 'primary' : 'inherit'}
                    variant={autoCycle ? 'contained' : 'outlined'}
                    onClick={() => setAutoCycle(!autoCycle)}
                    sx={{ minWidth: 0, p: 0.5, lineHeight: 1 }}
                  >
                    <LoopIcon sx={{ fontSize: '1rem' }} />
                  </Button>
                </Box>
              </Box>
              
              {/* Document visualization with needle */}
              <Box sx={{
                p: 1.5,
                flex: 1,
                overflow: 'auto',
                position: 'relative'
              }}>
                <Box sx={{ 
                  fontFamily: 'monospace',
                  fontSize: '0.65rem',
                  lineHeight: 1.4,
                  whiteSpace: 'pre-wrap'
                }}>
                  {needleExamples[currentExampleIndex].haystack.split(needleExamples[currentExampleIndex].needle).map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        showNeedle ? (
                          <motion.span
                            initial={{ backgroundColor: 'rgba(54, 224, 158, 0.2)' }}
                            animate={{ backgroundColor: ['rgba(54, 224, 158, 0.2)', 'rgba(54, 224, 158, 0.8)', 'rgba(54, 224, 158, 0.2)'] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            style={{ fontWeight: 600 }}
                          >
                            {needleExamples[currentExampleIndex].needle}
                          </motion.span>
                        ) : needleExamples[currentExampleIndex].needle
                      )}
                    </React.Fragment>
                  ))}
                </Box>
              </Box>
              
              {/* Footer with question and buttons */}
              <Box sx={{ 
                borderTop: '1px solid rgba(0,0,0,0.1)', 
                p: 1.5, 
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'space-between',
                bgcolor: 'rgba(0,0,0,0.02)'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <QuestionAnswerIcon sx={{ fontSize: '0.9rem', mr: 0.7, color: 'text.secondary' }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                    "{needleExamples[currentExampleIndex].question}"
                  </Typography>
                </Box>
                <Button
                  variant={showNeedle ? "contained" : "outlined"}
                  color="primary"
                  size="small"
                  onClick={() => setShowNeedle(!showNeedle)}
                  sx={{ textTransform: 'none', minWidth: '100px' }}
                >
                  {showNeedle ? "Hide Answer" : "Reveal Answer"}
                </Button>
              </Box>
            </Box>
            
            {/* Right side - Heatmap & explanation */}
            <Box sx={{
              width: '40%',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Retrieval heatmap */}
              <Box sx={{ 
                flex: 3,
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: 2,
                p: 1.5,
                mb: 2,
                display: 'flex',
                flexDirection: 'column'
              }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  LLM Retrieval Success by Position
                </Typography>
                
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    {[0, 2, 4].map((rowIndex) => (
                      <Box key={rowIndex} sx={{ display: 'flex', height: '32px', mb: 0.5 }}>
                        <Box sx={{ width: '120px', pr: 1 }}>
                          <Typography variant="caption" sx={{ fontWeight: 500 }}>
                            {rowIndex === 0 ? 'Top' : rowIndex === 2 ? 'Middle' : 'End'}
                          </Typography>
                        </Box>
                        {retrievalHeatmapData[rowIndex].map((value, colIndex) => (
                          <Box 
                            key={colIndex}
                            sx={{ 
                              flex: 1, 
                              height: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              bgcolor: getHeatmapColor(value),
                              color: value < 70 ? 'white' : 'black',
                              fontWeight: 600,
                              fontSize: '0.75rem',
                              border: '1px solid rgba(255,255,255,0.15)',
                              cursor: 'pointer',
                              transition: 'transform 0.1s',
                              '&:hover': {
                                transform: 'scale(1.05)',
                                zIndex: 1
                              }
                            }}
                          >
                            {value}%
                          </Box>
                        ))}
                      </Box>
                    ))}
                    
                    {/* X-axis labels */}
                    <Box sx={{ display: 'flex', mt: 0.5, pl: '120px' }}>
                      {['1K', '5K', '20K', '50K', '100K'].map((label, i) => (
                        <Box key={i} sx={{ flex: 1, textAlign: 'center' }}>
                          <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>
                            {label}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
                
                <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1, display: 'block', textAlign: 'center' }}>
                  Context Length (tokens)
                </Typography>
              </Box>
              
              {/* Research papers with flip cards */}
              <Box sx={{ 
                flex: 2,
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: 2,
                p: 1.5,
                display: 'flex',
                flexDirection: 'column'
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Key Research Findings
                  </Typography>
                  <Chip 
                    size="small" 
                    icon={<FlipIcon fontSize="small" />} 
                    label="Click cards for details" 
                    sx={{ 
                      fontSize: '0.65rem', 
                      height: 20, 
                      bgcolor: 'rgba(0,0,0,0.04)', 
                      '& .MuiChip-icon': { fontSize: '0.8rem' } 
                    }} 
                  />
                </Box>
                
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1, overflow: 'auto' }}>
                  {keyResearchPapers.map((paper, index) => (
                    <Box 
                      key={index}
                      sx={{
                        position: 'relative',
                        height: '60px',
                        perspective: '1000px',
                        cursor: 'pointer'
                      }}
                      onClick={() => handlePaperFlip(index)}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          transformStyle: 'preserve-3d',
                          transition: 'transform 0.6s',
                          transform: flippedPaperIndex === index ? 'rotateY(180deg)' : 'rotateY(0deg)'
                        }}
                      >
                        {/* Front of card - Paper title */}
                        <Card
                          sx={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            backfaceVisibility: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            padding: 1.5,
                            borderLeft: '3px solid',
                            borderLeftColor: index === 0 ? '#36e09e' : index === 1 ? '#ffb76b' : '#6b8eff'
                          }}
                        >
                          <InfoIcon sx={{ color: index === 0 ? '#36e09e' : index === 1 ? '#ffb76b' : '#6b8eff', mr: 1, fontSize: '1rem' }} />
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.8rem' }}>
                              {paper.title}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {paper.authors} ({paper.year})
                            </Typography>
                          </Box>
                        </Card>
                        
                        {/* Back of card - Findings */}
                        <Card
                          sx={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            backfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)',
                            padding: 1.5,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            bgcolor: index === 0 ? 'rgba(54, 224, 158, 0.05)' : index === 1 ? 'rgba(255, 183, 107, 0.05)' : 'rgba(107, 142, 255, 0.05)',
                            borderLeft: '3px solid',
                            borderLeftColor: index === 0 ? '#36e09e' : index === 1 ? '#ffb76b' : '#6b8eff'
                          }}
                        >
                          <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                            {paper.findings}
                          </Typography>
                          <Link href={paper.link} target="_blank" sx={{ fontSize: '0.65rem', mt: 0.5 }}>
                            {paper.journal}
                          </Link>
                        </Card>
                      </Box>
                    </Box>
                  ))}
                </Box>
                
                <Divider sx={{ my: 1 }} />
                
                <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                  Newer models show rapid improvement - Llama 4 and GPT 4.1 (1M tokens) and Gemini (10M by 2026)
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        
        {/* Bottom section: Additional challenge cards */}
        <Box sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          mt: -4 // Move up by 24px (3 units in MUI spacing)
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <WarningIcon sx={{ color: '#ff6b6b', mr: 1 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '1rem' }}>
              Additional Challenges with Large Context Windows
            </Typography>
          </Box>
          
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 2,
            flex: 1
          }}>
            {additionalChallenges.map((challenge, index) => (
              <Card 
                key={index} 
                sx={{ 
                  p: 1.5,
                  height: '100%',
                  display: 'flex', 
                  flexDirection: 'column',
                  border: `1px solid ${challenge.color}20`,
                  boxShadow: 2,
                  borderRadius: 2
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box 
                    sx={{ 
                      mr: 1, 
                      bgcolor: challenge.color + '20', 
                      borderRadius: '50%',
                      p: 0.8,
                      display: 'flex' 
                    }}
                  >
                    {React.cloneElement(challenge.icon, { 
                      sx: { color: challenge.color, fontSize: '1.2rem' } 
                    })}
                  </Box>
                  <Typography variant="subtitle1" fontWeight={600} fontSize="0.9rem">
                    {challenge.title}
                  </Typography>
                </Box>
                
                <Typography variant="body2" sx={{ fontSize: '0.8rem', lineHeight: 1.4 }}>
                  {challenge.content}
                </Typography>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </Slide>
  );
};

export default ContextChallengesSlide;