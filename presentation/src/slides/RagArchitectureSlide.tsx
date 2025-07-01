import React from 'react';
import { Box, Card, CardContent, Typography, Chip } from '@mui/material';
import Slide from '../components/Slide';
import ScienceIcon from '@mui/icons-material/Science';
import VerifiedIcon from '@mui/icons-material/Verified';
import SettingsIcon from '@mui/icons-material/Settings';
import StorageIcon from '@mui/icons-material/Storage';
import DataObjectIcon from '@mui/icons-material/DataObject';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';

const RagArchitectureSlide: React.FC<{ theme: any }> = ({ theme }) => {
  return (
    <Slide key="rag-architecture" title="RAG Architecture for the Study Protocol Assistant">
      <Card elevation={0} sx={{ borderRadius: '16px', overflow: 'visible', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', backgroundColor: '#fafafa' }}>
        <CardContent sx={{ p: 5 }}>
          <Box sx={{ mb: 5, display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
            <Chip 
              icon={<ScienceIcon />} 
              label="Evidence-based" 
              color="primary" 
              sx={{ fontWeight: 600, px: 2, py: 3, fontSize: '0.95rem', borderRadius: '50px' }} 
            />
            <Chip 
              icon={<VerifiedIcon />} 
              label="Traceable" 
              color="secondary" 
              sx={{ fontWeight: 600, px: 2, py: 3, fontSize: '0.95rem', borderRadius: '50px' }} 
            />
            <Chip 
              icon={<SettingsIcon />} 
              label="Customizable" 
              color="info" 
              sx={{ fontWeight: 600, px: 2, py: 3, fontSize: '0.95rem', borderRadius: '50px' }} 
            />
          </Box>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr', md: '1fr 1fr 1fr' }, gap: 4 }}>
            <Box className="main-card float-card" sx={{
              position: 'relative',
              height: '100%',
              '&:after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                right: { xs: '50%', md: '-20px' },
                bottom: { xs: '-20px', md: 'auto' },
                left: { xs: 'auto', md: 'auto' },
                transform: { xs: 'translateX(-50%) rotate(90deg)', md: 'translateY(-50%)' },
                width: { xs: '2px', md: '30px' },
                height: { xs: '30px', md: '2px' },
                backgroundColor: theme.palette.primary.main,
                display: { xs: 'none', md: 'block', opacity: 0.8 },
                zIndex: 3
              }
            }}>
              <Box className="title-card" sx={{ backgroundColor: theme.palette.primary.main }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <DataObjectIcon sx={{ mr: 1.5, color: 'white' }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'white', fontSize: '1.1rem' }}>
                    Data Processing
                  </Typography>
                </Box>
              </Box>
              
              <Box className="content-card">
                <Typography variant="body1" sx={{ fontSize: '1.05rem', lineHeight: 2 }}>
                  • <span className="highlight-text">Document ingestion</span><br />
                  • <span className="highlight-text">Chunking strategies</span><br />
                  • <span className="highlight-text">Metadata extraction</span><br />
                  • <span className="highlight-text">Embedding generation</span>
                </Typography>
              </Box>
            </Box>
            
            <Box className="main-card float-card" sx={{
              position: 'relative',
              height: '100%',
              '&:after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                right: { xs: '50%', md: '-20px' },
                bottom: { xs: '-20px', md: 'auto' },
                left: { xs: 'auto', md: 'auto' },
                transform: { xs: 'translateX(-50%) rotate(90deg)', md: 'translateY(-50%)' },
                width: { xs: '2px', md: '30px' },
                height: { xs: '30px', md: '2px' },
                backgroundColor: theme.palette.primary.main,
                display: { xs: 'none', md: 'block', opacity: 0.8 },
                zIndex: 3
              }
            }}>
              <Box className="title-card" sx={{ backgroundColor: theme.palette.secondary.main }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <StorageIcon sx={{ mr: 1.5, color: 'white' }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'white', fontSize: '1.1rem' }}>
                    Knowledge Storage
                  </Typography>
                </Box>
              </Box>
              
              <Box className="content-card">
                <Typography variant="body1" sx={{ fontSize: '1.05rem', lineHeight: 2 }}>
                  • <span className="highlight-text">Vector database indexing</span><br />
                  • <span className="highlight-text">Semantic search capabilities</span><br />
                  • <span className="highlight-text">Metadata filtering</span><br />
                  • <span className="highlight-text">Hybrid retrieval systems</span>
                </Typography>
              </Box>
            </Box>
            
            <Box className="main-card float-card" sx={{
              position: 'relative',
              height: '100%'
            }}>
              <Box className="title-card" sx={{ 
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})` 
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IntegrationInstructionsIcon sx={{ mr: 1.5, color: 'white' }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'white', fontSize: '1.1rem' }}>
                    Response Generation
                  </Typography>
                </Box>
              </Box>
              
              <Box className="content-card">
                <Typography variant="body1" sx={{ fontSize: '1.05rem', lineHeight: 2 }}>
                  • <span className="highlight-text">Context augmentation</span><br />
                  • <span className="highlight-text">Multi-stage reasoning</span><br />
                  • <span className="highlight-text">Citation generation</span><br />
                  • <span className="highlight-text">Consistency verification</span>
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Slide>
  );
};

export default RagArchitectureSlide;