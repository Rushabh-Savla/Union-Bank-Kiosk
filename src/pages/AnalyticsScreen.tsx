import { useNavigate } from "react-router-dom";
import { ArrowLeft, AlertTriangle, TrendingUp, Users, Clock } from "lucide-react";
import logo from "@/assets/union-bank-logo.png";

const stats = [
  { icon: AlertTriangle, label: "Total Complaints", value: "1,247", change: "+12%", color: "text-primary" },
  { icon: Users, label: "Users Today", value: "89", change: "+5%", color: "text-secondary" },
  { icon: TrendingUp, label: "Resolution Rate", value: "94.2%", change: "+3%", color: "text-emerald-600" },
  { icon: Clock, label: "Avg. Resolution", value: "4.2 hrs", change: "-18%", color: "text-amber-600" },
];

const complaintData = [
  { category: "ATM Issues", count: 342, pct: 27 },
  { category: "Loan Queries", count: 289, pct: 23 },
  { category: "Account", count: 234, pct: 19 },
  { category: "Fraud Reports", count: 198, pct: 16 },
  { category: "General", count: 184, pct: 15 },
];

const AnalyticsScreen = () => {
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
        <h1 className="text-xl font-bold text-primary-foreground">Admin Analytics</h1>
        <p className="text-primary-foreground/70 text-sm">Branch Performance Overview</p>
      </div>

      <div className="px-6 space-y-6 py-6 pb-8">
        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 opacity-0 animate-fade-in-up">
          {stats.map((s) => (
            <div key={s.label} className="bg-muted/40 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <s.icon size={16} className={s.color} />
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
              <p className="text-2xl font-bold text-foreground tabular-nums">{s.value}</p>
              <span className="text-xs text-emerald-600 font-medium">{s.change}</span>
            </div>
          ))}
        </div>

        {/* Complaint breakdown */}
        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "150ms" }}>
          <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
            Complaint Categories
          </h3>
          <div className="space-y-3">
            {complaintData.map((c) => (
              <div key={c.category}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-foreground font-medium">{c.category}</span>
                  <span className="text-muted-foreground tabular-nums">{c.count}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full gradient-brand rounded-full transition-all duration-700"
                    style={{ width: `${c.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Frequent issues */}
        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
            Most Frequent Issues
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2 text-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" /> ATM cash not dispensed
            </li>
            <li className="flex items-center gap-2 text-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" /> Loan EMI discrepancy
            </li>
            <li className="flex items-center gap-2 text-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> UPI transaction failure
            </li>
            <li className="flex items-center gap-2 text-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Account statement request
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsScreen;
