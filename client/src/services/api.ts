import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import {
  ApiResponse,
  Profile,
  Project,
  Experience,
  Education,
  Skill,
  ContactMessage,
  ContactFormData,
  LoginResponse,
  User,
  DashboardStats,
  SkillCategory,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 20000,
});

// Request interceptor: Attach JWT token if available
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('portfolio_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Extract data or reject with structured error message
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'An unexpected network error occurred';
    return Promise.reject(new Error(message));
  }
);

// Profile API (Personal Info, Hero, About, Socials, Resume)
export const profileAPI = {
  get: async (): Promise<Profile> => {
    const res = await apiClient.get<ApiResponse<Profile>>('/profile');
    return res.data.data!;
  },
  update: async (data: Partial<Profile>): Promise<Profile> => {
    const res = await apiClient.put<ApiResponse<Profile>>('/profile', data);
    return res.data.data!;
  },
  uploadFile: async (file: File): Promise<{ url: string; filename: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await apiClient.post<ApiResponse<{ url: string; filename: string }>>(
      '/profile/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return res.data.data!;
  },
};

// Projects API
export const projectsAPI = {
  getAll: async (featured?: boolean): Promise<Project[]> => {
    const params = featured !== undefined ? { featured } : {};
    const res = await apiClient.get<ApiResponse<Project[]>>('/projects', { params });
    return res.data.data || [];
  },
  getById: async (id: string): Promise<Project> => {
    const res = await apiClient.get<ApiResponse<Project>>(`/projects/${id}`);
    if (!res.data.data) throw new Error('Project not found');
    return res.data.data;
  },
  create: async (data: Partial<Project>): Promise<Project> => {
    const res = await apiClient.post<ApiResponse<Project>>('/projects', data);
    return res.data.data!;
  },
  update: async (id: string, data: Partial<Project>): Promise<Project> => {
    const res = await apiClient.put<ApiResponse<Project>>(`/projects/${id}`, data);
    return res.data.data!;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete<ApiResponse<null>>(`/projects/${id}`);
  },
};

// Experience API
export const experiencesAPI = {
  getAll: async (): Promise<Experience[]> => {
    const res = await apiClient.get<ApiResponse<Experience[]>>('/experiences');
    return res.data.data || [];
  },
  getById: async (id: string): Promise<Experience> => {
    const res = await apiClient.get<ApiResponse<Experience>>(`/experiences/${id}`);
    return res.data.data!;
  },
  create: async (data: Partial<Experience>): Promise<Experience> => {
    const res = await apiClient.post<ApiResponse<Experience>>('/experiences', data);
    return res.data.data!;
  },
  update: async (id: string, data: Partial<Experience>): Promise<Experience> => {
    const res = await apiClient.put<ApiResponse<Experience>>(`/experiences/${id}`, data);
    return res.data.data!;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete<ApiResponse<null>>(`/experiences/${id}`);
  },
};

// Education API
export const educationAPI = {
  getAll: async (): Promise<Education[]> => {
    const res = await apiClient.get<ApiResponse<Education[]>>('/education');
    return res.data.data || [];
  },
  getById: async (id: string): Promise<Education> => {
    const res = await apiClient.get<ApiResponse<Education>>(`/education/${id}`);
    return res.data.data!;
  },
  create: async (data: Partial<Education>): Promise<Education> => {
    const res = await apiClient.post<ApiResponse<Education>>('/education', data);
    return res.data.data!;
  },
  update: async (id: string, data: Partial<Education>): Promise<Education> => {
    const res = await apiClient.put<ApiResponse<Education>>(`/education/${id}`, data);
    return res.data.data!;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete<ApiResponse<null>>(`/education/${id}`);
  },
};

// Skills API
export const skillsAPI = {
  getAll: async (category?: SkillCategory): Promise<Skill[]> => {
    const params = category ? { category } : {};
    const res = await apiClient.get<ApiResponse<Skill[]>>('/skills', { params });
    return res.data.data || [];
  },
  getGrouped: async (): Promise<Record<string, Skill[]>> => {
    const res = await apiClient.get<ApiResponse<Record<string, Skill[]>>>('/skills/grouped');
    return res.data.data || {};
  },
  getById: async (id: string): Promise<Skill> => {
    const res = await apiClient.get<ApiResponse<Skill>>(`/skills/${id}`);
    return res.data.data!;
  },
  create: async (data: Partial<Skill>): Promise<Skill> => {
    const res = await apiClient.post<ApiResponse<Skill>>('/skills', data);
    return res.data.data!;
  },
  update: async (id: string, data: Partial<Skill>): Promise<Skill> => {
    const res = await apiClient.put<ApiResponse<Skill>>(`/skills/${id}`, data);
    return res.data.data!;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete<ApiResponse<null>>(`/skills/${id}`);
  },
};

// Contact API
export const contactAPI = {
  send: async (data: ContactFormData): Promise<ApiResponse<ContactMessage>> => {
    const res = await apiClient.post<ApiResponse<ContactMessage>>('/contact', data);
    return res.data;
  },
  getAll: async (): Promise<ContactMessage[]> => {
    const res = await apiClient.get<ApiResponse<ContactMessage[]>>('/contact');
    return res.data.data || [];
  },
  markAsRead: async (id: string): Promise<ContactMessage> => {
    const res = await apiClient.put<ApiResponse<ContactMessage>>(`/contact/${id}/read`);
    return res.data.data!;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete<ApiResponse<null>>(`/contact/${id}`);
  },
};

// Auth API
export const authAPI = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const res = await apiClient.post<ApiResponse<LoginResponse>>('/auth/login', { email, password });
    if (!res.data.data) throw new Error('Authentication failed');
    localStorage.setItem('portfolio_token', res.data.data.token);
    localStorage.setItem('portfolio_user', JSON.stringify(res.data.data.user));
    return res.data.data;
  },
  getMe: async (): Promise<User> => {
    const res = await apiClient.get<ApiResponse<User>>('/auth/me');
    return res.data.data!;
  },
  logout: (): void => {
    localStorage.removeItem('portfolio_token');
    localStorage.removeItem('portfolio_user');
  },
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('portfolio_user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr) as User;
    } catch {
      return null;
    }
  },
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('portfolio_token');
  },
};

// Admin Stats API
export const statsAPI = {
  getStats: async (): Promise<DashboardStats> => {
    const res = await apiClient.get<ApiResponse<DashboardStats>>('/stats');
    return res.data.data!;
  },
};

export default apiClient;
