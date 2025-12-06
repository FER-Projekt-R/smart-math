
import { User } from './user';

export interface StudentLoginRequest {
    username: string;
    emojiPassword: string[]; // Array of 4 letter keys (A, B, C, D, E) - emojis on UI
}

export interface TeacherLoginRequest {
    username: string;
    password: string;
}

export type LoginRequest =
    | { role: 'student'; data: StudentLoginRequest }
    | { role: 'teacher'; data: TeacherLoginRequest };

export interface AuthResponse {
    success: boolean;
    user?: User;
    token?: string;
    error?: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

export interface AuthActions {
    login: (request: LoginRequest) => Promise<boolean>;
    logout: () => void;
    clearError: () => void;
    setLoading: (loading: boolean) => void;
}