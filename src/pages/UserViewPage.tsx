import { Link, useParams } from "react-router-dom";
import { useUsersQuery } from "../hooks/users.hooks";

export function UserViewPage() {
  const { id } = useParams();
  const userId = Number(id);

  const usersQuery = useUsersQuery();
  const users = usersQuery.data ?? [];

  const user = users.find((u) => u.id === userId);

  if (!Number.isFinite(userId) || userId <= 0) {
    return (
      <div className="min-h-screen bg-slate-100 p-6">
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
          <h1 className="text-xl font-bold text-slate-800">Invalid user id</h1>
          <Link
            to="/users"
            className="mt-4 inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            ← Back to Users
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-800">
              User Details
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              View complete information for this user.
            </p>
          </div>

          <Link
            to="/users"
            className="text-sm font-semibold text-slate-700 hover:text-slate-900"
          >
            ← Back
          </Link>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
          {usersQuery.isLoading && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              Loading user...
            </div>
          )}

          {usersQuery.isError && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {(usersQuery.error as Error).message}
            </div>
          )}

          {!usersQuery.isLoading && !usersQuery.isError && !user && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              User not found.
            </div>
          )}

          {!usersQuery.isLoading && !usersQuery.isError && user && (
            <div className="space-y-6">
              {/* Info Grid */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    ID
                  </p>
                  <p className="mt-1 text-lg font-semibold text-slate-800">
                    {user.id}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Name
                  </p>
                  <p className="mt-1 text-lg font-semibold text-slate-800">
                    {user.name}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Username
                  </p>
                  <p className="mt-1 text-lg text-slate-700">{user.username}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Email
                  </p>
                  <p className="mt-1 text-lg text-slate-700">{user.email}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-end">
                <Link
                  to={`/users/${user.id}/edit`}
                  className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Edit
                </Link>

                <Link
                  to="/users"
                  className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                >
                  Back to List
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
