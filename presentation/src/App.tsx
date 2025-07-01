import { useState } from 'react';
import { useTheme } from '@mui/material';
import PresentationLayout from './components/PresentationLayout';

// Import refactored slide components
import TitleSlide from './slides/TitleSlide';
import ContextWindowSlide from './slides/ContextWindowSlide';
import ContextSolutionsSlide from './slides/ContextSolutionsSlide';
import ContextChallengesSlide from './slides/ContextChallengesSlide';
import RagExplanationSlide from './slides/RagExplanationSlide';
import StudyProtocolOverviewSlide from './slides/StudyProtocolOverviewSlide';
import SPAProcessSlide from './slides/SPAProcessSlide';
import SPAMetricsSlide from './slides/SPAMetricsSlide';
import RagBenefitsSlide from './slides/RagBenefitsSlide';
import RagArchitectureSlide from './slides/RagArchitectureSlide';
import DemoSlide from './slides/DemoSlide';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const theme = useTheme();
  
  // Define slides using imported components
  const slides = [
    <TitleSlide key="title" theme={theme} />,
    <ContextWindowSlide key="context-window" theme={theme} />,
    <ContextSolutionsSlide key="context-solutions" theme={theme} />,
    <ContextChallengesSlide key="context-challenges" theme={theme} />,
    <RagExplanationSlide key="rag-explanation" theme={theme} />,
    <StudyProtocolOverviewSlide key="spa-overview" theme={theme} />,
    <SPAProcessSlide key="spa-process" theme={theme} />,
    <SPAMetricsSlide key="spa-metrics" theme={theme} />,
    <RagBenefitsSlide key="rag-benefits" theme={theme} />,
    <DemoSlide key="demo" theme={theme} />
  ];

  const handleNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleGoToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  return (
    <PresentationLayout
      totalSlides={slides.length}
      currentSlide={currentSlide}
      onNextSlide={handleNextSlide}
      onPrevSlide={handlePrevSlide}
      onGoToSlide={handleGoToSlide}
    >
      {slides[currentSlide]}
    </PresentationLayout>
  );
}

export default App;