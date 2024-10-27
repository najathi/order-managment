'use client';

import { Button, Flex } from 'antd';

import DynamicBreadcrumb from '@/components/dynamicBreadcrumb';

const Page: React.FC = () => {
  return (
    <>
      <Flex
        align='start'
        justify='space-between'
      >
        <DynamicBreadcrumb />

        <Button type="primary" onClick={() => { }}>
          Create
        </Button>
      </Flex>
    </>
  );
};

export default Page;
