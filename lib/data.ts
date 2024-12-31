import { sql } from '@vercel/postgres';
import {
  Player,
  Admin,
  Team,
  Coach,
  Manager,
} from './definitions';

// Fetch all players
export async function fetchPlayers(): Promise<Player[]> {
  try {
    const data = await sql<Player>`SELECT * FROM players`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch players.');
  }
}

// Fetch player by ID
export async function fetchPlayerById(id: string): Promise<Player | null> {
  try {
    const data = await sql<Player>`SELECT * FROM players WHERE id = ${id}`;
    return data.rows[0] || null;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch player.');
  }
}

// Fetch all admins
export async function fetchAdmins(): Promise<Admin[]> {
  try {
    const data = await sql<Admin>`SELECT * FROM admins`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch admins.');
  }
}

// Fetch admin by ID
export async function fetchAdminById(id: string): Promise<Admin | null> {
  try {
    const data = await sql<Admin>`SELECT * FROM admins WHERE id = ${id}`;
    return data.rows[0] || null;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch admin.');
  }
}

// Fetch all teams
export async function fetchTeams(): Promise<Team[]> {
  try {
    const data = await sql<Team>`SELECT * FROM teams`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch teams.');
  }
}

// Fetch team by ID
export async function fetchTeamById(id: string): Promise<Team | null> {
  try {
    const data = await sql<Team>`SELECT * FROM teams WHERE id = ${id}`;
    return data.rows[0] || null;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch team.');
  }
}

// Fetch all coaches
export async function fetchCoaches(): Promise<Coach[]> {
  try {
    const data = await sql<Coach>`SELECT * FROM coaches`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch coaches.');
  }
}

// Fetch all managers
export async function fetchManagers(): Promise<Manager[]> {
  try {
    const data = await sql<Manager>`SELECT * FROM managers`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch managers.');
  }
}

// Fetch players with a filter (e.g., role, rank, or K/D ratio)
export async function fetchFilteredPlayers(filter: string): Promise<Player[]> {
  try {
    const data = await sql<Player>`
      SELECT * FROM players
      WHERE main_role ILIKE ${`%${filter}%`} OR
            rank ILIKE ${`%${filter}%`} OR
            kd_ratio::text ILIKE ${`%${filter}%`}
    `;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch filtered players.');
  }
}

// Add a new player
export async function addPlayer(player: Player): Promise<void> {
  try {
    await sql`
      INSERT INTO players (id, name, ign, age, dob, main_role, kd_ratio, kills, discord, tiktok)
      VALUES (
        ${player.id},
        ${player.name},
        ${player.ign},
        ${player.age},
        ${player.dob},
        ${player.main_role},
        ${player.kd_ratio},
        ${player.kills},
        ${player.discord},
        ${player.tiktok}
      )
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to add player.');
  }
}

// Update player details
export async function updatePlayer(id: string, updates: Partial<Player>): Promise<void> {
  const fields = Object.keys(updates)
    .map((key) => `${key} = ${updates[key as keyof Player]}`)
    .join(', ');

  try {
    await sql`
      UPDATE players SET ${sql.raw(fields)} WHERE id = ${id}
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update player.');
  }
}
