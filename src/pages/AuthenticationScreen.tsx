import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ScanFace } from "lucide-react";
import logo from "@/assets/union-bank-logo.png";

const AuthenticationScreen = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"scanning" | "verifying" | "success">("scanning");

  useEffect(() => {
    if (status === "scanning") {
      const t = setTimeout(() => setStatus("verifying"), 2500);
      return () => clearTimeout(t);
    }
    if (status === "verifying") {
      const t = setTimeout(() => setStatus("success"), 2000);
      return () => clearTimeout(t);
    }
    if (status === "success") {
      const t = setTimeout(() => navigate("/dashboard"), 1200);
      return () => clearTimeout(t);
    }
  }, [status, navigate]);

  const statusText = {
    scanning: "Position your face in the frame",
    verifying: "Verifying identity…",
    success: "Authentication Successful!",
  };

  const statusColor = {
    scanning: "text-secondary",
    verifying: "text-primary",
    success: "text-green-600",
  };

  return (
    <div className="min-h-screen gradient-brand-vertical flex flex-col">
      <div className="px-6 pt-6 flex items-center gap-3">
        <button onClick={() => navigate("/")} className="text-primary-foreground/80 active:scale-95">
          <ArrowLeft size={24} />
        </button>
        <img src={logo} alt="Union Bank" className="w-10 h-10" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="relative mb-8">
          <div className={`w-48 h-48 rounded-full border-4 ${status === "success" ? "border-green-400" : "border-primary-foreground/30"} flex items-center justify-center transition-colors duration-500`}>
            <ScanFace size={80} className="text-primary-foreground/80" />
          </div>
          {status !== "success" && (
            <div className="absolute inset-0 rounded-full border-4 border-primary-foreground/20 animate-pulse-ring" />
          )}
        </div>

        <p className={`text-lg font-semibold ${status === "success" ? "text-green-300" : "text-primary-foreground"} transition-colors`}>
          {statusText[status]}
        </p>
        {status === "scanning" && (
          <p className="text-primary-foreground/50 text-sm mt-2">Look directly at the camera</p>
        )}
        {status === "verifying" && (
          <div className="mt-4 flex gap-1">
            {[0, 1, 2].map(i => (
              <div key={i} className="w-2 h-2 rounded-full bg-primary-foreground/60 animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
            ))}
          </div>
        )}
        {status === "success" && (
          <p className="text-primary-foreground/60 text-sm mt-2">Redirecting to dashboard…</p>
        )}
      </div>
    </div>
  );
};

export default AuthenticationScreen;
