import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";
import { Link } from "wouter";
import { LanguageProvider } from "./lib/languageContext";
import { isMaintenanceMode } from "./lib/maintenance";
import { useGoogleAnalytics } from "./hooks/use-google-analytics";

// Page imports
import NotFound from "./pages/not-found";
import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";
import Layout from "./components/layout/layout";
import Home from "./pages/home";
import AIBuilders from "./pages/aibuilders";
import AITrainers from "./pages/ai-trainers";
import AIWorkforce from "./pages/ai-workforce";
import AIStore from "./pages/ai-store";
import Contact from "./pages/contact";
import Maintenance from "./pages/maintenance";
import FactoryTour from "./pages/factory-tour";

function Router() {
  // Show maintenance page if maintenance mode is enabled
  if (isMaintenanceMode()) {
    return <Maintenance />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Layout>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/aibuilders" component={AIBuilders} />
            <Route path="/ai-trainers" component={AITrainers} />
            <Route path="/ai-workforce" component={AIWorkforce} />
            <Route path="/ai-store" component={AIStore} />
            <Route path="/factory-tour" component={FactoryTour} />
            <Route path="/contact" component={Contact} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  // Gọi hook Google Analytics
  useGoogleAnalytics(import.meta.env.VITE_GOOGLE_ANALYTICS_ID);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Router />
        <Toaster />
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
