// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:

const { describe } = require("node:test");

// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const contacts = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/contacts/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/contacts/lee-robinson.png',
  },
  {
    id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    name: 'Hector Simpson',
    email: 'hector@simpson.com',
    image_url: '/contacts/hector-simpson.png',
  },
  {
    id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    name: 'Steven Tey',
    email: 'steven@tey.com',
    image_url: '/contacts/steven-tey.png',
  },
  {
    id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    name: 'Steph Dietz',
    email: 'steph@dietz.com',
    image_url: '/contacts/steph-dietz.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/contacts/michael-novotny.png',
  },
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/contacts/evil-rabbit.png',
  },
  {
    id: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    name: 'Emil Kowalski',
    email: 'emil@kowalski.com',
    image_url: '/contacts/emil-kowalski.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/contacts/amy-burns.png',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/contacts/balazs-orban.png',
  },
];

const tasks = [
  {
    contact_id: contacts[0].id,
    total_tasks: 1,
    status: 'paused',
    date: '2022-12-06',
    description: 'LALALALALALALALALALALA',
    priority: "High",
  },
  {
    contact_id: contacts[1].id,
    total_tasks: 1,
    status: 'in_progress',
    date: '2022-11-14',
    description: 'LALALALALALALALALALALA',
    priority: "High",
  },
  {
    contact_id: contacts[4].id,
    total_tasks: 1,
    status: 'started',
    date: '2022-10-29',
    description: 'LALALALALALALALALALALA',
    priority: "High",
  },
  {
    contact_id: contacts[3].id,
    total_tasks: 1,
    status: 'started',
    date: '2023-09-10',
    description: 'LALALALALALALALALALALA',
    priority: "High",
  },
  {
    contact_id: contacts[5].id,
    total_tasks: 1,
    status: 'reviewed',
    date: '2023-08-05',
    description: 'LALALALALALALALALALALA',
    priority: "High",
  },
  {
    contact_id: contacts[7].id,
    total_tasks: 1,
    status: 'not_started',
    date: '2023-07-16',
    description: 'LALALALALALALALALALALA',
    priority: "High",
  },
  {
    contact_id: contacts[6].id,
    total_tasks: 1,
    status: 'not_started',
    date: '2023-06-27',
    description: 'LALALALALALALALALALALA',
    priority: "High",
  },
  {
    contact_id: contacts[3].id,
    total_tasks: 1,
    status: 'completed',
    date: '2023-06-09',
    description: 'LALALALALALALALALALALA',
    priority: "High",
  },
  {
    contact_id: contacts[4].id,
    total_tasks: 1,
    status: 'completed',
    date: '2023-06-17',
    description: 'LALALALALALALALALALALA',
    priority: "High",
  },
  {
    contact_id: contacts[5].id,
    total_tasks: 1,
    status: 'completed',
    date: '2023-06-07',
    description: 'LALALALALALALALALALALA',
    priority: "High",
  },
  {
    contact_id: contacts[1].id,
    total_tasks: 1,
    status: 'completed',
    date: '2023-08-19',
    description: 'LALALALALALALALALALALA',
    priority: "High",
  },
  {
    contact_id: contacts[5].id,
    total_tasks: 1,
    status: 'completed',
    date: '2023-06-03',
    description: 'LALALALALALALALALALALA',
    priority: "High",
  },
  {
    contact_id: contacts[2].id,
    total_tasks: 1,
    status: 'completed',
    date: '2023-06-18',
    description: 'LALALALALALALALALALALA',
    priority: "High",
  },
  {
    contact_id: contacts[0].id,
    total_tasks: 1,
    status: 'completed',
    date: '2023-10-04',
    description: 'LALALALALALALALALALALA',
    priority: "High",
  },
  {
    contact_id: contacts[2].id,
    total_tasks: 1,
    status: 'completed',
    date: '2022-06-05',
    description: 'LALALALALALALALALALALA',
    priority: "High",
  },
];

const contracts = [
  { month: 'Jan', contracts: 1 },
  { month: 'Feb', contracts: 2 },
  { month: 'Mar', contracts: 3 },
  { month: 'Apr', contracts: 4 },
  { month: 'May', contracts: 5 },
  { month: 'Jun', contracts: 6 },
  { month: 'Jul', contracts: 7 },
  { month: 'Aug', contracts: 8 },
  { month: 'Sep', contracts: 9 },
  { month: 'Oct', contracts: 10 },
  { month: 'Nov', contracts: 9 },
  { month: 'Dec', contracts: 8 },
];

module.exports = {
  users,
  contacts,
  tasks,
  contracts,
};
