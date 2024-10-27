import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { usePathname } from 'next/navigation';

const DynamicBreadcrumb: React.FC = () => {
  const paths = usePathname()
  const pathNames = paths.split('/').filter(path => path)

  console.log(pathNames);

  return (
    <Breadcrumb
      items={[
        {
          href: '/dashboard',
          title: <HomeOutlined />,
        },
        ...pathNames.map((link: string, index: number) => {
          const href = `/${pathNames.slice(0, index + 1).join('/')}`;
          const itemText = link[0].toUpperCase() + link.slice(1, link.length);
          const isLast = index === pathNames.length - 1;
          return ({
            href: !isLast ? href : undefined,
            title: itemText,
          })
        })
      ]}
    />
  );
}

export default DynamicBreadcrumb;