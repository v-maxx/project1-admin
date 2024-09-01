// components/FunctionalErrorBoundary.tsx
'use client'
import React from 'react';
import useErrorBoundary from "@/components/useErrorBoundary";




const FunctionalErrorBoundary = ({ children }) => {
    const { hasError, error } = useErrorBoundary();

    if (hasError) {
        return <h1>Something went wrong: {error?.message}</h1>;
    }

    return <>{children}</>;
};

export default FunctionalErrorBoundary;
