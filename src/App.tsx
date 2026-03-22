import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import WelcomeScreen from "./pages/WelcomeScreen";
import RegistrationScreen from "./pages/RegistrationScreen";
import AuthenticationScreen from "./pages/AuthenticationScreen";
import Dashboard from "./pages/Dashboard";
import ChatScreen from "./pages/ChatScreen";
import ComplaintScreen from "./pages/ComplaintScreen";
import ServiceResultScreen from "./pages/ServiceResultScreen";
import ResolutionScreen from "./pages/ResolutionScreen";
import FeedbackScreen from "./pages/FeedbackScreen";
import AnalyticsScreen from "./pages/AnalyticsScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/register" element={<RegistrationScreen />} />
          <Route path="/authenticate" element={<AuthenticationScreen />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat" element={<ChatScreen />} />
          <Route path="/complaint" element={<ComplaintScreen />} />
          <Route path="/service-result" element={<ServiceResultScreen />} />
          <Route path="/resolution" element={<ResolutionScreen />} />
          <Route path="/feedback" element={<FeedbackScreen />} />
          <Route path="/analytics" element={<AnalyticsScreen />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
