"use server";
import {
  SignupFormState,
  SignupFormSchema,
  LoginFormState,
  LoginFormSchema,
} from "@/lib/defintions";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { createUser, verifyUser } from "@/lib/auth";

export async function signup(state: SignupFormState, formData: FormData) {
  // Validation
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    //create new user
    const newUser = await createUser(name, email, password);
    if (!newUser) return { success: false, error: "User already exists" };

    //create user session
    await createSession(newUser._id.toString());

    redirect("/");
  } catch (error) {
    console.error("Registraion Error: ", error);
    return { message: "An error occured while creating your account" };
  }
}

// Sign in

// Logout
export async function logout() {
  await deleteSession();
  redirect("/login");
}
