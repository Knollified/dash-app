import Form from '@/app/ui/tasks/create-form';
import Breadcrumbs from '@/app/ui/tasks/breadcrumbs';
import { fetchContacts } from '@/app/lib/data';
 
export default async function Page() {
  const contacts = await fetchContacts();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Task', href: '/dashboard/tasks' },
          {
            label: 'Create Task',
            href: '/dashboard/tasks/create',
            active: true,
          },
        ]}
      />
      <Form contacts={contacts} />
    </main>
  );
}