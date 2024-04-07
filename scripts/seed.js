const { db } = require('@vercel/postgres');
const {
  tasks,
  contacts,
  contracts,
  users,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedTasks(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "tasks" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS tasks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    contact_id UUID NOT NULL,
    priority VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    description VARCHAR(255) NOT NULL
  );
`;

    console.log(`Created "tasks" table`);

    // Insert data into the "tasks" table
    const insertedTasks = await Promise.all(
      tasks.map(
        (task) => client.sql`
        INSERT INTO tasks (contact_id, priority, status, date, description)
        VALUES (${task.contact_id}, ${task.priority}, ${task.status}, ${task.date}, ${task.description})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedTasks.length} tasks`);

    return {
      createTable,
      tasks: insertedTasks,
    };
  } catch (error) {
    console.error('Error seeding tasks:', error);
    throw error;
  }
}

async function seedContacts(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "contacts" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS contacts (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "contacts" table`);

    // Insert data into the "contacts" table
    const insertedContacts = await Promise.all(
      contacts.map(
        (contact) => client.sql`
        INSERT INTO contacts (id, name, email, image_url)
        VALUES (${contact.id}, ${contact.name}, ${contact.email}, ${contact.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedContacts.length} contacts`);

    return {
      createTable,
      contacts: insertedContacts,
    };
  } catch (error) {
    console.error('Error seeding contacts:', error);
    throw error;
  }
}

async function seedContracts(client) {
  try {
    // Create the "contracts" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS contracts (
        month VARCHAR(4) NOT NULL UNIQUE,
        contracts INT NOT NULL
      );
    `;

    console.log(`Created "contracts" table`);

    // Insert data into the "contracts" table
    const insertedContracts = await Promise.all(
      contracts.map(
        (rev) => client.sql`
        INSERT INTO contracts (month, contracts)
        VALUES (${rev.month}, ${rev.contracts})
        ON CONFLICT (month) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedContracts.length} contracts`);

    return {
      createTable,
      contracts: insertedContracts,
    };
  } catch (error) {
    console.error('Error seeding contracts:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedContacts(client);
  await seedTasks(client);
  await seedContracts(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
