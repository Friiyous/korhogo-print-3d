import Navbar from "./components/Navbar";
import Hero3D from "./components/Hero3D";
import StudioConfigurateur3D from "./components/StudioConfigurateur3D";
import SectionServices from "./components/sections/SectionServices";
import SectionExpeditionNord from "./components/sections/SectionExpeditionNord";
import SectionRealisations from "./components/sections/SectionRealisations";
import SectionTarifs from "./components/sections/SectionTarifs";
import SectionAtelier from "./components/sections/SectionAtelier";
import SectionContact from "./components/sections/SectionContact";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-papier transition-colors duration-500">
        <Navbar />
        <Hero3D />
        <StudioConfigurateur3D />
        <SectionServices />
        <SectionExpeditionNord />
        <SectionRealisations />
        <SectionTarifs />
        <SectionAtelier />
        <SectionContact />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

