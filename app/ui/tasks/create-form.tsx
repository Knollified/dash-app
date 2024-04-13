import { ContactField } from '@/app/lib/definitions';
import Link from 'next/link';
import { createTask } from '@/app/lib/actions';
import {
  CheckIcon,
  ClockIcon,
  InboxStackIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';

export default function Form({ contacts }: { contacts: ContactField[] }) {
  return (
    <form action={createTask}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Contact Name */}
        <div className="mb-4">
          <label htmlFor="contact" className="mb-2 block text-sm font-medium">
            Choose contact
          </label>
          <div className="relative">
            <select
              id="contact"
              name="contactId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              <option value="" disabled>
                Select a contact
              </option>
              {contacts.map((contact) => (
                <option key={contact.id} value={contact.id}>
                  {contact.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        <br/>
        <div className="mb-4">
          <label htmlFor="priority" className="mb-2 block text-sm font-medium">
            Choose Priority
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <select
                id="priority"
                name="priority"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue=""
              >
                <option value="" disabled>
                  Select a Priority
                </option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <InboxStackIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <br/>
          <div>
            <label htmlFor="status" className="mb-2 block text-sm font-medium">
              Status
            </label>
            <option value="requested" disabled>
              Requested
            </option>
          </div>
          <br/>
          <div className="w-full">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
              Description of task:
            </label>
            <textarea
              name="description"
              id="description"
              rows={10}
              placeholder="Enter a detailed description of the task"
              className="w-full resize-none p-2"
            ></textarea>
          </div>


        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/tasks"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Invoice</Button>
      </div>
    </form>
  );
}
