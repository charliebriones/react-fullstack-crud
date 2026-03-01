import { Link } from "react-router-dom";

type Action =
  | {
      kind: "internal";
      to: string;
      label: string;
      variant?: "primary" | "secondary";
    }
  | {
      kind: "external";
      href: string;
      label: string;
      variant?: "primary" | "secondary";
    };

type Card = {
  title: string;
  description: string;
  actions: Action[];
};

function buttonClass(variant: Action["variant"]) {
  if (variant === "primary") {
    return "rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700";
  }
  if (variant === "secondary") {
    return "rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800";
  }
  return "rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50";
}

function CardItem({ card }: { card: Card }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
      <h2 className="text-xl font-bold text-slate-900">{card.title}</h2>
      <p className="mt-2 text-sm text-slate-600">{card.description}</p>

      <div className="mt-4 flex flex-wrap gap-3">
        {card.actions.map((a) => {
          const className = buttonClass(a.variant);

          if (a.kind === "internal") {
            return (
              <Link
                key={`${a.kind}-${a.to}-${a.label}`}
                to={a.to}
                className={className}
              >
                {a.label}
              </Link>
            );
          }

          return (
            <a
              key={`${a.kind}-${a.href}-${a.label}`}
              href={a.href}
              target="_blank"
              rel="noreferrer"
              className={className}
            >
              {a.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}

export function PortalPage() {
  const cards: Card[] = [
    {
      title: "React Fullstack CRUD",
      description:
        "React + React Router + TanStack Query consuming a .NET API (Render + Azure SQL).",
      actions: [
        {
          kind: "internal",
          to: "/users",
          label: "Open Demo",
          variant: "primary",
        },
      ],
    },
    {
      title: "Angular Fullstack CRUD",
      description:
        "Angular + Router + HttpClient consuming the same .NET API (Render + Azure SQL).",
      actions: [
        {
          kind: "external",
          href: "https://charliebriones.github.io/angular-fullstack-crud/",
          label: "Open Demo",
          variant: "secondary",
        },
        {
          kind: "external",
          href: "https://github.com/charliebriones/angular-fullstack-crud",
          label: "GitHub Repo",
        },
      ],
    },
    {
      title: "Angular Local CRUD",
      description:
        "Frontend-only CRUD using in-memory state (no backend required).",
      actions: [
        {
          kind: "external",
          href: "https://charliebriones.github.io/angular-local-crud/",
          label: "Open Demo",
          variant: "secondary",
        },
        {
          kind: "external",
          href: "https://github.com/charliebriones/angular-local-crud",
          label: "GitHub Repo",
        },
      ],
    },
    {
      title: ".NET API (Render) + Azure SQL",
      description:
        "ASP.NET Core Web API deployed on Render and connected to Azure SQL Database.",
      actions: [
        {
          kind: "external",
          href: "https://usermanagement-mbtm.onrender.com/api/users",
          label: "Live API Endpoint",
        },
      ],
    },
  ];

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
          {cards.map((card) => (
            <CardItem key={card.title} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
}
