import { FireIcon, ExclamationCircleIcon, ClockIcon, MoonIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function TaskPriority({ priority }: { priority: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-green-200 text-white-500': priority === 'low',
          'bg-yellow-300 text-white': priority === 'medium',
          'bg-orange-500 text-whit-500': priority === 'high',
          'bg-red-700 text-white': priority === 'extreme',
        },
      )}
    >
      {priority === 'low' ? (
        <>
          Low
          <MoonIcon className="ml-1 w-4 text-white-500" />
        </>
      ) : null}
      {priority === 'medium' ? (
        <>
          Medium
          <ClockIcon className="ml-1 w-4 text-white-500" />
        </>
      ) : null}
      {priority === 'High' ? (
        <>
          High
          <ExclamationCircleIcon className="ml-1 w-4 text-white-500" />
        </>
      ) : null}
      {priority === 'extreme' ? (
        <>
          Extreme
          <FireIcon className="ml-1 w-4 text-white-500" />
        </>
      ) : null}
    </span>
  );
}
