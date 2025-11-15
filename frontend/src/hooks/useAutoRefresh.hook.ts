import { useState, useEffect } from "react";

interface UseAutoRefreshResult {
    isEnabled: boolean;
    toggle: () => void;
}

export const useAutoRefresh = (callback: () => void, intervalMs: number = 15000): UseAutoRefreshResult => {
    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        if (!isEnabled) {
            return;
        }

        const intervalId = setInterval(() => {
            callback();
        }, intervalMs);

        return () => clearInterval(intervalId);
    }, [isEnabled, callback, intervalMs]);

    const toggle = () => {
        setIsEnabled((prev) => !prev);
    };

    return {
        isEnabled,
        toggle,
    };
};
