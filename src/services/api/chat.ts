import { delay, API_CONFIG } from "./config";
import type { ChatMessage, ApiResponse, SendMessageRequest, StreamingMessageCallback } from "./types";

// Mock data store
const mockMessages: Record<string, ChatMessage[]> = {
  "proj-1": [
    {
      id: "msg-1",
      projectId: "proj-1",
      role: "user",
      content: "What are the key termination clauses in our vendor contracts?",
      timestamp: "2024-12-10T14:00:00Z",
    },
    {
      id: "msg-2",
      projectId: "proj-1",
      role: "assistant",
      content: "Based on my analysis of your vendor contracts, here are the key termination clauses:\n\n**1. Termination for Convenience**\nMost contracts allow either party to terminate with 30-90 days written notice without cause.\n\n**2. Termination for Breach**\nMaterial breach allows immediate termination after a cure period (typically 30 days).\n\n**3. Termination for Insolvency**\nAutomatic termination rights if either party becomes insolvent or files for bankruptcy.",
      timestamp: "2024-12-10T14:01:00Z",
      sources: [
        { id: "doc-1", name: "Vendor Agreement - Acme Corp.pdf", page: 12, snippet: "Either party may terminate this Agreement for convenience upon ninety (90) days prior written notice..." },
        { id: "doc-2", name: "Master Services Agreement.pdf", page: 8, snippet: "In the event of a material breach, the non-breaching party may terminate..." },
      ],
    },
  ],
  "proj-2": [],
  "proj-3": [],
};

const messages = { ...mockMessages };

export const chatApi = {
  // Get chat history for a project
  async getMessages(projectId: string): Promise<ApiResponse<ChatMessage[]>> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      return { data: messages[projectId] || [], success: true };
    }
    throw new Error("API not implemented");
  },

  // Send message and get response (non-streaming)
  async sendMessage(data: SendMessageRequest): Promise<ApiResponse<ChatMessage>> {
    if (API_CONFIG.USE_MOCK) {
      await delay();

      // Add user message
      const userMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        projectId: data.projectId,
        role: "user",
        content: data.content,
        timestamp: new Date().toISOString(),
      };

      if (!messages[data.projectId]) {
        messages[data.projectId] = [];
      }
      messages[data.projectId].push(userMessage);

      // Generate assistant response
      await delay(1000);
      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        projectId: data.projectId,
        role: "assistant",
        content: "Based on my analysis of your documents, I found several relevant sections. The key points are:\n\n**1. Main Finding**\nYour documents contain important information related to your query.\n\n**2. Supporting Details**\nAdditional context from the indexed documents supports this conclusion.",
        timestamp: new Date().toISOString(),
        sources: [
          {
            id: "source-1",
            name: "Document Analysis.pdf",
            page: 5,
            snippet: "Relevant excerpt from the document that supports the response...",
          },
        ],
      };

      messages[data.projectId].push(assistantMessage);
      return { data: assistantMessage, success: true };
    }
    throw new Error("API not implemented");
  },

  // Send message with streaming response
  async sendMessageStreaming(
    data: SendMessageRequest,
    callbacks: StreamingMessageCallback
  ): Promise<void> {
    if (API_CONFIG.USE_MOCK) {
      // Add user message
      const userMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        projectId: data.projectId,
        role: "user",
        content: data.content,
        timestamp: new Date().toISOString(),
      };

      if (!messages[data.projectId]) {
        messages[data.projectId] = [];
      }
      messages[data.projectId].push(userMessage);

      // Simulate streaming response
      const responseChunks = [
        "Based on my analysis of your documents, ",
        "I found several relevant sections. ",
        "The key points are:\n\n",
        "**1. Main Finding**\n",
        "Your documents contain important information related to your query.\n\n",
        "**2. Supporting Details**\n",
        "Additional context from the indexed documents supports this conclusion.",
      ];

      let fullContent = "";
      for (const chunk of responseChunks) {
        await delay(100);
        fullContent += chunk;
        callbacks.onToken(chunk);
      }

      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        projectId: data.projectId,
        role: "assistant",
        content: fullContent,
        timestamp: new Date().toISOString(),
        sources: [
          {
            id: "source-1",
            name: "Document Analysis.pdf",
            page: 5,
            snippet: "Relevant excerpt from the document...",
          },
        ],
      };

      messages[data.projectId].push(assistantMessage);
      callbacks.onComplete(assistantMessage);
      return;
    }
    throw new Error("API not implemented");
  },

  // Clear chat history
  async clearHistory(projectId: string): Promise<ApiResponse<void>> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      messages[projectId] = [];
      return { data: undefined, success: true };
    }
    throw new Error("API not implemented");
  },
};
