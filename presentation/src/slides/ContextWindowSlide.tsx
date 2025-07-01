import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Card, Slider } from '@mui/material';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import Slide from '../components/Slide';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import MemoryIcon from '@mui/icons-material/Memory';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

// Sample text to represent a document that won't fit in the context window
const longDocumentText = `
CLINICAL STUDY PROTOCOL

Protocol Title: A Phase III, Randomized, Double-Blind, Placebo-Controlled Study to Assess the Efficacy and Safety of Drug XYZ in Patients with Advanced Refractory Solid Tumors

Protocol Number: XYZ-1001
Version: 3.0
Date: January 15, 2025

1. INTRODUCTION
1.1 Background
Cancer remains one of the leading causes of death worldwide, with approximately 19.3 million new cases and 10 million cancer deaths in 2020. Despite significant advances in cancer therapy, patients with advanced solid tumors often develop resistance to available treatments, leading to disease progression and limited survival outcomes.

Immune checkpoint inhibitors (ICIs) have revolutionized the treatment of various cancers by enhancing the ability of the immune system to recognize and eliminate tumor cells. However, only a subset of patients responds to ICI therapy, and many eventually develop acquired resistance.

1.2 Investigational Product
Drug XYZ is a small molecule inhibitor of the XYZ kinase pathway with an IC50 of 3.2 nM. It is formulated as immediate-release tablets for oral administration.

1.3 Clinical Studies
As of the protocol date, Drug XYZ has been evaluated in a Phase 1 dose-escalation and expansion study in 87 patients with advanced solid tumors. The most common treatment-related adverse events were fatigue, nausea, decreased appetite, and reversible transaminase elevations.

4.1 Inclusion Criteria
Participants must meet all the following criteria to be eligible:
1. Age ≥18 years at the time of signing informed consent
2. Confirmed diagnosis of advanced or metastatic solid tumor
3. Disease progression after standard therapy including immunotherapy
4. ECOG performance status of 0 or 1
5. Adequate organ function`;

// Animation speed control
const TYPING_SPEED = 0.1; // Lower number = faster typing speed
const CONTEXT_WINDOW_CAPACITY = 60; // Words that can fit in the context window

