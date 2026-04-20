import React, { useState, useContext } from "react";
import assets from "../assets/assets";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const [currState, setCurrState] = useState("Login");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const { login } = useContext(AuthContext);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (currState === "Sign up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }
    login(currState === "Sign up" ? "signup" : "login", { fullName, email, password, bio });
  };

  return (
    <div className=" relative z-10 min-h-screen flex items-center justify-center gap-12 sm:justify-evenly max-sm:flex-col px-6">
      {/* Logo */}
      <div className="flex flex-col items-center gap-3">
        <img
          src={assets.logo_big}
          alt=""
          className="w-[min(28vw,220px)] drop-shadow-2xl"
          style={{ filter: "drop-shadow(0 0 30px rgba(139,92,246,0.4))" }}
        />
      </div>

      {/* Card */}
      <div
        className="w-full max-w-sm rounded-2xl p-8 flex flex-col gap-5"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 0 0 1px rgba(124,58,237,0.1), 0 32px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
          backdropFilter: "blur(24px)",
        }}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-white text-2xl font-semibold tracking-tight">
            {currState}
          </h2>
          {isDataSubmitted && (
            <button
              onClick={() => setIsDataSubmitted(false)}
              className="text-gray-400 hover:text-violet-400 transition-colors p-1"
            >
              <img src={assets.arrow_icon} alt="" className="w-4 opacity-60 hover:opacity-100" />
            </button>
          )}
        </div>

        {/* Divider */}
        <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)" }} />

        <div className="flex flex-col gap-3">
          {currState === "Sign up" && !isDataSubmitted && (
            <input
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
              type="text"
              placeholder="Full Name"
              required
              className="w-full p-3 rounded-xl text-sm text-gray-200 placeholder-gray-600 transition-all outline-none"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onFocus={e => { e.target.style.border = "1px solid rgba(139,92,246,0.5)"; e.target.style.background = "rgba(124,58,237,0.06)"; }}
              onBlur={e => { e.target.style.border = "1px solid rgba(255,255,255,0.08)"; e.target.style.background = "rgba(255,255,255,0.04)"; }}
            />
          )}

          {!isDataSubmitted && (
            <>
              {["email", "password"].map((field) => (
                <input
                  key={field}
                  onChange={(e) => field === "email" ? setEmail(e.target.value) : setPassword(e.target.value)}
                  value={field === "email" ? email : password}
                  type={field}
                  placeholder={field === "email" ? "Email Address" : "Password"}
                  required
                  className="w-full p-3 rounded-xl text-sm text-gray-200 placeholder-gray-600 outline-none transition-all"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                  onFocus={e => { e.target.style.border = "1px solid rgba(139,92,246,0.5)"; e.target.style.background = "rgba(124,58,237,0.06)"; }}
                  onBlur={e => { e.target.style.border = "1px solid rgba(255,255,255,0.08)"; e.target.style.background = "rgba(255,255,255,0.04)"; }}
                />
              ))}
            </>
          )}

          {currState === "Sign up" && isDataSubmitted && (
            <textarea
              onChange={(e) => setBio(e.target.value)}
              value={bio}
              rows={4}
              placeholder="Write a short bio..."
              required
              className="w-full p-3 rounded-xl text-sm text-gray-200 placeholder-gray-600 outline-none resize-none transition-all"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              onFocus={e => { e.target.style.border = "1px solid rgba(139,92,246,0.5)"; e.target.style.background = "rgba(124,58,237,0.06)"; }}
              onBlur={e => { e.target.style.border = "1px solid rgba(255,255,255,0.08)"; e.target.style.background = "rgba(255,255,255,0.04)"; }}
            />
          )}
        </div>

        <button
          type="button"
          onClick={onSubmitHandler}
          className="w-full py-3 rounded-xl font-medium text-sm text-white tracking-wide transition-all duration-200 relative overflow-hidden group"
          style={{
            background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
            boxShadow: "0 0 20px rgba(124,58,237,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
          }}
          onMouseEnter={e => { e.target.style.boxShadow = "0 0 32px rgba(124,58,237,0.6), inset 0 1px 0 rgba(255,255,255,0.2)"; }}
          onMouseLeave={e => { e.target.style.boxShadow = "0 0 20px rgba(124,58,237,0.35), inset 0 1px 0 rgba(255,255,255,0.15)"; }}
        >
          {currState === "Sign up" ? "Create Account" : "Login Now"}
        </button>

        <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
          <input type="checkbox" className="accent-violet-500 rounded" />
          <span>Agree to the terms of use & privacy policy.</span>
        </label>

        <div className="border-t border-white/[0.05] pt-4">
          {currState === "Sign up" ? (
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => { setCurrState("Login"); setIsDataSubmitted(false); }}
                className="text-violet-400 hover:text-violet-300 cursor-pointer transition-colors font-medium"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              No account yet?{" "}
              <span
                onClick={() => setCurrState("Sign up")}
                className="text-violet-400 hover:text-violet-300 cursor-pointer transition-colors font-medium"
              >
                Sign up
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;