import { useNavigate } from "react-router-dom";
import logo from "@/assets/union-bank-logo.png";

const WelcomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-brand-vertical flex flex-col items-center justify-center px-6">
      <div
        className="bg-card rounded-3xl p-8 shadow-2xl flex flex-col items-center max-w-sm w-full opacity-0 animate-fade-in-up"
      >
        <div className="w-28 h-28 mb-4 rounded-full bg-white shadow-lg flex items-center justify-center p-4">
          <img src={logo} alt="Union Bank" className="w-full h-full object-contain" />
        </div>
        <h1 className="text-2xl font-bold text-foreground text-balance text-center leading-tight mb-1">
          Welcome to Union Bank
        </h1>
        <p className="text-muted-foreground text-sm mb-8">AI-Powered Self Service Kiosk</p>

        <div className="w-full space-y-3">
          <button
            onClick={() => navigate("/register")}
            className="kiosk-button w-full gradient-brand text-primary-foreground"
          >
            New User
          </button>
          <button
            onClick={() => navigate("/authenticate")}
            className="kiosk-button w-full bg-secondary text-secondary-foreground"
          >
            Existing User
          </button>
        </div>
      </div>

      <p className="text-primary-foreground/60 text-xs mt-8">Powered by AI · Secured by Aadhaar</p>
    </div>
  );
};

export default WelcomeScreen;
