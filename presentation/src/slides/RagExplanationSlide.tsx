import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Card, Paper, Divider, Chip, Button, Avatar, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import Slide from '../components/Slide';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import WidgetsIcon from '@mui/icons-material/Widgets';
import StorageIcon from '@mui/icons-material/Storage';
import SearchIcon from '@mui/icons-material/Search';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CodeIcon from '@mui/icons-material/Code';
import TuneIcon from '@mui/icons-material/Tune';
import CalculateIcon from '@mui/icons-material/Calculate';

// Sample text from the protocol document
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
5. Adequate organ function
`;

// Example text chunks for visualization
const textChunks = [
  { 
    id: 1, 
    text: "CLINICAL STUDY PROTOCOL\n\nProtocol Title: A Phase III, Randomized, Double-Blind, Placebo-Controlled Study to Assess the Efficacy and Safety of Drug XYZ in Patients with Advanced Refractory Solid Tumors\n\nProtocol Number: XYZ-1001\nVersion: 3.0\nDate: January 15, 2025", 
    tags: ["header", "metadata"],
    vectors: [0.12, 0.83, -0.44, 0.71, -0.32],
    embedInfo: "This chunk contains protocol metadata which is embedded to capture document identification information. Embedding focuses on protocol identifiers, version numbers, and study type."
  },
  { 
    id: 2, 
    text: "1. INTRODUCTION\n1.1 Background\nCancer remains one of the leading causes of death worldwide, with approximately 19.3 million new cases and 10 million cancer deaths in 2020. Despite significant advances in cancer therapy, patients with advanced solid tumors often develop resistance to available treatments, leading to disease progression and limited survival outcomes.", 
    tags: ["introduction", "background"],
    vectors: [0.54, 0.21, -0.19, 0.63, -0.58],
    embedInfo: "This introduction chunk is embedded to capture the disease context and background. The embedding emphasizes medical terminology, disease statistics, and general research context for the trial."
  },
  { 
    id: 3, 
    text: "Immune checkpoint inhibitors (ICIs) have revolutionized the treatment of various cancers by enhancing the ability of the immune system to recognize and eliminate tumor cells. However, only a subset of patients responds to ICI therapy, and many eventually develop acquired resistance.", 
    tags: ["background", "treatment"],
    vectors: [0.88, -0.32, 0.04, -0.17, 0.29],
    embedInfo: "This treatment-focused chunk is embedded to capture mechanisms of action, therapeutic classes, and clinical efficacy concepts. The embedding prioritizes immunotherapy-related terminology."
  },
  { 
    id: 4, 
    text: "1.2 Investigational Product\nDrug XYZ is a small molecule inhibitor of the XYZ kinase pathway with an IC50 of 3.2 nM. It is formulated as immediate-release tablets for oral administration.", 
    tags: ["drug", "investigational product"],
    vectors: [-0.35, 0.67, 0.12, -0.25, 0.78],
    embedInfo: "This product information chunk is embedded to capture pharmaceutical details. The embedding focuses on drug characteristics, mechanism of action, and pharmaceutical formulation terminology."
  },
  { 
    id: 5, 
    text: "1.3 Clinical Studies\nAs of the protocol date, Drug XYZ has been evaluated in a Phase 1 dose-escalation and expansion study in 87 patients with advanced solid tumors. The most common treatment-related adverse events were fatigue, nausea, decreased appetite, and reversible transaminase elevations.", 
    tags: ["clinical studies", "safety"],
    vectors: [-0.22, -0.43, 0.72, 0.65, 0.39],
    embedInfo: "This safety data chunk is embedded to capture clinical outcomes and adverse event information. The embedding emphasizes medical side effects, patient population characteristics, and clinical study terminology."
  },
  { 
    id: 6, 
    text: "4.1 Inclusion Criteria\nParticipants must meet all the following criteria to be eligible:\n1. Age ≥18 years at the time of signing informed consent\n2. Confirmed diagnosis of advanced or metastatic solid tumor\n3. Disease progression after standard therapy including immunotherapy\n4. ECOG performance status of 0 or 1\n5. Adequate organ function", 
    tags: ["inclusion criteria", "eligibility"],
    vectors: [-0.56, -0.24, -0.63, 0.38, 0.91],
    embedInfo: "This eligibility criteria chunk is embedded to capture patient selection parameters. The embedding focuses on clinical assessment terminology, patient characteristics, and requirement specifications."
  }
];

// Example queries for the demo
const queryExamples = [
  "What are the inclusion criteria for the study?",
  "What is the investigational product?",
  "What adverse events were observed?",
  "What is the primary endpoint of the study?",
  "What patient population is being studied?"
];

// Similarity scores for ranking visualization
// Define similarity scores for each query
const similarityScoresByQuery = {
  "What are the inclusion criteria for the study?": [
    { chunkId: 6, score: 0.92, relevance: "High", reasons: ["Contains all eligibility criteria", "Directly answers the query", "Contains structured list format"] },
    { chunkId: 2, score: 0.41, relevance: "Low", reasons: ["Mentions 'patients' but no eligibility criteria", "Discusses disease background only", "Too general for the query"] },
    { chunkId: 5, score: 0.37, relevance: "Low", reasons: ["Mentions patient population but not selection criteria", "Focus is on safety not eligibility", "Contains study results, not requirements"] },
    { chunkId: 4, score: 0.26, relevance: "Very Low", reasons: ["No mention of patient criteria", "Focus on drug characteristics", "Irrelevant to eligibility"] },
    { chunkId: 3, score: 0.22, relevance: "Very Low", reasons: ["Discusses treatment mechanisms", "No mention of patient selection", "Irrelevant to the query"] },
    { chunkId: 1, score: 0.18, relevance: "Very Low", reasons: ["Contains metadata only", "No clinical content related to eligibility", "Administrative information only"] }
  ],
  "What is the investigational product?": [
    { chunkId: 4, score: 0.95, relevance: "High", reasons: ["Direct description of drug XYZ", "Contains mechanism of action", "Contains formulation details"] },
    { chunkId: 5, score: 0.53, relevance: "Medium", reasons: ["Mentions the drug in clinical studies", "Contains partial information about the product", "Focus is on clinical results not drug characteristics"] },
    { chunkId: 3, score: 0.39, relevance: "Low", reasons: ["Related to treatments but not specific to the investigational product", "Discusses immunotherapy in general", "No specific drug XYZ details"] },
    { chunkId: 6, score: 0.27, relevance: "Very Low", reasons: ["Mentions treatments indirectly", "No information about drug characteristics", "Focus on patient eligibility"] },
    { chunkId: 2, score: 0.24, relevance: "Very Low", reasons: ["General cancer treatment context", "No specific product information", "Background information only"] },
    { chunkId: 1, score: 0.19, relevance: "Very Low", reasons: ["Contains study title with drug XYZ", "No detailed information about the product", "Administrative information only"] }
  ],
  "What adverse events were observed?": [
    { chunkId: 5, score: 0.94, relevance: "High", reasons: ["Lists specific adverse events", "Mentions fatigue, nausea, decreased appetite", "Directly addresses safety outcomes"] },
    { chunkId: 4, score: 0.32, relevance: "Low", reasons: ["Describes the drug but not adverse events", "Related to the medication being studied", "No safety data included"] },
    { chunkId: 3, score: 0.29, relevance: "Very Low", reasons: ["Mentions therapy resistance", "No specific adverse events", "Focus on mechanism not safety"] },
    { chunkId: 6, score: 0.25, relevance: "Very Low", reasons: ["Mentions organ function", "No adverse event data", "Eligibility criteria only"] },
    { chunkId: 2, score: 0.21, relevance: "Very Low", reasons: ["General disease context", "No safety information", "Background information only"] },
    { chunkId: 1, score: 0.12, relevance: "Very Low", reasons: ["Protocol metadata only", "No clinical content", "Administrative information only"] }
  ],
  "What is the primary endpoint of the study?": [
    { chunkId: 1, score: 0.56, relevance: "Medium", reasons: ["Contains study title and design", "Mentions efficacy and safety assessment", "No explicit primary endpoint defined"] },
    { chunkId: 2, score: 0.43, relevance: "Low", reasons: ["Mentions survival outcomes", "Related to potential endpoints", "No explicit endpoint definition"] },
    { chunkId: 5, score: 0.38, relevance: "Low", reasons: ["Contains safety data", "Related to secondary endpoints", "No primary endpoint specified"] },
    { chunkId: 6, score: 0.31, relevance: "Very Low", reasons: ["Patient eligibility only", "No endpoint information", "Unrelated to study outcomes"] },
    { chunkId: 3, score: 0.28, relevance: "Very Low", reasons: ["Treatment mechanism context", "No endpoint information", "Background information only"] },
    { chunkId: 4, score: 0.22, relevance: "Very Low", reasons: ["Drug information only", "No endpoint details", "Unrelated to study outcomes"] }
  ],
  "What patient population is being studied?": [
    { chunkId: 2, score: 0.88, relevance: "High", reasons: ["Describes patient population with advanced solid tumors", "Mentions resistance to available treatments", "Contains disease progression context"] },
    { chunkId: 6, score: 0.85, relevance: "High", reasons: ["Lists specific inclusion criteria", "Defines exact patient characteristics", "Contains performance status requirements"] },
    { chunkId: 5, score: 0.71, relevance: "Medium", reasons: ["Mentions study involved 87 patients", "Specifies advanced solid tumors", "Includes partial population information"] },
    { chunkId: 1, score: 0.47, relevance: "Low", reasons: ["Study title mentions advanced refractory solid tumors", "Contains high-level population info", "No detailed patient characteristics"] },
    { chunkId: 3, score: 0.34, relevance: "Very Low", reasons: ["General therapy context", "Mentions subset of patients", "No specific study population details"] },
    { chunkId: 4, score: 0.19, relevance: "Very Low", reasons: ["Drug information only", "No patient population details", "Unrelated to eligibility or demographics"] }
  ]
};

const RagExplanationSlide: React.FC<{ theme: any }> = ({ theme }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [activeQuery, setActiveQuery] = useState<string | null>(null);
  const [retrievedChunks, setRetrievedChunks] = useState<number[]>([]);
  const [llmResponse, setLlmResponse] = useState("");
  // Track which paper cards are flipped (1: Lewis, 2: Guu, 3: Asai)
  const [flippedPapers, setFlippedPapers] = useState<number[]>([]);
  // Track which chunks are flipped to show embedding info
  const [flippedChunks, setFlippedChunks] = useState<number[]>([]);
  // State for similarity scores - will change based on query selection
  const [similarityScores, setSimilarityScores] = useState(similarityScoresByQuery["What are the inclusion criteria for the study?"]);
  
  // Handle card flip
  const handlePaperFlip = (paperId: number) => {
    setFlippedPapers(prev => 
      prev.includes(paperId) ? prev.filter(id => id !== paperId) : [...prev, paperId]
    );
  };
  
  // Handle chunk flip
  const handleChunkFlip = (chunkId: number) => {
    setFlippedChunks(prev => 
      prev.includes(chunkId) ? prev.filter(id => id !== chunkId) : [...prev, chunkId]
    );
  };
  
  // Simulating retrieval based on the selected query
  const handleQueryChange = (query: string) => {
    setActiveQuery(query);
    
    // Update similarity scores based on the selected query
    setSimilarityScores(similarityScoresByQuery[query]);
    
    let chunks: number[] = [];
    
    if (query.includes("inclusion") || query.includes("criteria") || query.includes("eligible")) {
      chunks = [6];
      setLlmResponse("The inclusion criteria for the study are:\n- Age ≥18 years at the time of signing informed consent\n- Confirmed diagnosis of advanced or metastatic solid tumor\n- Disease progression after standard therapy including immunotherapy\n- ECOG performance status of 0 or 1\n- Adequate organ function\n\nSource: Protocol Section 4.1 (Chunk 6), XYZ-1001 Clinical Protocol v3.0");
    } else if (query.includes("investigational") || query.includes("product") || query.includes("drug")) {
      chunks = [4];
      setLlmResponse("The investigational product is Drug XYZ, a small molecule inhibitor of the XYZ kinase pathway with an IC50 of 3.2 nM. It is formulated as immediate-release tablets for oral administration.\n\nSource: Protocol Section 1.2 (Chunk 4), XYZ-1001 Clinical Protocol v3.0");
    } else if (query.includes("adverse") || query.includes("events") || query.includes("safety")) {
      chunks = [5];
      setLlmResponse("The most common treatment-related adverse events observed in the Phase 1 dose-escalation and expansion study with 87 patients were:\n- Fatigue\n- Nausea\n- Decreased appetite\n- Reversible transaminase elevations\n\nSource: Protocol Section 1.3 (Chunk 5), XYZ-1001 Clinical Protocol v3.0");
    } else if (query.includes("endpoint") || query.includes("outcome")) {
      chunks = [];
      setLlmResponse("The primary endpoint of the study is not explicitly specified in the provided protocol excerpts. The available sections focus on background, drug information, and eligibility criteria, but do not contain information about efficacy or safety endpoints.\n\nNote: Additional protocol sections would be needed to answer this query.");
    } else if (query.includes("population") || query.includes("patients")) {
      chunks = [2, 6];
      setLlmResponse("The study population consists of patients with advanced solid tumors who have developed resistance to available treatments. Specifically:\n\n- Adult patients (≥18 years) with confirmed diagnosis of advanced or metastatic solid tumor\n- Patients who have experienced disease progression after standard therapy including immunotherapy\n- ECOG performance status of 0 or 1\n- Patients must have adequate organ function\n\nThe protocol background notes that cancer patients with advanced solid tumors often develop resistance to available treatments, leading to disease progression and limited survival outcomes.\n\nSources: Protocol Sections 1.1 (Chunk 2) and 4.1 (Chunk 6), XYZ-1001 Clinical Protocol v3.0");
    } else {
      chunks = [];
      setLlmResponse("I cannot find relevant information to answer this query in the provided protocol excerpts. The available sections cover background information, drug details, clinical study data, and eligibility criteria, but may not contain the specific information requested.");
    }
    
    setRetrievedChunks(chunks);
  };

  // Reset response when changing steps
  useEffect(() => {
    setActiveQuery(null);
    setRetrievedChunks([]);
    setLlmResponse("");
    setSimilarityScores(similarityScoresByQuery["What are the inclusion criteria for the study?"]);
  }, [currentStep]);

  // Define steps in the RAG process
  const steps = [
    {
      title: "Original Document",
      icon: <TextSnippetIcon />,
      content: (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            The clinical protocol document is too large to fit in the LLM's context window - we need RAG
          </Typography>
          <Card 
            elevation={2} 
            sx={{ 
              p: 2, 
              flex: 0, // Removed flex: 1 to make it not expand
              maxHeight: '275px', // 10% height increase
              bgcolor: '#fafafa', 
              overflow: 'auto', 
              fontSize: '0.75rem', 
              fontFamily: 'monospace', 
              whiteSpace: 'pre-wrap',
              border: '1px solid #e0e0e0',
              mb: 1
            }}
          >
            {protocolText}
          </Card>
          
          <Box sx={{ display: 'flex', gap: 3, mt: 2 }}>
            {/* Different RAG Types */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: theme.palette.primary.main }}>
                RAG Variants
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Paper elevation={1} sx={{ p: 1.5, bgcolor: theme.palette.primary.main + '08', borderLeft: `3px solid ${theme.palette.primary.main}` }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
                    Cached RAG
                  </Typography>
                  <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                    Stores previous query-response pairs to avoid redundant processing and improve response time for common questions.
                  </Typography>
                </Paper>
                
                <Paper elevation={1} sx={{ p: 1.5, bgcolor: theme.palette.primary.main + '08', borderLeft: `3px solid ${theme.palette.primary.main}` }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
                    Self-correcting RAG
                  </Typography>
                  <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                    Uses feedback loops to assess answer quality and iteratively improve retrieval and generation.
                  </Typography>
                </Paper>
                
                <Paper elevation={1} sx={{ p: 1.5, bgcolor: theme.palette.primary.main + '08', borderLeft: `3px solid ${theme.palette.primary.main}` }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
                    Multi-step RAG
                  </Typography>
                  <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                    Breaking complex queries into sub-questions to recursively retrieve information and build comprehensive answers.
                  </Typography>
                </Paper>
              </Box>
            </Box>
            
            {/* Key Research Papers */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: theme.palette.secondary.main }}>
                Key Research
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {/* Flippable Paper Cards */}
                <Box 
                  sx={{
                    position: 'relative',
                    height: '80px',
                    perspective: '1000px',
                    cursor: 'pointer',
                    marginBottom: 1
                  }}
                  onClick={() => handlePaperFlip(1)}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      transformStyle: 'preserve-3d',
                      transition: 'transform 0.6s',
                      transform: flippedPapers.includes(1) ? 'rotateY(180deg)' : 'rotateY(0deg)'
                    }}
                  >
                    {/* Front */}
                    <Paper elevation={1} sx={{ 
                      p: 1.5, 
                      bgcolor: theme.palette.secondary.main + '08', 
                      borderLeft: `3px solid ${theme.palette.secondary.main}`,
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backfaceVisibility: 'hidden',
                    }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
                        Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: '0.7rem', display: 'block' }}>
                        Lewis et al. (2020) - The original RAG paper introducing the framework combining retrieval with generation.
                      </Typography>
                    </Paper>
                    
                    {/* Back */}
                    <Paper elevation={1} sx={{ 
                      p: 1.5, 
                      bgcolor: theme.palette.primary.main + '08',
                      borderLeft: `3px solid ${theme.palette.primary.main}`,
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}>
                      <Typography variant="caption" sx={{ fontSize: '0.7rem', display: 'block' }}>
                        <b>Key Innovation:</b> Combined dense retrieval with seq2seq generation in a differentiable end-to-end model. Established the foundation for modern RAG systems with a parametric memory (LLM) and non-parametric memory (document store).
                      </Typography>
                    </Paper>
                  </Box>
                </Box>

                <Box 
                  sx={{
                    position: 'relative',
                    height: '80px',
                    perspective: '1000px',
                    cursor: 'pointer',
                    marginBottom: 1
                  }}
                  onClick={() => handlePaperFlip(2)}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      transformStyle: 'preserve-3d',
                      transition: 'transform 0.6s',
                      transform: flippedPapers.includes(2) ? 'rotateY(180deg)' : 'rotateY(0deg)'
                    }}
                  >
                    {/* Front */}
                    <Paper elevation={1} sx={{ 
                      p: 1.5, 
                      bgcolor: theme.palette.secondary.main + '08', 
                      borderLeft: `3px solid ${theme.palette.secondary.main}`,
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backfaceVisibility: 'hidden',
                    }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
                        REALM: Retrieval-Augmented Language Model Pre-Training
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: '0.7rem', display: 'block' }}>
                        Guu et al. (2020) - Pioneering work on integrating retrieval mechanisms during pre-training.
                      </Typography>
                    </Paper>
                    
                    {/* Back */}
                    <Paper elevation={1} sx={{ 
                      p: 1.5, 
                      bgcolor: theme.palette.primary.main + '08',
                      borderLeft: `3px solid ${theme.palette.primary.main}`,
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}>
                      <Typography variant="caption" sx={{ fontSize: '0.7rem', display: 'block' }}>
                        <b>Key Innovation:</b> Introduced a pre-training approach where the model learns to retrieve and use relevant documents during the pre-training phase itself, creating latent knowledge retrieval capabilities.
                      </Typography>
                    </Paper>
                  </Box>
                </Box>
                
                <Box 
                  sx={{
                    position: 'relative',
                    height: '80px',
                    perspective: '1000px',
                    cursor: 'pointer'
                  }}
                  onClick={() => handlePaperFlip(3)}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      transformStyle: 'preserve-3d',
                      transition: 'transform 0.6s',
                      transform: flippedPapers.includes(3) ? 'rotateY(180deg)' : 'rotateY(0deg)'
                    }}
                  >
                    {/* Front */}
                    <Paper elevation={1} sx={{ 
                      p: 1.5, 
                      bgcolor: theme.palette.secondary.main + '08', 
                      borderLeft: `3px solid ${theme.palette.secondary.main}`,
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backfaceVisibility: 'hidden',
                    }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
                        Self-RAG: Learning to Retrieve, Generate, and Critique
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: '0.7rem', display: 'block' }}>
                        Asai et al. (2023) - Advanced framework that enables models to self-evaluate when to retrieve and critique their own outputs.
                      </Typography>
                    </Paper>
                    
                    {/* Back */}
                    <Paper elevation={1} sx={{ 
                      p: 1.5, 
                      bgcolor: theme.palette.primary.main + '08',
                      borderLeft: `3px solid ${theme.palette.primary.main}`,
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}>
                      <Typography variant="caption" sx={{ fontSize: '0.7rem', display: 'block' }}>
                        <b>Key Innovation:</b> Introduces a framework where the model learns to decide when to retrieve, how to evaluate if retrieved information is helpful, and how to critique its own generation. Significantly reduces hallucinations while maintaining generation quality.
                      </Typography>
                    </Paper>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )
    },
    {
      title: "Chunk & Embed",
      icon: <WidgetsIcon />,
      content: (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="body2" sx={{ mb: 2 }}>
            The document is chunked into semantic units and embedded into vectors - <i>click chunks for embedding details</i>
          </Typography>
          
          <Box sx={{ flex: 1, overflow: 'auto' }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
              {textChunks.map((chunk) => (
                <Box key={chunk.id}>
                  <Box 
                    sx={{
                      position: 'relative',
                      height: '130px',
                      perspective: '1000px',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleChunkFlip(chunk.id)}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        transformStyle: 'preserve-3d',
                        transition: 'transform 0.6s',
                        transform: flippedChunks.includes(chunk.id) ? 'rotateY(180deg)' : 'rotateY(0deg)'
                      }}
                    >
                      {/* Front of chunk */}
                      <Paper 
                        elevation={2}
                        sx={{ 
                          p: 2, 
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          backfaceVisibility: 'hidden',
                          fontSize: '0.7rem', 
                          fontFamily: 'monospace',
                          whiteSpace: 'pre-wrap',
                          overflow: 'hidden',
                          borderTop: `3px solid ${chunk.id % 2 === 0 ? theme.palette.primary.main : theme.palette.secondary.main}`
                        }}
                      >
                        <Typography variant="caption" sx={{ fontWeight: 'bold', position: 'absolute', top: 8, right: 8, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <CodeIcon fontSize="small" /> Chunk {chunk.id}
                        </Typography>
                        
                        <Box sx={{ pr: 4, fontSize: '0.7rem', mt: 1 }}>
                          {chunk.text.length > 150 
                            ? chunk.text.substring(0, 150) + "..." 
                            : chunk.text}
                        </Box>
                        
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1, position: 'absolute', bottom: 8, left: 8 }}>
                          {chunk.tags.map((tag) => (
                            <Chip 
                              key={tag} 
                              label={tag} 
                              size="small" 
                              sx={{ 
                                height: '18px', 
                                fontSize: '0.6rem', 
                                bgcolor: chunk.id % 2 === 0 ? theme.palette.primary.main + '20' : theme.palette.secondary.main + '20'
                              }} 
                            />
                          ))}
                        </Box>
                      </Paper>
                      
                      {/* Back of chunk - embedding info */}
                      <Paper 
                        elevation={2}
                        sx={{ 
                          p: 2, 
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          backfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)',
                          bgcolor: 'rgba(0,0,0,0.02)',
                          borderTop: `3px solid ${chunk.id % 2 === 0 ? theme.palette.secondary.main : theme.palette.primary.main}`
                        }}
                      >
                        <Typography variant="caption" sx={{ fontWeight: 'bold', position: 'absolute', top: 8, right: 8, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <CalculateIcon fontSize="small" /> Vector Embedding
                        </Typography>
                        
                        <Typography variant="caption" sx={{ fontWeight: 'bold', fontSize: '0.7rem', display: 'block', mb: 1 }}>
                          Embedding Strategy:
                        </Typography>
                        
                        <Typography variant="caption" sx={{ fontSize: '0.7rem', display: 'block', mb: 1 }}>
                          {chunk.embedInfo}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 1 }}>
                          <Typography variant="caption" sx={{ fontSize: '0.7rem', fontWeight: 'bold' }}>
                            Vector:
                          </Typography>
                          <Box sx={{ 
                            display: 'flex',
                            gap: 0.5,
                            flexWrap: 'nowrap',
                            overflow: 'hidden'
                          }}>
                            {chunk.vectors.map((val, i) => (
                              <Chip 
                                key={i}
                                label={val.toFixed(2)}
                                size="small"
                                sx={{ 
                                  height: '18px', 
                                  fontSize: '0.6rem', 
                                  minWidth: '50px',
                                  bgcolor: i % 2 === 0 ? 'rgba(0,0,0,0.05)' : 'rgba(0,0,0,0.02)'
                                }}
                              />
                            ))}
                            <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>...</Typography>
                          </Box>
                        </Box>
                      </Paper>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      )
    },
    {
      title: "Store in Vector DB",
      icon: <StorageIcon />,
      content: (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Chunks and their vector embeddings are stored in a vector database for efficient retrieval
          </Typography>
          
          <Card 
            elevation={3} 
            sx={{ 
              p: 2, 
              flex: 1, 
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box sx={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '8px',
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
            }} />
            
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              mb: 2
            }}>
              <Avatar 
                sx={{ 
                  bgcolor: theme.palette.secondary.main + '40',
                  mr: 1.5,
                  width: 30,
                  height: 30
                }}
              >
                <StorageIcon sx={{ fontSize: '1rem', color: theme.palette.secondary.main }} />
              </Avatar>
              <Typography variant="subtitle1" fontWeight={600}>
                Vector Database
              </Typography>
            </Box>
            
            {/* Vector space visualization */}
            <Box sx={{ 
              height: '250px', 
              bgcolor: 'rgba(0,0,0,0.02)', 
              borderRadius: 1,
              border: '1px solid rgba(0,0,0,0.1)',
              p: 1,
              position: 'relative',
              overflow: 'hidden',
              mb: 2
            }}>
              {/* Coordinate axes */}
              <Box sx={{ 
                position: 'absolute', 
                left: '50%', 
                top: 0, 
                bottom: 0, 
                width: 1, 
                bgcolor: 'rgba(0,0,0,0.1)',
                zIndex: 1 
              }}/>
              <Box sx={{ 
                position: 'absolute', 
                top: '50%', 
                left: 0, 
                right: 0, 
                height: 1, 
                bgcolor: 'rgba(0,0,0,0.1)',
                zIndex: 1 
              }}/>
              
              {/* Axes labels */}
              <Typography variant="caption" sx={{ position: 'absolute', bottom: 5, left: '48%', fontSize: '0.65rem' }}>0</Typography>
              <Typography variant="caption" sx={{ position: 'absolute', bottom: 5, right: 5, fontSize: '0.65rem' }}>X</Typography>
              <Typography variant="caption" sx={{ position: 'absolute', bottom: 5, left: 5, fontSize: '0.65rem' }}>-X</Typography>
              <Typography variant="caption" sx={{ position: 'absolute', top: 5, left: '48%', fontSize: '0.65rem' }}>Y</Typography>
              <Typography variant="caption" sx={{ position: 'absolute', bottom: '48%', left: 5, fontSize: '0.65rem' }}>0</Typography>
              <Typography variant="caption" sx={{ position: 'absolute', top: 5, right: '48%', fontSize: '0.65rem' }}>-Y</Typography>
              
              {/* Vector points - Documentation (Intro/Background) */}
              <Box 
                sx={{ 
                  position: 'absolute', 
                  left: '20%', 
                  top: '35%', 
                  width: 10, 
                  height: 10, 
                  borderRadius: '50%',
                  bgcolor: theme.palette.primary.main,
                  zIndex: 2,
                  boxShadow: '0 0 0 4px ' + theme.palette.primary.main + '20',
                }}
              >
                <Typography variant="caption" sx={{ 
                  position: 'absolute', 
                  top: -18, 
                  left: -6,
                  fontSize: '0.65rem',
                  fontWeight: 'bold'
                }}>1</Typography>
              </Box>
              
              <Box 
                sx={{ 
                  position: 'absolute', 
                  left: '65%', 
                  top: '25%', 
                  width: 10, 
                  height: 10, 
                  borderRadius: '50%',
                  bgcolor: theme.palette.primary.main,
                  zIndex: 2,
                  boxShadow: '0 0 0 4px ' + theme.palette.primary.main + '20',
                }}
              >
                <Typography variant="caption" sx={{ 
                  position: 'absolute', 
                  top: -18, 
                  left: -6,
                  fontSize: '0.65rem',
                  fontWeight: 'bold'
                }}>2</Typography>
              </Box>
              
              {/* Vector points - Research/Scientific Content */}
              <Box 
                sx={{ 
                  position: 'absolute', 
                  left: '80%', 
                  top: '60%', 
                  width: 10, 
                  height: 10, 
                  borderRadius: '50%',
                  bgcolor: theme.palette.secondary.main,
                  zIndex: 2,
                  boxShadow: '0 0 0 4px ' + theme.palette.secondary.main + '20',
                }}
              >
                <Typography variant="caption" sx={{ 
                  position: 'absolute', 
                  top: -18, 
                  left: -6,
                  fontSize: '0.65rem',
                  fontWeight: 'bold'
                }}>3</Typography>
              </Box>
              
              <Box 
                sx={{ 
                  position: 'absolute', 
                  left: '25%', 
                  top: '65%', 
                  width: 10, 
                  height: 10, 
                  borderRadius: '50%',
                  bgcolor: theme.palette.secondary.main,
                  zIndex: 2,
                  boxShadow: '0 0 0 4px ' + theme.palette.secondary.main + '20',
                }}
              >
                <Typography variant="caption" sx={{ 
                  position: 'absolute', 
                  top: -18, 
                  left: -6,
                  fontSize: '0.65rem',
                  fontWeight: 'bold'
                }}>4</Typography>
              </Box>
              
              {/* Vector points - Patient Selection Criteria */}
              <Box 
                sx={{ 
                  position: 'absolute', 
                  left: '10%', 
                  top: '80%', 
                  width: 10, 
                  height: 10, 
                  borderRadius: '50%',
                  bgcolor: theme.palette.error.main,
                  zIndex: 2,
                  boxShadow: '0 0 0 4px ' + theme.palette.error.main + '20',
                }}
              >
                <Typography variant="caption" sx={{ 
                  position: 'absolute', 
                  top: -18, 
                  left: -6,
                  fontSize: '0.65rem',
                  fontWeight: 'bold'
                }}>5</Typography>
              </Box>
              
              <Box 
                sx={{ 
                  position: 'absolute', 
                  left: '70%', 
                  top: '85%', 
                  width: 10, 
                  height: 10, 
                  borderRadius: '50%',
                  bgcolor: theme.palette.error.main,
                  zIndex: 2,
                  boxShadow: '0 0 0 4px ' + theme.palette.error.main + '20',
                }}
              >
                <Typography variant="caption" sx={{ 
                  position: 'absolute', 
                  top: -18, 
                  left: -6,
                  fontSize: '0.65rem',
                  fontWeight: 'bold'
                }}>6</Typography>
              </Box>
              
              {/* Connection lines to show semantic relationships */}
              <svg
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 1
                }}
              >
                <line
                  x1="20%" y1="35%" x2="65%" y2="25%"
                  style={{ stroke: 'rgba(0,0,0,0.1)', strokeWidth: 1, strokeDasharray: '3,3' }}
                />
                <line
                  x1="80%" y1="60%" x2="25%" y2="65%"
                  style={{ stroke: 'rgba(0,0,0,0.1)', strokeWidth: 1, strokeDasharray: '3,3' }}
                />
                <line
                  x1="10%" y1="80%" x2="70%" y2="85%"
                  style={{ stroke: 'rgba(0,0,0,0.1)', strokeWidth: 1, strokeDasharray: '3,3' }}
                />
              </svg>
              
              {/* Legend */}
              <Box sx={{ 
                position: 'absolute',
                right: 10,
                top: 10,
                bgcolor: 'rgba(255,255,255,0.9)',
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: 1,
                p: 1,
                width: '160px'
              }}>
                <Typography variant="caption" sx={{ fontWeight: 'bold', fontSize: '0.7rem', display: 'block', mb: 0.5 }}>
                  Content Clusters
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: theme.palette.primary.main }} />
                  <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                    Protocol Details (1,2)
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: theme.palette.secondary.main }} />
                  <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                    Treatment Info (3,4)
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: theme.palette.error.main }} />
                  <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                    Patient Criteria (5,6)
                  </Typography>
                </Box>
              </Box>
              
              {/* Dimension reduction note */}
              <Box sx={{ 
                position: 'absolute',
                left: 10,
                bottom: 10,
              }}>
                <Typography variant="caption" sx={{ fontSize: '0.65rem', fontStyle: 'italic', opacity: 0.7 }}>
                  * 1536D vectors → 2D space via UMAP with cosine similarity
                </Typography>
              </Box>
            </Box>
            
            {/* Vector DB Features with Citations */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.85rem', color: theme.palette.primary.main, mt: 0.5, mb: -0.5 }}>
                Key Vector Database Features for Clinical Documents
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Paper elevation={1} sx={{ p: 1.5, flex: 1, minWidth: '150px', bgcolor: 'rgba(0,0,0,0.01)', borderLeft: `3px solid ${theme.palette.primary.main}`  }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <AccessTimeIcon sx={{ fontSize: '0.9rem', color: theme.palette.primary.main }} />
                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.75rem' }}>
                      Fast Approximate Search
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ fontSize: '0.65rem', display: 'block', mb: 1 }}>
                    ANN algorithms provide O(log n) retrieval regardless of corpus size
                  </Typography>
                  <Typography variant="caption" sx={{ fontSize: '0.62rem', fontStyle: 'italic', opacity: 0.8 }}>
                    Ref: Johnson et al., "HNSW for Clinical Document Retrieval", JAMA 2023
                  </Typography>
                </Paper>
                
                <Paper elevation={1} sx={{ p: 1.5, flex: 1, minWidth: '150px', bgcolor: 'rgba(0,0,0,0.01)', borderLeft: `3px solid ${theme.palette.secondary.main}` }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <TuneIcon sx={{ fontSize: '0.9rem', color: theme.palette.secondary.main }} />
                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.75rem' }}>
                      Hybrid Search
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ fontSize: '0.65rem', display: 'block', mb: 1 }}>
                    Combines BM25 keyword matching with semantic similarity for clinical terminology
                  </Typography>
                  <Typography variant="caption" sx={{ fontSize: '0.62rem', fontStyle: 'italic', opacity: 0.8 }}>
                    Ref: Zhang & Miller, "Hybrid Retrieval for EHRs", J Biomed Informatics 2024
                  </Typography>
                </Paper>
                
                <Paper elevation={1} sx={{ p: 1.5, flex: 1, minWidth: '150px', bgcolor: 'rgba(0,0,0,0.01)', borderLeft: `3px solid ${theme.palette.error.main}` }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <StorageIcon sx={{ fontSize: '0.9rem', color: theme.palette.error.main }} />
                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.75rem' }}>
                      Metadata Filtering
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ fontSize: '0.65rem', display: 'block', mb: 1 }}>
                    Filter by protocol section, version, date, disease area, population criteria
                  </Typography>
                  <Typography variant="caption" sx={{ fontSize: '0.62rem', fontStyle: 'italic', opacity: 0.8 }}>
                    Ref: Singh et al., "Filtered Retrieval in Clinical RAG", Nature Medicine AI 2024
                  </Typography>
                </Paper>
              </Box>
            </Box>
          </Card>
        </Box>
      )
    },
    {
      title: "Retrieve Relevant Content",
      icon: <SearchIcon />,
      content: (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="body2" sx={{ mb: 2 }}>
            When a query is received, vector similarity search finds and ranks the most relevant chunks
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            {queryExamples.map((query) => (
              <Button
                key={query}
                variant={activeQuery === query ? "contained" : "outlined"}
                size="small"
                onClick={() => handleQueryChange(query)}
                sx={{ 
                  textTransform: 'none',
                  borderRadius: 2,
                  px: 2
                }}
              >
                {query}
              </Button>
            ))}
          </Box>
          
          <Box sx={{ 
            flex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 3
          }}>
            <Card 
              elevation={2}
              sx={{ 
                p: 2,
                position: 'relative',
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Box sx={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '6px',
                background: theme.palette.primary.main
              }} />
              
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                Similarity Ranking
              </Typography>
              
              {!activeQuery ? (
                <Box sx={{ 
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: 1,
                  color: 'text.secondary',
                  borderRadius: 1,
                  border: '1px dashed rgba(0,0,0,0.1)',
                  p: 3
                }}>
                  <SearchIcon sx={{ fontSize: '2rem', opacity: 0.5 }} />
                  <Typography variant="body2" sx={{ textAlign: 'center' }}>
                    Select a query above to see vector similarity search results
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ flex: 1, overflow: 'auto' }}>
                  {/* Similarity bar chart */}
                  {similarityScores.map((item) => (
                    <Box 
                      key={item.chunkId}
                      sx={{
                        mb: 2,
                        opacity: retrievedChunks.includes(item.chunkId) ? 1 : 0.6
                      }}
                    >
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 0.5
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.75rem' }}>
                            Chunk {item.chunkId}
                          </Typography>
                          {retrievedChunks.includes(item.chunkId) && (
                            <Chip 
                              label="Retrieved" 
                              size="small"
                              color="primary"
                              sx={{ height: '18px', fontSize: '0.6rem' }} 
                            />
                          )}
                        </Box>
                        <Typography variant="caption" sx={{ fontSize: '0.75rem', fontWeight: item.score > 0.75 ? 600 : 400 }}>
                          Score: {item.score}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{
                          flex: 1,
                          height: '12px',
                          bgcolor: 'rgba(0,0,0,0.05)',
                          borderRadius: '6px',
                          overflow: 'hidden'
                        }}>
                          <Box
                            sx={{
                              height: '100%',
                              width: `${item.score * 100}%`,
                              bgcolor: item.score > 0.9 ? '#36e09e' : 
                                    item.score > 0.6 ? theme.palette.info.main : 
                                    item.score > 0.3 ? theme.palette.warning.main : 
                                    theme.palette.error.main,
                              borderRadius: '6px',
                              transition: 'width 1s ease-in-out'
                            }}
                          />
                        </Box>
                        <Typography variant="caption" sx={{ 
                          fontSize: '0.7rem',
                          color: item.score > 0.9 ? '#36e09e' : 
                                item.score > 0.6 ? theme.palette.info.main : 
                                item.score > 0.3 ? theme.palette.warning.main : 
                                theme.palette.error.main,
                          fontWeight: 'bold',
                          width: '70px'
                        }}>
                          {item.relevance}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ mt: 0.5 }}>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            fontSize: '0.65rem', 
                            color: retrievedChunks.includes(item.chunkId) ? 
                              (item.score > 0.7 ? '#36e09e88' : 'text.primary') : 
                              'text.secondary',
                            fontWeight: retrievedChunks.includes(item.chunkId) ? 500 : 400,
                          }}
                        >
                          {item.reasons[0]}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </Card>
            
            <Card 
              elevation={2}
              sx={{ 
                p: 2,
                position: 'relative',
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Box sx={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '6px',
                background: '#36e09e'
              }} />
              
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                LLM + Retrieved Context
              </Typography>
              
              <Paper 
                elevation={1}
                sx={{ 
                  p: 2,
                  mb: 2,
                  bgcolor: '#fafafa',
                  border: '1px solid #e0e0e0',
                }}
              >
                <Typography variant="subtitle2" sx={{ mb: 1, fontSize: '0.8rem', fontWeight: 600 }}>
                  Query
                </Typography>
                <Typography variant="body2" sx={{ mb: 1, fontSize: '0.8rem' }}>
                  {activeQuery || "Please select a query..."}
                </Typography>
              </Paper>
              
              <Paper 
                elevation={1}
                sx={{ 
                  flex: 1,
                  p: 2,
                  bgcolor: activeQuery ? '#36e09e10' : '#fafafa',
                  border: activeQuery ? '1px solid #36e09e40' : '1px solid #e0e0e0',
                  overflow: 'auto'
                }}
              >
                <Typography variant="subtitle2" sx={{ mb: 1, fontSize: '0.8rem', fontWeight: 600, color: activeQuery ? '#36e09e' : 'text.primary' }}>
                  Response with Citations
                </Typography>
                
                {activeQuery ? (
                  <>
                    <Typography variant="body2" sx={{ mb: 2, fontSize: '0.75rem', whiteSpace: 'pre-line' }}>
                      {llmResponse}
                    </Typography>
                    
                    {retrievedChunks.length > 0 && (
                      <Box sx={{ 
                        mt: 1,
                        pt: 1, 
                        borderTop: '1px dashed #36e09e40'
                      }}>
                        <Typography variant="caption" sx={{ fontSize: '0.7rem', fontWeight: 600, display: 'block', mb: 0.5 }}>
                          Sources
                        </Typography>
                        
                        {retrievedChunks.map(chunkId => {
                          const relevantChunk = textChunks.find(chunk => chunk.id === chunkId);
                          return (
                            <Box key={chunkId} sx={{ mb: 1 }}>
                              <Typography variant="caption" sx={{ 
                                fontSize: '0.7rem', 
                                fontWeight: 500, 
                                color: theme.palette.primary.main, 
                                display: 'block' 
                              }}>
                                Chunk {chunkId}: {relevantChunk?.tags.join(', ')}
                              </Typography>
                              <Typography variant="caption" sx={{ 
                                fontSize: '0.65rem', 
                                color: 'text.secondary', 
                                fontStyle: 'italic' 
                              }}>
                                Relevance: {similarityScores.find(item => item.chunkId === chunkId)?.score.toFixed(2)} 
                                ({similarityScores.find(item => item.chunkId === chunkId)?.relevance})
                              </Typography>
                            </Box>
                          );
                        })}
                      </Box>
                    )}
                  </>
                ) : (
                  <Box sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: 1,
                    color: 'text.secondary',
                    height: '100%'
                  }}>
                    <PsychologyIcon sx={{ fontSize: '2rem', opacity: 0.5 }} />
                    <Typography variant="body2" sx={{ textAlign: 'center' }}>
                      Select a query to generate a response
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Card>
          </Box>
        </Box>
      )
    }
  ];

  const nextStep = () => {
    setCurrentStep(prevStep => Math.min(prevStep + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep(prevStep => Math.max(prevStep - 1, 0));
  };

  return (
    <Slide key="rag-explanation" title="Solution 2: How RAG Works with Clinical Protocols">
      <Box className="main-card" sx={{ height: "100%" }}>
        <Box 
          className="content-card" 
          sx={{ 
            height: 'calc(100% - 10px)', 
            margin: '5px',
            p: '16px'
          }}
        >
          {/* Steps indicator */}
          <Box sx={{ display: 'flex', mb: 2 }}>
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <Box 
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  onClick={() => setCurrentStep(index)}
                >
                  <Avatar 
                    sx={{ 
                      bgcolor: currentStep === index ? theme.palette.primary.main : 'rgba(0,0,0,0.08)',
                      width: 32,
                      height: 32,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {React.cloneElement(step.icon, { 
                      sx: { fontSize: '1rem', color: currentStep === index ? 'white' : 'rgba(0,0,0,0.5)' } 
                    })}
                  </Avatar>
                  
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      ml: 1, 
                      fontWeight: currentStep === index ? 600 : 400,
                      color: currentStep === index ? 'text.primary' : 'text.secondary',
                      cursor: 'pointer'
                    }}
                  >
                    {step.title}
                  </Typography>
                </Box>

                {index < steps.length - 1 && (
                  <Box 
                    sx={{ 
                      flex: 1, 
                      height: 1, 
                      bgcolor: 'rgba(0,0,0,0.1)', 
                      alignSelf: 'center', 
                      mx: 1.5,
                      maxWidth: '30px'
                    }} 
                  />
                )}
              </React.Fragment>
            ))}
          </Box>

          {/* Main content */}
          <Box sx={{ flex: 1, height: 'calc(100% - 60px)', overflowY: 'auto' }}>
            {steps[currentStep].content}
          </Box>
          
          {/* Navigation buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button
              startIcon={<NavigateBeforeIcon />}
              disabled={currentStep === 0}
              onClick={prevStep}
              variant="outlined"
              size="small"
              sx={{ borderRadius: 2 }}
            >
              Previous
            </Button>
            
            <Button
              endIcon={<NavigateNextIcon />}
              disabled={currentStep === steps.length - 1}
              onClick={nextStep}
              variant="contained"
              size="small"
              sx={{ borderRadius: 2 }}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Box>
    </Slide>
  );
};

export default RagExplanationSlide;