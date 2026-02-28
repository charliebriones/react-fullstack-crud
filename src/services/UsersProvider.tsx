import { createContext, useContext, useMemo, useState } from "react";
import type { User } from "../types/user";

type CreateUserInput = Omit<User, "id">;

type UsersContextValue = {
  users: User[];
  createUser: (data: CreateUserInput) => void;
};

const UsersContext = createContext<UsersContextValue | null>(null);

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Charlie",
      username: "cbriones",
      email: "charlie@example.com",
    },
  ]);

  function createUser(data: CreateUserInput) {
    const newUser: User = {
      id: Date.now(),
      name: data.name.trim(),
      username: data.username.trim(),
      email: data.email.trim(),
    };
    setUsers((prev) => [...prev, newUser]);
  }

  const value = useMemo(() => ({ users, createUser }), [users]);

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
}

export function useUsers() {
  const ctx = useContext(UsersContext);
  if (!ctx) throw new Error("useUsers must be used inside UsersProvider");
  return ctx;
}
