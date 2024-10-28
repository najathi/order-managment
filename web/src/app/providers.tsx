'use client';

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

type ProvidersProps = {
  children: React.ReactNode,
  session: Session | null
};

const Providers: React.FC<ProvidersProps> = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}

export default Providers;