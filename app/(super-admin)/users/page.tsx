import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { PageContainer } from "@/components/layout/page-container";
import { UsersList } from "@/components/features/users/users-list";
import { CURRENT_USER } from "@/lib/constants";
import usersData from "@/lib/data/users.json";
import type { User } from "@/lib/types";

const users = usersData as User[];

export const metadata: Metadata = {
  title: "Users — AI Project Intelligence Platform",
};

export default function UsersPage() {
  return (
    <>
      <Header title="Users" user={CURRENT_USER} />
      <PageContainer mainClassName="bg-white">
        <UsersList initialUsers={users} />
      </PageContainer>
    </>
  );
}
