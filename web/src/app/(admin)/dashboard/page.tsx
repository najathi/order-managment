'use client';

import { Flex, Typography } from "antd";
import { useSession } from "next-auth/react";

import CountCards from "@/components/countCards";
import DynamicBreadcrumb from "@/components/dynamicBreadcrumb";

const { Title } = Typography;

const Page: React.FC = () => {
  const { data: session } = useSession();
  console.log(session)

  return (
    <>
      <Flex
        align='start'
        justify='space-between'
        className="mb-4"
      >
        <Title level={4}>Welcome, {session?.user?.user.name}</Title>
        <DynamicBreadcrumb />
      </Flex>

      <p>{session?.accessToken}</p>
      <CountCards />
    </>
  );
}

export default Page;