import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import { AuthContext } from "../context/AuthContext";

const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext);
  const [selectedImg, setSelectedImg] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState(authUser.fullName);
  const [bio, setBio] = useState(authUser.bio);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImg) {
      await updateProfile({ fullName: name, bio });
      navigate("/");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(selectedImg);
    reader.onload = async () => {
      await updateProfile({ profilePic: reader.result, fullName: name, bio });
      navigate("/");
    };
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
  };
  const inputFocus = (e) => {
    e.target.style.border = "1px solid rgba(139,92,246,0.5)";
    e.target.style.background = "rgba(124,58,237,0.06)";
  };
  const inputBlur = (e) => {
    e.target.style.border = "1px solid rgba(255,255,255,0.08)";
    e.target.style.background = "rgba(255,255,255,0.04)";
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div
        className="w-full max-w-2xl rounded-2xl overflow-hidden flex items-stretch max-sm:flex-col-reverse"
        style={{
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 0 0 1px rgba(124,58,237,0.1), 0 40px 80px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.05)",
          backdropFilter: "blur(28px)",
        }}
      >
        {/* Form side */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-10 flex-1">
          <div>
            <h3 className="text-white text-xl font-semibold tracking-tight">Profile Details</h3>
            <p className="text-gray-600 text-xs mt-1">Update your name, bio and avatar</p>
          </div>

          <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)" }} />

          {/* Avatar upload */}
          <label
            htmlFor="avatar"
            className="flex items-center gap-4 cursor-pointer group w-fit"
          >
            <input onChange={(e) => setSelectedImg(e.target.files[0])} type="file" id="avatar" accept=".png,.jpg,.jpeg" hidden />
            <div className="relative">
              <img
                src={selectedImg ? URL.createObjectURL(selectedImg) : assets.avatar_icon}
                alt=""
                className="w-14 h-14 rounded-full object-cover transition-all duration-200"
                style={{ boxShadow: "0 0 0 2px rgba(124,58,237,0.3)" }}
              />
              <div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                style={{ background: "rgba(124,58,237,0.5)" }}
              >
                <span className="text-white text-xs">✎</span>
              </div>
            </div>
            <span className="text-sm text-gray-500 group-hover:text-violet-400 transition-colors">
              Upload profile image
            </span>
          </label>

          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            required
            placeholder="Your name"
            className="w-full p-3 rounded-xl text-sm text-gray-200 placeholder-gray-600 outline-none transition-all"
            style={inputStyle}
            onFocus={inputFocus}
            onBlur={inputBlur}
          />

          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            placeholder="Write profile bio"
            required
            rows={4}
            className="w-full p-3 rounded-xl text-sm text-gray-200 placeholder-gray-600 outline-none resize-none transition-all"
            style={inputStyle}
            onFocus={inputFocus}
            onBlur={inputBlur}
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-medium text-sm text-white tracking-wide transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
              boxShadow: "0 0 20px rgba(124,58,237,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 32px rgba(124,58,237,0.6), inset 0 1px 0 rgba(255,255,255,0.2)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 20px rgba(124,58,237,0.35), inset 0 1px 0 rgba(255,255,255,0.15)"; }}
          >
            Save Changes
          </button>
        </form>

        {/* Avatar display side */}
        <div
          className="flex items-center justify-center px-12 max-sm:pt-10 max-sm:pb-4"
          style={{ borderLeft: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="relative">
            <img
              className="w-36 h-36 rounded-full object-cover"
              src={selectedImg ? URL.createObjectURL(selectedImg) : authUser?.profilePic || assets.logo_icon}
              alt=""
              style={{
                boxShadow: "0 0 0 2px rgba(124,58,237,0.3), 0 0 40px rgba(124,58,237,0.2), 0 20px 40px rgba(0,0,0,0.5)",
              }}
            />
            {/* Glow ring */}
            <div
              className="absolute inset-0 rounded-full animate-pulse"
              style={{
                background: "radial-gradient(circle, transparent 55%, rgba(124,58,237,0.15) 100%)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;