import type { CreateUserInput, UpdateUserInput, User } from "../types/user";

export const API_BASE =
  import.meta.env.VITE_API_BASE ??
  "https://usermanagement-mbtm.onrender.com/api/users";

async function assertOk(res: Response, fallbackMsg: string) {
  if (res.ok) return;

  let detail = "";
  try {
    detail = await res.text();
  } catch {}

  throw new Error(detail ? `${fallbackMsg}: ${detail}` : fallbackMsg);
}

export async function getUsers(): Promise<User[]> {
  const res = await fetch(API_BASE);
  await assertOk(res, "Failed to fetch users");
  return res.json();
}

export async function createUser(input: CreateUserInput): Promise<User> {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  await assertOk(res, "Failed to create user");
  return res.json();
}

export async function updateUser(input: UpdateUserInput): Promise<User> {
  const res = await fetch(`${API_BASE}/${input.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: input.id,
      name: input.name,
      username: input.username,
      email: input.email,
    }),
  });

  await assertOk(res, "Failed to update user");

  if (res.status === 204) {
    return {
      id: input.id,
      name: input.name,
      username: input.username,
      email: input.email,
    };
  }

  const text = await res.text();
  if (!text) {
    return {
      id: input.id,
      name: input.name,
      username: input.username,
      email: input.email,
    };
  }

  return JSON.parse(text) as User;
}
export async function deleteUser(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  await assertOk(res, "Failed to delete user");
}
