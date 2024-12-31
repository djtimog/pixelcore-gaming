import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';

const client = await db.connect();

async function seedPlayers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS players (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      ign VARCHAR(255) NOT NULL UNIQUE,
      avatar_url VARCHAR(255),
      age INT,
      dob DATE,
      main_role VARCHAR(255),
      capable_roles TEXT[],
      skills TEXT[],
      device VARCHAR(255),
      uid VARCHAR(255) UNIQUE,
      rank VARCHAR(255),
      gunsmith TEXT[],
      time_of_entry TIMESTAMP,
      achievements TEXT[],
      kills INT,
      kd_ratio FLOAT,
      social_media JSONB
    );
  `;

  const players = [
    {
      id: 'player1-id',
      name: 'Player One',
      ign: 'PlayerOne',
      avatar_url: 'https://example.com/avatar1.png',
      age: 25,
      dob: '1999-01-01',
      main_role: 'Sniper',
      capable_roles: ['Support', 'Entry'],
      skills: ['Precision', 'Strategy'],
      device: 'PC',
      uid: 'player1-uid',
      rank: 'Diamond',
      gunsmith: ['Weapon1', 'Weapon2'],
      time_of_entry: new Date(),
      achievements: ['MVP Season 1', 'Best Sniper Award'],
      kills: 500,
      kd_ratio: 2.5,
      social_media: {
        twitter: 'https://twitter.com/playerone',
        instagram: 'https://instagram.com/playerone',
        discord: 'PlayerOne#1234',
        tiktok: 'https://tiktok.com/@playerone'
      }
    }
  ];

  const insertedPlayers = await Promise.all(
    players.map(player =>
      client.sql`
        INSERT INTO players (
          id, name, ign, avatar_url, age, dob, main_role, capable_roles, skills, device, uid, rank, gunsmith, time_of_entry, achievements, kills, kd_ratio, social_media
        )
        VALUES (
          ${player.id}, ${player.name}, ${player.ign}, ${player.avatar_url}, ${player.age}, ${player.dob},
          ${player.main_role}, ${player.capable_roles}, ${player.skills}, ${player.device},
          ${player.uid}, ${player.rank}, ${player.gunsmith}, ${player.time_of_entry}, ${player.achievements},
          ${player.kills}, ${player.kd_ratio}, ${player.social_media}
        )
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedPlayers;
}

async function seedAdmins() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS admins (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      role VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      age INT,
      dob DATE,
      nationality VARCHAR(255),
      experience INT,
      contact_info JSONB,
      social_media JSONB,
      responsibilities TEXT[]
    );
  `;

  const admins = [
    {
      id: 'admin1-id',
      role: 'CEO',
      name: 'John Doe',
      age: 45,
      dob: '1979-06-15',
      nationality: 'American',
      experience: 15,
      contact_info: { email: 'johndoe@example.com', phone: '+1234567890' },
      social_media: {
        twitter: 'https://twitter.com/johndoe',
        instagram: 'https://instagram.com/johndoe',
        discord: 'JohnDoe#1234',
        tiktok: 'https://tiktok.com/@johndoe'
      },
      responsibilities: ['Overseeing the organization', 'Strategic planning', 'Securing partnerships']
    }
  ];

  const insertedAdmins = await Promise.all(
    admins.map(admin =>
      client.sql`
        INSERT INTO admins (
          id, role, name, age, dob, nationality, experience, contact_info, social_media, responsibilities
        )
        VALUES (
          ${admin.id}, ${admin.role}, ${admin.name}, ${admin.age}, ${admin.dob},
          ${admin.nationality}, ${admin.experience}, ${admin.contact_info}, ${admin.social_media}, ${admin.responsibilities}
        )
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedAdmins;
}

async function seedTeams() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS teams (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      logo_url VARCHAR(255),
      creation_date DATE NOT NULL,
      achievements TEXT[],
      social_media JSONB
    );
  `;

  const teams = [
    {
      id: 'team1-id',
      name: 'Team Alpha',
      logo_url: 'https://example.com/logo.png',
      creation_date: '2020-01-01',
      achievements: ['Championship Winner 2021'],
      social_media: {
        twitter: 'https://twitter.com/teamalpha',
        instagram: 'https://instagram.com/teamalpha',
        discord: 'TeamAlpha#0001',
        tiktok: 'https://tiktok.com/@teamalpha'
      }
    }
  ];

  const insertedTeams = await Promise.all(
    teams.map(team =>
      client.sql`
        INSERT INTO teams (
          id, name, logo_url, creation_date, achievements, social_media
        )
        VALUES (
          ${team.id}, ${team.name}, ${team.logo_url}, ${team.creation_date}, ${team.achievements}, ${team.social_media}
        )
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedTeams;
}

export async function seedDatabase() {
  try {
    await client.sql`BEGIN;`;
    await seedPlayers();
    await seedAdmins();
    await seedTeams();
    await client.sql`COMMIT;`;
    console.log('Database seeded successfully');
  } catch (error) {
    await client.sql`ROLLBACK;`;
    console.error('Error seeding database:', error);
  }
}
