export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type CreateUserInput = Omit<User, "id">;
export type UpdateUserInput = User;
