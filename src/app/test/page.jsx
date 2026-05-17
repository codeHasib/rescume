"use client";

import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const Check = () => {
  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());
    const { data, error } = await authClient.signUp.email({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      image: userData.imgURL,
      callbackURL: "/",
    });
    if (data) {
      toast.success("yes");
    } else {
      toast.error("NNNOOOOOOOOOOOOO");
    }
  }

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)} className="flex flex-col">
        <input type="text" name="username" />
        <input type="email" name="email" />
        <input type="password" name="password" />
        <input type="text" name="imgURL" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Check;
