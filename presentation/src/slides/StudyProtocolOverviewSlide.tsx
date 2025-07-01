import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Avatar, Divider, Grid, Paper, Tooltip, IconButton } from '@mui/material';
import Slide from '../components/Slide';
import { motion, AnimatePresence } from 'framer-motion';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DescriptionIcon from '@mui/icons-material/Description';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PsychologyIcon from '@mui/icons-material/Psychology';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import InfoIcon from '@mui/icons-material/Info';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

const StudyProtocolOverviewSlide: React.FC<{ theme: any }> = ({ theme }) => {
  // Interactive state for challenge cards
  const [hoveredChallenge, setHoveredChallenge] = useState<number | null>(null);
  const [hoveredSolution, setHoveredSolution] = useState<number | null>(null);
  // State for outcome focus
  const [focusedOutcome, setFocusedOutcome] = useState<number | null>(null);
  // Animation controls for statistics
  const [statsVisible, setStatsVisible] = useState(true);
  return (
    <Slide key="spa-overview" title="Study Protocol Assistant (SPA): Overview">
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 2.5 }}>
        {/* Top row: Challenge and Solution */}
        <Box sx={{ display: 'flex', gap: 5, height: '100%' }}>
          {/* Challenge Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ flex: 1 }}
          >
            <Box className="main-card float-card">
              <Box className="title-card" sx={{ backgroundColor: theme.palette.error.main }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ 
                    bgcolor: theme.palette.error.light, 
                    mr: 2,
                    width: 40,
                    height: 40,
                    boxShadow: '0 4px 14px rgba(211, 47, 47, 0.2)'
                  }}>
                    <HelpOutlineIcon />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'white' }}>
                    The Challenge
                  </Typography>
                </Box>
              </Box>
              
              <Box className="content-card">
                <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
                  Navigating clinical study documentation is:
                </Typography>
                
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1.5 }}>
                  {[
                    {
                      id: 1,
                      title: "Time-consuming",
                      description: "Medical queries can take hours to resolve",
                      detail: "Protocol experts spend an average of 73 minutes per query response"
                    },
                    {
                      id: 2,
                      title: "Complex",
                      description: "Requires expert knowledge to navigate",
                      detail: "Navigating 1,100+ pages across 18+ document types"
                    },
                    {
                      id: 3,
                      title: "Cognitively burdensome",
                      description: "Mental fatigue reduces accuracy",
                      detail: "30% of control group users couldn't complete all assigned queries"
                    },
                    {
                      id: 4,
                      title: "Inconsistent",
                      description: "Variable response quality and time",
                      detail: "Only 52% of traditional responses were fully correct"
                    }
                  ].map((challenge) => (
                    <Box key={challenge.id}>
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        onHoverStart={() => setHoveredChallenge(challenge.id)}
                        onHoverEnd={() => setHoveredChallenge(null)}
                      >
                        <Paper 
                          elevation={hoveredChallenge === challenge.id ? 4 : 2} 
                          sx={{ 
                            p: 1.2, 
                            bgcolor: hoveredChallenge === challenge.id 
                              ? 'rgba(211, 47, 47, 0.1)' 
                              : 'rgba(211, 47, 47, 0.05)',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            height: '100%',
                            position: 'relative',
                            overflow: 'hidden'
                          }}
                        >
                          <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.8rem' }}>
                            {challenge.title}
                          </Typography>
                          
                          <AnimatePresence mode="wait">
                            {hoveredChallenge === challenge.id ? (
                              <motion.div
                                key="detail"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Typography variant="caption" sx={{ 
                                  fontSize: '0.7rem',
                                  fontWeight: 500,
                                  color: theme.palette.error.main
                                }}>
                                  {challenge.detail}
                                </Typography>
                              </motion.div>
                            ) : (
                              <motion.div
                                key="description"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                                  {challenge.description}
                                </Typography>
                              </motion.div>
                            )}
                          </AnimatePresence>
                          
                          <Box 
                            sx={{ 
                              position: 'absolute', 
                              bottom: 0, 
                              left: 0, 
                              width: '100%', 
                              height: '2px',
                              background: theme.palette.error.main,
                              opacity: hoveredChallenge === challenge.id ? 1 : 0,
                              transition: 'all 0.3s ease'
                            }} 
                          />
                        </Paper>
                      </motion.div>
                    </Box>
                  ))}
                </Box>
                
                <Box sx={{ mt: 2, p: 1.5, borderRadius: 1, bgcolor: 'rgba(211, 47, 47, 0.1)' }}>
                  <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                    "30% of users in the control group couldn't complete all requested queries within the allotted time."
                  </Typography>
                </Box>
              </Box>
            </Box>
          </motion.div>
          
          {/* Solution Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{ flex: 1 }}
          >
            <Box className="main-card float-card">
              <Box className="title-card" sx={{ backgroundColor: theme.palette.success.main }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ 
                    bgcolor: theme.palette.success.light, 
                    mr: 2,
                    width: 40,
                    height: 40,
                    boxShadow: '0 4px 14px rgba(56, 142, 60, 0.2)'
                  }}>
                    <PsychologyIcon />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'white' }}>
                    SPA Solution
                  </Typography>
                </Box>
              </Box>
              
              <Box className="content-card">
                <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
                  Digital AI platform for clinical studies:
                </Typography>
                
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1.5 }}>
                  {[
                    {
                      id: 1,
                      title: "Fast retrieval",
                      description: "<5 minutes to answer complex queries",
                      detail: "91% reduction in response time (73→6 min)",
                      icon: <AccessTimeIcon fontSize="small" />
                    },
                    {
                      id: 2,
                      title: "Comprehensive access",
                      description: "Navigates 18+ document types",
                      detail: "Processes 1,100+ pages of clinical documentation",
                      icon: <DescriptionIcon fontSize="small" />
                    },
                    {
                      id: 3,
                      title: "Evidence-based",
                      description: "Citations to specific paragraphs",
                      detail: "69% of responses rated as fully correct",
                      icon: <InfoIcon fontSize="small" />
                    },
                    {
                      id: 4,
                      title: "Cross-department",
                      description: "Serves all AstraZeneca TAs",
                      detail: "Used by physicians, clinical scientists, CRAs & MSLs",
                      icon: <PsychologyIcon fontSize="small" />
                    }
                  ].map((solution) => (
                    <Box key={solution.id}>
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        onHoverStart={() => setHoveredSolution(solution.id)}
                        onHoverEnd={() => setHoveredSolution(null)}
                      >
                        <Paper 
                          elevation={hoveredSolution === solution.id ? 4 : 2} 
                          sx={{ 
                            p: 1.2, 
                            bgcolor: hoveredSolution === solution.id 
                              ? 'rgba(56, 142, 60, 0.1)' 
                              : 'rgba(56, 142, 60, 0.05)',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            height: '100%',
                            position: 'relative',
                            overflow: 'hidden'
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 0.5 }}>
                            <Box sx={{ 
                              color: theme.palette.success.main,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              {solution.icon}
                            </Box>
                            <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.8rem' }}>
                              {solution.title}
                            </Typography>
                          </Box>
                          
                          <AnimatePresence mode="wait">
                            {hoveredSolution === solution.id ? (
                              <motion.div
                                key="detail"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Typography variant="caption" sx={{ 
                                  fontSize: '0.7rem',
                                  fontWeight: 500,
                                  color: theme.palette.success.main
                                }}>
                                  {solution.detail}
                                </Typography>
                              </motion.div>
                            ) : (
                              <motion.div
                                key="description"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                                  {solution.description}
                                </Typography>
                              </motion.div>
                            )}
                          </AnimatePresence>
                          
                          <Box 
                            sx={{ 
                              position: 'absolute', 
                              bottom: 0, 
                              left: 0, 
                              width: '100%', 
                              height: '2px',
                              background: theme.palette.success.main,
                              opacity: hoveredSolution === solution.id ? 1 : 0,
                              transition: 'all 0.3s ease'
                            }} 
                          />
                        </Paper>
                      </motion.div>
                    </Box>
                  ))}
                </Box>
                
                <Box sx={{ mt: 2, p: 1.5, borderRadius: 1, bgcolor: 'rgba(56, 142, 60, 0.1)' }}>
                  <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                    "SPA handles over 1,100 pages of documentation across 18+ document types per study."
                  </Typography>
                </Box>
              </Box>
            </Box>
          </motion.div>
        </Box>
        
        {/* Bottom row: Key Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <Card 
            elevation={3} 
            sx={{ 
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
            }}
          >
            <Box sx={{ 
              p: 2, 
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              color: 'white'
            }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>SPA Key Outcomes</Typography>
            </Box>
            
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-around', position: 'relative' }}>
                
                {/* Animated stats */}
                <AnimatePresence mode="wait">
                  {statsVisible && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}
                    >
                      {[
                        {
                          id: 1,
                          value: "91%",
                          title: "Mean time reduction",
                          detail: "From 73 minutes to just 6 minutes per query",
                          color: theme.palette.primary.main,
                          delay: 0.3
                        },
                        {
                          id: 2,
                          value: "17%",
                          title: "Accuracy improvement",
                          detail: "Correct answers increased from 52% to 69%",
                          color: theme.palette.secondary.main,
                          delay: 0.5
                        },
                        {
                          id: 3,
                          value: "100%",
                          title: "Completion rate",
                          detail: "All SPA users completed tasks vs. 70% in control group",
                          color: '#36e09e',
                          delay: 0.7
                        }
                      ].map(stat => (
                        <Box key={stat.id} sx={{ position: 'relative', mx: 2 }}>
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ 
                              scale: 1, 
                              opacity: 1,
                              transition: { delay: stat.delay, duration: 0.5 }
                            }}
                          >
                            <Box sx={{ textAlign: 'center', p: 1.5, position: 'relative' }}>
                              <motion.div
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.3 }}
                                style={{ boxShadow: 'none' }}
                              >
                                <Avatar sx={{ 
                                  bgcolor: stat.color + '20',
                                  color: stat.color,
                                  width: 55,
                                  height: 55,
                                  mx: 'auto',
                                  mb: 0.5,
                                  transition: 'all 0.3s ease',
                                  border: focusedOutcome === stat.id ? `2px solid ${stat.color}` : 'none'
                                }}>
                                  <Typography variant="h5" sx={{ fontWeight: 700 }}>{stat.value}</Typography>
                                </Avatar>
                              </motion.div>
                              
                              <Typography variant="body2" sx={{ 
                                fontWeight: 500,
                                fontSize: '0.75rem',
                                color: focusedOutcome === stat.id ? stat.color : 'text.primary',
                                transition: 'color 0.3s ease'
                              }}>
                                {stat.title}
                              </Typography>
                              
                              <AnimatePresence>
                                {focusedOutcome === stat.id && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    style={{ overflow: 'hidden' }}
                                  >
                                    <Typography variant="caption" sx={{ 
                                      fontSize: '0.7rem',
                                      fontWeight: 500, 
                                      color: stat.color,
                                      display: 'block',
                                      mt: 0.5
                                    }}>
                                      {stat.detail}
                                    </Typography>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </Box>
                          </motion.div>
                          
                          {stat.id < 3 && (
                            <Divider orientation="vertical" flexItem sx={{ 
                              position: 'absolute',
                              height: '70%',
                              right: -16,
                              top: '15%'
                            }} />
                          )}
                        </Box>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Box>
    </Slide>
  );
};

export default StudyProtocolOverviewSlide;