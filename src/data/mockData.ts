export interface Project {
  id: string;
  name: string;
  description: string;
  documentCount: number;
  memberCount: number;
  lastUpdated: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  initials: string;
  memberSince: string;
}

export const mockUser: User = {
  id: "user-1",
  name: "John Doe",
  email: "john.doe@example.com",
  initials: "JD",
  memberSince: "December 2024",
};

export const mockProjects: Project[] = [
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
