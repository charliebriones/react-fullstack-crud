import { Route, Routes, Link } from "react-router-dom";
import UsersListPage from "./pages/UsersListPage";
import { UserCreatePage } from "./pages/UserCreatePage";
import { UserEditPage } from "./pages/UserEditPage";
import { UserViewPage } from "./pages/UserViewPage";
import { PortalPage } from "./pages/PortalPage";

function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h1 className="text-lg font-bold text-slate-900">
              User Management System
            </h1>
            <p className="text-xs text-slate-500">
              React + TanStack Query • .NET API • Azure SQL
            </p>
          </div>
          <nav className="flex flex-wrap items-center gap-2">
            <Link
              to="/"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Portal
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <Routes>
          <Route path="/" element={<PortalPage />} />
          <Route path="/users" element={<UsersListPage />} />
          <Route path="/users/new" element={<UserCreatePage />} />
          <Route path="/users/:id" element={<UserViewPage />} />
          <Route path="/users/:id/edit" element={<UserEditPage />} />
          <Route
            path="*"
            element={
              <div className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-200">
                <h2 className="text-2xl font-bold text-slate-900">
                  404 — Page not found
                </h2>
                <Link
                  to="/"
                  className="mt-6 inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  Go to Portal
                </Link>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
