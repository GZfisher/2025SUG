import React, { ReactNode } from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

interface SlideProps {
  title?: string;
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'title' | 'image' | 'split';
  background?: string;
  overlay?: boolean;
}

// Enhanced animation variants for impressive entrance effects
const contentVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.12,
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1]
    },
  }),
};

const titleVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1]
    },
  },
};

// Text reveal animation for title
const textRevealVariants = {
  hidden: { width: '0%' },
  visible: {
    width: '100%',
    transition: {
      duration: 1.2,
      ease: [0.25, 1, 0.5, 1]
    }
  }
};

const Slide: React.FC<SlideProps> = ({ 
  title, 
  children, 
  className = '', 
  variant = 'default', 
  background,
  overlay = false
}) => {
  const theme = useTheme();
  
  // Background patterns based on slide variant
  const getBackgroundPattern = () => {
    if (background) return background;
    
    if (variant === 'title') {
      return `radial-gradient(circle at 80% 80%, ${theme.palette.primary.main}15, transparent 25%),
              radial-gradient(circle at 20% 20%, ${theme.palette.secondary.main}10, transparent 30%)`;
    }
    
    return 'transparent';
  };

  return (
    <Box 
      className={`slide ${className}`} 
      sx={{ 
        height: '100%',
        background: getBackgroundPattern(),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative elements for visual interest */}
      {variant === 'title' && (
        <>
          <Box sx={{
            position: 'absolute',
            bottom: '-5%',
            right: '-5%',
            width: '300px',
            height: '300px',
            background: `linear-gradient(45deg, ${theme.palette.primary.main}10, ${theme.palette.primary.light}20)`,
            borderRadius: '50%',
            filter: 'blur(40px)',
            zIndex: 0
          }} />
          <Box sx={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: '20px',
            height: '20px',
            background: theme.palette.primary.main,
            borderRadius: '50%',
            opacity: 0.5
          }} />
          <Box sx={{
            position: 'absolute',
            bottom: '20%',
            left: '10%',
            width: '10px',
            height: '10px',
            background: theme.palette.secondary.main,
            borderRadius: '50%',
            opacity: 0.6
          }} />
        </>
      )}
      
      {/* Optional overlay for contrast */}
      {overlay && (
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255,255,255,0.85)',
          zIndex: 1
        }} />
      )}
      
      <motion.div 
        className="slide-content"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.12,
              delayChildren: 0.1,
            },
          },
        }}
        sx={{ 
          height: '100%',
          p: { xs: 6, md: 10 },
          pt: { xs: 8, md: 10 },
          pb: { xs: 10, md: 12 }, // Extra bottom padding to avoid controls overlap
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '1200px', // Reduced max width for better margins
          mx: 'auto',
          width: '100%'
        }}
      >
        {/* Title with animated underline effect */}
        {title && (
          <motion.div variants={titleVariants}>
            <Typography 
              variant={variant === 'title' ? 'h1' : 'h3'} 
              component="h2" 
              className="slide-title"
              gutterBottom
              sx={{ 
                fontWeight: variant === 'title' ? 800 : 700,
                position: 'relative',
                display: 'inline-block',
                color: variant === 'title' ? theme.palette.primary.main : 'inherit',
                pb: variant === 'title' ? 1 : 2,
                // Text gradient for title slides
                ...(variant === 'title' && {
                  backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 2px 10px rgba(0,0,0,0.05)'
                })
              }}
            >
              {title}
              
              {/* Animated underline for non-title slides */}
              {variant !== 'title' && (
                <motion.div 
                  variants={textRevealVariants}
                  style={{
                    position: 'absolute',
                    height: '4px',
                    bottom: '0',
                    left: '0',
                    background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    borderRadius: '2px',
                  }}
                />
              )}
            </Typography>
          </motion.div>
        )}
        
        {/* Main content area */}
        <Box 
          sx={{ 
            mt: title ? (variant === 'title' ? 4 : 3) : 0,
            flex: 1, 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start', // Changed from conditional - always start from top for consistent layout
            alignItems: variant === 'title' ? 'center' : 'stretch'
          }}
        >
          {React.Children.map(children, (child, i) => (
            <motion.div 
              variants={contentVariants} 
              custom={i + 1}
              style={{ 
                height: variant === 'title' ? 'auto' : '100%'
              }}
            >
              {child}
            </motion.div>
          ))}
        </Box>
        
        {/* Branding watermark for title slide */}
        {variant === 'title' && (
          <Box
            sx={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              opacity: 0.6
            }}
          >
            <Typography variant="caption" sx={{ letterSpacing: '1px' }}>
              EVINOVA • {new Date().getFullYear()}
            </Typography>
          </Box>
        )}
      </motion.div>
    </Box>
  );
};

export default Slide;