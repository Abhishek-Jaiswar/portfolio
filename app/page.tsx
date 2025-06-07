import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </div>
    </main>
  );
}
