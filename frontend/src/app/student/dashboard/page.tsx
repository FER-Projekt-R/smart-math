'use client';

import Link from 'next/link';

export default function StudentDashboard() {
    return (
        <main className="min-h-screen relative">
            {/* Header with user info */}
            <header className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex justify-end items-center">
                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
                        <span className="text-xl">👤</span>
                        <span className="font-medium">Učenik</span>
                    </div>
                    <Link
                        href="/"
                        className="btn btn-outline flex items-center gap-2 !py-2 !px-4"
                    >
                        <span>Odjava</span>
                        <span className="text-lg">🚪</span>
                    </Link>
                </div>
            </header>

            {/* Start game */}
            <div className="min-h-screen flex flex-col items-center justify-center p-8">
                <div className="text-center mb-8">
                    <div className="text-5xl mb-4">👋</div>
                    <h1 className="text-2xl font-bold mb-2">Bok!</h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Spreman za nove matematičke izazove?
                    </p>
                </div>

                <button
                    className="btn btn-primary text-xl px-10 py-4"
                >
                    🎮 Započni igru
                </button>
            </div>
        </main>
    );
}
