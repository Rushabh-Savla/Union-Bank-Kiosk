import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Mic, Globe } from "lucide-react";
import logo from "@/assets/union-bank-logo.png";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

const botResponses: Record<string, string> = {
  default: "I can help you with balance inquiries, complaints, branch navigation, and more. How can I assist you?",
  balance: "Your savings account balance is ₹1,24,567.89 as of today.",
  loan: "For loan inquiries, I can help you check eligibility. Would you like to proceed?",
  complaint: "I'll help you register a complaint. Please describe your issue or choose a category.",
  atm: "The nearest ATM is at MG Road branch, 0.5 km away. Open 24/7.",
};

const ChatScreen = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Namaste! 🙏 Welcome to Union Bank AI Assistant. How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [lang, setLang] = useState<"EN" | "HI">("EN");
  const [listening, setListening] = useState(false);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), text, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const lower = text.toLowerCase();
      let response = botResponses.default;
      for (const [key, val] of Object.entries(botResponses)) {
        if (key !== "default" && lower.includes(key)) {
          response = val;
          break;
        }
      }
      setMessages((prev) => [...prev, { id: Date.now() + 1, text: response, sender: "bot" }]);
    }, 800);
  };

  const toggleMic = () => {
    setListening(true);
    setTimeout(() => {
      setListening(false);
      sendMessage("What is my account balance?");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-card flex flex-col">
      {/* Header */}
      <div className="gradient-brand px-6 py-4 flex items-center gap-3">
        <button onClick={() => navigate("/dashboard")} className="text-primary-foreground/80 active:scale-95">
          <ArrowLeft size={24} />
        </button>
        <img src={logo} alt="" className="w-8 h-8" />
        <div className="flex-1">
          <p className="text-primary-foreground font-semibold text-sm">AI Assistant</p>
          <p className="text-primary-foreground/60 text-xs">Online</p>
        </div>
        <button
          onClick={() => setLang(lang === "EN" ? "HI" : "EN")}
          className="flex items-center gap-1 bg-primary-foreground/15 px-3 py-1.5 rounded-full text-primary-foreground text-xs font-medium active:scale-95"
        >
          <Globe size={12} /> {lang === "EN" ? "हिंदी" : "English"}
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.sender === "user"
                  ? "gradient-brand text-primary-foreground rounded-br-md"
                  : "bg-muted text-foreground rounded-bl-md"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="px-4 pb-6 pt-2 bg-card border-t border-border">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMic}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors active:scale-95 ${
              listening ? "bg-primary text-primary-foreground animate-pulse" : "bg-muted text-muted-foreground"
            }`}
          >
            <Mic size={18} />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder={lang === "EN" ? "Type your query…" : "अपना प्रश्न लिखें…"}
            className="flex-1 bg-muted rounded-xl px-4 py-3 text-sm outline-none text-foreground placeholder:text-muted-foreground/50"
          />
          <button
            onClick={() => sendMessage(input)}
            className="w-10 h-10 rounded-full gradient-brand flex items-center justify-center text-primary-foreground active:scale-95"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
