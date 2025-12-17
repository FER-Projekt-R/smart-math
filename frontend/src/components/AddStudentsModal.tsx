'use client';

import { api, ApiError } from '@/lib/api';
import { useState } from 'react';
import { Spinner } from './ui';

interface AddStudentsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    classroomName: string;
}

export function AddStudentsModal({ isOpen, onClose, onSuccess, classroomName }: AddStudentsModalProps) {
    const [studentNames, setStudentNames] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [addedCount, setAddedCount] = useState(0);

    const handleClose = () => {
        setStudentNames('');
        setError(null);
        setSuccess(false);
        setAddedCount(0);
        onClose();
    };

    const handleSubmit = async () => {
        setError(null);

        const names = studentNames
            .split('\n')
            .map(name => name.trim())
            .filter(name => name.length > 0);

        if (names.length === 0) {
            setError('Molimo unesite barem jednog učenika');
            return;
        }

        setIsLoading(true);

        try {
            await api.post('/classroom/add-students', {
                classroom_name: classroomName,
                student_list: names,
            });

            setAddedCount(names.length);
            setSuccess(true);
            setStudentNames('');

            setTimeout(() => {
                handleClose();
                onSuccess?.();
            }, 1500);
        } catch (err) {
            if (err instanceof ApiError) {
                setError(err.message);
            } else {
                setError('Došlo je do greške');
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="card p-6 max-w-md w-full relative animate-in fade-in zoom-in duration-200">
                {/* Close button */}
                <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                    ✕
                </button>

                <h2 className="text-xl font-bold mb-1">Dodaj učenike</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Razred: <span className="font-medium">{classroomName}</span>
                </p>

                {/* Success message */}
                {success ? (
                    <div className="text-center py-6">
                        <p className="text-green-600 dark:text-green-400 font-medium">
                            Dodano {addedCount} učenika!
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Error */}
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                <p className="text-red-600 dark:text-red-400 text-sm">
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* Student names textarea */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
                                Imena učenika
                            </label>
                            <textarea
                                value={studentNames}
                                onChange={(e) => setStudentNames(e.target.value)}
                                placeholder={"Marko\nAna\nIvan\n..."}
                                disabled={isLoading}
                                rows={6}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
                                           bg-white dark:bg-gray-800 focus:border-indigo-500 dark:focus:border-indigo-400 
                                           outline-none transition-colors disabled:opacity-50 resize-none"
                            />
                            <p className="text-xs text-gray-400 mt-1">
                                Svako ime u novi red. Učenici moraju već biti registrirani u sustavu.
                            </p>
                        </div>

                        {/* Submit button */}
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="btn btn-primary w-full text-center py-2 disabled:opacity-70"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <Spinner />
                                    Dodavanje...
                                </span>
                            ) : (
                                'Dodaj učenike'
                            )}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

