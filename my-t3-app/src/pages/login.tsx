import Layout from "~/components/Layout";
import { useState } from "react";
import { api } from "~/utils/api";

type User = {
  username: string;
  password: string;
};

export default function Login() {
  const [user, setUser] = useState<User>();

  const createUser = api.example.register.useMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser.mutate({
      username: user?.username,
      password: user?.password,
    });
  };

  // Mutates user state based on e.target.name
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Layout>
      <div>
        <form onSubmit={handleSubmit} className="text-black">
          <label>
            Username:
            <input type="text" name="username" onChange={handleChange} />
          </label>
          <label>
            Password
            <input type="text" name="password" onChange={handleChange} />
          </label>
          <button onClick={handleSubmit}>Login</button>
        </form>
      </div>
    </Layout>
  );
}
