import type { User as UserType } from "@prisma/client";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useTransition } from "@remix-run/react";
import { prisma } from "~/database/db.server";

type userListReturnType = { users: UserType[] };

export const loader = async () => {
  const allUsers = await prisma.user.findMany();
  return json<userListReturnType>({
    users: allUsers,
  });
};

export default function UserList() {
  const transition = useTransition();
  const { users } = useLoaderData<userListReturnType>();

  return (
    <>
      <div>User page</div>
      <Link
        to="new"
        className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
      >
        Create User
      </Link>
      {transition.state === "loading" ? "loading" : null}
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </>
  );
}
