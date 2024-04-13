import { Card } from '@/app/ui/dashboard/cards';
import ContractsChart from '@/app/ui/dashboard/contracts-chart';
import LatestTasks from '@/app/ui/dashboard/latest-tasks';
import { lusitana } from '@/app/ui/fonts';
import CardWrapper from '@/app/ui/dashboard/cards';
import {
  fetchCardData,
} from '../../lib/data';
import { Suspense } from 'react';
import { CardsSkeleton, ContractsChartSkeleton, LatestTasksSkeleton } from '@/app/ui/skeletons';

export default async function Page() {
  
  
  const {
    numberOfTasks,
    numberOfContacts,
    totalRequestedTasks,
    totalStartedTasks,
    totalNotStartedTasks,
    totalInProgressTasks,
    totalPausedTasks,
    totalNeedsReviewTasks,
    totalReviewedTasks,
    totalCompletedTasks,
  } = await fetchCardData();
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
      <Suspense fallback={<ContractsChartSkeleton />}>
          <ContractsChart />
        </Suspense>
        <Suspense fallback={<LatestTasksSkeleton />}>
          <LatestTasks />
        </Suspense>
      </div>
    </main>
  );
}
