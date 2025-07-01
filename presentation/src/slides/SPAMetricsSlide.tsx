import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Avatar, Paper, Grid, Tabs, Tab, Divider, Chip } from '@mui/material';
import Slide from '../components/Slide';
import { motion, AnimatePresence } from 'framer-motion';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BarChartIcon from '@mui/icons-material/BarChart';
import CompareIcon from '@mui/icons-material/Compare';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import SpeedIcon from '@mui/icons-material/Speed';
import PeopleIcon from '@mui/icons-material/People';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const SPAMetricsSlide: React.FC<{ theme: any }> = ({ theme }) => {
  // State for tabs and animations
  const [activeTab, setActiveTab] = useState(0); // Start with A/B Testing tab
  const [animateCounter, setAnimateCounter] = useState(false);
  const [counterValue, setCounterValue] = useState(0);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  // Trigger time-saved counter animation when performance tab is viewed
  useEffect(() => {
    if (activeTab === 1 && !animateCounter) {
      setAnimateCounter(true);
      let startTime = Date.now();
      
      const animateTimer = () => {
        const elapsedTime = Date.now() - startTime;
        const duration = 2000; // 2 seconds for animation
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing function for natural acceleration/deceleration
        const easeInOutCubic = (t: number) => 
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
          
        const easedProgress = easeInOutCubic(progress);
        const target = 91; // 91% time saved
        
        setCounterValue(Math.floor(easedProgress * target));
        
        if (progress < 1) {
          requestAnimationFrame(animateTimer);
        }
      };
      
      requestAnimationFrame(animateTimer);
    }
  }, [activeTab, animateCounter]);

  // Toggle card flipping
  const handleCardFlip = (cardId: number) => {
    if (flippedCards.includes(cardId)) {
      setFlippedCards(flippedCards.filter(id => id !== cardId));
    } else {
      setFlippedCards([...flippedCards, cardId]);
    }
  };

  return (
    <Slide key="spa-metrics" title="SPA Performance Metrics">
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 2 }}>
        {/* Tabs for switching between metrics views */}
        <Tabs 
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          sx={{ 
            mb: 1, 
            '& .MuiTabs-indicator': { 
              background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              height: '3px'
            }
          }}
        >
          <Tab 
            label="A/B Testing Setup" 
            icon={<CompareIcon />} 
            iconPosition="start"
            sx={{ fontWeight: activeTab === 0 ? 600 : 400, textTransform: 'none' }} 
          />
          <Tab 
            label="Performance Analysis" 
            icon={<AccessTimeIcon />} 
            iconPosition="start"
            sx={{ fontWeight: activeTab === 1 ? 600 : 400, textTransform: 'none' }} 
          />
        </Tabs>
        
        {/* Main content area with animation between tabs */}
        <Box sx={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <AnimatePresence mode="wait">
            {/* PERFORMANCE ANALYSIS TAB */}
            {activeTab === 1 && (
              <motion.div
                key="time-savings"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.4 }}
                style={{ height: '100%' }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 3 }}>
                  {/* Time saved counter and comparison chart */}
                  <Box sx={{ display: 'flex', gap: 3, height: '45%' }}>
                    {/* Animated counter */}
                    <Card elevation={4} sx={{ 
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: 2
                    }}>
                      <Box sx={{ 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '6px',
                        background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      }} />
                      
                      <Typography variant="h6" sx={{ mb: 1, fontWeight: 500, mt: 1 }}>
                        Time Saved with SPA
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        <motion.div
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.3, duration: 0.7 }}
                        >
                          <Paper 
                            elevation={6} 
                            sx={{
                              width: 160,
                              height: 160,
                              borderRadius: '50%',
                              background: `conic-gradient(${theme.palette.primary.main} ${counterValue * 3.6}deg, #f0f0f0 ${counterValue * 3.6}deg)`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              position: 'relative',
                              '&::before': {
                                content: '""',
                                position: 'absolute',
                                width: 140,
                                height: 140,
                                borderRadius: '50%',
                                background: 'white',
                              }
                            }}
                          >
                            <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <Typography 
                                variant="h3" 
                                sx={{ fontWeight: 700, color: theme.palette.primary.main }}
                              >
                                {counterValue}%
                              </Typography>
                              <Typography variant="caption" sx={{ mt: -0.5 }}>time reduction</Typography>
                            </Box>
                          </Paper>
                        </motion.div>
                      </Box>

                      <Typography variant="subtitle2" sx={{ mt: 1, color: 'text.secondary', fontStyle: 'italic' }}>
                        From 73 minutes to 6 minutes per query
                      </Typography>
                    </Card>
                    
                    {/* Comparison bar chart */}
                    <Card elevation={4} sx={{ 
                      flex: 1.2, 
                      display: 'flex',
                      flexDirection: 'column',
                      p: 2,
                      borderRadius: 2
                    }}>
                      <Typography variant="h6" sx={{ mb: 2 }}>Response Time Comparison</Typography>
                      
                      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 4, pl: 3 }}>
                        {/* Y-axis */}
                        <Box sx={{ height: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', pr: 1 }}>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>80 min</Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>60 min</Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>40 min</Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>20 min</Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>0 min</Typography>
                        </Box>
                        
                        {/* Bars */}
                        <Box sx={{ flex: 1, height: '80%', display: 'flex', alignItems: 'flex-end', gap: 6, position: 'relative' }}>
                          {/* Grid lines */}
                          {[0, 20, 40, 60, 80].map((value, i) => (
                            <Box 
                              key={i}
                              sx={{ 
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                bottom: `${value === 0 ? 0 : value / 80 * 100}%`,
                                height: '1px',
                                bgcolor: 'rgba(0,0,0,0.1)',
                                zIndex: 0
                              }}
                            />
                          ))}
                          
                          {/* Traditional Method Bar */}
                          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', height: '100%' }}>
                            <motion.div
                              initial={{ height: '0%' }}
                              animate={{ height: '91.25%' }}
                              transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
                              style={{ 
                                width: '75%',
                                backgroundColor: theme.palette.error.main,
                                borderRadius: '6px 6px 0 0',
                                position: 'absolute',
                                bottom: 0,
                                zIndex: 1
                              }}
                            />
                            <Typography variant="body2" sx={{ position: 'absolute', bottom: -22, fontWeight: 500 }}>
                              Traditional
                            </Typography>
                            <Typography variant="caption" sx={{ position: 'absolute', bottom: '93%', fontWeight: 600, color: theme.palette.error.main }}>
                              73 min
                            </Typography>
                          </Box>
                          
                          {/* SPA Method Bar */}
                          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', height: '100%' }}>
                            <motion.div
                              initial={{ height: '0%' }}
                              animate={{ height: '7.5%' }}
                              transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
                              style={{ 
                                width: '75%',
                                background: `linear-gradient(to top, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                borderRadius: '6px 6px 0 0',
                                position: 'absolute',
                                bottom: 0,
                                zIndex: 1
                              }}
                            />
                            <Typography variant="body2" sx={{ position: 'absolute', bottom: -22, fontWeight: 500 }}>
                              SPA
                            </Typography>
                            <Typography variant="caption" sx={{ position: 'absolute', bottom: '9%', fontWeight: 600, color: theme.palette.primary.main }}>
                              6 min
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Card>
                  </Box>
                  
                  {/* Organizational Impact */}
                  <Card elevation={4} sx={{ 
                    flex: 1,
                    borderRadius: 2,
                    overflow: 'hidden'
                  }}>
                    <Box sx={{ 
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      bgcolor: theme.palette.primary.main + '15',
                      borderBottom: `1px solid ${theme.palette.primary.main}30`
                    }}>
                      <AutoGraphIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                      <Typography variant="h6">
                        Organizational Impact
                      </Typography>
                    </Box>
                    
                    <CardContent sx={{ p: 3, display: 'flex', gap: 3, height: 'calc(100% - 60px)' }}>
                      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                          Time Savings Impact Calculator
                        </Typography>
                        
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Box 
                              component={motion.div}
                              whileHover={{ scale: 1.02 }}
                              sx={{ 
                                p: 2, 
                                bgcolor: 'background.paper', 
                                borderRadius: 1,
                                border: '1px solid #e0e0e0',
                                height: '100%'
                              }}
                            >
                              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                Monthly Queries:
                              </Typography>
                              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                500
                              </Typography>
                              <Typography variant="body2" sx={{ mt: 1, color: theme.palette.primary.main, fontWeight: 500 }}>
                                Time Saved Monthly:
                              </Typography>
                              <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                                560 hours
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box 
                              component={motion.div}
                              whileHover={{ scale: 1.02 }}
                              sx={{ 
                                p: 2, 
                                bgcolor: 'background.paper', 
                                borderRadius: 1,
                                border: '1px solid #e0e0e0',
                                height: '100%'
                              }}
                            >
                              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                Annual Queries:
                              </Typography>
                              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                6,000
                              </Typography>
                              <Typography variant="body2" sx={{ mt: 1, color: theme.palette.secondary.main, fontWeight: 500 }}>
                                Time Saved Annually:
                              </Typography>
                              <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.secondary.main }}>
                                6,720 hours
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Box 
                              component={motion.div}
                              whileHover={{ scale: 1.02 }}
                              sx={{ 
                                p: 2, 
                                bgcolor: '#36e09e15', 
                                borderRadius: 1,
                                border: '1px solid #36e09e',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2
                              }}
                            >
                              <Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <PeopleIcon sx={{ color: '#36e09e', fontSize: '1.2rem' }} />
                                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                    FTE Equivalent:
                                  </Typography>
                                </Box>
                                <Typography variant="h5" sx={{ fontWeight: 700, color: '#36e09e' }}>
                                  3.5 FTEs
                                </Typography>
                              </Box>
                              <Divider orientation="vertical" flexItem />
                              <Box>
                                <Typography variant="caption" sx={{ color: 'text.secondary', mb: 0.5, display: 'block' }}>
                                  Productivity Impact
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                  Enhanced support for 15+ clinical studies
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                      
                      <Box sx={{ 
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        p: 2,
                        borderRadius: 2,
                        border: '1px solid #e0e0e0',
                        bgcolor: 'background.paper'
                      }}>
                        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
                          Key Time Metrics Summary
                        </Typography>
                        
                        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                          {[
                            {
                              title: "Average Response Time",
                              traditional: "73 min",
                              spa: "6 min",
                              improvement: "91% reduction",
                              icon: <SpeedIcon />
                            },
                            {
                              title: "Fastest Query Response",
                              traditional: "27 min",
                              spa: "2 min",
                              improvement: "92% reduction",
                              icon: <AccessTimeIcon />
                            },
                            {
                              title: "Complex Query Response",
                              traditional: "145 min",
                              spa: "9 min",
                              improvement: "94% reduction",
                              icon: <DescriptionIcon />
                            }
                          ].map((metric, i) => (
                            <Box 
                              key={i}
                              component={motion.div}
                              whileHover={{ scale: 1.02, y: -3 }}
                              sx={{ 
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                p: 1,
                                borderRadius: 1,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  bgcolor: theme.palette.primary.main + '08'
                                }
                              }}
                            >
                              <Avatar sx={{ bgcolor: theme.palette.primary.main + '20', color: theme.palette.primary.main }}>
                                {metric.icon}
                              </Avatar>
                              <Box sx={{ flex: 2 }}>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                  {metric.title}
                                </Typography>
                              </Box>
                              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>Traditional</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.error.main }}>
                                  {metric.traditional}
                                </Typography>
                              </Box>
                              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>SPA</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
                                  {metric.spa}
                                </Typography>
                              </Box>
                              <Box sx={{ flex: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 700, color: '#36e09e' }}>
                                  {metric.improvement}
                                </Typography>
                              </Box>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </motion.div>
            )}

            {/* A/B TESTING SETUP TAB */}
            {activeTab === 0 && (
              <motion.div
                key="ab-testing"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                style={{ height: '100%' }}
              >
                {/* Side-by-side layout */}
                <Box sx={{ display: 'flex', gap: 3, height: '100%' }}>
                  {/* Left side: Group comparison cards */}
                  <Box sx={{ width: '60%', display: 'flex', flexDirection: 'column', height: '100%' }}>
                    {/* Heading */}
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      pb: 1.5,
                      borderBottom: `1px solid ${theme.palette.divider}`
                    }}>
                      <BarChartIcon sx={{ mr: 1.5, color: theme.palette.secondary.main }} />
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                          A/B Testing: AZD0022 Study (KRAS G12D)
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          Controlled experiment to evaluate SPA effectiveness
                        </Typography>
                      </Box>
                    </Box>

                    {/* Group comparison cards stacked vertically */}
                    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2, height: 'calc(100% - 50px)', overflowY: 'auto' }}>
                      {/* Control Group Card */}
                      <Card 
                        elevation={selectedGroup === 'control' ? 4 : 2}
                        onClick={() => setSelectedGroup(selectedGroup === 'control' ? null : 'control')}
                        sx={{ 
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          position: 'relative',
                          overflow: 'hidden',
                          transform: selectedGroup === 'control' ? 'scale(1.01)' : 'scale(1)',
                          border: '1px solid rgba(0,0,0,0.1)',
                          '&:hover': {
                            boxShadow: theme.shadows[4]
                          }
                        }}
                      >
                        {/* Top colored stripe */}
                        <Box sx={{ 
                          height: 6, 
                          width: '100%', 
                          bgcolor: theme.palette.error.main,
                          position: 'absolute',
                          top: 0,
                          left: 0
                        }} />

                        <CardContent sx={{ pt: 2.5 }}>
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            mb: 1.5,
                            pb: 1,
                            borderBottom: '1px solid rgba(0,0,0,0.1)'
                          }}>
                            <Avatar 
                              sx={{ 
                                bgcolor: theme.palette.error.main, 
                                width: 38, 
                                height: 38, 
                                mr: 1.5,
                                transition: 'all 0.3s ease'
                              }}
                            >
                              <Typography variant="h6">A</Typography>
                            </Avatar>
                            <Box>
                              <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.error.main, fontSize: '1.1rem' }}>
                                Control Group
                              </Typography>
                              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                                Traditional protocol reference
                              </Typography>
                            </Box>
                            
                            {/* Expand/collapse indicator */}
                            <Box 
                              sx={{ 
                                ml: 'auto',
                                width: 28,
                                height: 28,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: selectedGroup === 'control' ? theme.palette.error.main + '20' : 'transparent'
                              }}
                            >
                              <motion.div
                                animate={{ rotate: selectedGroup === 'control' ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <DescriptionIcon sx={{ fontSize: '1.1rem', color: theme.palette.error.main }} />
                              </motion.div>
                            </Box>
                          </Box>
                          
                          <Box sx={{ display: 'flex', gap: 2 }}>
                            <Paper elevation={0} sx={{ 
                              p: 1.2,
                              flex: 1,
                              bgcolor: theme.palette.error.main + '08',
                              display: 'flex',
                              alignItems: 'center'
                            }}>
                              <PeopleIcon sx={{ mr: 1, color: theme.palette.error.main, fontSize: '1rem' }} />
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                                  70% completion rate
                                </Typography>
                                <Typography variant="caption" sx={{ display: 'block', fontSize: '0.75rem' }}>
                                  7 of 10 participants completed
                                </Typography>
                              </Box>
                            </Paper>
                            
                            <Paper elevation={0} sx={{ 
                              p: 1.2,
                              flex: 1,
                              bgcolor: theme.palette.error.main + '08',
                              display: 'flex',
                              alignItems: 'center'
                            }}>
                              <DescriptionIcon sx={{ mr: 1, color: theme.palette.error.main, fontSize: '1rem' }} />
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                                  PDF Protocol Only
                                </Typography>
                                <Typography variant="caption" sx={{ display: 'block', fontSize: '0.75rem' }}>
                                  Manual search
                                </Typography>
                              </Box>
                            </Paper>
                          </Box>
                          
                          {/* Participant Functions - Control Group */}
                          <AnimatePresence>
                            {selectedGroup === 'control' && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <Divider sx={{ my: 1.5 }} />
                                <Box>
                                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                                    <PeopleIcon sx={{ mr: 0.8, fontSize: '0.9rem', color: theme.palette.error.main }} />
                                    Control Group Participants by Function
                                  </Typography>
                                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    <Chip 
                                      size="small" 
                                      label="Physician (2)" 
                                      sx={{ bgcolor: theme.palette.error.main + '15', fontWeight: 500 }}
                                    />
                                    <Chip 
                                      size="small" 
                                      label="Clinical Scientist (3)" 
                                      sx={{ bgcolor: theme.palette.error.main + '15', fontWeight: 500 }}
                                    />
                                    <Chip 
                                      size="small" 
                                      label="Clin Ops (2)" 
                                      sx={{ bgcolor: theme.palette.error.main + '15', fontWeight: 500 }}
                                    />
                                    <Chip 
                                      size="small" 
                                      label="CRA (2)" 
                                      sx={{ bgcolor: theme.palette.error.main + '15', fontWeight: 500 }}
                                    />
                                    <Chip 
                                      size="small" 
                                      label="MSL (1)" 
                                      sx={{ bgcolor: theme.palette.error.main + '15', fontWeight: 500 }}
                                    />
                                  </Box>
                                </Box>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </CardContent>
                      </Card>
                      
                      {/* SPA Group Card */}
                      <Card 
                        elevation={selectedGroup === 'spa' ? 4 : 2}
                        onClick={() => setSelectedGroup(selectedGroup === 'spa' ? null : 'spa')}
                        sx={{ 
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          position: 'relative',
                          overflow: 'hidden',
                          transform: selectedGroup === 'spa' ? 'scale(1.01)' : 'scale(1)',
                          border: '1px solid rgba(0,0,0,0.1)',
                          '&:hover': {
                            boxShadow: theme.shadows[4]
                          }
                        }}
                      >
                        {/* Top colored stripe */}
                        <Box sx={{ 
                          height: 6, 
                          width: '100%', 
                          bgcolor: theme.palette.primary.main,
                          position: 'absolute',
                          top: 0,
                          left: 0
                        }} />
                        
                        <CardContent sx={{ pt: 2.5 }}>
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            mb: 1.5,
                            pb: 1,
                            borderBottom: '1px solid rgba(0,0,0,0.1)'
                          }}>
                            <Avatar 
                              sx={{ 
                                bgcolor: theme.palette.primary.main, 
                                width: 38, 
                                height: 38, 
                                mr: 1.5,
                                transition: 'all 0.3s ease'
                              }}
                            >
                              <Typography variant="h6">B</Typography>
                            </Avatar>
                            <Box>
                              <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.primary.main, fontSize: '1.1rem' }}>
                                SPA Group
                              </Typography>
                              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                                Protocol assistance with RAG
                              </Typography>
                            </Box>
                            
                            {/* Expand/collapse indicator */}
                            <Box 
                              sx={{ 
                                ml: 'auto',
                                width: 28,
                                height: 28,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: selectedGroup === 'spa' ? theme.palette.primary.main + '20' : 'transparent'
                              }}
                            >
                              <motion.div
                                animate={{ rotate: selectedGroup === 'spa' ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <DescriptionIcon sx={{ fontSize: '1.1rem', color: theme.palette.primary.main }} />
                              </motion.div>
                            </Box>
                          </Box>
                          
                          <Box sx={{ display: 'flex', gap: 2 }}>
                            <Paper elevation={0} sx={{ 
                              p: 1.2,
                              flex: 1,
                              bgcolor: theme.palette.primary.main + '08',
                              display: 'flex',
                              alignItems: 'center'
                            }}>
                              <PeopleIcon sx={{ mr: 1, color: theme.palette.primary.main, fontSize: '1rem' }} />
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                                  100% completion rate
                                </Typography>
                                <Typography variant="caption" sx={{ display: 'block', fontSize: '0.75rem' }}>
                                  11 of 11 participants completed
                                </Typography>
                              </Box>
                            </Paper>
                            
                            <Paper elevation={0} sx={{ 
                              p: 1.2,
                              flex: 1,
                              bgcolor: theme.palette.primary.main + '08',
                              display: 'flex',
                              alignItems: 'center'
                            }}>
                              <DescriptionIcon sx={{ mr: 1, color: theme.palette.primary.main, fontSize: '1rem' }} />
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                                  SPA Interface
                                </Typography>
                                <Typography variant="caption" sx={{ display: 'block', fontSize: '0.75rem' }}>
                                  RAG assistance
                                </Typography>
                              </Box>
                            </Paper>
                          </Box>
                          
                          {/* Participant Functions - SPA Group */}
                          <AnimatePresence>
                            {selectedGroup === 'spa' && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <Divider sx={{ my: 1.5 }} />
                                <Box>
                                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                                    <PeopleIcon sx={{ mr: 0.8, fontSize: '0.9rem', color: theme.palette.primary.main }} />
                                    SPA Group Participants by Function
                                  </Typography>
                                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    <Chip 
                                      size="small" 
                                      label="Physician (3)" 
                                      sx={{ bgcolor: theme.palette.primary.main + '15', fontWeight: 500 }}
                                    />
                                    <Chip 
                                      size="small" 
                                      label="Clinical Scientist (3)" 
                                      sx={{ bgcolor: theme.palette.primary.main + '15', fontWeight: 500 }}
                                    />
                                    <Chip 
                                      size="small" 
                                      label="Clin Ops (2)" 
                                      sx={{ bgcolor: theme.palette.primary.main + '15', fontWeight: 500 }}
                                    />
                                    <Chip 
                                      size="small" 
                                      label="CRA (2)" 
                                      sx={{ bgcolor: theme.palette.primary.main + '15', fontWeight: 500 }}
                                    />
                                    <Chip 
                                      size="small" 
                                      label="MSL (1)" 
                                      sx={{ bgcolor: theme.palette.primary.main + '15', fontWeight: 500 }}
                                    />
                                  </Box>
                                </Box>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </CardContent>
                      </Card>

                      {/* Study Design Details */}
                      <Card sx={{ 
                        borderRadius: 2, 
                        border: '1px solid rgba(0,0,0,0.08)',
                        bgcolor: 'rgba(0,0,0,0.02)',
                      }}>
                        <CardContent sx={{ p: 2 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
                            Study Design Details
                          </Typography>
                          
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                              }}>
                                <Box sx={{ 
                                  display: 'flex', 
                                  alignItems: 'center',
                                  bgcolor: 'background.paper',
                                  p: 1,
                                  borderRadius: 1
                                }}>
                                  <CheckCircleIcon sx={{ mr: 1, fontSize: '0.9rem', color: theme.palette.success.main }} />
                                  <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                                    <strong>10 questions</strong> from real investigator queries
                                  </Typography>
                                </Box>
                                
                                <Box sx={{ 
                                  display: 'flex', 
                                  alignItems: 'center',
                                  bgcolor: 'background.paper',
                                  p: 1,
                                  borderRadius: 1
                                }}>
                                  <CheckCircleIcon sx={{ mr: 1, fontSize: '0.9rem', color: theme.palette.success.main }} />
                                  <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                                    <strong>5-day</strong> experiment duration (Mon-Fri)
                                  </Typography>
                                </Box>
                              </Box>
                            </Grid>
                            
                            <Grid item xs={6}>
                              <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                                height: '100%',
                              }}>
                                <Box sx={{ 
                                  display: 'flex', 
                                  alignItems: 'center',
                                  bgcolor: 'background.paper',
                                  p: 1,
                                  borderRadius: 1
                                }}>
                                  <HelpOutlineIcon sx={{ mr: 1, fontSize: '0.9rem', color: theme.palette.secondary.main }} />
                                  <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                                    <strong>Balanced roles</strong> across both groups
                                  </Typography>
                                </Box>
                                
                                <Box sx={{ 
                                  display: 'flex', 
                                  alignItems: 'center',
                                  bgcolor: 'background.paper',
                                  p: 1,
                                  borderRadius: 1
                                }}>
                                  <CheckCircleIcon sx={{ mr: 1, fontSize: '0.9rem', color: theme.palette.secondary.main }} />
                                  <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                                    <strong>Blinded evaluation</strong> by senior expert
                                  </Typography>
                                </Box>
                              </Box>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Box>
                  </Box>

                  {/* Right side: Evaluation Metrics */}
                  <Box sx={{ width: '40%', display: 'flex', flexDirection: 'column', height: '100%' }}>
                    {/* Heading */}
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      pb: 1.5,
                      mt: 0,
                      borderBottom: `1px solid ${theme.palette.divider}`
                    }}>
                      <CompareIcon sx={{ mr: 1.5, color: theme.palette.secondary.main }} />
                      <Box>
                        <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 600 }}>
                          Evaluation Metrics
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          Comparing performance between groups
                        </Typography>
                      </Box>
                    </Box>
                    
                    {/* Metrics content */}
                    <Box sx={{ 
                      mt: 3,
                      display: 'flex',
                      flexDirection: 'column', 
                      gap: 2,
                      height: 'calc(100% - 50px)',
                      overflowY: 'auto' 
                    }}>
                      {/* Time Metrics */}
                      <Paper elevation={2} sx={{ 
                        p: 1.5,
                        bgcolor: theme.palette.error.main + '08', 
                        borderLeft: `3px solid ${theme.palette.error.main}`
                      }}>
                        <Typography variant="subtitle2" sx={{ 
                          fontWeight: 600, 
                          display: 'flex', 
                          alignItems: 'center', 
                          mb: 1
                        }}>
                          <AccessTimeIcon sx={{ mr: 1, color: theme.palette.error.main, fontSize: '1.1rem' }} />
                          Time Measurement
                        </Typography>
                        
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.5, fontSize: '0.85rem' }}>
                            <span>•</span>
                            <span><strong>Total time</strong> from question to final answer</span>
                          </Typography>
                          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.5, fontSize: '0.85rem' }}>
                            <span>•</span>
                            <span><strong>Mean time:</strong> average per question</span>
                          </Typography>
                          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.5, fontSize: '0.85rem' }}>
                            <span>•</span>
                            <span><strong>Median time:</strong> middle value</span>
                          </Typography>
                        </Box>
                      </Paper>
                      
                      {/* Accuracy Metrics */}
                      <Paper elevation={2} sx={{ 
                        p: 1.5,
                        bgcolor: theme.palette.success.main + '08', 
                        borderLeft: `3px solid ${theme.palette.success.main}`
                      }}>
                        <Typography variant="subtitle2" sx={{ 
                          fontWeight: 600, 
                          display: 'flex', 
                          alignItems: 'center', 
                          mb: 1
                        }}>
                          <CheckCircleIcon sx={{ mr: 1, color: theme.palette.success.main, fontSize: '1.1rem' }} />
                          Accuracy Scoring
                        </Typography>
                        
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                            <strong>Blinded expert judgment</strong> using scale:
                          </Typography>
                          <Box sx={{ pl: 1.5, mt: 0.5 }}>
                            <Typography variant="body2" sx={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', mb: 0.5 }}>
                              <Box sx={{ 
                                width: 10, 
                                height: 10, 
                                borderRadius: '50%', 
                                bgcolor: theme.palette.error.main,
                                mr: 1
                              }}/>
                              <strong style={{ color: theme.palette.error.main }}>Score 1:</strong>&nbsp;Not correct
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', mb: 0.5 }}>
                              <Box sx={{ 
                                width: 10, 
                                height: 10, 
                                borderRadius: '50%', 
                                bgcolor: theme.palette.warning.main,
                                mr: 1
                              }}/>
                              <strong style={{ color: theme.palette.warning.main }}>Score 2:</strong>&nbsp;Correct but incomplete
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center' }}>
                              <Box sx={{ 
                                width: 10, 
                                height: 10, 
                                borderRadius: '50%', 
                                bgcolor: theme.palette.success.main,
                                mr: 1
                              }}/>
                              <strong style={{ color: theme.palette.success.main }}>Score 3:</strong>&nbsp;Fully correct
                            </Typography>
                          </Box>
                        </Box>
                      </Paper>
                      
                      {/* Key Results */}
                      <Paper elevation={2} sx={{ 
                        p: 1.5,
                        bgcolor: theme.palette.secondary.main + '08', 
                        borderLeft: `3px solid ${theme.palette.secondary.main}`,
                        mt: 'auto'
                      }}>
                        <Typography variant="subtitle2" sx={{ 
                          fontWeight: 600, 
                          display: 'flex', 
                          alignItems: 'center', 
                          mb: 1
                        }}>
                          <BarChartIcon sx={{ mr: 1, color: theme.palette.secondary.main, fontSize: '1.1rem' }} />
                          Key Findings
                        </Typography>
                        
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body2" sx={{ fontSize: '0.85rem', fontWeight: 500 }}>
                              Time Reduction:
                            </Typography>
                            <Typography variant="body2" sx={{ color: theme.palette.success.main, fontWeight: 600 }}>
                              91% (73m → 6m)
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body2" sx={{ fontSize: '0.85rem', fontWeight: 500 }}>
                              Task Completion:
                            </Typography>
                            <Typography variant="body2" sx={{ color: theme.palette.success.main, fontWeight: 600 }}>
                              100% vs 70%
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body2" sx={{ fontSize: '0.85rem', fontWeight: 500 }}>
                              Accuracy (Score 3):
                            </Typography>
                            <Typography variant="body2" sx={{ color: theme.palette.success.main, fontWeight: 600 }}>
                              69% vs 52%
                            </Typography>
                          </Box>
                        </Box>
                      </Paper>
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </Box>
    </Slide>
  );
};

export default SPAMetricsSlide;