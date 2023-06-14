'use client';

import { ErrorBoundaryFallBack } from '@/_components/ErrorBoundary';

export default function Error({ error }: { error: Error; reset: () => void }) {
  return (
    <ErrorBoundaryFallBack message={error.message}></ErrorBoundaryFallBack>
  );
}
