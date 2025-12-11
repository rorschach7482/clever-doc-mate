import { delay, API_CONFIG } from "./config";
import type { ProjectDocument, ApiResponse } from "./types";

// Mock data store
const mockDocuments: Record<string, ProjectDocument[]> = {
  "proj-1": [
    { id: "doc-1", projectId: "proj-1", name: "Vendor Agreement - Acme Corp.pdf", size: 2456000, type: "application/pdf", status: "indexed", uploadedAt: "2024-12-05T10:00:00Z", uploadedBy: "John Doe" },
    { id: "doc-2", projectId: "proj-1", name: "Master Services Agreement.pdf", size: 1890000, type: "application/pdf", status: "indexed", uploadedAt: "2024-12-06T11:30:00Z", uploadedBy: "John Doe" },
    { id: "doc-3", projectId: "proj-1", name: "NDA - Partner Inc.pdf", size: 567000, type: "application/pdf", status: "processing", uploadedAt: "2024-12-10T14:20:00Z", uploadedBy: "Jane Smith" },
  ],
  "proj-2": [
    { id: "doc-4", projectId: "proj-2", name: "Q4 Financial Statement.pdf", size: 4500000, type: "application/pdf", status: "indexed", uploadedAt: "2024-12-01T09:00:00Z", uploadedBy: "John Doe" },
  ],
  "proj-3": [],
};

const documents = { ...mockDocuments };

export const documentsApi = {
  // Get documents for a project
  async getDocuments(projectId: string): Promise<ApiResponse<ProjectDocument[]>> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      return { data: documents[projectId] || [], success: true };
    }
    throw new Error("API not implemented");
  },

  // Upload document (mock)
  async uploadDocument(
    projectId: string,
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<ProjectDocument>> {
    if (API_CONFIG.USE_MOCK) {
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 20) {
        await delay(100);
        onProgress?.(i);
      }

      const newDoc: ProjectDocument = {
        id: `doc-${Date.now()}`,
        projectId,
        name: file.name,
        size: file.size,
        type: file.type,
        status: "processing",
        uploadedAt: new Date().toISOString(),
        uploadedBy: "John Doe",
      };

      if (!documents[projectId]) {
        documents[projectId] = [];
      }
      documents[projectId] = [newDoc, ...documents[projectId]];

      // Simulate processing completion
      setTimeout(() => {
        const docIndex = documents[projectId].findIndex((d) => d.id === newDoc.id);
        if (docIndex !== -1) {
          documents[projectId][docIndex].status = "indexed";
        }
      }, 2000);

      return { data: newDoc, success: true };
    }
    throw new Error("API not implemented");
  },

  // Delete document
  async deleteDocument(projectId: string, documentId: string): Promise<ApiResponse<void>> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      if (documents[projectId]) {
        documents[projectId] = documents[projectId].filter((d) => d.id !== documentId);
      }
      return { data: undefined, success: true };
    }
    throw new Error("API not implemented");
  },

  // Get document status
  async getDocumentStatus(projectId: string, documentId: string): Promise<ApiResponse<ProjectDocument>> {
    if (API_CONFIG.USE_MOCK) {
      await delay(200);
      const doc = documents[projectId]?.find((d) => d.id === documentId);
      if (!doc) {
        return { data: null as unknown as ProjectDocument, success: false, message: "Document not found" };
      }
      return { data: doc, success: true };
    }
    throw new Error("API not implemented");
  },
};
