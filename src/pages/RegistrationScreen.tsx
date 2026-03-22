import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, User, CreditCard } from "lucide-react";
import logo from "@/assets/union-bank-logo.png";

const RegistrationScreen = () => {
  const navigate = useNavigate();
  const [aadhaar, setAadhaar] = useState("");
  const [pan, setPan] = useState("");
  const [captured, setCaptured] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!aadhaar || !pan || !captured) return;
    setSubmitting(true);
    setTimeout(() => navigate("/authenticate"), 1500);
  };

  const formatAadhaar = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 12);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  return (
    <div className="min-h-screen bg-card">
      <div className="gradient-brand px-6 pt-6 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate("/")} className="text-primary-foreground/80 active:scale-95">
            <ArrowLeft size={24} />
          </button>
          <img src={logo} alt="Union Bank" className="w-10 h-10" />
        </div>
        <h1 className="text-xl font-bold text-primary-foreground">New User Registration</h1>
        <p className="text-primary-foreground/70 text-sm">Verify your identity to get started</p>
      </div>

      <div className="px-6 space-y-6 py-6 opacity-0 animate-fade-in-up">
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1 block">Aadhaar Number</label>
          <div className="flex items-center gap-3 border border-input rounded-xl px-4 py-3">
            <User size={18} className="text-muted-foreground" />
            <input
              type="text"
              placeholder="XXXX XXXX XXXX"
              value={aadhaar}
              onChange={(e) => setAadhaar(formatAadhaar(e.target.value))}
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground/50 text-lg tracking-wider"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1 block">PAN Number</label>
          <div className="flex items-center gap-3 border border-input rounded-xl px-4 py-3">
            <CreditCard size={18} className="text-muted-foreground" />
            <input
              type="text"
              placeholder="ABCDE1234F"
              value={pan}
              onChange={(e) => setPan(e.target.value.toUpperCase().slice(0, 10))}
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground/50 text-lg tracking-wider"
            />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <label className="text-sm font-medium text-muted-foreground mb-3 block self-start">Face Capture</label>
          {!captured ? (
            <button
              onClick={() => setCaptured(true)}
              className="w-32 h-32 rounded-full border-2 border-dashed border-primary/40 flex flex-col items-center justify-center gap-2 text-primary active:scale-95 transition-transform"
            >
              <Camera size={32} />
              <span className="text-xs font-medium">Tap to Capture</span>
            </button>
          ) : (
            <div className="w-32 h-32 rounded-full bg-secondary/10 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl mb-1">✓</div>
                <span className="text-xs text-secondary font-medium">Captured</span>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!aadhaar || !pan || !captured || submitting}
          className="kiosk-button w-full gradient-brand text-primary-foreground disabled:opacity-40"
        >
          {submitting ? "Processing…" : "Submit & Verify"}
        </button>
      </div>
    </div>
  );
};

export default RegistrationScreen;
