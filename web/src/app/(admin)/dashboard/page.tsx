'use client';

import { Flex } from "antd";

import CountCards from "@/components/countCards";
import DynamicBreadcrumb from "@/components/dynamicBreadcrumb";

const Page: React.FC = () => {
  return (
    <>
      <Flex
        align='start'
        justify='space-between'
        className="mb-4"
      >
        <DynamicBreadcrumb />
      </Flex>

      <CountCards />
    </>
  );
}

export default Page;