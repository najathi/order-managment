import AuthLayoutWrapper from '@/components/auth/authLayoutWrapper';

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