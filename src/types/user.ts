export type UserRole = 'admin' | 'student' | 'manager' | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  studentId?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface GoogleLoginResponse {
  email: string;
  name: string;
  picture?: string;
}

export interface StudentInfo {
  id: string;
  user_id: string;
  student_id: string;
  email: string;
  major: string;
  courses: any[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  access_role: UserRole;
}

export interface DashboardStats {
  id: string;
  user_id: string;
  total_users: number;
  total_questions: number;
  most_asked_questions: {
    question: string;
    count: number;
  }[];
} 