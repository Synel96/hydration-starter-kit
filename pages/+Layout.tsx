import "./Layout.css";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { PageLoading } from "../components/PageLoading";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#page-content" className="skip-link">
        Skip to content
      </a>
      <PageLoading />
      <Navbar />
      <main id="page-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
