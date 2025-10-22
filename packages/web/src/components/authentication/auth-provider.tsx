import { createAuthClient } from "better-auth/react";

export const authClient: ReturnType<typeof createAuthClient> = createAuthClient(

  {
    baseURL: import.meta.env.VITE_SERVER_URL,
  }
);

export type Session = typeof authClient.$Infer.Session;
export type User = typeof authClient.$Infer.Session.user;

import { createContext, useContext, type ReactNode } from "react";
import { Spinner } from "../ui/spinner";
import LandingPage from "../landing/LandingPage";

type SessionContextType = {
  user: User,
  session: Session,
};

const SessionContext = createContext<SessionContextType | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const {data ,isPending} = authClient.useSession();
  if (isPending) {
    return <Spinner/>;
  }
  if (!data) {
    console.log("no user");
    
    return (
      <LandingPage />
    );
  }
  return (
    <SessionContext.Provider
      value={{ user: data.user, session: data }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used inside SessionProvider");
  return ctx;
}
