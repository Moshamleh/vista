import { NavLink, Outlet } from "react-router-dom"
import { adminRoutes } from "../routes"
import { useAuth } from "../auth/AuthContext"

export function AdminLayout() {
  const { session } = useAuth()
  return (
    <div className="min-h-screen bg-slate-100">
      <a
        href="#admin-main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:p-3"
      >
        Skip to admin content
      </a>
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-r border-line bg-white">
          <div className="border-b border-line p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-vista">Vista by Lara</p>
            <h1 className="mt-2 text-xl font-semibold text-ink">Admin Control Center</h1>
            <p className="mt-2 break-all text-xs text-slate-500">{session.baseUrl}</p>
          </div>
          <nav aria-label="Admin sections" className="flex gap-1 overflow-x-auto p-3 lg:block lg:space-y-1">
            {adminRoutes
              .filter((route) => route.navigation !== false)
              .map((route) => (
                <NavLink
                  key={route.path}
                  to={route.path}
                  end={route.path === "/"}
                  className={({ isActive }) =>
                    `block min-w-max rounded-md px-3 py-2 text-sm font-medium lg:min-w-0 ${
                      isActive ? "bg-vista text-white" : "text-slate-700 hover:bg-slate-100"
                    }`
                  }
                >
                  {route.label}
                </NavLink>
              ))}
          </nav>
        </aside>
        <div className="min-w-0">
          <header className="border-b border-line bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Engine administration</p>
                <p className="text-lg font-semibold text-ink">Operational controls and signal intelligence</p>
              </div>
              <p className="rounded-md border border-line bg-slate-50 px-3 py-2 text-xs text-slate-600">
                Auth: {session.apiKey.length > 0 ? "API key configured" : "API key required"}
              </p>
            </div>
          </header>
          <main id="admin-main" className="p-4 sm:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
