import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData, fetchLatestTasks } from '@/app/lib/data';

const iconMap = {
tasks: InboxIcon,
contacts: UserGroupIcon, 
pending: ClockIcon,
collected: CheckIcon, 
requested: ClockIcon,
started: ClockIcon,
not_started: ClockIcon,
in_progress: ClockIcon,
paused: ClockIcon,
needs_review: ClockIcon, 
reviewed: ClockIcon,
completed: CheckIcon,
};

export default async function CardWrapper() {
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
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}
        <Card title="Completed Tasks" value={totalCompletedTasks} type='completed'/>
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
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'tasks' | 'contacts' |'requested' | 'started' | 'not_started'| 'in_progress' | 'paused' | 'needs_review' | 'reviewed' | 'completed';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
