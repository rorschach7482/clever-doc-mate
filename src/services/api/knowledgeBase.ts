import type { KnowledgeBaseDocument } from "./types";

// Mock data for Knowledge Base documents
let mockKBDocuments: KnowledgeBaseDocument[] = [
  {
    id: "kb-1",
    filename: "Company Compliance Policy 2024.pdf",
    uploadedAt: "2024-01-15T10:00:00Z",
    status: "indexed",
    size: 2456000,
  },
  {
    id: "kb-2",
    filename: "Industry Regulations Q4.pdf",
    uploadedAt: "2024-01-10T14:30:00Z",
    status: "indexed",
    size: 1890000,
  },
  {
    id: "kb-3",
    filename: "Partner Guidelines.pdf",
    uploadedAt: "2024-01-20T09:15:00Z",
    status: "processing",
    size: 980000,
  },
];

// Simulated delay for API calls
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const knowledgeBaseApi = {
  // List all Knowledge Base documents
  list: async (): Promise<KnowledgeBaseDocument[]> => {
    await delay(300);
    return [...mockKBDocuments];
  },

  // Upload a new document to the Knowledge Base
  upload: async (
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<KnowledgeBaseDocument> => {
    // Simulate upload progress
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress > 100) progress = 100;
      onProgress?.(progress);
      if (progress >= 100) clearInterval(progressInterval);
    }, 200);

    await delay(1500);
    clearInterval(progressInterval);
    onProgress?.(100);

    const newDoc: KnowledgeBaseDocument = {
      id: `kb-${Date.now()}`,
      filename: file.name,
      uploadedAt: new Date().toISOString(),
      status: "processing",
      size: file.size,
    };

    mockKBDocuments = [newDoc, ...mockKBDocuments];

    // Simulate processing completion
    setTimeout(() => {
      mockKBDocuments = mockKBDocuments.map((doc) =>
        doc.id === newDoc.id ? { ...doc, status: "indexed" as const } : doc
      );
    }, 3000);

    return newDoc;
  },

  // Delete a document from the Knowledge Base
  delete: async (id: string): Promise<void> => {
    await delay(300);
    mockKBDocuments = mockKBDocuments.filter((doc) => doc.id !== id);
  },
};
