import AuthLayoutWrapper from '@/components/auth/authLayoutWrapper';
import { __APP_NAME__ } from '@/lib/constants';

type LayoutProps = {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AuthLayoutWrapper>
      {children}
    </AuthLayoutWrapper>
  );
}

export default Layout;