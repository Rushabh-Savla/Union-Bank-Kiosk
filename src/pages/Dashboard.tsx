import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Wallet,
  FileText,
  MessageCircle,
  HelpCircle,
  MapPin,
  Mic,
  LogOut,
  CreditCard,
  AlertTriangle,
  Building,
  Home,
  UserRound,
  Sparkles,
  Languages,
  Accessibility,
  Ticket,
  ShieldCheck,
  Bell,
  ChevronRight,
  Menu,
  X,
  MapPinned,
  PiggyBank,
  Rocket,
  Lock,
  Zap,
  HeartHandshake,
  Landmark,
  MapPinHouse,
} from "lucide-react";
import logo from "@/assets/union-bank-logo.png";

const services = [
  { icon: Wallet, label: "Balance", desc: "Check balance", path: "/service-result", color: "bg-primary/10 text-primary" },
  { icon: FileText, label: "Transactions", desc: "Recent history", path: "/service-result", color: "bg-secondary/10 text-secondary" },
  { icon: AlertTriangle, label: "Complaint", desc: "Raise issue", path: "/complaint", color: "bg-amber-500/10 text-amber-600" },
  { icon: HelpCircle, label: "Quick Help", desc: "FAQs & info", path: "/chat", color: "bg-emerald-500/10 text-emerald-600" },
  { icon: MapPin, label: "Branch Nav", desc: "Find counter", path: "/service-result", color: "bg-violet-500/10 text-violet-600" },
  { icon: CreditCard, label: "Debit Card", desc: "Card services", path: "/service-result", color: "bg-rose-500/10 text-rose-500" },
];

type Section = "dashboard" | "profile" | "accounts" | "cards" | "goals" | "nearby";
type Lang = "English" | "Hindi";

