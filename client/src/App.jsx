import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import Background from "./components/Background";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { authUser } = useContext(AuthContext);

  return (
    <div className="relative min-h-screen bg-[#050508] overflow-hidden" style={{ cursor: "none" }}>
      <Background />
      <Toaster
        toastOptions={{
          style: {
            background: "rgba(20,20,35,0.95)",
            color: "#e2e0ff",
            border: "1px solid rgba(124,58,237,0.3)",
            backdropFilter: "blur(12px)",
          },
        }}
      />
      <div className="relative" style={{ zIndex: 22 }}>
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;