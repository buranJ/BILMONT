import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";
import Hero from "../components/sections/Hero.jsx";
import FeatureGrid from "../components/sections/FeatureGrid.jsx";
import LearningSystem from "../components/sections/LearningSystem.jsx";
import Director from "../components/sections/Director.jsx";
import Interior from "../components/sections/Interior.jsx";
import Contact from "../components/sections/Contact.jsx";

/**
 * Landing page. Section order:
 *   Hero → Features (2×2) → Learning System → Director → Interior → Contact → Footer.
 * The feature layout mirrors the Flowblox grid: photo · text / text · photo.
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main>
        <Hero />
        <FeatureGrid />
        <LearningSystem />
        <Director />
        <Interior />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
