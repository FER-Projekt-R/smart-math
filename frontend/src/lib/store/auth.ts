import { loginStudent, loginTeacher, logout as logoutApi } from '@/lib/api';
import { User } from '@/models';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
    // State
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    // Actions
    loginAsStudent: (username: string, emojiPassword: string[]) => Promise<boolean>;
    loginAsTeacher: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    clearError: () => void;
    setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            // Initial state
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            // Login as student
            loginAsStudent: async (username: string, emojiPassword: string[]) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await loginStudent({ username, emojiPassword });

                    if (response.success && response.user) {
                        set({
                            user: response.user,
                            isAuthenticated: true,
                            isLoading: false,
                            error: null,
                        });
                        return true;
                    } else {
                        set({
                            isLoading: false,
                            error: response.error || 'Prijava nije uspjela',
                        });
                        return false;
                    }
                } catch (error) {
                    set({
                        isLoading: false,
                        error: 'Došlo je do greške prilikom prijave',
                    });
                    return false;
                }
            },

            // Login as teacher
            loginAsTeacher: async (username: string, password: string) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await loginTeacher({ username, password });

                    if (response.success && response.user) {
                        set({
                            user: response.user,
                            isAuthenticated: true,
                            isLoading: false,
                            error: null,
                        });
                        return true;
                    } else {
                        set({
                            isLoading: false,
                            error: response.error || 'Prijava nije uspjela',
                        });
                        return false;
                    }
                } catch (error) {
                    set({
                        isLoading: false,
                        error: 'Došlo je do greške prilikom prijave',
                    });
                    return false;
                }
            },

            // Logout
            logout: () => {
                logoutApi();
                set({
                    user: null,
                    isAuthenticated: false,
                    error: null,
                });
            },

            // Clear error
            clearError: () => {
                set({ error: null });
            },

            // Set loading state
            setLoading: (loading: boolean) => {
                set({ isLoading: loading });
            },
        }),
        {
            name: 'auth-storage', // localStorage key
            partialize: (state) => ({
                // Only persist user data, not loading/error states
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);

