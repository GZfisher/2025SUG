import React, { useState } from 'react';
import { Box, Typography, Card, Paper, Divider, Chip, Link, Grid, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import Slide from '../components/Slide';
import MemoryIcon from '@mui/icons-material/Memory';
import SearchIcon from '@mui/icons-material/Search';
import SpeedIcon from '@mui/icons-material/Speed';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import FlipIcon from '@mui/icons-material/Cached';
import ArticleIcon from '@mui/icons-material/Article';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import SchemaIcon from '@mui/icons-material/Schema';

// Sample clinical protocol document from the Context Window slide
const protocolText = `
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

// Feature cards for larger context windows
const benefitCards = [
  {
    id: 'complete-document',
    title: 'Complete Document Processing',
    description: 'Process entire clinical protocols in one pass',
    icon: <MemoryIcon sx={{ color: '#36e09e', fontSize: '2.5rem' }} />,
    animation: { scale: [1, 1.1, 1] },
    animationConfig: { duration: 2, repeat: Infinity, repeatDelay: 3 },
    details: 'Modern LLMs with extended context can handle entire protocol documents at once, preserving relationships between sections that would otherwise be lost.',
    resource: {
      title: 'Research: Extending Context Windows in LLMs',
      link: 'https://arxiv.org/abs/2307.03172'
    }
  },
  {
    id: 'model-performance',
    title: 'Enhanced Clinical Reasoning',
    description: 'Better answers by seeing the full document',
    icon: <PrecisionManufacturingIcon sx={{ color: '#36e09e', fontSize: '2.5rem' }} />,
    animation: { rotateY: [0, 360] },
    animationConfig: { duration: 2.5, repeat: Infinity, repeatDelay: 4 },
    details: 'Studies show that models with larger context windows give more accurate answers to clinical questions by connecting information across distant sections.',
    resource: {
      title: 'Paper: Long-Context Performance in Clinical Settings',
      link: 'https://arxiv.org/abs/2309.03452'
    }
  },
  {
    id: 'relations',
    title: 'Cross-referencing Ability',
    description: 'Connect distant parts of documents together',
    icon: <SchemaIcon sx={{ color: '#36e09e', fontSize: '2.5rem' }} />,
    animation: { 
      scale: [1, 1.2, 1],
      rotateZ: [0, -10, 10, 0]
    },
    animationConfig: { duration: 3, repeat: Infinity, repeatDelay: 2 },
    details: 'Larger contexts allow LLMs to discover relationships between protocol sections, such as connecting exclusion criteria with adverse events data.',
    resource: {
      title: 'Research: Cross-Document Relationships in LLMs',
      link: 'https://arxiv.org/abs/2305.13712'
    }
  },
  {
    id: 'speed',
    title: 'Streamlined Document Processing',
    description: 'Simpler, more robust pipelines',
    icon: <SpeedIcon sx={{ color: '#36e09e', fontSize: '2.5rem' }} />,
    animation: { 
      y: [0, -10, 0],
      scale: [1, 1.05, 1]
    },
    animationConfig: { duration: 2, repeat: Infinity, repeatDelay: 3 },
    details: 'A pharmaceutical company reduced their clinical data processing pipeline from 26 steps to just 3 by using larger context windows. This eliminated chunk optimization, reduced data engineering complexity by 85%, and improved answer quality.',
    resource: {
      title: 'Case study: Pharma RAG simplification',
      link: '#'
    }
  }
];

const ContextSolutionsSlide: React.FC<{ theme: any }> = ({ theme }) => {
  // State for synchronized scroll sliders
  const [scrollValue, setScrollValue] = useState(0);
  // State for text selection sliders
  const [standardTextAmount, setStandardTextAmount] = useState(30); // Words shown in standard context
  const [largerTextAmount, setLargerTextAmount] = useState(200); // Words shown in larger context (min 100)
  // State for text selection position (where the window starts)
  const [standardStartPosition, setStandardStartPosition] = useState(0); // Word position in standard context
  const [largerStartPosition, setLargerStartPosition] = useState(0); // Word position in larger context
  // State to track which cards are flipped
  const [flippedCards, setFlippedCards] = useState<{[key: string]: boolean}>({});
  
  // Update scroll slider position for both windows
  const handleScrollChange = (event: any, newValue: number) => {
    setScrollValue(newValue);
  };
  
  // Update standard context text selection slider
  const handleStandardTextChange = (event: any, newValue: number) => {
    setStandardTextAmount(Math.max(10, Math.min(50, newValue)));
  };
  
  // Update larger context text selection slider
  const handleLargerTextChange = (event: any, newValue: number) => {
    setLargerTextAmount(Math.max(100, Math.min(300, newValue)));
  };
  
  // Move the standard context window position
  const handleStandardPositionChange = (event: any, newValue: number) => {
    // Calculate max start position based on text length and window size
    const words = protocolText.split(' ').length;
    const maxStart = Math.max(0, words - standardTextAmount);
    setStandardStartPosition(Math.min(maxStart, Math.max(0, newValue)));
  };
  
  // Move the larger context window position
  const handleLargerPositionChange = (event: any, newValue: number) => {
    // Calculate max start position based on text length and window size
    const words = protocolText.split(' ').length;
    const maxStart = Math.max(0, words - largerTextAmount);
    setLargerStartPosition(Math.min(maxStart, Math.max(0, newValue)));
  };
  
  // Toggle card flip
  const handleFlip = (cardId: string) => {
    setFlippedCards({
      ...flippedCards,
      [cardId]: !flippedCards[cardId]
    });
  };
  
  return (
    <Slide key="context-solutions" title="Solution #1: Larger Context Windows">
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        height: 'calc(100% - 60px)',  // Account for the title area at the top
        justifyContent: 'space-between' // Add space between main sections
      }}>
        {/* Document comparison section with text selection sliders */}
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          height: '280px',  // Reduced height for the top section
          mb: 0
        }}>
          {/* Text selection sliders */}
          <Box sx={{ 
            display: 'flex', 
            gap: 2,
            mb: 2,
            alignItems: 'center'
          }}>
            {/* Left slider for standard context */}
            <Box sx={{ width: '50%', display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="caption" sx={{ minWidth: 'max-content' }}>
                Standard context:
              </Typography>
              <Box sx={{ 
                flex: 1, 
                height: 20, 
                position: 'relative', 
                bgcolor: 'rgba(255, 107, 107, 0.2)',
                borderRadius: 5
              }}>
                <Box 
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: `${(standardTextAmount - 10) / 40 * 100}%`,  // 10-50 range
                    bgcolor: '#ff6b6b',
                    borderRadius: 5,
                    cursor: 'pointer'
                  }}
                  onMouseDown={(e) => {
                    const container = e.currentTarget.parentElement;
                    if (!container) return;
                    const containerWidth = container.clientWidth;
                    
                    const handleMouseMove = (moveEvent: MouseEvent) => {
                      const containerRect = container.getBoundingClientRect();
                      const x = moveEvent.clientX - containerRect.left;
                      const percentage = Math.max(0, Math.min(100, (x / containerWidth) * 100));
                      const newValue = Math.round(10 + (percentage / 100) * 40);  // Scale to 10-50
                      handleStandardTextChange(null, newValue);
                    };
                    
                    const handleMouseUp = () => {
                      document.removeEventListener('mousemove', handleMouseMove);
                      document.removeEventListener('mouseup', handleMouseUp);
                    };
                    
                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', handleMouseUp);
                  }}
                />
              </Box>
              <Typography variant="caption" sx={{ minWidth: '35px', textAlign: 'right' }}>
                {standardTextAmount} words
              </Typography>
            </Box>
            
            {/* Right slider for larger context */}
            <Box sx={{ width: '50%', display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="caption" sx={{ minWidth: 'max-content' }}>
                Larger context:
              </Typography>
              <Box sx={{ 
                flex: 1, 
                height: 20, 
                position: 'relative', 
                bgcolor: 'rgba(54, 224, 158, 0.2)',
                borderRadius: 5
              }}>
                <Box 
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: `${(largerTextAmount - 100) / 200 * 100}%`,  // 100-300 range
                    bgcolor: '#36e09e',
                    borderRadius: 5,
                    cursor: 'pointer'
                  }}
                  onMouseDown={(e) => {
                    const container = e.currentTarget.parentElement;
                    if (!container) return;
                    const containerWidth = container.clientWidth;
                    
                    const handleMouseMove = (moveEvent: MouseEvent) => {
                      const containerRect = container.getBoundingClientRect();
                      const x = moveEvent.clientX - containerRect.left;
                      const percentage = Math.max(0, Math.min(100, (x / containerWidth) * 100));
                      const newValue = Math.round(100 + (percentage / 100) * 200);  // Scale to 100-300
                      handleLargerTextChange(null, newValue);
                    };
                    
                    const handleMouseUp = () => {
                      document.removeEventListener('mousemove', handleMouseMove);
                      document.removeEventListener('mouseup', handleMouseUp);
                    };
                    
                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', handleMouseUp);
                  }}
                />
              </Box>
              <Typography variant="caption" sx={{ minWidth: '40px', textAlign: 'right' }}>
                {largerTextAmount} words
              </Typography>
            </Box>
          </Box>
        
          {/* Document viewers */}
          <Box sx={{ 
            display: 'flex',
            gap: 2,
            height: '400px', // Doubled height for document viewers
            maxHeight: '400px'
          }}>
            {/* Standard context window */}
            <Box sx={{ 
              width: '50%',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Typography variant="subtitle2" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
                Standard Context Window ({standardTextAmount} words)
              </Typography>
              
              <Card sx={{ 
                flexGrow: 1,
                bgcolor: '#fafafa',
                border: '2px solid #d0d0d0',
                position: 'relative',
                borderRadius: 1,
                overflow: 'hidden'
              }}>
                <Box sx={{
                  position: 'absolute',
                  inset: 0,
                  bgcolor: 'rgba(0,0,0,0.05)',
                  zIndex: 1
                }} />
                
                {/* Vertical slider */}
                <Box sx={{ 
                  position: 'absolute',
                  right: 5,
                  top: '15%',
                  height: '70%',
                  width: 24,
                  zIndex: 10,
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  <Box sx={{
                    height: '100%',
                    width: 4,
                    borderRadius: 4,
                    bgcolor: 'rgba(0,0,0,0.1)',
                    position: 'relative'
                  }}>
                    <Box 
                      sx={{
                        position: 'absolute',
                        left: '-5px',
                        width: 14,
                        height: 18,
                        bgcolor: '#d0d0d0',
                        borderRadius: 2,
                        top: `${scrollValue}%`,
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                        opacity: 0.7,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onMouseDown={(e) => {
                        const container = e.currentTarget.parentElement;
                        if (!container) return;
                        const containerHeight = container.clientHeight;
                        const handleMouseMove = (moveEvent: MouseEvent) => {
                          const containerRect = container.getBoundingClientRect();
                          const y = moveEvent.clientY - containerRect.top;
                          const percentage = Math.max(0, Math.min(100, (y / containerHeight) * 100));
                          handleScrollChange(null, percentage);
                        };
                        const handleMouseUp = () => {
                          document.removeEventListener('mousemove', handleMouseMove);
                          document.removeEventListener('mouseup', handleMouseUp);
                        };
                        document.addEventListener('mousemove', handleMouseMove);
                        document.addEventListener('mouseup', handleMouseUp);
                      }}
                    >
                      <DragIndicatorIcon sx={{ fontSize: '0.6rem', color: '#666' }} />
                    </Box>
                  </Box>
                </Box>
                
                {/* Document text with highlighting */}
                <Box sx={{ 
                  position: 'relative',
                  zIndex: 2,
                  height: '100%',
                  overflow: 'auto',
                  fontFamily: 'monospace',
                  fontSize: '0.62rem',
                  lineHeight: 1.4,
                  whiteSpace: 'pre-wrap',
                  opacity: 0.7,
                  px: 1,
                  pt: 1,
                  pr: 3,
                  scrollbarWidth: 'none',
                  '&::-webkit-scrollbar': { display: 'none' }
                }}
                ref={(el) => {
                  if (el) {
                    const maxScroll = el.scrollHeight - el.clientHeight;
                    // For standard context, we reach the end more quickly
                    const standardMaxPercent = 40; // Only use 40% of the scroll range
                    const effectiveScrollValue = Math.min(scrollValue, standardMaxPercent);
                    el.scrollTop = (effectiveScrollValue / standardMaxPercent) * maxScroll;
                  }
                }}
                >
                  {/* All text with draggable highlight section */}
                  <Box 
                    component="span" 
                    sx={{ 
                      cursor: 'ew-resize', // Horizontal resize cursor
                      userSelect: 'none', // Prevent browser text selection
                      WebkitUserSelect: 'none',
                      MozUserSelect: 'none'
                    }}
                    onMouseDown={(e) => {
                      // Prevent default text selection
                      e.preventDefault();
                      
                      const el = e.currentTarget;
                      const startX = e.clientX;
                      const startPos = standardStartPosition;
                      
                      const handleMouseMove = (moveEvent: MouseEvent) => {
                        // Prevent default text selection during drag
                        moveEvent.preventDefault();
                        
                        // Only use horizontal movement
                        const deltaX = moveEvent.clientX - startX;
                        const wordsMoved = Math.round(deltaX / 6); // Approx pixels per word
                        handleStandardPositionChange(null, startPos + wordsMoved);
                      };
                      
                      const handleMouseUp = () => {
                        document.removeEventListener('mousemove', handleMouseMove);
                        document.removeEventListener('mouseup', handleMouseUp);
                      };
                      
                      document.addEventListener('mousemove', handleMouseMove);
                      document.addEventListener('mouseup', handleMouseUp);
                    }}
                  >
                    <Box component="span" sx={{ opacity: 0.4 }}>
                      {protocolText.split(' ').slice(0, standardStartPosition).join(' ')}
                    </Box>
                    <Box component="span" sx={{ 
                      backgroundColor: 'rgba(255, 107, 107, 0.2)', 
                      color: '#000',
                      fontWeight: 500,
                      padding: '2px 0',
                      borderRadius: '4px'
                    }}>
                      {' ' + protocolText.split(' ').slice(standardStartPosition, standardStartPosition + standardTextAmount).join(' ')}
                    </Box>
                    <Box component="span" sx={{ opacity: 0.4 }}>
                      {' ' + protocolText.split(' ').slice(standardStartPosition + standardTextAmount).join(' ')}
                    </Box>
                  </Box>
                </Box>
                
                {/* Context limit indicator */}
                <Box sx={{ 
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '30px',
                  background: 'linear-gradient(transparent, #fafafa)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  pb: 1,
                  zIndex: 3
                }}>
                  <Chip 
                    label={`Limited to ${standardTextAmount} words`}
                    size="small" 
                    sx={{ 
                      bgcolor: '#ff6b6b', 
                      color: 'white',
                      fontSize: '0.6rem',
                      borderRadius: '12px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                    }} 
                  />
                </Box>
              </Card>
            </Box>
            
            {/* Larger context window */}
            <Box sx={{ 
              width: '50%',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Typography variant="subtitle2" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
                Larger Context Window ({largerTextAmount} words)
              </Typography>
              
              <Card sx={{ 
                flexGrow: 1,
                bgcolor: 'white',
                border: '2px solid #36e09e',
                position: 'relative',
                borderRadius: 1,
                overflow: 'hidden'
              }}>
                {/* Vertical slider */}
                <Box sx={{ 
                  position: 'absolute',
                  right: 5,
                  top: '15%',
                  height: '70%',
                  width: 24,
                  zIndex: 10,
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  <Box sx={{
                    height: '100%',
                    width: 4,
                    borderRadius: 4,
                    bgcolor: 'rgba(54, 224, 158, 0.2)',
                    position: 'relative'
                  }}>
                    <Box 
                      sx={{
                        position: 'absolute',
                        left: '-5px',
                        width: 14,
                        height: 18,
                        bgcolor: '#36e09e',
                        borderRadius: 2,
                        top: `${scrollValue}%`,
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onMouseDown={(e) => {
                        const container = e.currentTarget.parentElement;
                        if (!container) return;
                        const containerHeight = container.clientHeight;
                        const handleMouseMove = (moveEvent: MouseEvent) => {
                          const containerRect = container.getBoundingClientRect();
                          const y = moveEvent.clientY - containerRect.top;
                          const percentage = Math.max(0, Math.min(100, (y / containerHeight) * 100));
                          handleScrollChange(null, percentage);
                        };
                        const handleMouseUp = () => {
                          document.removeEventListener('mousemove', handleMouseMove);
                          document.removeEventListener('mouseup', handleMouseUp);
                        };
                        document.addEventListener('mousemove', handleMouseMove);
                        document.addEventListener('mouseup', handleMouseUp);
                      }}
                    >
                      <DragIndicatorIcon sx={{ fontSize: '0.6rem', color: 'white' }} />
                    </Box>
                  </Box>
                </Box>
                
                {/* Document text with highlighting */}
                <Box sx={{ 
                  height: '100%',
                  overflow: 'auto',
                  fontFamily: 'monospace',
                  fontSize: '0.62rem',
                  lineHeight: 1.4,
                  whiteSpace: 'pre-wrap',
                  px: 1,
                  pt: 1,
                  pr: 3,
                  scrollbarWidth: 'none',
                  '&::-webkit-scrollbar': { display: 'none' }
                }}
                ref={(el) => {
                  if (el) {
                    const maxScroll = el.scrollHeight - el.clientHeight;
                    // For larger context, we can use the full range
                    el.scrollTop = (scrollValue / 100) * maxScroll;
                  }
                }}
                >
                  {/* All text with draggable highlight section for larger context */}
                  <Box 
                    component="span" 
                    sx={{ 
                      cursor: 'ew-resize', // Horizontal resize cursor
                      userSelect: 'none', // Prevent browser text selection
                      WebkitUserSelect: 'none',
                      MozUserSelect: 'none'
                    }}
                    onMouseDown={(e) => {
                      // Prevent default text selection
                      e.preventDefault();
                      
                      const el = e.currentTarget;
                      const startX = e.clientX;
                      const startPos = largerStartPosition;
                      
                      const handleMouseMove = (moveEvent: MouseEvent) => {
                        // Prevent default text selection during drag
                        moveEvent.preventDefault();
                        
                        // Only use horizontal movement
                        const deltaX = moveEvent.clientX - startX;
                        const wordsMoved = Math.round(deltaX / 6); // Approx pixels per word
                        handleLargerPositionChange(null, startPos + wordsMoved);
                      };
                      
                      const handleMouseUp = () => {
                        document.removeEventListener('mousemove', handleMouseMove);
                        document.removeEventListener('mouseup', handleMouseUp);
                      };
                      
                      document.addEventListener('mousemove', handleMouseMove);
                      document.addEventListener('mouseup', handleMouseUp);
                    }}
                  >
                    <Box component="span" sx={{ opacity: 0.6 }}>
                      {protocolText.split(' ').slice(0, largerStartPosition).join(' ')}
                    </Box>
                    <Box component="span" sx={{ 
                      backgroundColor: 'rgba(54, 224, 158, 0.15)', 
                      color: '#000',
                      fontWeight: 500,
                      padding: '2px 0',
                      borderRadius: '4px'
                    }}>
                      {' ' + protocolText.split(' ').slice(largerStartPosition, largerStartPosition + largerTextAmount).join(' ')}
                    </Box>
                    <Box component="span" sx={{ opacity: 0.6 }}>
                      {' ' + protocolText.split(' ').slice(largerStartPosition + largerTextAmount).join(' ')}
                    </Box>
                  </Box>
                </Box>
                
                {/* Context expansion indicator */}
                <Box sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '30px',
                  background: 'linear-gradient(transparent, white)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  pb: 1,
                  zIndex: 3
                }}>
                  <Chip
                    icon={<MemoryIcon sx={{ fontSize: '0.7rem' }} />}
                    label={`Expanded to ${largerTextAmount} words`}
                    size="small" 
                    sx={{ 
                      bgcolor: '#36e09e', 
                      color: 'white',
                      fontSize: '0.6rem',
                      borderRadius: '12px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                    }} 
                  />
                </Box>
              </Card>
            </Box>
          </Box>
        </Box>
        
        {/* Benefit Cards Section - smaller with rounder edges */}
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 3, // Increased gap to compensate for smaller cards
          mb: 2, // Extra space at bottom
          height: '240px', // Taller cards
          mt: 20, // Move cards back down
          position: 'relative',
          top: 30, // Additional positioning to push cards down
          px: 4 // Add horizontal padding for smaller cards
        }}>
          {benefitCards.map((card) => (
            <Box 
              key={card.id} 
              sx={{ height: '100%', perspective: '1000px' }}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                style={{ 
                  height: '100%', 
                  transformStyle: 'preserve-3d', 
                  position: 'relative' 
                }}
                animate={{ rotateY: flippedCards[card.id] ? 180 : 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Front side of card */}
                <Card 
                  onClick={() => handleFlip(card.id)}
                  sx={{ 
                    p: 1.5, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    height: '100%',
                    cursor: 'pointer',
                    position: 'absolute',
                    width: '100%',
                    backfaceVisibility: 'hidden',
                    bgcolor: 'rgba(54, 224, 158, 0.1)',
                    borderRadius: '16px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                  }}
                >
                  <motion.div 
                    animate={card.animation}
                    transition={card.animationConfig}
                    style={{ marginBottom: '8px' }}
                  >
                    {card.icon}
                  </motion.div>
                  <Typography variant="subtitle1" fontWeight={600} align="center" sx={{ fontSize: '0.9rem' }}>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" align="center" sx={{ mt: 0.5, fontSize: '0.8rem' }}>
                    {card.description}
                  </Typography>
                  {/* No flip icon */}
                </Card>
                
                {/* Back side of card */}
                <Card 
                  onClick={() => handleFlip(card.id)}
                  sx={{ 
                    p: 1.5, 
                    display: 'flex', 
                    flexDirection: 'column',
                    height: '100%',
                    cursor: 'pointer',
                    position: 'absolute',
                    width: '100%',
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    bgcolor: 'white',
                    borderRadius: '16px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={600} color="#36e09e" sx={{ mb: 1, fontSize: '0.9rem' }}>
                    {card.title}
                  </Typography>
                  
                  <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                    {card.details}
                  </Typography>
                  
                  <Link 
                    href={card.resource.link} 
                    target="_blank"
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center', mt: 'auto', fontSize: '0.75rem' }}
                  >
                    <ArticleIcon sx={{ mr: 0.5, fontSize: '0.9rem' }} />
                    {card.resource.title}
                  </Link>
                  
                    {/* No flip icon */}
                </Card>
              </motion.div>
            </Box>
          ))}
        </Box>
      </Box>
    </Slide>
  );
};

export default ContextSolutionsSlide;