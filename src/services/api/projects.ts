import { delay, API_CONFIG } from "./config";
import type {
  Project,
  ApiResponse,
  CreateProjectRequest,
  UpdateProjectRequest,
} from "./types";

// Mock data
const mockProjects: Project[] = [
  {
    id: "proj-1",
    name: "Legal Contracts Analysis",
    description: "Analyze and extract key terms from vendor contracts and agreements",
    documentCount: 24,
    memberCount: 3,
    lastUpdated: "2024-12-10T14:30:00Z",
    createdAt: "2024-11-15T09:00:00Z",
  },
  {
    id: "proj-2",
    name: "Q4 Financial Reports",
    description: "Review quarterly financial statements and audit reports",
    documentCount: 12,
    memberCount: 5,
    lastUpdated: "2024-12-09T16:45:00Z",
    createdAt: "2024-10-01T10:00:00Z",
  },
  {
    id: "proj-3",
    name: "HR Policy Documents",
    description: "Employee handbook and policy documentation review",
    documentCount: 8,
    memberCount: 2,
    lastUpdated: "2024-12-08T11:20:00Z",
    createdAt: "2024-12-01T08:30:00Z",
  },
];

let projects = [...mockProjects];

export const projectsApi = {
  // Get all projects
  async getProjects(): Promise<ApiResponse<Project[]>> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      return { data: projects, success: true };
    }
    // Real API call would go here
    throw new Error("API not implemented");
  },

  // Get single project
  async getProject(id: string): Promise<ApiResponse<Project>> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      const project = projects.find((p) => p.id === id);
      if (!project) {
        return { data: null as unknown as Project, success: false, message: "Project not found" };
      }
      return { data: project, success: true };
    }
    throw new Error("API not implemented");
  },

  // Create project
  async createProject(data: CreateProjectRequest): Promise<ApiResponse<Project>> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      const newProject: Project = {
        id: `proj-${Date.now()}`,
        name: data.name,
        description: data.description || "",
        documentCount: 0,
        memberCount: 1,
        lastUpdated: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };
      projects = [newProject, ...projects];
      return { data: newProject, success: true };
    }
    throw new Error("API not implemented");
  },

  // Update project
  async updateProject(id: string, data: UpdateProjectRequest): Promise<ApiResponse<Project>> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      const index = projects.findIndex((p) => p.id === id);
      if (index === -1) {
        return { data: null as unknown as Project, success: false, message: "Project not found" };
      }
      projects[index] = {
        ...projects[index],
        ...data,
        lastUpdated: new Date().toISOString(),
      };
      return { data: projects[index], success: true };
    }
    throw new Error("API not implemented");
  },

  // Delete project
  async deleteProject(id: string): Promise<ApiResponse<void>> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      projects = projects.filter((p) => p.id !== id);
      return { data: undefined, success: true };
    }
    throw new Error("API not implemented");
  },
};
