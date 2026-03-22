import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, ArrowLeft } from "lucide-react";
import logo from "@/assets/union-bank-logo.png";

const FeedbackScreen = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) return;
    setSubmitted(true);
    setTimeout(() => navigate("/"), 2500);
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
        <h1 className="text-xl font-bold text-primary-foreground">Your Feedback</h1>
        <p className="text-primary-foreground/70 text-sm">Help us serve you better</p>
      </div>

      <div className="px-6 py-6 opacity-0 animate-fade-in-up">
        {!submitted ? (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground mb-3">How was your experience?</p>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button key={s} onClick={() => setRating(s)} className="active:scale-90 transition-transform">
                    <Star
                      size={36}
                      className={`transition-colors ${s <= rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Additional comments</label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your thoughts…"
                rows={3}
                className="w-full bg-muted rounded-xl px-4 py-3 text-sm outline-none resize-none text-foreground placeholder:text-muted-foreground/50"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={rating === 0}
              className="kiosk-button w-full gradient-brand text-primary-foreground disabled:opacity-40"
            >
              Submit Feedback
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center py-10">
            <div className="text-5xl mb-4">🙏</div>
            <h3 className="font-bold text-lg text-foreground">Thank You!</h3>
            <p className="text-sm text-muted-foreground mt-1">Your feedback helps us improve.</p>
            <p className="text-xs text-muted-foreground mt-4">Returning to home screen…</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackScreen;
