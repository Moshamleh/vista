import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Route, Routes } from "react-router-dom"
import { AdminLayout } from "./layout/AdminLayout"
import { adminRoutes } from "./routes"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 20000
    }
  }
})

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<AdminLayout />}>
          {adminRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </QueryClientProvider>
  )
}
