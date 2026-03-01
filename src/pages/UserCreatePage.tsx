import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCreateUser } from "../hooks/users.hooks";

export function UserCreatePage() {
  const navigate = useNavigate();
  const createMutation = useCreateUser();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const payload = {
    name: name.trim(),
    username: username.trim(),
    email: email.trim(),
  };

  const isValid = !!payload.name && !!payload.username && !!payload.email;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isValid) return;

    createMutation.mutate(payload, {
      onSuccess: () => {
        setName("");
        setUsername("");
        setEmail("");
        navigate("/users");
      },
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Create User</h1>
          <p className="mt-1 text-sm text-gray-600">
            Fill out the form below to add a new user.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-800">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Charlie Briones"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-gray-800">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. cbriones"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-800">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. charlie@email.com"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Error */}
            {createMutation.isError && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {(createMutation.error as Error).message}
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-end">
              <Link
                to="/users"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={!isValid || createMutation.isPending}
                className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {createMutation.isPending ? "Saving..." : "Create User"}
              </button>
            </div>
          </form>

          {!isValid && (
            <p className="mt-4 text-xs text-gray-500">
              Tip: All fields are required.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
