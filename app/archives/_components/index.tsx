'use client';

import { Suspense } from 'react';
import { ErrorBoundaryExtended } from '@/_components/ErrorBoundary';
import { LoadingBasicAnimation } from '@/_components/Loading';
import { Archives } from './router';

interface IProps {
  channelID: string;
}

const ArchivesRoute = ({ channelID }: IProps) => {
  return (
    <ErrorBoundaryExtended>
      <Suspense fallback={<LoadingBasicAnimation />}>
        <Archives channelID={channelID} />
      </Suspense>
    </ErrorBoundaryExtended>
  );
};

export default ArchivesRoute;
