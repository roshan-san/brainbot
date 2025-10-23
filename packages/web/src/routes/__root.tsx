import { Outlet, createRootRouteWithContext, } from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme";
import { Toaster } from "sonner";
import ErrorPage from "@/components/ErrorPage";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <Outlet />
          <ReactQueryDevtools />
          <Toaster position="bottom-right" richColors />
      </ThemeProvider>
    </>
  ),
  errorComponent: ()=><ErrorPage />

})
