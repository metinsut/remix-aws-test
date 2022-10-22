import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData, useTransition } from "@remix-run/react";
import { object, string } from "yup";
import { prisma } from "~/database/db.server";
import { getUserByEmail } from "./user.server";

let userSchema = object({
  name: string().required(),
  email: string().email(),
});

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  try {
    const validateSync = userSchema.validateSync({ name: email });
    console.log("validateSync", validateSync);
  } catch (error) {
    console.log("error", error);
  }

  // if (hasErrors) {
  //   return json(hasErrors);
  // }

  // const existingUser = await getUserByEmail(email);
  // if (existingUser) {
  //   return json(
  //     {
  //       error: "A user already exists with this email",
  //     },
  //     { status: 400 }
  //   );
  // }

  console.log("name", name);
  console.log("email", email);

  try {
    await prisma.user.create({
      data: { name, email },
    });
    console.log("1");
  } catch (error) {
    console.log("2");
    return json(error);
  }

  return redirect("/user");
};

export default function New() {
  const error = useActionData();
  const transition = useTransition();

  const submitting = transition.state === "submitting";

  console.log("component error", error);

  return (
    <div className="grid gap-2 m-2">
      {error?.error && <p>{error.error}</p>}
      {error?.name && <p>{error.name}</p>}
      {error?.email && <p>{error.email}</p>}
      <Form
        method="post"
        className="grid gap-2 grid-flow-col items-end justify-start"
      >
        <input type="text" name="name" placeholder="user name" />
        <input type="email" name="email" placeholder="user email" />
        <button
          type="submit"
          disabled={submitting}
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
        >
          {submitting ? "Creating..." : "Create Post"}
        </button>
      </Form>
    </div>
  );
}
