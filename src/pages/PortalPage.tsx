import { Link } from "react-router-dom";

export function PortalPage() {
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Charlie Briones — Project Portal
            </h1>
            <p className="mt-2 text-slate-600">
              CRUD demos using React and Angular (with separate deployments and
              repos).
            </p>
          </div>

          <a
            href="https://github.com/charliebriones"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Charlie Briones GitHub
          </a>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
            <h2 className="text-xl font-bold text-slate-900">
              React Fullstack CRUD
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              React + TypeScript + TanStack Query + React Router
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                to="/users"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Open Demo
              </Link>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
            <h2 className="text-xl font-bold text-slate-900">
              Angular Fullstack CRUD
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Angular + Router + HttpClient • consumes .NET API (Render + Azure
              SQL)
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="https://charliebriones.github.io/angular-fullstack-crud/"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Open Demo
              </a>
              <a
                href="https://github.com/charliebriones/angular-fullstack-crud"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                GitHub Repo
              </a>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
            <h2 className="text-xl font-bold text-slate-900">
              Angular Local CRUD
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Frontend-only CRUD (in-memory / local) • fast demo of UI + state
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="https://charliebriones.github.io/angular-local-crud/"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Open Demo
              </a>
              <a
                href="https://github.com/charliebriones/angular-local-crud"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                GitHub Repo
              </a>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
            <h2 className="text-xl font-bold text-slate-900">
              .NET API (Render) + Azure SQL
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Live API endpoint used by the fullstack demos.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="https://usermanagement-mbtm.onrender.com/api/users"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Live API Endpoint
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