const menuItems: Array<{ icon: React.ComponentType<{ size?: number }>; label: string; section?: Section; path?: string }> = [
  { icon: Home, label: "Dashboard", section: "dashboard" },
  { icon: UserRound, label: "Profile", section: "profile" },
  { icon: Wallet, label: "Accounts", section: "accounts" },
  { icon: CreditCard, label: "Cards", section: "cards" },
  { icon: PiggyBank, label: "Savings Goals", section: "goals" },
  { icon: MapPinned, label: "Nearby Branch/ATM", section: "nearby" },
  { icon: MessageCircle, label: "Support Chat", path: "/chat" },
  { icon: AlertTriangle, label: "Complaints", path: "/complaint" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<Lang>("English");
  const [accessibilityEnabled, setAccessibilityEnabled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [focusMode, setFocusMode] = useState(false);
  const [paperlessMode, setPaperlessMode] = useState(true);
  const [safeMode, setSafeMode] = useState(true);
  const [activeSection, setActiveSection] = useState<Section>("dashboard");
  const [preferredBranch, setPreferredBranch] = useState("MG Road Branch");
  const [message, setMessage] = useState("");
  const [cards, setCards] = useState([
    { id: "1", type: "Debit Card", number: "**** **** **** 1254", network: "RuPay", status: "Active", locked: false },
    { id: "2", type: "Credit Card", number: "**** **** **** 8812", network: "VISA", status: "Active", locked: false },
  ]);
  const [goals, setGoals] = useState([
    { id: "g1", name: "Emergency Fund", pct: 52 },
    { id: "g2", name: "Vacation", pct: 68 },
    { id: "g3", name: "New Laptop", pct: 34 },
  ]);

  const isHindi = language === "Hindi";
  const tr = (en: string, hi: string) => (isHindi ? hi : en);

  const branches = [
    { name: "MG Road Branch", distance: "0.5 km", counter: "Counter 3" },
    { name: "Civil Lines Branch", distance: "1.2 km", counter: "Counter 1" },
    { name: "Sector 14 ATM", distance: "0.9 km", counter: "24x7 ATM" },
  ];

  const setBanner = (text: string) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2200);
  };

  const handleMenuClick = (item: { section?: Section; path?: string; label: string }) => {
    if (item.section) {
      setActiveSection(item.section);
      return;
    }
    if (item.path) navigate(item.path);
  };

  const toggleCardLock = (id: string) => {
    setCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, locked: !card.locked, status: card.locked ? "Active" : "Temporarily Locked" } : card)),
    );
    const current = cards.find((c) => c.id === id);
    if (current) {
      setBanner(
        current.locked
          ? tr(`${current.type} unlocked successfully`, `${current.type} सफलतापूर्वक अनलॉक हुआ`)
          : tr(`${current.type} locked successfully`, `${current.type} सफलतापूर्वक लॉक हुआ`),
      );
    }
  };

  const addToGoal = (id: string) => {
    setGoals((prev) => prev.map((goal) => (goal.id === id ? { ...goal, pct: Math.min(goal.pct + 5, 100) } : goal)));
    setBanner(tr("Added contribution to your goal", "आपके लक्ष्य में योगदान जोड़ा गया"));
  };

  const renderSectionContent = () => {
    if (activeSection === "profile") {
      return (
        <section className="rounded-2xl bg-card p-5 shadow-sm">
          <h3 className="mb-3 text-lg font-semibold text-foreground">{tr("Your Profile", "आपकी प्रोफ़ाइल")}</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground">{tr("Name", "नाम")}</p>
              <p className="text-sm font-semibold">Rushabh Savla</p>
            </div>
            <div className="rounded-xl bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground">{tr("Customer ID", "कस्टमर आईडी")}</p>
              <p className="text-sm font-semibold">UBX-4821</p>
            </div>
            <div className="rounded-xl bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground">{tr("Registered Mobile", "पंजीकृत मोबाइल")}</p>
              <p className="text-sm font-semibold">+91 98XXXXXX24</p>
            </div>
            <div className="rounded-xl bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground">{tr("KYC Status", "केवाईसी स्थिति")}</p>
              <p className="text-sm font-semibold text-emerald-700">{tr("Up to date", "अप-टू-डेट")}</p>
            </div>
          </div>
        </section>
      );
    }

    if (activeSection === "accounts") {
      return (
        <section className="rounded-2xl bg-card p-5 shadow-sm">
          <h3 className="mb-3 text-lg font-semibold text-foreground">{tr("Your Accounts", "आपके खाते")}</h3>
          <div className="space-y-3">
            {[
              { name: tr("Savings Account", "सेविंग्स अकाउंट"), no: "XXXX4821", bal: "₹1,24,567.89" },
              { name: tr("Salary Account", "सैलरी अकाउंट"), no: "XXXX0912", bal: "₹45,280.10" },
            ].map((acc) => (
              <div key={acc.no} className="flex items-center justify-between rounded-xl border border-border p-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">{acc.name}</p>
                  <p className="text-xs text-muted-foreground">{acc.no}</p>
                </div>
                <p className="text-sm font-bold tabular-nums text-foreground">{acc.bal}</p>
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (activeSection === "cards") {
      return (
        <section className="rounded-2xl bg-card p-5 shadow-sm">
          <h3 className="mb-3 text-lg font-semibold text-foreground">{tr("Your Cards", "आपके कार्ड")}</h3>
          <div className="space-y-3">
            {cards.map((card) => (
              <div key={card.id} className="rounded-xl border border-border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{card.type}</p>
                    <p className="text-xs text-muted-foreground">
                      {card.number} · {card.network}
                    </p>
                  </div>
                  <span className={`text-xs font-semibold ${card.locked ? "text-rose-600" : "text-emerald-700"}`}>
                    {card.locked ? tr("Locked", "लॉक्ड") : tr("Active", "सक्रिय")}
                  </span>
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => toggleCardLock(card.id)}
                    className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                      card.locked ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-600"
                    }`}
                  >
                    {card.locked ? tr("Unlock Card", "कार्ड अनलॉक करें") : tr("Lock Card", "कार्ड लॉक करें")}
                  </button>
                  <button
                    onClick={() => navigate("/complaint")}
                    className="rounded-lg bg-muted px-3 py-2 text-xs font-medium text-foreground"
                  >
                    {tr("Report Issue", "समस्या रिपोर्ट करें")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (activeSection === "goals") {
      return (
        <section className="rounded-2xl bg-card p-5 shadow-sm">
          <h3 className="mb-3 text-lg font-semibold text-foreground">{tr("Savings Goals", "बचत लक्ष्य")}</h3>
          <div className="space-y-4">
            {goals.map((goal) => (
              <div key={goal.id} className="rounded-xl border border-border p-3">
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{goal.name}</span>
                  <span className="text-muted-foreground">{goal.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-full rounded-full bg-violet-500" style={{ width: `${goal.pct}%` }} />
                </div>
                <button
                  onClick={() => addToGoal(goal.id)}
                  className="mt-2 rounded-lg bg-secondary/10 px-3 py-2 text-xs font-medium text-secondary"
                >
                  {tr("Add Contribution +5%", "योगदान जोड़ें +5%")}
                </button>
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (activeSection === "nearby") {
      return (
        <section className="rounded-2xl bg-card p-5 shadow-sm">
          <h3 className="mb-3 text-lg font-semibold text-foreground">{tr("Nearby Branch / ATM", "नजदीकी शाखा / एटीएम")}</h3>
          <div className="space-y-3">
            {branches.map((branch) => (
              <div key={branch.name} className="rounded-xl border border-border p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{branch.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {tr("Distance", "दूरी")}: {branch.distance} · {branch.counter}
                    </p>
                  </div>
                  {preferredBranch === branch.name && (
                    <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold text-emerald-700">
                      {tr("Preferred", "पसंदीदा")}
                    </span>
                  )}
                </div>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => {
                      setPreferredBranch(branch.name);
                      setBanner(tr("Preferred location updated", "पसंदीदा स्थान अपडेट हुआ"));
                    }}
                    className="rounded-lg bg-secondary/10 px-3 py-2 text-xs font-medium text-secondary"
                  >
                    {tr("Set Preferred", "पसंदीदा सेट करें")}
                  </button>
                  <button
                    onClick={() => {
                      setBanner(tr(`Counter info: ${branch.counter}`, `काउंटर जानकारी: ${branch.counter}`));
                    }}
                    className="rounded-lg bg-muted px-3 py-2 text-xs font-medium text-foreground"
                  >
                    {tr("View Details", "विवरण देखें")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      );
    }

    return null;
  };

  const todaysTip = tr(
    "Use voice mode for faster service if you are in a queue.",
    "यदि आप कतार में हैं तो तेज सेवा के लिए वॉइस मोड का उपयोग करें।",
  );

  return (
    <div className="min-h-screen bg-muted/30 md:flex">
      <aside
        className={`hidden border-r border-border bg-card transition-all duration-300 ease-out md:flex md:shrink-0 md:flex-col ${
          sidebarOpen ? "md:w-72" : "md:w-20"
        }`}
      >
        <div className="gradient-brand px-5 py-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
            <img src={logo} alt="Union Bank" className="h-10 w-10 rounded-md bg-white p-1" />
              {sidebarOpen && (
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wide text-primary-foreground/70">Union Bank</p>
                  <p className="truncate text-sm font-semibold text-primary-foreground">Smart Service Portal</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setSidebarOpen((v) => !v)}
              className="rounded-md bg-primary-foreground/20 p-1.5 text-primary-foreground hover:bg-primary-foreground/30"
              aria-label="Toggle menu"
            >
              {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        <div className={`flex-1 px-4 py-5 ${sidebarOpen ? "" : "px-2"}`}>
          {sidebarOpen && (
            <p className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {tr("Main Menu", "मुख्य मेनू")}
            </p>
          )}
          <div className="space-y-1">
            {menuItems.map((item) => {
              const active = item.section ? activeSection === item.section : window.location.pathname === item.path;
              return (
                <button
                  key={item.label}
                  onClick={() => handleMenuClick(item)}
                  className={`flex w-full items-center ${sidebarOpen ? "justify-between px-3" : "justify-center px-2"} rounded-xl py-2.5 text-left text-sm transition-colors ${
                    active ? "bg-primary text-primary-foreground shadow-sm" : "text-foreground hover:bg-muted"
                  }`}
                  title={item.label}
                >
                  <span className={`flex items-center ${sidebarOpen ? "gap-2.5" : ""}`}>
                    <item.icon size={16} />
                    {sidebarOpen && item.label}
                  </span>
                  {sidebarOpen && (
                    <ChevronRight size={14} className={active ? "text-primary-foreground/80" : "text-muted-foreground"} />
                  )}
                </button>
              );
            })}
          </div>

          {sidebarOpen && (
            <div className="mt-6 rounded-2xl border border-border bg-muted/40 p-4">
              <p className="mb-1 text-xs font-semibold text-muted-foreground">{tr("Profile", "प्रोफ़ाइल")}</p>
              <p className="text-sm font-semibold text-foreground">Rushabh Savla</p>
              <p className="text-xs text-muted-foreground">{tr("Customer ID", "कस्टमर आईडी")}: UBX-4821</p>
              <button
                onClick={() => setActiveSection("profile")}
                className="mt-3 w-full rounded-lg bg-secondary/10 px-3 py-2 text-xs font-medium text-secondary hover:bg-secondary/20"
              >
                {tr("View Profile", "प्रोफ़ाइल देखें")}
              </button>
            </div>
          )}
        </div>

        <div className="border-t border-border p-4">
          <button
            onClick={() => navigate("/")}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-muted px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted/80"
          >
            <LogOut size={16} />
            {tr("Exit Session", "सेशन समाप्त करें")}
          </button>
        </div>
      </aside>

      <main className="min-h-screen flex-1">
        <div className="gradient-brand px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Union Bank" className="h-10 w-10 rounded-md bg-white p-1" />
              <div>
                <p className="text-xs text-primary-foreground/70">{tr("Welcome back", "वापसी पर स्वागत है")}</p>
                <p className="text-lg font-semibold text-primary-foreground">{tr("Dashboard", "डैशबोर्ड")}</p>
              </div>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <button
                onClick={() => setLanguage((v) => (v === "English" ? "Hindi" : "English"))}
                className="flex items-center gap-1.5 rounded-full bg-primary-foreground/15 px-3 py-1.5 text-xs font-medium text-primary-foreground"
              >
                <Languages size={13} /> {language}
              </button>
              <button
                onClick={() => setAccessibilityEnabled((v) => !v)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${
                  accessibilityEnabled ? "bg-primary-foreground text-primary" : "bg-primary-foreground/15 text-primary-foreground"
                }`}
              >
                <Accessibility size={13} /> {accessibilityEnabled ? "Accessibility On" : "Accessibility"}
              </button>
              <button
                onClick={() => setFocusMode((v) => !v)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                  focusMode ? "bg-primary-foreground text-primary" : "bg-primary-foreground/15 text-primary-foreground"
                }`}
              >
                {tr("Focus Mode", "फोकस मोड")}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6 px-6 py-6">
          {message && <div className="rounded-xl border border-primary/20 bg-primary/5 px-3 py-2 text-sm text-primary">{message}</div>}

          {renderSectionContent()}

          <section className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl bg-card p-5 shadow-sm lg:col-span-2">
              <p className="text-xs text-muted-foreground">{tr("Savings Account", "सेविंग्स अकाउंट")} · XXXX4821</p>
              <p className="mt-1 text-3xl font-bold text-foreground tabular-nums">₹1,24,567.89</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveSection("accounts")}
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                >
                  {tr("Account Snapshot", "अकाउंट स्नैपशॉट")}
                </button>
                <button
                  onClick={() => navigate("/chat")}
                  className="rounded-lg bg-secondary/10 px-4 py-2 text-sm font-medium text-secondary"
                >
                  {tr("AI Guidance", "एआई मार्गदर्शन")}
                </button>
              </div>
            </div>

            <div className="rounded-2xl bg-card p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{tr("Smart Queue", "स्मार्ट कतार")}</p>
              <p className="mt-2 text-2xl font-bold text-foreground">Token B-17</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {tr("Estimated call in 6 min at Counter 3", "काउंटर 3 पर अनुमानित कॉल 6 मिनट में")}
              </p>
              <button
                onClick={() => setActiveSection("nearby")}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-700"
              >
                <Ticket size={15} /> {tr("Track Queue", "कतार ट्रैक करें")}
              </button>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl bg-card p-4 shadow-sm">
              <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Rocket size={16} className="text-primary" /> {tr("One-Tap Smart Journeys", "वन-टैप स्मार्ट जर्नीज")}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {tr("Instant guided flow for top intents: balance, card block, dispute.", "लोकप्रिय सेवाओं के लिए त्वरित गाइडेड फ्लो।")}
              </p>
            </div>
            <div className="rounded-2xl bg-card p-4 shadow-sm">
              <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Zap size={16} className="text-amber-600" /> {tr("Ultra-Fast Assist", "अल्ट्रा-फास्ट असिस्ट")}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {tr("Predictive shortcuts reduce taps and complete common tasks in seconds.", "प्रिडिक्टिव शॉर्टकट से कार्य तेज़ी से पूरे हों।")}
              </p>
            </div>
            <div className="rounded-2xl bg-card p-4 shadow-sm">
              <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Lock size={16} className="text-emerald-600" /> {tr("Panic Card Lock", "इमरजेंसी कार्ड लॉक")}
              </p>
              <button
                onClick={() => toggleCardLock("1")}
                className="mt-2 w-full rounded-lg bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-600"
              >
                {cards.find((c) => c.id === "1")?.locked ? tr("Unlock Primary Card", "मुख्य कार्ड अनलॉक करें") : tr("Instantly Lock Card", "तुरंत कार्ड लॉक करें")}
              </button>
            </div>
            <div className="rounded-2xl bg-card p-4 shadow-sm">
              <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <HeartHandshake size={16} className="text-secondary" /> {tr("Human + AI Blend", "मानव + एआई सहयोग")}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {tr("Start with AI, escalate to agent seamlessly if needed.", "एआई से शुरू करें, जरूरत पर एजेंट से तुरंत जुड़ें।")}
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">{tr("Popular Services", "लोकप्रिय सेवाएं")}</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {services.map((s) => (
                <button
                  key={s.label}
                  onClick={() => navigate(s.path)}
                  className="rounded-2xl bg-card p-4 text-left shadow-sm transition hover:shadow-md active:scale-[0.98]"
                >
                  <div className={`mb-2 flex h-11 w-11 items-center justify-center rounded-xl ${s.color}`}>
                    <s.icon size={20} />
                  </div>
                  <p className="text-sm font-semibold text-foreground">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </button>
              ))}
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-4">
            <div className="rounded-2xl bg-card p-5 shadow-sm">
              <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                <Sparkles size={16} className="text-primary" /> {tr("Personalized Suggestion", "व्यक्तिगत सुझाव")}
              </p>
              <p className="text-xs text-muted-foreground">{todaysTip}</p>
              <button
                onClick={() => navigate("/chat")}
                className="mt-3 rounded-lg bg-muted px-3 py-2 text-xs font-medium text-foreground hover:bg-muted/80"
              >
                {tr("Get Guided Flow", "गाइडेड फ्लो शुरू करें")}
              </button>
            </div>

            <div className="rounded-2xl bg-card p-5 shadow-sm">
              <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                <ShieldCheck size={16} className="text-emerald-600" /> {tr("Security Status", "सुरक्षा स्थिति")}
              </p>
              <p className="text-xs text-muted-foreground">
                {tr("Biometric verification completed. Session is protected.", "बायोमेट्रिक सत्यापन पूर्ण। सेशन सुरक्षित है।")}
              </p>
              <div className="mt-3 rounded-lg bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-700">
                {tr("Secure Session Active", "सुरक्षित सेशन सक्रिय")}
              </div>
            </div>

            <div className="rounded-2xl bg-card p-5 shadow-sm">
              <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                <Bell size={16} className="text-secondary" /> {tr("Smart Alerts", "स्मार्ट अलर्ट")}
              </p>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>{tr("EMI due reminder in 3 days", "ईएमआई देय तिथि 3 दिनों में")}</li>
                <li>{tr("New fixed deposit offer available", "नई एफडी ऑफर उपलब्ध")}</li>
                <li>{tr("KYC update not required", "केवाईसी अपडेट आवश्यक नहीं")}</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-card p-5 shadow-sm">
              <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                <PiggyBank size={16} className="text-violet-600" /> {tr("Goal Progress", "लक्ष्य प्रगति")}
              </p>
              <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                <span>{tr("Vacation Goal", "अवकाश लक्ष्य")}</span>
                <span>68%</span>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div className="h-full w-[68%] rounded-full bg-violet-500" />
              </div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            <button
              onClick={() => setPaperlessMode((v) => !v)}
              className="rounded-2xl bg-card p-4 text-left shadow-sm hover:bg-muted/20"
            >
              <p className="text-sm font-semibold text-foreground">{tr("Paperless Mode", "पेपरलेस मोड")}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {paperlessMode ? tr("Enabled", "सक्रिय") : tr("Disabled", "निष्क्रिय")} · {tr("eco-friendly receipts", "इको-फ्रेंडली रसीदें")}
              </p>
            </button>
            <button
              onClick={() => setSafeMode((v) => !v)}
              className="rounded-2xl bg-card p-4 text-left shadow-sm hover:bg-muted/20"
            >
              <p className="text-sm font-semibold text-foreground">{tr("Safe Mode", "सेफ मोड")}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {safeMode ? tr("Enabled", "सक्रिय") : tr("Disabled", "निष्क्रिय")} ·{" "}
                {tr("extra step before sensitive actions", "संवेदनशील कार्य से पहले अतिरिक्त पुष्टि")}
              </p>
            </button>
            <button
              onClick={() => navigate("/chat")}
              className="rounded-2xl bg-card p-4 text-left shadow-sm hover:bg-muted/20"
            >
              <p className="text-sm font-semibold text-foreground">{tr("Smart Intent Launcher", "स्मार्ट इंटेंट लॉन्चर")}</p>
              <p className="mt-1 text-xs text-muted-foreground">{tr("Tell us what you need in plain language.", "अपनी जरूरत सामान्य भाषा में बताएं।")}</p>
            </button>
          </section>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/chat")}
              className="flex items-center gap-2 rounded-xl bg-secondary px-4 py-2.5 text-sm font-medium text-secondary-foreground"
            >
              <MessageCircle size={16} /> {tr("Chat Assistant", "चैट असिस्टेंट")}
            </button>
            <button
              onClick={() => navigate("/chat")}
              className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
            >
              <Mic size={16} /> {tr("Voice Assistant", "वॉइस असिस्टेंट")}
            </button>
            <button
              onClick={() => navigate("/complaint")}
              className="rounded-xl bg-muted px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted/80"
            >
              {tr("Raise a Complaint", "शिकायत दर्ज करें")}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
