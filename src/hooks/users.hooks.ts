import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, deleteUser, getUsers, updateUser } from "../api/users.api";
import type { CreateUserInput, UpdateUserInput } from "../types/user";

const USERS_KEY = ["users"] as const;

export function useUsersQuery() {
  return useQuery({
    queryKey: USERS_KEY,
    queryFn: getUsers,
  });
}

export function useCreateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateUserInput) => createUser(input),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: USERS_KEY });
    },
  });
}

export function useUpdateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateUserInput) => updateUser(input),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: USERS_KEY });
    },
  });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: USERS_KEY });
    },
  });
}
