import { sql } from '@vercel/postgres';
import {
  ContactField,
  ContactsTableType,
  TaskForm,
  TasksTable,
  LatestTaskRaw,
  User,
  Contracts,
} from './definitions';
import { formatPriority, formatPriorityAmount } from './utils';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchContracts() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching contracts data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Contracts>`SELECT * FROM contracts`;

    // console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch contracts data.');
  }
}

export async function fetchLatestTasks() {
  noStore();
  try {
    const data = await sql<LatestTaskRaw>`
      SELECT tasks.priority, contacts.name, contacts.image_url, contacts.email, tasks.id
      FROM tasks
      JOIN contacts ON tasks.contact_id = contacts.id
      ORDER BY tasks.date DESC
      LIMIT 5`;

    const latestTasks = data.rows.map((task) => ({
      ...task,
      priority: formatPriority(task.priority),
    }));
    return latestTasks;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest tasks.');
  }
}

export async function fetchCardData() {
  noStore();
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const taskCountPromise = sql`SELECT COUNT(*) FROM tasks`;
    const contactCountPromise = sql`SELECT COUNT(*) FROM contacts`;
    const taskStatusPromise = sql`SELECT
    COUNT(CASE WHEN status = 'requested' THEN 1 END) AS "requested",
    COUNT(CASE WHEN status = 'started' THEN 1 END) AS "started",
    COUNT(CASE WHEN status = 'not started' THEN 1 END) AS "not_started",
    COUNT(CASE WHEN status = 'in progress' THEN 1 END) AS "in_progress",
    COUNT(CASE WHEN status = 'paused' THEN 1 END) AS "paused",
    COUNT(CASE WHEN status = 'needs review' THEN 1 END) AS "needs_review",
    COUNT(CASE WHEN status = 'reviewed' THEN 1 END) AS "reviewed",
    COUNT(CASE WHEN status = 'completed' THEN 1 END) AS "completed"
    FROM tasks;`;

    const data = await Promise.all([
      taskCountPromise,
      contactCountPromise,
      taskStatusPromise,
    ]);

    const numberOfTasks = Number(data[0].rows[0].count ?? '0');
    const numberOfContacts = Number(data[1].rows[0].count ?? '0');
    const totalRequestedTasks = formatPriorityAmount(data[2].rows[0].requested.count ?? '0');
    const totalStartedTasks = formatPriorityAmount(data[2].rows[0].started.count ?? '0');
    const totalNotStartedTasks = formatPriorityAmount(
      data[2].rows[0].not_started.count ?? '0',
    );
    const totalInProgressTasks = formatPriorityAmount(
      data[2].rows[0].in_progress.count ?? '0',
    );
    const totalPausedTasks = formatPriorityAmount(data[2].rows[0].paused.count ?? '0');
    const totalNeedsReviewTasks = formatPriorityAmount(data[2].rows[0].needs_review.count ?? '0');
    const totalReviewedTasks = formatPriorityAmount(data[2].rows[0].reviewed.count ?? '0');
    const totalCompletedTasks = formatPriorityAmount(data[2].rows[0].completed.count ?? '0');

    return {
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
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredTasks(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const tasks = await sql<TasksTable>`
      SELECT
        tasks.id,
        tasks.priority,
        tasks.date,
        tasks.status,
        contacts.name,
        contacts.email,
        contacts.image_url
      FROM tasks
      JOIN contacts ON tasks.contact_id = contacts.id
      WHERE
        contacts.name ILIKE ${`%${query}%`} OR
        contacts.email ILIKE ${`%${query}%`} OR
        tasks.priority::text ILIKE ${`%${query}%`} OR
        tasks.date::text ILIKE ${`%${query}%`} OR
        tasks.status ILIKE ${`%${query}%`}
      ORDER BY tasks.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return tasks.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tasks.');
  }
}

export async function fetchTasksPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM tasks
    JOIN contacts ON tasks.contact_id = contacts.id
    WHERE
      contacts.name ILIKE ${`%${query}%`} OR
      contacts.email ILIKE ${`%${query}%`} OR
      tasks.priority::text ILIKE ${`%${query}%`} OR
      tasks.date::text ILIKE ${`%${query}%`} OR
      tasks.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of tasks.');
  }
}

export async function fetchTaskById(id: string) {
  try {
    const data = await sql<TaskForm>`
      SELECT
        tasks.id,
        tasks.contact_id,
        tasks.priority,
        tasks.status
      FROM tasks
      WHERE tasks.id = ${id};
    `;

    const task = data.rows.map((task) => ({
      ...task,
      // Convert priority from cents to dollars
      priority: task.priority,
    }));

    return task[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch task.');
  }
}

export async function fetchContacts() {
  try {
    const data = await sql<ContactField>`
      SELECT
        id,
        name
      FROM contacts
      ORDER BY name ASC
    `;

    const contacts = data.rows;
    return contacts;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all contacts.');
  }
}

export async function fetchFilteredContacts(query: string) {
  try {
    const data = await sql<ContactsTableType>`
		SELECT
		  contacts.id,
		  contacts.name,
		  contacts.email,
		  contacts.image_url,
		  COUNT(tasks.id) AS total_tasks,
		  COUNT(CASE WHEN status = 'requested' THEN 1 END) AS "requested",
      COUNT(CASE WHEN status = 'started' THEN 1 END) AS "started",
      COUNT(CASE WHEN status = 'not started' THEN 1 END) AS "not_started",
      COUNT(CASE WHEN status = 'in progress' THEN 1 END) AS "in_progress",
      COUNT(CASE WHEN status = 'paused' THEN 1 END) AS "paused",
      COUNT(CASE WHEN status = 'needs review' THEN 1 END) AS "needs_review",
      COUNT(CASE WHEN status = 'reviewed' THEN 1 END) AS "reviewed",
      COUNT(CASE WHEN status = 'completed' THEN 1 END) AS "completed"
		FROM contacts
		LEFT JOIN tasks ON contacts.id = tasks.contact_id
		WHERE
		  contacts.name ILIKE ${`%${query}%`} OR
        contacts.email ILIKE ${`%${query}%`}
		GROUP BY contacts.id, contacts.name, contacts.email, contacts.image_url
		ORDER BY contacts.name ASC
	  `;

    const contacts = data.rows.map((contact) => ({
      ...contact,
      total_requested: formatPriorityAmount(contact.total_requested),
      total_started: formatPriorityAmount(contact.total_started),
      total_not_started: formatPriorityAmount(contact.total_not_started),
      total_in_progress: formatPriorityAmount(contact.total_in_progress),
      total_paused: formatPriorityAmount(contact.total_paused),
      total_needs_review: formatPriorityAmount(contact.total_needs_review),
      total_reviewed: formatPriorityAmount(contact.total_reviewed),
      total_completed: formatPriorityAmount(contact.total_completed),
    }));

    return contacts;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch contact table.');
  }
}

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
