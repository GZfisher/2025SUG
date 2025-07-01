import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Slide from '../components/Slide';
import { motion } from 'framer-motion';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const DemoSlide: React.FC<{ theme: any }> = ({ theme }) => {
  return (
    <Slide key="demo" title="Live Demonstration">
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100%' 
      }}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <Box sx={{ 
            borderRadius: '50%',
            width: 220,
            height: 220,
            background: `radial-gradient(circle, ${theme.palette.primary.main}30, ${theme.palette.secondary.main}50)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            mb: 4
          }}>
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                boxShadow: [
                  '0 0 0 0 rgba(66, 133, 244, 0.7)',
                  '0 0 0 15px rgba(66, 133, 244, 0)',
                  '0 0 0 0 rgba(66, 133, 244, 0)'
                ]
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity,
                repeatDelay: 1
              }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<PlayArrowIcon sx={{ fontSize: 30 }} />}
                sx={{
                  borderRadius: '50%',
                  width: 120,
                  height: 120,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  boxShadow: `0 8px 20px ${theme.palette.primary.main}60`
                }}
              >
                Demo
              </Button>
            </motion.div>
          </Box>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, textAlign: 'center' }}>
            Study Protocol Assistant
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center', maxWidth: 600, mx: 'auto' }}>
            Experience the power of RAG-enhanced document search and response generation
          </Typography>
        </motion.div>
      </Box>
    </Slide>
  );
};

export default DemoSlide;