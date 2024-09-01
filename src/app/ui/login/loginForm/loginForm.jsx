"use client";

import { authenticate } from "@/app/lib/actions";
import styles from "./loginForm.module.css";
import { useFormState } from "react-dom";
import {useEffect} from "react";

const LoginForm = () => {
  const [state, formAction,loading] = useFormState(authenticate, undefined);

    useEffect(() => {
        console.log('state',loading)
    }, [loading]);
  return (
    <form action={formAction} className={styles.form}>
      <h1>Login</h1>
      <input type="text" placeholder="username" name="username" />
      <input type="password" placeholder="password" name="password" />
      <button>Login</button>
      {state && state}
    </form>
  );
};

export default LoginForm;
