// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Contact = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Task = {
  id: string;
  contact_id: string;
  priority: 'low'| 'medium'| 'high';
  date: string;
  description: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: string| 'requested' | 'started' | 'not_started'| 'in_progress' | 'paused' | 'needs_review' | 'reviewed' | 'completed';
};

export type Contracts = {
  month: string;
  contracts: number;
};

export type LatestTask = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  priority: string |'low'| 'medium'| 'high';
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestTaskRaw = Omit<LatestTask, 'priority'> & {
  priority: string |'low'| 'medium'| 'high';
  total_tasks: number;
  total_requested: number;
  total_started: number;
  total_not_started: number;
  total_in_progress: number;
  total_paused: number;
  total_needs_review: number;
  total_reviewed: number;
  total_completed: number;
};

export type TasksTable = {
  id: string;
  contact_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  description: string;
  priority: string |'low'| 'medium'| 'high';
  status: string| 'requested' | 'started' | 'not started'| 'in progress' | 'paused' | 'needs review' | 'reviewed' | 'completed';
  total_tasks: number;
  total_requested: number;
  total_started: number;
  total_not_started: number;
  total_in_progress: number;
  total_paused: number;
  total_needs_review: number;
  total_reviewed: number;
  total_completed: number;
};

export type ContactsTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_tasks: number;
  total_requested: number;
  total_started: number;
  total_not_started: number;
  total_in_progress: number;
  total_paused: number;
  total_needs_review: number;
  total_reviewed: number;
  total_completed: number;
};

export type FormattedContactsTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_tasks: number;
  total_requested: number;
  total_started: number;
  total_not_started: number;
  total_in_progress: number;
  total_paused: number;
  total_needs_review: number;
  total_reviewed: number;
  total_completed: number;
};

export type ContactField = {
  id: string;
  name: string;
};

export type TaskForm = {
  id: string;
  contact_id: string;
  priority: string |'low'| 'medium'| 'high';
  description: string;
  status: string| 'requested' | 'started' | 'not started'| 'in progress' | 'paused' | 'needs review' | 'reviewed' | 'completed';
};
