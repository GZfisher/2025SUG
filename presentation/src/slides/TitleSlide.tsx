import React, { useState } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import Slide from '../components/Slide';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

// Flippable presenter card component
interface FlippablePresenterCardProps {
  name: string;
  role: string;
  email: string;
  bio: string;
  theme: any;
  linkedIn?: string;
  github?: string;
}

const FlippablePresenterCard: React.FC<FlippablePresenterCardProps> = ({ 
  name, 
  role, 
  email, 
  bio, 
  theme,
  linkedIn,
  github
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Box 
      sx={{
        width: 260,
        height: 160,
        perspective: '1000px',
        cursor: 'pointer'
      }}
      onClick={handleFlip}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transition: 'transform 0.8s',
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* Front of card */}
        <Card
          sx={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            backfaceVisibility: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            background: 'rgba(255,255,255,0.90)',
            backdropFilter: 'blur(8px)',
            p: 2.5
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              {name}
            </Typography>
            
            <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary, mb: 1.5 }}>
              {role}
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1.5 }}>
              <EmailIcon sx={{ fontSize: '0.9rem', mr: 0.8, color: theme.palette.text.secondary }} />
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontStyle: 'italic', fontSize: '0.75rem' }}>
                {email}
              </Typography>
            </Box>
            
            <Typography variant="caption" sx={{ 
              display: 'block', 
              color: theme.palette.primary.main, 
              mt: 2,
              fontStyle: 'italic'
            }}>
            </Typography>
          </Box>
        </Card>
        
        {/* Back of card */}
        <Card
          sx={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            backfaceVisibility: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            transform: 'rotateY(180deg)',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
            backdropFilter: 'blur(8px)',
            p: 2,
            overflow: 'auto'
          }}
        >
          <Typography variant="body2" sx={{ mb: 1.5, fontSize: '0.85rem' }}>
            {bio}
          </Typography>
          
          <Box sx={{ display: 'flex', mt: 'auto', justifyContent: 'center', gap: 2 }}>
            {linkedIn && (
              <LinkedInIcon sx={{ color: theme.palette.primary.main, cursor: 'pointer' }} />
            )}
            {github && (
              <GitHubIcon sx={{ color: theme.palette.secondary.main, cursor: 'pointer' }} />
            )}
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

// Simple presenter card component for the second row
interface SimplePresenterCardProps {
  name: string;
  role?: string;
  email?: string;
  theme: any;
}

const SimplePresenterCard: React.FC<SimplePresenterCardProps> = ({ name, role, email, theme }) => {
  return (
    <Box 
      sx={{
        width: 160,
        height: 80,
        perspective: '1000px',
        mb: 0.5
      }}
    >
      <Card
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(8px)',
          p: 1.5
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '0.9rem', mb: 0.3 }}>
            {name}
          </Typography>
          
          {role && (
            <Typography variant="caption" sx={{ display: 'block', color: theme.palette.text.secondary, mb: 0.3 }}>
              {role}
            </Typography>
          )}
          
          {email && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 0.5 }}>
              <EmailIcon sx={{ fontSize: '0.7rem', mr: 0.5, color: theme.palette.text.secondary }} />
              <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontStyle: 'italic', fontSize: '0.65rem' }}>
                {email}
              </Typography>
            </Box>
          )}
        </Box>
      </Card>
    </Box>
  );
};

const TitleSlide: React.FC<{ theme: any }> = ({ theme }) => {
  return (
    <Slide key="title" variant="title">
      <Box sx={{ 
        textAlign: 'center', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        position: 'relative'
      }}>
        {/* Decorative elements */}
        <Box sx={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: `radial-gradient(circle at center, ${theme.palette.primary.main}0A, ${theme.palette.primary.main}01)`,
          top: '10%',
          left: '5%',
          filter: 'blur(60px)',
          opacity: 0.8,
          zIndex: 0
        }}/>
        
        <Box sx={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: `radial-gradient(circle at center, ${theme.palette.secondary.main}0A, ${theme.palette.secondary.main}01)`,
          bottom: '5%',
          right: '5%',
          filter: 'blur(60px)',
          opacity: 0.8,
          zIndex: 0
        }}/>
        
        {/* Company Logos */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          width: '100%', 
          px: 6, 
          pt: 4,
          position: 'relative',
          zIndex: 2 
        }}>
          <Box 
            component="img" 
            src="/images/AZ_SYMBOL_RGB.png" 
            alt="AstraZeneca Logo"
            sx={{ 
              height: 80,
              objectFit: 'contain'
            }} 
          />
          <Box 
            component="img" 
            src="/images/Evinova_Logo_Symbol_CMYK.jpg" 
            alt="Evinova Logo"
            sx={{ 
              height: 70,
              objectFit: 'contain'
            }} 
          />
        </Box>
        
        {/* Main title */}
        <Box sx={{ pt: 6 }} /> {/* Add top padding to push content down */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 100 }}
          style={{ position: 'relative', zIndex: 2 }}
        >
          <Typography 
            variant="h1" 
            component="h1" 
            sx={{ 
              fontSize: {xs: '2.8rem', sm: '4rem', md: '5rem'}, 
              fontWeight: 800,
              mb: 3, 
              backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 10px rgba(0,0,0,0.05)',
              letterSpacing: '-0.02em'
            }}
          >
            Study Protocol Assistant
          </Typography>
        </motion.div>
        
        {/* Subtitle */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Typography 
            variant="h4" 
            sx={{ 
              mb: 6, 
              fontWeight: 300, 
              maxWidth: '800px', 
              mx: 'auto',
              fontSize: {xs: '1.3rem', sm: '1.6rem', md: '1.8rem'},
              color: theme.palette.text.secondary
            }}
          >
            Powering Clinical Document Analysis with Retrieval Augmented Generation
          </Typography>
        </motion.div>
        
        {/* Authors and date */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          {/* Presenters and Contributors Layout */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2.5, mb: 1 }}>

            {/* First row - main presenters with flippable cards */}
            <Box sx={{ 
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 3
            }}>
              <FlippablePresenterCard
                name="Francesco Multari"
                role="HAI - Evinova"
                email="francesco.multari@evinova.com"
                theme={theme}
                linkedIn="https://linkedin.com/in/francesco-multari"
                bio="Francesco only drinks cappucino after 12pm Rome time."
              />
              
              <FlippablePresenterCard
                name="Ali Soltani"
                role="HAI - Evinova"
                email="ali.soltani@evinova.com"
                theme={theme}
                linkedIn="https://www.linkedin.com/in/soltanitehrani"
                bio="Ali tried to be normal once."
              />
            </Box>
            
            {/* No Contributors Section */}
          </Box>
          
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 2, fontWeight: 500 }}>
            April 16, 2025
          </Typography>
        </motion.div>
        
        {/* Bottom spacer */}
        <Box sx={{ mt: 'auto', mb: 2 }} />
      </Box>
    </Slide>
  );
};

export default TitleSlide;