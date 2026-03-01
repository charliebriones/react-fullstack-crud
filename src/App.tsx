import { Routes, Route, Navigate, Link } from "react-router-dom";
import UsersListPage from "./pages/UsersListPage";
import { UserCreatePage } from "./pages/UserCreatePage";
import { UserEditPage } from "./pages/UserEditPage";
import { UserViewPage } from "./pages/UserViewPage";

const PORTAL_URL = "https://charliebriones.github.io/";

function Header() {
  return (
    <header className="border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        {/* React Emphasis */}
        <h1 className="text-3xl font-bold text-cyan-600 sm:text-4xl">React</h1>

        {/* Project Title */}
        <h2 className="mt-1 text-xl font-semibold text-slate-900 sm:text-2xl">
          User Management System
        </h2>

        {/* Stack Description */}
        <p className="mt-2 text-sm font-medium text-slate-600">
          React + React Router + TanStack Query consuming a .NET API (Render +
          Azure SQL).
        </p>

        {/* Portal Button */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <a
            href={PORTAL_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Portal
          </a>
        </div>
      </div>
    </header>
  );
}

function NotFoundPage() {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-200">
      <h2 className="text-2xl font-bold text-slate-900">
        404 — Page not found
      </h2>

      <Link
        to="/users"
        className="mt-6 inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
      >
        Go to Users
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Global Header (Visible on ALL pages) */}
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<UsersListPage />} />
          <Route path="/users/new" element={<UserCreatePage />} />
          <Route path="/users/:id" element={<UserViewPage />} />
          <Route path="/users/:id/edit" element={<UserEditPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}
