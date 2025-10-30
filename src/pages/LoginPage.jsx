import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../feautures/auth/authSlice";
import { useNavigate } from "react-router-dom";
import bgCeremony from "../assets/img/bg-tea-ceremony.webp";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { err, isLoading } = useSelector((state) => state.auth);
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })).then((action) => {
      localStorage.setItem("accessToken", action.payload.token);
      navigate("/dashboard");
    });
  };
  return (
    <div className="bg-[url('../assets/img/bg-tea-ceremony.webp')] bg-cover bg-center h-screen ">
      <div className="bg-black/50 flex items-center justify-center h-screen">
        <div className="bg-white p-12 shadow-md rounded-md w-[90%] max-w-[500px]">
          <h1 className="text-6xl font-semibold">Log In</h1>
          <form className="flex flex-col gap-6" onSubmit={onSubmit}>
            <div className="pt-6 flex flex-col gap-3">
              <div className="flex flex-col">
                <span>Your Email</span>
                <input
                  className="w-full px-3 py-2 rounded-md border border-zinc-400/50 outline-0"
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <span>Your Password</span>
                <input
                  className="w-full px-3 py-2 rounded-md border border-zinc-400/50 outline-0"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            {isLoading && <p className="text-zinc-400">Loading...</p>}
            {err && <p className="text-red-600 ">{err}</p>}
            <div className="flex">
              <button
                className="w-full px-3 py-2 rounded-md bg-green-600 cursor-pointer text-white tran hover:bg-green-700"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
