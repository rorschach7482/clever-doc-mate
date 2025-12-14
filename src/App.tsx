import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChatThreadsProvider } from "./contexts/ChatThreadsContext";
import Dashboard from "./pages/Dashboard";
import ProjectWorkspace from "./pages/ProjectWorkspace";
import PromptsLibrary from "./pages/PromptsLibrary";
import Profile from "./pages/Profile";
import CentralChat from "./pages/CentralChat";
import RecentChats from "./pages/RecentChats";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ChatThreadsProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects/:projectId" element={<ProjectWorkspace />} />
            <Route path="/prompts" element={<PromptsLibrary />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/chat" element={<CentralChat />} />
            <Route path="/chat/:chatId" element={<CentralChat />} />
            <Route path="/chats" element={<RecentChats />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ChatThreadsProvider>
  </QueryClientProvider>
);

export default App;
