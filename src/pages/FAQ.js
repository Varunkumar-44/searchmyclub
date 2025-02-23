import FAQ from '../components/FAQ';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function FAQPage() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <FAQ />
      <Footer />
    </div>
  );
}
