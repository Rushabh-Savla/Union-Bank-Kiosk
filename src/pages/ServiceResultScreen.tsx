import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, MessageCircle, CheckCircle } from "lucide-react";
import logo from "@/assets/union-bank-logo.png";

const ServiceResultScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-card">
      <div className="gradient-brand px-6 pt-6 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate("/dashboard")} className="text-primary-foreground/80 active:scale-95">
            <ArrowLeft size={24} />
          </button>
          <img src={logo} alt="" className="w-10 h-10" />
        </div>
        <h1 className="text-xl font-bold text-primary-foreground">Service Decision</h1>
      </div>

      <div className="px-6 space-y-4 py-6 opacity-0 animate-fade-in-up">
        {/* Counter routing */}
        <div className="bg-muted/40 rounded-2xl p-5 border-l-4 border-secondary">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
              <MapPin size={22} className="text-secondary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Visit Counter 3</h3>
              <p className="text-sm text-muted-foreground mt-1">
                For your account-related query, please proceed to <strong>Counter 3</strong> on the ground floor. Estimated wait: 5 minutes.
              </p>
            </div>
          </div>
        </div>

        {/* Chatbot resolved */}
        <div className="bg-muted/40 rounded-2xl p-5 border-l-4 border-emerald-500">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
              <CheckCircle size={22} className="text-emerald-600" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Resolved via AI</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Your balance inquiry has been resolved. Current balance: ₹1,24,567.89
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/chat")}
            className="kiosk-button flex-1 bg-secondary text-secondary-foreground flex items-center justify-center gap-2"
          >
            <MessageCircle size={16} /> Chat More
          </button>
          <button
            onClick={() => navigate("/feedback")}
            className="kiosk-button flex-1 gradient-brand text-primary-foreground"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceResultScreen;
