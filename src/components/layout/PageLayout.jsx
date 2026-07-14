import Navbar from './Navbar';
import Footer from './Footer';

/**
 * @param {object} props
 * @param {React.ReactNode} props.children
 */
export default function PageLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
