import { Layout } from 'antd';
import Link from 'next/link';

import { __APP_NAME__ } from '@/lib/constants';

const { Footer } = Layout;

type FooterCmpProps = object;

const FooterCmp: React.FC<FooterCmpProps> = ({ }) => {
  return (
    <Footer className="text-center">© {new Date().getFullYear()} {__APP_NAME__} - All Rights Reserved. Created by <Link href="https://github.com/najathi" target='_blank'>@najathi</Link></Footer>
  );
}

export default FooterCmp;
