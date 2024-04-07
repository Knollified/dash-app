import { CheckIcon, ClockIcon, EyeIcon, StopIcon, PauseIcon, ArchiveBoxArrowDownIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function TaskStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-400 text-white-500': status === 'requested',
          'bg-cyan-400 text-white': status === 'started',
          'bg-orange-400 text-whit-500': status === 'not started',
          'bg-blue-400 text-white': status === 'in progress',
          'bg-yellow-400 text-white-500': status === 'paused',
          'bg-red-400 text-white': status === 'needs review',
          'bg-purple-400 text-white-500': status === 'reviewed',
          'bg-green-500 text-white': status === 'completed',
        },
      )}
    >
      {status === 'requested' ? (
        <>
          Requested
          <ArchiveBoxArrowDownIcon className="ml-1 w-4 text-white-500" />
        </>
      ) : null}
      {status === 'started' ? (
        <>
          Started
          <BookOpenIcon className="ml-1 w-4 text-white-500" />
        </>
      ) : null}
      {status === 'not started' ? (
        <>
          Not Started
          <StopIcon className="ml-1 w-4 text-white-500" />
        </>
      ) : null}
      {status === 'in progress' ? (
        <>
          In Progress
          <ClockIcon className="ml-1 w-4 text-white-500" />
        </>
      ) : null}
      {status === 'paused' ? (
        <>
          Paused
          <PauseIcon className="ml-1 w-4 text-white-500" />
        </>
      ) : null}
      {status === 'needs review' ? (
        <>
          Needs Review
          <EyeIcon className="ml-1 w-4 text-white-500" />
        </>
      ) : null}
      {status === 'reviewed' ? (
        <>
          Reviewed
          <BookOpenIcon className="ml-1 w-4 text-white-500" />
        </>
      ) : null}
      {status === 'completed' ? (
        <>
          Completed
          <CheckIcon className="ml-1 w-4 text-white-500" />
        </>
      ) : null}
    </span>
  );
}
