import { delay, API_CONFIG } from "./config";
import type { SavedPrompt, ApiResponse, CreatePromptRequest, UpdatePromptRequest } from "./types";

// Mock data
const mockPrompts: SavedPrompt[] = [
  {
    id: "prompt-1",
    userId: "user-1",
    title: "Key Terms Extraction",
    text: "Extract all key terms, definitions, and important clauses from this document. Present them in a structured format with the term name, its definition, and the page/section where it appears.",
    category: "extraction",
    createdAt: "2024-11-20T10:00:00Z",
    updatedAt: "2024-12-01T14:30:00Z",
  },
  {
    id: "prompt-2",
    userId: "user-1",
    title: "Document Summary",
    text: "Provide a comprehensive summary of this document including:\n1. Main purpose and objectives\n2. Key stakeholders mentioned\n3. Important dates and deadlines\n4. Critical action items or requirements",
    category: "summary",
    createdAt: "2024-11-22T09:00:00Z",
    updatedAt: "2024-11-22T09:00:00Z",
  },
  {
    id: "prompt-3",
    userId: "user-1",
    title: "Risk Analysis",
    text: "Analyze this document for potential risks and liabilities. Identify any clauses that could pose legal, financial, or operational risks. Rate each risk as high, medium, or low and explain the reasoning.",
    category: "analysis",
    createdAt: "2024-11-25T11:00:00Z",
    updatedAt: "2024-12-05T16:20:00Z",
  },
  {
    id: "prompt-4",
    userId: "user-1",
    title: "Contract Comparison",
    text: "Compare the terms in this document with standard industry practices. Highlight any unusual or non-standard clauses that may require additional review or negotiation.",
    category: "comparison",
    createdAt: "2024-12-01T08:00:00Z",
    updatedAt: "2024-12-01T08:00:00Z",
  },
  {
    id: "prompt-5",
    userId: "user-1",
    title: "Compliance Check",
    text: "Review this document for compliance with relevant regulations and standards. List any potential compliance issues or gaps that need to be addressed.",
    category: "analysis",
    createdAt: "2024-12-03T14:00:00Z",
    updatedAt: "2024-12-03T14:00:00Z",
  },
];

let prompts = [...mockPrompts];

export const promptsApi = {
  // Get all prompts
  async getPrompts(): Promise<ApiResponse<SavedPrompt[]>> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      return { data: prompts, success: true };
    }
    throw new Error("API not implemented");
  },

  // Get single prompt
  async getPrompt(id: string): Promise<ApiResponse<SavedPrompt>> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      const prompt = prompts.find((p) => p.id === id);
      if (!prompt) {
        return { data: null as unknown as SavedPrompt, success: false, message: "Prompt not found" };
      }
      return { data: prompt, success: true };
    }
    throw new Error("API not implemented");
  },

  // Create prompt
  async createPrompt(data: CreatePromptRequest): Promise<ApiResponse<SavedPrompt>> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      const newPrompt: SavedPrompt = {
        id: `prompt-${Date.now()}`,
        userId: "user-1",
        title: data.title,
        text: data.text,
        category: data.category,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      prompts = [newPrompt, ...prompts];
      return { data: newPrompt, success: true };
    }
    throw new Error("API not implemented");
  },

  // Update prompt
  async updatePrompt(id: string, data: UpdatePromptRequest): Promise<ApiResponse<SavedPrompt>> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      const index = prompts.findIndex((p) => p.id === id);
      if (index === -1) {
        return { data: null as unknown as SavedPrompt, success: false, message: "Prompt not found" };
      }
      prompts[index] = {
        ...prompts[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      return { data: prompts[index], success: true };
    }
    throw new Error("API not implemented");
  },

  // Delete prompt
  async deletePrompt(id: string): Promise<ApiResponse<void>> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      prompts = prompts.filter((p) => p.id !== id);
      return { data: undefined, success: true };
    }
    throw new Error("API not implemented");
  },
};
