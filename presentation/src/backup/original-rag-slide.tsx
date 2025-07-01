// Original RAG Introduction slide
import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

const OriginalRagSlide = () => (
  <Slide key="what-is-rag" title="What is Retrieval Augmented Generation?">
    <Paper elevation={0} sx={{ p: 5, borderRadius: '16px', backgroundColor: 'rgba(255,255,255,0.95)', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7, mb: 4 }}>
          Retrieval Augmented Generation (RAG) combines the knowledge retrieval capabilities of search engines with the contextual understanding of large language models.
        </Typography>
      </motion.div>
      
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
          <Card className="feature-card float-card" sx={{ height: '100%', borderColor: 'primary.main' }}>
            <CardContent sx={{ p: 5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <ManageSearchIcon color="primary" sx={{ mr: 2, fontSize: '2.5rem' }} />
                <Typography variant="h6" component="div" sx={{ fontWeight: 600, fontSize: '1.3rem' }}>
                  Retrieval Component
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ ml: 1.5, mr: 1.5, opacity: 0.9, fontSize: '1.05rem', lineHeight: 1.6 }}>
                Searches through and fetches relevant information from specific knowledge sources based on the user's query
              </Typography>
            </CardContent>
          </Card>

          <Card className="feature-card float-card" sx={{ height: '100%', borderColor: 'secondary.main', '&::before': { backgroundColor: theme.palette.secondary.main } }}>
            <CardContent sx={{ p: 5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <AutoAwesomeIcon color="secondary" sx={{ mr: 2, fontSize: '2.5rem' }} />
                <Typography variant="h6" component="div" sx={{ fontWeight: 600, fontSize: '1.3rem' }}>
                  Generation Component
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ ml: 1.5, mr: 1.5, opacity: 0.9, fontSize: '1.05rem', lineHeight: 1.6 }}>
                Uses retrieved information to generate accurate, contextual, and coherent responses to the user's query
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Typography variant="body1" sx={{ mt: 4, fontSize: '1.1rem', lineHeight: 1.7 }}>
          By grounding LLM responses in verified documents and data sources, RAG enhances accuracy, reduces hallucinations, and provides transparent, trustworthy insights for healthcare professionals.
        </Typography>
      </motion.div>
    </Paper>
  </Slide>
);

export default OriginalRagSlide;