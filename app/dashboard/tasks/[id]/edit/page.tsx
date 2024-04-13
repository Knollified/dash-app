import Form from '@/app/ui/tasks/edit-form';
import Breadcrumbs from '@/app/ui/tasks/breadcrumbs';
import { fetchContacts, fetchTaskById } from '@/app/lib/data';
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [task, contacts] = await Promise.all([
        fetchTaskById(id),
        fetchContacts(),
    ])
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/tasks' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/tasks/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form task={task} contacts={contacts} />
    </main>
  );
}