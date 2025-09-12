import { useState } from "react";
import { LandingPage } from "@/components/LandingPage";
import { MainWorkspace } from "@/components/MainWorkspace";

const Index = () => {
  const [currentIdea, setCurrentIdea] = useState<string | null>(null);

  const handleSubmitIdea = (idea: string) => {
    setCurrentIdea(idea);
  };

  const handleBackToLanding = () => {
    setCurrentIdea(null);
  };

  if (currentIdea) {
    return (
      <MainWorkspace 
        initialIdea={currentIdea} 
        onBackToLanding={handleBackToLanding}
      />
    );
  }

  return <LandingPage onSubmitIdea={handleSubmitIdea} />;
};

export default Index;
