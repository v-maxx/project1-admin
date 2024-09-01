// hooks/useErrorBoundary.ts
import { useState, useEffect } from 'react';

const useErrorBoundary = () => {
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState(null);

    const onError = (error) => {
        setHasError(true);
        setError(error);
        console.error('Error caught by error boundary:', error);
    };

    useEffect(() => {
        const handleError = (event) => {
            onError(event.error);
        };

        const handleUnhandledRejection = (event) => {
            onError(event.reason);
        };

        window.addEventListener('error', handleError);
        window.addEventListener('unhandledrejection', handleUnhandledRejection);

        return () => {
            window.removeEventListener('error', handleError);
            window.removeEventListener('unhandledrejection', handleUnhandledRejection);
        };
    }, []);

    return { hasError, error };
};

export default useErrorBoundary;
