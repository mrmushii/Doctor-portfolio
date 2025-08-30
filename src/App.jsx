import AchievementsSection from "./components/AchievementSection";
import Credentials from "./components/Credentials";
import Footer from "./components/Footer";
import IntroSection from "./components/IntroSection";
import MouseFollowGradient from "./components/MouseFollowGradient";
import ResearcherMind from "./components/ResearcherMind";
import StaticFooter from "./components/SaticFooter";
import StorySection from "./components/StorySection";

const App = () => {
  return (
    <main className="dynamic-background">
      <MouseFollowGradient />
      <IntroSection />
      <StorySection/>
      <AchievementsSection/>
      <ResearcherMind/>
      <Credentials/>
      <StaticFooter/>
      <Footer/>
      
      
      {/* Final section can be its own component too! */}
      
    </main>
  );
};

export default App;