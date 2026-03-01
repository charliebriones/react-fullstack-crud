import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useUpdateUser, useUsersQuery } from "../hooks/users.hooks";

export function UserEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const userId = Number(id);

  const usersQuery = useUsersQuery();
  const updateMutation = useUpdateUser();

  const users = usersQuery.data ?? [];
  const user = users.find((u) => u.id === userId);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  // Prefill when user is found
  useEffect(() => {
    if (!user) return;
    setName(user.name ?? "");
    setUsername(user.username ?? "");
    setEmail(user.email ?? "");
  }, [user]);

  const payload = useMemo(
    () => ({
      id: userId,
      name: name.trim(),
      username: username.trim(),
      email: email.trim(),
    }),
    [userId, name, username, email],
  );

  const isValid = !!payload.name && !!payload.username && !!payload.email;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!Number.isFinite(userId) || userId <= 0) return;
    if (!isValid) return;

    updateMutation.mutate(payload, {
      onSuccess: () => navigate("/users"),
    });
  }

  if (!Number.isFinite(userId) || userId <= 0) {
    return (
      <div className="min-h-screen bg-slate-100 p-6">
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
          <h1 className="text-xl font-bold text-slate-800">Invalid user id</h1>
          <p className="mt-2 text-sm text-slate-600">
            The URL is missing a valid user id.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-xl">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-800">
              Edit User
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Update the user details and save changes.
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
          {/* Loading */}
          {usersQuery.isLoading && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              Loading user...
            </div>
          )}

          {/* Error */}
          {usersQuery.isError && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {(usersQuery.error as Error).message}
            </div>
          )}

          {/* Not found */}
          {!usersQuery.isLoading && !usersQuery.isError && !user && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              User not found. It may have been deleted.
            </div>
          )}

          {/* Form */}
          {!usersQuery.isLoading && !usersQuery.isError && user && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-800">
                  Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  placeholder="e.g. Charlie Briones"
                />
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-semibold text-slate-800">
                  Username
                </label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  placeholder="e.g. cbriones"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-800">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  placeholder="e.g. charlie@email.com"
                />
              </div>

              {/* Mutation error */}
              {updateMutation.isError && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {(updateMutation.error as Error).message}
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
                  disabled={!isValid || updateMutation.isPending}
                  className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {updateMutation.isPending ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          )}
        </div>

        <p className="mt-4 text-xs text-slate-500">
          User ID:{" "}
          <span className="font-semibold text-slate-700">{userId}</span>
        </p>
      </div>
    </div>
  );
}
