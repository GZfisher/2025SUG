import React, { useState, useEffect, ReactNode } from 'react';
import { IconButton, Box, Fab, useTheme, Tooltip, Typography } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import HomeIcon from '@mui/icons-material/Home';
import { motion, AnimatePresence } from 'framer-motion';

interface PresentationLayoutProps {
  children: ReactNode;
  totalSlides: number;
  currentSlide: number;
  onNextSlide: () => void;
  onPrevSlide: () => void;
  onGoToSlide: (slideIndex: number) => void;
}

const PresentationLayout: React.FC<PresentationLayoutProps> = ({
  children,
  totalSlides,
  currentSlide,
  onNextSlide,
  onPrevSlide,
  onGoToSlide,
}) => {
  const theme = useTheme();
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Progress calculation
  const progress = ((currentSlide + 1) / totalSlides) * 100;

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
        onNextSlide();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        onPrevSlide();
      } else if (e.key === 'f') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNextSlide, onPrevSlide]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <Box 
      sx={{ 
        position: 'relative', 
        height: '100vh', 
        width: '100vw',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `radial-gradient(circle at 30% 107%, rgba(253, 252, 251, 0.6) 0%, rgba(226, 226, 226, 0.8) 95%)`
      }}
    >
      {/* Decorative elements */}
      <Box sx={{
        position: 'absolute',
        bottom: '-15%',
        left: '-5%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: `radial-gradient(circle at center, ${theme.palette.primary.light}22, ${theme.palette.primary.main}05)`,
        filter: 'blur(80px)',
        zIndex: 0
      }} />
      
      <Box sx={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: `radial-gradient(circle at center, ${theme.palette.secondary.light}22, ${theme.palette.secondary.main}05)`,
        filter: 'blur(80px)',
        zIndex: 0
      }} />
      
      {/* Larger presentation container */}
      <Box 
        sx={{ 
          width: '1600px', 
          height: '900px', 
          maxWidth: '90vw',
          maxHeight: '90vh',
          position: 'relative',
          borderRadius: '16px',
          boxShadow: '0 25px 70px rgba(0,0,0,0.07), 0 15px 25px rgba(0,0,0,0.03)',
          overflow: 'hidden',
          bgcolor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 2,
          padding: { xs: '20px', sm: '25px', md: '30px' } // Additional padding to prevent content from touching edges
        }}
      >
        {/* Progress bar */}
        <Box 
          className="progress-bar"
          sx={{ width: `${progress}%` }}
        />
      
        {/* Main content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ 
              type: 'spring',
              stiffness: 300,
              damping: 30,
              duration: 0.4
            }}
            style={{ flex: 1, position: 'relative', paddingBottom: '30px' }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
        
        {/* Navigation controls positioned very close to the bottom of the presentation container */}
        <Box sx={{
          position: 'absolute',
          bottom: '10px', // Reduced from 30px to 10px to be closer to bottom edge
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1, // Reduced gap from 2 to 1
          zIndex: 1000
        }}>
          {/* Use arrow keys instructions - only shown on title slide */}
          {currentSlide === 0 && (
            <Box 
              sx={{ 
                opacity: 0.8, 
                py: 1,
                px: 2.5,
                mb: 1,
                borderRadius: '50px',
                backgroundColor: 'rgba(255,255,255,0.5)',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Use arrow keys or navigation buttons to move between slides
              </Typography>
            </Box>
          )}
          
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3
          }}>
            {/* Home button */}
            <Tooltip title="Go to home slide" arrow>
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.92 }}
              >
                <Fab
                  color="primary"
                  onClick={() => onGoToSlide(0)}
                  size="medium"
                  sx={{
                    backgroundColor: '#4A4A4A',
                    color: 'white',
                    boxShadow: '0 6px 14px rgba(0, 0, 0, 0.3)',
                    '&:hover': {
                      backgroundColor: '#333333',
                    }
                  }}
                >
                  <HomeIcon fontSize="medium" />
                </Fab>
              </motion.div>
            </Tooltip>
            
            <Tooltip title="Previous slide" arrow>
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.92 }}
              >
                <Fab
                  color="primary"
                  onClick={onPrevSlide}
                  disabled={currentSlide === 0}
                  size="medium"
                  sx={{
                    opacity: currentSlide === 0 ? 0.4 : 1,
                    backgroundColor: theme.palette.primary.main,
                    color: 'white',
                    boxShadow: '0 6px 14px rgba(120, 82, 169, 0.3)',
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark,
                    }
                  }}
                >
                  <NavigateBeforeIcon fontSize="medium" />
                </Fab>
              </motion.div>
            </Tooltip>
            
            <Box sx={{
              px: 3,
              py: 1,
              borderRadius: '30px',
              backgroundColor: 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              minWidth: '80px',
              textAlign: 'center'
            }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {currentSlide + 1} / {totalSlides}
              </Typography>
            </Box>
            
            <Tooltip title="Next slide" arrow>
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.92 }}
              >
                <Fab
                  color="primary"
                  onClick={onNextSlide}
                  disabled={currentSlide === totalSlides - 1}
                  size="medium"
                  sx={{
                    opacity: currentSlide === totalSlides - 1 ? 0.4 : 1,
                    backgroundColor: theme.palette.secondary.main,
                    color: 'white',
                    boxShadow: '0 6px 14px rgba(0, 176, 185, 0.3)',
                    '&:hover': {
                      backgroundColor: theme.palette.secondary.dark,
                    }
                  }}
                >
                  <NavigateNextIcon fontSize="medium" />
                </Fab>
              </motion.div>
            </Tooltip>

            <Tooltip title="Toggle fullscreen" arrow>
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.92 }}
              >
                <Fab
                  size="small"
                  onClick={toggleFullscreen}
                  sx={{ 
                    backgroundColor: '#4A4A4A',
                    color: 'white',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                    '&:hover': {
                      backgroundColor: '#333333',
                    }
                  }}
                >
                  {isFullscreen ? <FullscreenExitIcon fontSize="small" /> : <FullscreenIcon fontSize="small" />}
                </Fab>
              </motion.div>
            </Tooltip>
          </Box>
        </Box>
      </Box>
      
      {/* Navigation dots */}
      <Box className="nav-dots">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <Box
            key={index}
            className={`nav-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => onGoToSlide(index)}
            role="button"
            tabIndex={0}
            aria-label={`Go to slide ${index + 1}`}
            sx={{
              transform: index === currentSlide ? 'scale(1.3)' : 'scale(1)',
              transition: 'transform 0.3s ease'
            }}
          />
        ))}
      </Box>
      
      {/* Navigation dots still outside the presentation container */}
    </Box>
  );
};

export default PresentationLayout;