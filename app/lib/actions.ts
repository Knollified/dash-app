'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
 
const FormSchema = z.object({
  id: z.string(),
  contactId: z.string(),
  description: z.string(),
  priority: z.enum(['low','medium','high']),
  status: z.enum(['requested']),
  date: z.string(),
});
 
const CreateTask = FormSchema.omit({ id: true, date: true });
 
export async function createTask(formData: FormData) {
  const  { contactId, priority, status, description } = CreateTask.parse({
    contactId: formData.get('contactId'),
    priority: formData.get('priority'),
    status: formData.get('status'),
    description: formData.get('description'),
  });
  const date = new Date().toISOString().split('T')[0];

  await sql`
    INSERT INTO invoices (contact_id, priority, status, date, description)
    VALUES (${contactId}, ${priority}, ${status}, ${date}, ${description})
  `;

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
  // Test it out:

}