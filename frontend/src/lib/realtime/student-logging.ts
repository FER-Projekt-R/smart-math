import { getAuthedSocket } from './socket';

type AnyObj = Record<string, unknown>;

let seq = 0;

function isoForPythonFromIso(date: Date) {
    // Python `datetime.fromisoformat` 
    // Convert `2026-01-19T10:00:00.000Z` -> `2026-01-19T10:00:00.000+00:00`
    return date.toISOString().replace('Z', '+00:00');
}

export function logStudentEvent(token: string, event: string, payload: AnyObj = {}) {
    const clean = token?.trim?.() ? token.trim() : '';
    if (!clean) return;

    const now = new Date();
    const body: AnyObj = {
        event,
        seq: (seq += 1),
        client_ts_ms: Date.now(),
        client_ts_iso: now.toISOString(),
        client_tz_offset_min: now.getTimezoneOffset(),
        ...payload,
    };

    try {
        const socket = getAuthedSocket(clean);
        // Backend expects { timestamp, text }.
        socket.emit('log', {
            timestamp: isoForPythonFromIso(now),
            text: JSON.stringify(body),
        });
    } catch {
        // ignore (logging must not break gameplay)
    }
}

