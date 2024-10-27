import Link from 'next/link';

import { __APP_NAME__ } from '@/lib/constants';

type AuthLayoutWrapperProps = {
  children: React.ReactNode
}

const AuthLayoutWrapper: React.FC<AuthLayoutWrapperProps> = ({ children }) => {
  return (
    <div>
      <div className='bg-black h-16 flex items-center justify-center text-2xl font-bold'>
        <Link href='/'><h2>{__APP_NAME__}</h2></Link>
      </div>
      <div className="bg-gray-300 flex items-center justify-center" style={{ minHeight: 'calc(100vh - 4rem)' }}>
        {children}
      </div>
    </div>
  );
}

export default AuthLayoutWrapper;