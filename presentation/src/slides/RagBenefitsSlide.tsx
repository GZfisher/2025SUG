import React from 'react';
import { Box, Card, CardContent, Typography, Avatar, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import Slide from '../components/Slide';
import VerifiedIcon from '@mui/icons-material/Verified';
import WarningIcon from '@mui/icons-material/Warning';

const RagBenefitsSlide: React.FC<{ theme: any }> = ({ theme }) => {
  return (
    <Slide key="why-rag" title="Why RAG Matters for Clinical Protocol Development">
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        {/* Limitations Card with new structured layout */}
        <Box className="main-card float-card">
          <Box className="title-card" sx={{ backgroundColor: 'error.main' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ 
                bgcolor: 'error.light', 
                mr: 2,
                width: 40,
                height: 40,
                boxShadow: '0 4px 14px rgba(211, 47, 47, 0.2)'
              }}>
                <WarningIcon />
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'white' }}>
                Limitations of Standard LLMs
              </Typography>
            </Box>
          </Box>
          
          <Box className="content-card">
            <List sx={{ py: 1 }}>
              {[
                "Knowledge cutoffs limit access to current research",
                "Hallucinations lead to factual inaccuracies (Liu et al., Nature, 2023)",
                "No access to proprietary clinical data",
                "Lack of traceability and evidence",
                "Regulatory compliance concerns (Chen & Johnson, NEJM AI, 2024)"
              ].map((item, index) => (
                <ListItem key={index} sx={{ py: 1.2 }}>
                  <ListItemIcon sx={{ minWidth: '40px' }}>
                    <WarningIcon color="error" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={item} 
                    primaryTypographyProps={{ 
                      fontWeight: 500,
                      fontSize: '1.05rem'
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
        
        {/* Benefits Card with new structured layout */}
        <Box className="main-card float-card">
          <Box className="title-card" sx={{ backgroundColor: 'success.main' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ 
                bgcolor: 'success.light', 
                mr: 2,
                width: 40,
                height: 40,
                boxShadow: '0 4px 14px rgba(56, 142, 60, 0.2)'
              }}>
                <VerifiedIcon />
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'white' }}>
                RAG Benefits for Protocol Development
              </Typography>
            </Box>
          </Box>
          
          <Box className="content-card">
            <List sx={{ py: 1 }}>
              {[
                "Access to up-to-date clinical research and guidelines (Lewis et al., BMJ, 2024)",
                "Information grounded in verified sources",
                "Integration with proprietary data repositories (Sharma et al., JAMA Network, 2023)",
                "Transparent citations and evidence trails",
                "Enhanced compliance with regulatory requirements (White Paper: FDA AI/ML, 2023)"
              ].map((item, index) => (
                <ListItem key={index} sx={{ py: 1.2 }}>
                  <ListItemIcon sx={{ minWidth: '40px' }}>
                    <VerifiedIcon color="success" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={item} 
                    primaryTypographyProps={{ 
                      fontWeight: 500,
                      fontSize: '1.05rem'
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Box>
    </Slide>
  );
};

export default RagBenefitsSlide;