import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bot, Video, CheckCircle } from "lucide-react";
import logo from "@/assets/union-bank-logo.png";

const ResolutionScreen = () => {
  const navigate = useNavigate();
  const [resolved, setResolved] = useState(false);

  return (
    <div className="min-h-screen bg-card">
      <div className="gradient-brand px-6 pt-6 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate("/dashboard")} className="text-primary-foreground/80 active:scale-95">
            <ArrowLeft size={24} />
          </button>
          <img src={logo} alt="" className="w-10 h-10" />
        </div>
        <h1 className="text-xl font-bold text-primary-foreground">Resolution</h1>
        <p className="text-primary-foreground/70 text-sm">Complaint #UB-20260321-0047</p>
      </div>

      <div className="px-6 space-y-4 py-6 opacity-0 animate-fade-in-up">
        {!resolved ? (
          <>
            <div className="bg-muted/40 rounded-2xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                  <Bot size={22} className="text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">AI Resolution</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Based on your complaint regarding ATM transaction failure, we've initiated a reversal. The amount of ₹5,000 will be credited within 48 hours.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">Reference: REV-2026-4821</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setResolved(true)}
                className="kiosk-button flex-1 gradient-brand text-primary-foreground"
              >
                Accept Resolution
              </button>
              <button className="kiosk-button flex-1 bg-muted text-foreground flex items-center justify-center gap-2">
                <Video size={16} /> Connect Agent
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center py-8">
            <CheckCircle size={48} className="text-emerald-500 mb-4" />
            <h3 className="font-bold text-lg text-foreground">Issue Resolved</h3>
            <p className="text-sm text-muted-foreground mt-1 text-center">
              Your complaint has been resolved. Reversal will reflect in 48 hours.
            </p>
            <button
              onClick={() => navigate("/feedback")}
              className="kiosk-button gradient-brand text-primary-foreground mt-6"
            >
              Give Feedback
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResolutionScreen;
