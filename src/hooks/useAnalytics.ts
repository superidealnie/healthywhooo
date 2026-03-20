import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { initAnalytics, trackPageView } from "@/lib/analytics";

/**
 * Hook to initialize analytics and track page views on route changes.
 * Place once in App.tsx inside the BrowserRouter.
 */
export const useAnalytics = () => {
  const location = useLocation();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initAnalytics();
      initialized.current = true;
    }
  }, []);

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);
};
