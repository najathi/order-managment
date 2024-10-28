'use client';

import { Flex, Typography } from "antd";
import { useSession } from "next-auth/react"

import CountCards from "@/components/countCards";
import DynamicBreadcrumb from "@/components/dynamicBreadcrumb";

const { Title } = Typography;

const Page: React.FC = () => {
  const { data: session } = useSession();

  return (
    <>
      <Flex
        align='start'
        justify='space-between'
        className="mb-4"
      >
        <Title level={3}>Welcome, {session?.user?.user.name}</Title>
        <DynamicBreadcrumb />
      </Flex>

      <CountCards />
    </>
  );
}

export default Page;