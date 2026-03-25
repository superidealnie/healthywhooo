import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAnalytics } from "@/hooks/useAnalytics";
import Intro from "./pages/Intro";
import ChooseGuide from "./pages/ChooseGuide";
import Scanner from "./pages/Scanner";
import ComingSoon from "./pages/ComingSoon";
import ReportedIngredients from "./pages/ReportedIngredients";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnalyticsProvider = ({ children }: { children: React.ReactNode }) => {
  useAnalytics();
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnalyticsProvider>
          <Routes>
            <Route path="/" element={<ChooseGuide />} />
            <Route path="/scanner" element={<Scanner />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="/reported" element={<ReportedIngredients />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnalyticsProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
