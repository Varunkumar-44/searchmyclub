import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Disclaimer from '../components/Disclaimer';

export default function DisclaimerPage() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Disclaimer />
      <Footer />
    </div>
  );
}
