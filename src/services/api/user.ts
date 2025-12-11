import { delay, API_CONFIG } from "./config";
import type { User, ApiResponse, UpdateUserRequest, NotificationPreferences } from "./types";

// Mock user data
let mockUser: User = {
  id: "user-1",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  company: "Acme Corporation",
  location: "San Francisco, CA",
  memberSince: "December 2024",
};

let mockNotificationPrefs: NotificationPreferences = {
  emailDigest: true,
  projectUpdates: true,
  newFeatures: false,
  securityAlerts: true,
};

export const userApi = {
  // Get current user
  async getCurrentUser(): Promise<ApiResponse<User>> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      return { data: mockUser, success: true };
    }
    throw new Error("API not implemented");
  },

  // Update user profile
  async updateUser(data: UpdateUserRequest): Promise<ApiResponse<User>> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      mockUser = { ...mockUser, ...data };
      return { data: mockUser, success: true };
    }
    throw new Error("API not implemented");
  },

  // Get notification preferences
  async getNotificationPreferences(): Promise<ApiResponse<NotificationPreferences>> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      return { data: mockNotificationPrefs, success: true };
    }
    throw new Error("API not implemented");
  },

  // Update notification preferences
  async updateNotificationPreferences(
    data: Partial<NotificationPreferences>
  ): Promise<ApiResponse<NotificationPreferences>> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      mockNotificationPrefs = { ...mockNotificationPrefs, ...data };
      return { data: mockNotificationPrefs, success: true };
    }
    throw new Error("API not implemented");
  },

  // Change password (mock)
  async changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse<void>> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      // In real implementation, validate current password
      return { data: undefined, success: true };
    }
    throw new Error("API not implemented");
  },

  // Delete account (mock)
  async deleteAccount(): Promise<ApiResponse<void>> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      return { data: undefined, success: true };
    }
    throw new Error("API not implemented");
  },
};
