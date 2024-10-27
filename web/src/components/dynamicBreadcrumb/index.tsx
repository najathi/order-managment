import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { usePathname } from 'next/navigation';

type DynamicBreadcrumbProps = {
}

const DynamicBreadcrumb: React.FC<DynamicBreadcrumbProps> = () => {
  const paths = usePathname()
  const pathNames = paths.split('/').filter(path => path)

  console.log(pathNames);

  return (
    <Breadcrumb
      style={{ margin: '16px 0' }}
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