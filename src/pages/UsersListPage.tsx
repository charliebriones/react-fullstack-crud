import { Link } from "react-router-dom";
import { useUsersQuery, useDeleteUser } from "../hooks/users.hooks";

export default function UsersListPage() {
  const usersQuery = useUsersQuery();
  const deleteMutation = useDeleteUser();

  const users = usersQuery.data ?? [];

  function handleDelete(id: number) {
    if (!window.confirm("Delete this user?")) return;
    deleteMutation.mutate(id);
  }

  if (usersQuery.isLoading)
    return (
      <div className="p-6">
        <p className="text-gray-700">Loading users...</p>
      </div>
    );

  if (usersQuery.isError)
    return (
      <div className="p-6">
        <p className="text-red-600 font-semibold">
          {(usersQuery.error as Error).message}
        </p>
      </div>
    );

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>

        <Link
          to="/users/new"
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700"
        >
          + Add User
        </Link>
      </div>

      {/* Table Wrapper */}
      <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full min-w-[700px] divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                Username
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                Email
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center text-sm text-gray-500"
                >
                  No users yet.
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-700">{u.id}</td>

                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    <Link
                      to={`/users/${u.id}`}
                      className="text-blue-700 hover:text-blue-900 hover:underline"
                      title="View user"
                    >
                      {u.name}
                    </Link>
                  </td>

                  <td className="px-4 py-3 text-sm text-gray-700">
                    {u.username}
                  </td>

                  <td className="px-4 py-3 text-sm text-gray-700">{u.email}</td>

                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                      <Link
                        to={`/users/${u.id}`}
                        className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-semibold text-gray-800 hover:bg-gray-100 text-center"
                      >
                        View
                      </Link>

                      <Link
                        to={`/users/${u.id}/edit`}
                        className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-semibold text-gray-800 hover:bg-gray-100 text-center"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(u.id)}
                        disabled={deleteMutation.isPending}
                        className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60 text-center"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Total Users:{" "}
        <span className="font-semibold text-gray-900">{users.length}</span>
      </div>
    </div>
  );
}
