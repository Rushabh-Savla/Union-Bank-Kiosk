import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mic, Send } from "lucide-react";
import logo from "@/assets/union-bank-logo.png";

const categories = [
  { label: "Loan", emoji: "💰" },
  { label: "ATM", emoji: "🏧" },
  { label: "Account", emoji: "📋" },
  { label: "Fraud", emoji: "🚨" },
  { label: "General", emoji: "📝" },
];

const ComplaintScreen = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!selected || !description.trim()) return;
    setSubmitting(true);
    setTimeout(() => navigate("/resolution"), 1500);
  };

  return (
    <div className="min-h-screen bg-card">
      <div className="gradient-brand px-6 pt-6 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate("/dashboard")} className="text-primary-foreground/80 active:scale-95">
            <ArrowLeft size={24} />
          </button>
          <img src={logo} alt="" className="w-10 h-10" />
        </div>
        <h1 className="text-xl font-bold text-primary-foreground">Register Complaint</h1>
        <p className="text-primary-foreground/70 text-sm">We'll resolve your issue quickly</p>
      </div>

      <div className="px-6 space-y-6 py-6 opacity-0 animate-fade-in-up">
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-3 block">Category</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c.label}
                onClick={() => setSelected(c.label)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all active:scale-95 ${
                  selected === c.label
                    ? "gradient-brand text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {c.emoji} {c.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Describe your issue</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell us what happened…"
            rows={4}
            className="w-full bg-muted rounded-xl px-4 py-3 text-sm outline-none resize-none text-foreground placeholder:text-muted-foreground/50"
          />
          <div className="flex justify-end mt-2">
            <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary active:scale-95">
              <Mic size={14} /> Voice input
            </button>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!selected || !description.trim() || submitting}
          className="kiosk-button w-full gradient-brand text-primary-foreground disabled:opacity-40 flex items-center justify-center gap-2"
        >
          {submitting ? "Submitting…" : <><Send size={16} /> Submit Complaint</>}
        </button>
      </div>
    </div>
  );
};

export default ComplaintScreen;
