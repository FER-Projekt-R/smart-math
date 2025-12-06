// Authentication API methods

import {
    AuthResponse,
    StudentLoginRequest,
    TeacherLoginRequest,
} from '@/models';
import { api, ApiError } from './client';

/**
 * Login as a student with emoji password
 */
export async function loginStudent(
    credentials: StudentLoginRequest
): Promise<AuthResponse> {
    try {
        const response = await api.post<AuthResponse>('/api/auth/student/login', {
            username: credentials.username,
            emoji_password: credentials.emojiPassword.join(''), // Send as string
        });

        // Store token if login successful
        if (response.success && response.token) {
            localStorage.setItem('auth_token', response.token);
        }

        return response;
    } catch (error) {
        if (error instanceof ApiError) {
            return {
                success: false,
                error: error.message,
            };
        }
        return {
            success: false,
            error: 'Prijava nije uspjela. Pokušajte ponovo.',
        };
    }
}

/**
 * Login as a teacher with text password
 */
export async function loginTeacher(
    credentials: TeacherLoginRequest
): Promise<AuthResponse> {
    try {
        const response = await api.post<AuthResponse>('/api/auth/teacher/login', {
            username: credentials.username,
            password: credentials.password,
        });

        // Store token if login successful
        if (response.success && response.token) {
            localStorage.setItem('auth_token', response.token);
        }

        return response;
    } catch (error) {
        if (error instanceof ApiError) {
            return {
                success: false,
                error: error.message,
            };
        }
        return {
            success: false,
            error: 'Prijava nije uspjela. Pokušajte ponovo.',
        };
    }
}

/**
 * Logout - clear stored credentials
 */
export function logout(): void {
    localStorage.removeItem('auth_token');
}

/**
 * Check if user is authenticated (has valid token)
 */
export async function checkAuth(): Promise<AuthResponse> {
    try {
        const response = await api.get<AuthResponse>('/api/auth/me');
        return response;
    } catch (error) {
        logout(); // Clear invalid token
        return {
            success: false,
            error: 'Sesija je istekla',
        };
    }
}

