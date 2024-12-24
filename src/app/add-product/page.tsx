import FormSubmitButton from "@/components/FormSubmitButton";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";

export const metadata = {
  title: "Add Product - SlipKart",
};

async function addProduct(formData: FormData) {
  "use server";

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }

  const adminId = process.env.ADMIN; // The ID of the admin user, stored in environment variables.

  // Ensure the admin ID is set in the environment.
  if (!adminId) {
    throw new Error("Admin ID is not set in environment variables.");
  }

  // Get the logged-in user’s session (assuming session management is already implemented).
  const currentSession = await prisma.session.findFirst({
    where: { userId: adminId }, // Find the session of the user with adminId.
  });

  if (!currentSession) {
    // If there's no session for the admin, the user is not logged in.
    redirect("/not-admin/"); // Redirect to the login page.
    return; // Ensure the rest of the code doesn't run.
  }

  // Get the user associated with the current session.
  const loggedInUser = await prisma.user.findUnique({
    where: { id: currentSession.userId },
  });

  if (!loggedInUser || loggedInUser.id !== adminId) {
    // If the logged-in user is not the admin, redirect them away from the add-product page.
    redirect("/not-admin/"); // Redirect to a default page, such as the home page, or you can specify a forbidden page.
    return; // Prevent further code execution.
  }

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price) {
    throw Error("Missing Required Input Fields");
  }

  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });

  redirect("/");
}

export default async function AddProductPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }

  const adminId = process.env.ADMIN; // The ID of the admin user, stored in environment variables.

  // Ensure the admin ID is set in the environment.
  if (!adminId) {
    throw new Error("Admin ID is not set in environment variables.");
  }

  // Get the logged-in user’s session (assuming session management is already implemented).
  const currentSession = await prisma.session.findFirst({
    where: { userId: adminId }, // Find the session of the user with adminId.
  });

  if (!currentSession) {
    // If there's no session for the admin, the user is not logged in.
    redirect("/not-admin/"); // Redirect to the login page.
    return; // Ensure the rest of the code doesn't run.
  }

  // Get the user associated with the current session.
  const loggedInUser = await prisma.user.findUnique({
    where: { id: currentSession.userId },
  });

  if (!loggedInUser || loggedInUser.id !== adminId) {
    // If the logged-in user is not the admin, redirect them away from the add-product page.
    redirect("/not-admin/"); // Redirect to a default page, such as the home page, or you can specify a forbidden page.
    return; // Prevent further code execution.
  }

  return (
    <div>
      <h1 className="mb-3 text-3xl font-bold">Add Product</h1>
      <form action={addProduct}>
        <input
          required
          name="name"
          placeholder="Name"
          className="input input-bordered mb-3 w-full"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered mb-3 w-full"
        />
        <input
          required
          name="imageUrl"
          placeholder="Image URL"
          type="url"
          className="input input-bordered mb-3 w-full"
        />
        <input
          required
          name="price"
          placeholder="Price"
          type="number"
          className="input input-bordered mb-3 w-full"
        />
        <FormSubmitButton className="btn-block">ADD PRODUCT</FormSubmitButton>
      </form>
    </div>
  );
}
