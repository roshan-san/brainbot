import { Outlet, createRootRouteWithContext, } from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { SessionProvider } from "@/components/authentication/auth-provider";
import { ThemeProvider } from "@/components/theme";
import { Toaster } from "sonner";
import ErrorPage from "@/components/ErrorPage";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <SessionProvider>
          <Outlet />
          <ReactQueryDevtools />
          <Toaster position="bottom-right" richColors />
        </SessionProvider>
      </ThemeProvider>
    </>
  ),
  errorComponent: ()=><ErrorPage />

})
