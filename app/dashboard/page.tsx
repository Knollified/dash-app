import { Card } from '@/app/ui/dashboard/cards';
import ContractsChart from '@/app/ui/dashboard/contracts-chart';
import LatestTasks from '@/app/ui/dashboard/latest-tasks';
import { lusitana } from '@/app/ui/fonts';
import { fetchContracts, fetchLatestTasks, fetchCardData, } from '../lib/data';
 
export default async function Page() {
  const contracts = await fetchContracts();
  const latestTasks = await fetchLatestTasks();
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
        <Card title="Collected" value={totalCompletedTasks} type="collected" />
        <Card title="Total Started Tasks" value={totalStartedTasks} type="started" />
        <Card title="Total Requested Tasks" value={totalRequestedTasks} type="requested" />
        <Card title="Total Not Started Tasks" value={totalNotStartedTasks} type="not_started" />
        <Card title="Total Paused Tasks" value={totalPausedTasks} type="paused" />
        <Card title="Total In Progress Tasks" value={totalInProgressTasks} type="in_progress" />
        <Card title="Total Needs Review Tasks" value={totalNeedsReviewTasks} type="needs_review" />
        <Card title="Total Reviewed Tasks" value={totalReviewedTasks} type="reviewed" />
        <Card title="Total Tasks" value={numberOfTasks} type="tasks" />
        <Card
          title="Total Contacts"
          value={numberOfContacts}
          type="contacts"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <ContractsChart contracts={contracts}  /> 
        <LatestTasks latestTasks={latestTasks} />
      </div>
    </main>
  );
}