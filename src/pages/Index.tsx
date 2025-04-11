
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Welcome from '@/components/Welcome';
import Rooms from '@/components/Rooms';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Welcome />
      <Rooms />
      <Services />
      <Testimonials />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
