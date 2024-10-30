import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { ComponentType } from 'react';
import { Session } from 'next-auth';

interface AuthComponentProps {
  session: Session | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
}

const withAuth = (WrappedComponent: ComponentType<any>): ComponentType<any> => {
  const AuthComponent = (props: AuthComponentProps) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === 'unauthenticated') {
        router.push('/'); // Redirect if not authenticated
      }
    }, [status, router]);

    if (status === 'loading') {
      return <p>Loading...</p>; // Show a loading state
    }

    if (session) {
      return <WrappedComponent {...props} />;
    }

    return null; // Prevent rendering if the session hasn't been established yet
  };

  AuthComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthComponent;
};

export default withAuth;