const ContextWindowSlide: React.FC<{ theme: any }> = ({ theme }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isAnimating, setIsAnimating] = useState(true);
  const [overflow, setOverflow] = useState(false);
  const [progress, setProgress] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  
  // Container ref for drag constraints
  const containerRef = useRef(null);
  
  // Get the exact indices for the context window
  const getContextIndices = () => {
    if (!displayedText || !animationComplete) {
      return { startIndex: 0, endIndex: 0 };
    }
    
    const allWords = displayedText.split(/\s+/).filter(w => w.trim() !== '');
    
    if (allWords.length <= CONTEXT_WINDOW_CAPACITY) {
      return { startIndex: 0, endIndex: allWords.length };
    }
    
    // Calculate start position based on slider value - slider at 0% means start from beginning
    const maxStartIndex = Math.max(0, allWords.length - CONTEXT_WINDOW_CAPACITY);
    const startWordIndex = Math.floor((sliderValue / 100) * maxStartIndex);
    const endWordIndex = startWordIndex + CONTEXT_WINDOW_CAPACITY;
    
    return {
      startIndex: startWordIndex,
      endIndex: endWordIndex
    };
  };
  
  // Calculate which words are in context window based on slider position
  const getContextWindowContent = () => {
    if (!displayedText || !animationComplete) return "";
    
    const allWords = displayedText.split(/\s+/).filter(w => w.trim() !== '');
    if (allWords.length <= CONTEXT_WINDOW_CAPACITY) return displayedText;
    
    const { startIndex, endIndex } = getContextIndices();
    return allWords.slice(startIndex, endIndex).join(' ');
  };
  
  // Get out of context text for display
  const getOutOfContextText = () => {
    if (!displayedText || !animationComplete || !overflow) return "";
    
    const allWords = displayedText.split(/\s+/).filter(w => w.trim() !== '');
    const { startIndex, endIndex } = getContextIndices();
    
    // Return words that fall outside the current context window
    const beforeContext = startIndex > 0 ? allWords.slice(0, startIndex) : [];
    const afterContext = endIndex < allWords.length ? allWords.slice(endIndex) : [];
    
    return {
      before: beforeContext.join(' '),
      after: afterContext.join(' ')
    };
  };
  
  // Check if a word is within the context window
  const isWordInContext = (wordIndex) => {
    if (!animationComplete) return false;
    
    const { startIndex, endIndex } = getContextIndices();
    return wordIndex >= startIndex && wordIndex < endIndex;
  };
  
  // Handle slider change
  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };
  
  // Animation to simulate typing text and filling the context window
  useEffect(() => {
    if (!isAnimating) return;
    
    // Format the longDocumentText to preserve newlines
    const formattedText = longDocumentText;
    let currentIndex = 0;
    const textLength = formattedText.length;
    
    const interval = setInterval(() => {
      if (currentIndex < textLength) {
        // Add the next character to displayed text
        setDisplayedText(formattedText.substring(0, currentIndex + 1));
        
        // Calculate progress based on characters for animation
        const currentWordCount = formattedText.substring(0, currentIndex + 1).trim().split(/\s+/).length;
        const currentProgress = Math.min(100, (currentWordCount / CONTEXT_WINDOW_CAPACITY) * 100);
        setProgress(currentProgress);
        
        // Check for overflow
        if (currentWordCount > CONTEXT_WINDOW_CAPACITY && !overflow) {
          setOverflow(true);
        }
        
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsAnimating(false);
        setAnimationComplete(true);
      }
    }, TYPING_SPEED * 10); // Character-by-character animation for smoother effect
    
    return () => clearInterval(interval);
  }, [isAnimating]);
  
  // Restart animation on click
  const handleRestart = () => {
    setDisplayedText("");
    setOverflow(false);
    setProgress(0);
    setIsAnimating(true);
    setAnimationComplete(false);
    setSliderValue(0);
  };

  return (
    <Slide key="context-window" title="LLM Context Window Limitation">
      <Box className="main-card" sx={{ height: "100%" }}>
        <Box className="content-card" sx={{ height: 'calc(100% - 10px)', margin: '40px', pb: '0px', p: '10px' }}>
          <Box sx={{ 
            position: 'relative',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 3, md: 1 },
            height: 'calc(100% - 25px)',  // Leave room for caption at bottom
            overflowX: 'hidden',  // Important for the slide-over effect
          }}>
            {/* No slider between boxes */}
            {/* Document Section */}
            <Box sx={{ 
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              height: '100%'
            }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                mb: 2
              }}>
                <TextFieldsIcon sx={{ mr: 1.5, color: theme.palette.text.secondary }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Clinical Protocol Document
                </Typography>
              </Box>
              
              <Card sx={{ 
                flex: 1,
                bgcolor: '#fafafa',
                borderRadius: 2,
                p: 2,
                overflow: 'auto',
                fontSize: '0.8rem',
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
                position: 'relative',
                maxHeight: '100%'
              }}>
                {/* Document content with preserved formatting */}
                <Box sx={{ position: 'relative', height: '100%', overflow: 'auto' }}>
                  <Box
                    component="pre"
                    sx={{ 
                      fontFamily: 'monospace', 
                      whiteSpace: 'pre-wrap',
                      fontSize: '0.75rem',
                      lineHeight: 1.5,
                      m: 0
                    }}
                  >
                    {displayedText ? (
                      <>
                        {/* Process text preserving newlines with better word tracking */}
                        {(() => {
                          // Process the text properly to track word indices
                          let wordCounter = 0;
                          
                          return displayedText.split('\n').map((line, lineIndex) => (
                            <Box component="div" key={`line-${lineIndex}`}>
                              {line.split(/(\s+)/).map((part, partIndex) => {
                                // Skip empty parts
                                if (!part) return null;
                                
                                // If it's just whitespace, preserve it
                                if (part.trim() === '') return part;
                                
                                // For actual words, track the word index
                                const currentWordIndex = wordCounter++;
                                const inContext = isWordInContext(currentWordIndex);
                                  
                                return (
                                  <Box 
                                    component="span" 
                                    key={`${lineIndex}-${partIndex}`}
                                    sx={{ 
                                      backgroundColor: inContext ? 'rgba(54, 224, 158, 0.2)' : 'transparent',
                                      padding: inContext ? '0px 1px' : '0',
                                      borderRadius: '2px',
                                      transition: 'background-color 0.2s ease'
                                    }}
                                  >
                                    {part}
                                  </Box>
                                );
                              })}
                            </Box>
                          ));
                        })()}
                      </>
                    ) : (
                      "Starting document processing..."
                    )}
                  </Box>
                </Box>
              </Card>
            </Box>
            
            {/* Context Window Section */}
            <Box sx={{ 
              width: { xs: '100%', md: '40%' },
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              position: 'relative',
              zIndex: 10
            }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                mb: 2,
                justifyContent: 'space-between'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <MemoryIcon sx={{ mr: 1.5, color: theme.palette.secondary.main }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    LLM Context Window
                  </Typography>
                </Box>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: 0.5,
                  bgcolor: 'rgba(54, 224, 158, 0.1)',
                  borderRadius: 1,
                  py: 0.5,
                  px: 1
                }}>
                  <DragIndicatorIcon sx={{ fontSize: '0.9rem', color: '#36e09e' }} />
                  <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#36e09e' }}>
                    Drag to Scroll
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                {/* Draggable context window */}
                <Card 
                  ref={containerRef} 
                  sx={{ 
                    flex: 1, 
                    bgcolor: '#ffffff',
                    borderRadius: 2,
                    border: overflow ? '3px dashed #ff6b6b' : '2px solid #36e09e',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                >
                  {/* Context Window Header */}
                  <Box sx={{ 
                    p: 1, 
                    bgcolor: overflow ? '#fff0f0' : 'rgba(54, 224, 158, 0.1)',
                    borderBottom: '1px dashed #d0d0d0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      Context Window ({CONTEXT_WINDOW_CAPACITY} words)
                    </Typography>
                    
                    {animationComplete && overflow && (
                      <Typography variant="caption" sx={{ 
                        fontWeight: 'bold',
                        color: '#36e09e', 
                        bgcolor: 'rgba(54, 224, 158, 0.1)',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1
                      }}>
                        Showing {Math.min(displayedText.split(/\s+/).length, CONTEXT_WINDOW_CAPACITY)}/{displayedText.split(/\s+/).length} words
                      </Typography>
                    )}
                  </Box>
                  
                  {/* Main Card Content - Contains both Context and Out-of-Context */}
                  <Box sx={{ 
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    maxHeight: '100%'
                  }}>
                    {/* Context Window Content with Modern Slider */}
                    <Box sx={{ 
                      flex: 1,
                      position: 'relative',
                      p: 1.5,
                      pr: 4, // Add padding for slider
                      bgcolor: 'rgba(54, 224, 158, 0.05)',
                      overflow: 'auto',
                      minHeight: 0, // Important for scrolling to work properly
                      height: '100%' // Take all available space
                    }}>
                      
                      {/* Modern slider on right side */}
                      {animationComplete && overflow && (
                        <Box 
                          sx={{
                            position: 'absolute',
                            right: 0,
                            top: 10,
                            bottom: 10,
                            width: 24,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '8px 0',
                            backgroundColor: 'rgba(255,255,255,0.9)',
                            borderRadius: '20px',
                            boxShadow: '0 0 10px rgba(0,0,0,0.05)',
                            zIndex: 10
                          }}
                        >
                          <Box 
                            sx={{
                              height: '100%',
                              width: 5,
                              borderRadius: 5,
                              bgcolor: 'rgba(0,0,0,0.06)',
                              display: 'flex',
                              flexDirection: 'column',
                              position: 'relative'
                            }}
                          >
                            <Box 
                              sx={{
                                position: 'absolute',
                                left: '-4px',
                                width: '14px',
                                height: '20px',
                                bgcolor: '#36e09e',
                                borderRadius: '10px',
                                top: `${sliderValue}%`, // Fixed upside down scroll
                                transform: 'translateY(-50%)',
                                boxShadow: '0px 2px 6px rgba(0,0,0,0.1)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                '&:hover': {
                                  boxShadow: '0px 3px 8px rgba(0,0,0,0.15)',
                                }
                              }}
                              onMouseDown={(e) => {
                                const container = e.currentTarget.parentElement;
                                const containerHeight = container.clientHeight;
                                const handleMouseMove = (moveEvent) => {
                                  const containerRect = container.getBoundingClientRect();
                                  const y = moveEvent.clientY - containerRect.top;
                                  const percentage = Math.max(0, Math.min(100, (y / containerHeight) * 100));
                                  handleSliderChange(null, percentage); // Fixed upside down scroll
                                };
                                const handleMouseUp = () => {
                                  document.removeEventListener('mousemove', handleMouseMove);
                                  document.removeEventListener('mouseup', handleMouseUp);
                                };
                                document.addEventListener('mousemove', handleMouseMove);
                                document.addEventListener('mouseup', handleMouseUp);
                              }}
                            >
                              <DragIndicatorIcon sx={{ fontSize: '0.7rem' }} />
                            </Box>
                          </Box>
                        </Box>
                      )}
                      {animationComplete ? (
                        <Box sx={{ 
                          borderRadius: 1,
                          bgcolor: '#ffffff',
                          border: '1px solid',
                          borderColor: '#36e09e',
                          p: 1.5,
                          position: 'relative'
                        }}>
                          <Typography variant="body2" sx={{ 
                            fontFamily: 'monospace',
                            whiteSpace: 'pre-wrap',
                            lineHeight: 1.4,
                            fontSize: '0.75rem'
                          }}>
                            {getContextWindowContent()}
                          </Typography>
                        </Box>
                      ) : (
                        <Box sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '100%' 
                        }}>
                          <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                            {isAnimating ? 'Processing document...' : 'Waiting for document...'}
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    
                    {/* Out-of-context text indicator - positioned at bottom */}
                    {animationComplete && overflow && (
                      <Box sx={{ 
                        p: 1.5, 
                        borderTop: '1px dashed #ff6b6b',
                        bgcolor: 'rgba(255, 107, 107, 0.03)',
                        display: 'flex',
                        flexDirection: 'column',
                        maxHeight: '30%',  // Take up to 30% of the container
                        minHeight: '80px'  // But at least this much
                      }}>
                        <Typography variant="subtitle2" sx={{ 
                          mb: 0.5, 
                          color: '#ff6b6b',
                          fontWeight: 'bold',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          fontSize: '0.7rem'
                        }}>
                          <Box component="span" sx={{ 
                            width: 6, 
                            height: 6, 
                            borderRadius: '50%', 
                            bgcolor: '#ff6b6b',
                            display: 'inline-block' 
                          }} />
                          Out of Context ({displayedText.split(/\s+/).length - CONTEXT_WINDOW_CAPACITY} words)
                        </Typography>
                        
                        <Box sx={{ 
                          p: 1,
                          bgcolor: '#fff0f0',
                          borderRadius: 1,
                          border: '1px dashed #ff6b6b',
                          flex: 1,
                          overflow: 'auto'
                        }}>
                          <Typography variant="body2" sx={{ 
                            color: '#ff6b6b',
                            fontFamily: 'monospace',
                            fontSize: '0.65rem',
                            opacity: 0.8,
                            textDecoration: 'line-through',
                            textDecorationColor: 'rgba(255,107,107,0.3)'
                          }}>
                            {getOutOfContextText().before && (
                              <Box component="span" sx={{ display: 'block', mb: 1 }}>
                                <Box component="span" sx={{ display: 'inline-block', bgcolor: 'rgba(255,107,107,0.1)', px: 0.5, borderRadius: 1 }}>Before:</Box> 
                                ...{getOutOfContextText().before}
                              </Box>
                            )}
                            {getOutOfContextText().after && (
                              <Box component="span" sx={{ display: 'block' }}>
                                <Box component="span" sx={{ display: 'inline-block', bgcolor: 'rgba(255,107,107,0.1)', px: 0.5, borderRadius: 1 }}>After:</Box> 
                                {getOutOfContextText().after}...
                              </Box>
                            )}
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Card>
              </Box>
              
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography 
                  onClick={handleRestart}
                  variant="body2" 
                  sx={{ 
                    color: theme.palette.primary.main, 
                    cursor: 'pointer', 
                    '&:hover': { textDecoration: 'underline' } 
                  }}
                >
                  Restart Animation
                </Typography>
              </Box>
            </Box>
          </Box>
          
          {/* Explanation text */}
          <Box sx={{ mt: 0.5 }}>
            <Typography variant="body1" align="center" sx={{ fontWeight: 500, fontSize: '0.85rem' }}>
              <span style={{ color: '#ff6b6b' }}>The Context Window Problem:</span> Clinical documents are too large to fit in an LLM's context window
            </Typography>
          </Box>
        </Box>
      </Box>
    </Slide>
  );
};

export default ContextWindowSlide;