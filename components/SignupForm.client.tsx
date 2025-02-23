"use client";
import React, { useActionState } from "react";
import { signup } from "@/actions/auth";

const SignupForm = () => {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <form action={action}>
      <div>
        <label htmlFor="name">Name: </label>
        <input id="name" name="name" placeholder="Name" />
      </div>
      {state?.errors?.name && <p>{state.errors.name}</p>}
      <div>
        <label htmlFor="email">Email: </label>
        <input id="email" name="email" placeholder="Email" type="email" />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}
      <div>
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          name="password"
          placeholder="Password"
          type="password"
        />
      </div>
      {state?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      <button disabled={pending} type="submit">
        Submit
      </button>
    </form>
  );
};

export default SignupForm;
