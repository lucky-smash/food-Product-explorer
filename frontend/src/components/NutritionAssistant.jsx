import { useState, useRef, useEffect } from "react";

const NutritionAssistant = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([
        {
            role: "bot",
            text: "Hey! 👋 I'm your AI Nutrition Coach.\nTell me your fitness goal — like \"I want to lose weight, vegetarian, moderate activity\" — and I'll build a personalised plan for you!",
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async (overrideText) => {
        const text = (overrideText || input).trim();
        if (!text || loading) return;

        setMessages((prev) => [...prev, { role: "user", text }]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("http://localhost:5000/api/ai/extract-nutrition", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text }),
            });
            const data = await res.json();
            const botReply = formatBotReply(data);
            setMessages((prev) => [...prev, { role: "bot", text: botReply }]);
        } catch {
            setMessages((prev) => [
                ...prev,
                { role: "bot", text: "⚠️ Something went wrong. Please try again." },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const startListening = () => {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SR) return alert("Speech recognition not supported.");
        const recognition = new SR();
        recognition.lang = "en-US";
        setIsListening(true);
        recognition.start();
        recognition.onresult = (e) => {
            const transcript = e.results[0][0].transcript;
            setIsListening(false);
            setInput(transcript);
            handleSend(transcript);
        };
        recognition.onend = () => setIsListening(false);
        recognition.onerror = () => setIsListening(false);
    };

    const formatLabel = (str) =>
        str.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

    const formatBotReply = (data) => {
        if (data.error) return `⚠️ ${data.error}`;
        const { profile, meal_plan, suggestions } = data;
        return [
            `📊 **Your Profile**`,
            `🎯 Goal: ${formatLabel(profile.goal)}`,
            `🔥 Calories: ${profile.calories_target} kcal`,
            `💪 Protein: ${profile.protein_target}g`,
            `🥗 Diet: ${formatLabel(profile.diet_type)}`,
            `🏃 Activity: ${formatLabel(profile.activity_level)}`,
            ``,
            `🍽️ **Meal Plan**`,
            `🌅 Breakfast — ${meal_plan.breakfast}`,
            `🍛 Lunch — ${meal_plan.lunch}`,
            `🌙 Dinner — ${meal_plan.dinner}`,
            ``,
            `💡 **Suggestions**`,
            ...suggestions.map((s) => `• ${s}`),
        ].join("\n");
    };

    const quickPrompts = [
        "I want to lose weight",
        "Help me gain muscle",
        "Vegan meal plan",
        "High protein non-veg",
    ];

    // Render a line with **bold** support
    const renderLine = (line, j) => {
        const parts = [];
        const regex = /\*\*(.*?)\*\*/g;
        let lastIndex = 0;
        let match;
        while ((match = regex.exec(line)) !== null) {
            if (match.index > lastIndex) {
                parts.push(<span key={`t${j}-${lastIndex}`}>{line.slice(lastIndex, match.index)}</span>);
            }
            parts.push(<strong key={`b${j}-${match.index}`} style={{ color: "#fff" }}>{match[1]}</strong>);
            lastIndex = regex.lastIndex;
        }
        if (lastIndex < line.length) {
            parts.push(<span key={`e${j}-${lastIndex}`}>{line.slice(lastIndex)}</span>);
        }
        return parts.length > 0 ? parts : line;
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                style={{
                    position: "fixed",
                    inset: 0,
                    background: "rgba(0,0,0,0.3)",
                    zIndex: 998,
                    backdropFilter: "blur(2px)",
                }}
            />

            {/* Chat Panel */}
            <div
                style={{
                    position: "fixed",
                    top: "70px",
                    right: "24px",
                    width: "400px",
                    height: "calc(100vh - 94px)",
                    background: "#1e1e2e",
                    borderRadius: "20px",
                    boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
                    zIndex: 999,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.08)",
                    animation: "slideIn 0.3s ease-out",
                }}
            >
                {/* Header */}
                <div
                    style={{
                        padding: "16px 20px",
                        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexShrink: 0,
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div
                            style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                background: "rgba(255,255,255,0.2)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "20px",
                            }}
                        >
                            🤖
                        </div>
                        <div>
                            <h3 style={{ margin: 0, color: "#fff", fontSize: "15px", fontWeight: 700 }}>
                                AI Nutrition Coach
                            </h3>
                            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "11px" }}>
                                ● Online
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: "rgba(255,255,255,0.15)",
                            border: "none",
                            color: "#fff",
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            cursor: "pointer",
                            fontSize: "14px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "background 0.2s",
                        }}
                        onMouseOver={(e) => (e.target.style.background = "rgba(255,255,255,0.3)")}
                        onMouseOut={(e) => (e.target.style.background = "rgba(255,255,255,0.15)")}
                    >
                        ✕
                    </button>
                </div>

                {/* Messages */}
                <div
                    style={{
                        flex: 1,
                        overflowY: "auto",
                        padding: "20px 16px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                    }}
                >
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            style={{
                                display: "flex",
                                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                                gap: "8px",
                                alignItems: "flex-end",
                            }}
                        >
                            {msg.role === "bot" && (
                                <div
                                    style={{
                                        width: "28px",
                                        height: "28px",
                                        borderRadius: "50%",
                                        background: "#6366f1",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "14px",
                                        flexShrink: 0,
                                    }}
                                >
                                    🤖
                                </div>
                            )}
                            <div
                                style={{
                                    maxWidth: "80%",
                                    padding: "12px 16px",
                                    borderRadius:
                                        msg.role === "user"
                                            ? "18px 18px 4px 18px"
                                            : "18px 18px 18px 4px",
                                    background:
                                        msg.role === "user"
                                            ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                                            : "#2a2a3e",
                                    color: msg.role === "user" ? "#fff" : "#d1d5db",
                                    fontSize: "13px",
                                    lineHeight: "1.6",
                                    wordBreak: "break-word",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                                }}
                            >
                                {msg.text.split("\n").map((line, j) => (
                                    <p key={j} style={{ margin: line === "" ? "8px 0" : "2px 0" }}>
                                        {renderLine(line, j)}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Typing indicator */}
                    {loading && (
                        <div style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
                            <div
                                style={{
                                    width: "28px",
                                    height: "28px",
                                    borderRadius: "50%",
                                    background: "#6366f1",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "14px",
                                    flexShrink: 0,
                                }}
                            >
                                🤖
                            </div>
                            <div
                                style={{
                                    padding: "14px 20px",
                                    borderRadius: "18px 18px 18px 4px",
                                    background: "#2a2a3e",
                                    display: "flex",
                                    gap: "6px",
                                    alignItems: "center",
                                }}
                            >
                                <span className="typing-dot" style={{ "--i": 0 }} />
                                <span className="typing-dot" style={{ "--i": 1 }} />
                                <span className="typing-dot" style={{ "--i": 2 }} />
                            </div>
                        </div>
                    )}

                    {/* Quick Prompts */}
                    {messages.length === 1 && !loading && (
                        <div style={{ marginTop: "8px" }}>
                            <p style={{ color: "#9ca3af", fontSize: "12px", marginBottom: "8px" }}>
                                Try one of these:
                            </p>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                {quickPrompts.map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => handleSend(p)}
                                        style={{
                                            padding: "8px 14px",
                                            borderRadius: "20px",
                                            border: "1px solid rgba(99,102,241,0.4)",
                                            background: "rgba(99,102,241,0.1)",
                                            color: "#a5b4fc",
                                            fontSize: "12px",
                                            cursor: "pointer",
                                            transition: "all 0.2s",
                                            fontWeight: 500,
                                        }}
                                        onMouseOver={(e) => {
                                            e.target.style.background = "rgba(99,102,241,0.25)";
                                            e.target.style.borderColor = "#6366f1";
                                        }}
                                        onMouseOut={(e) => {
                                            e.target.style.background = "rgba(99,102,241,0.1)";
                                            e.target.style.borderColor = "rgba(99,102,241,0.4)";
                                        }}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input Bar */}
                <div
                    style={{
                        padding: "12px 16px",
                        borderTop: "1px solid rgba(255,255,255,0.06)",
                        background: "#252536",
                        display: "flex",
                        gap: "8px",
                        alignItems: "center",
                        flexShrink: 0,
                    }}
                >
                    <button
                        onClick={startListening}
                        title="Voice input"
                        className={isListening ? "mic-listening" : ""}
                        style={{
                            width: "38px",
                            height: "38px",
                            borderRadius: "50%",
                            border: "none",
                            background: isListening ? "rgba(239,68,68,0.25)" : "rgba(99,102,241,0.15)",
                            color: isListening ? "#f87171" : "#a5b4fc",
                            fontSize: "16px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            transition: "all 0.2s",
                        }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="9" y="1" width="6" height="11" rx="3" />
                            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                            <line x1="12" y1="19" x2="12" y2="23" />
                            <line x1="8" y1="23" x2="16" y2="23" />
                        </svg>
                    </button>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Type your goal…"
                        disabled={loading}
                        style={{
                            flex: 1,
                            padding: "10px 16px",
                            borderRadius: "24px",
                            border: "1px solid rgba(255,255,255,0.08)",
                            background: "#1e1e2e",
                            color: "#e5e7eb",
                            fontSize: "13px",
                            outline: "none",
                            transition: "border-color 0.2s",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                    />
                    <button
                        onClick={() => handleSend()}
                        disabled={loading || !input.trim()}
                        style={{
                            width: "38px",
                            height: "38px",
                            borderRadius: "50%",
                            border: "none",
                            background: loading || !input.trim() ? "#3a3a4e" : "#6366f1",
                            color: loading || !input.trim() ? "#6b7280" : "#fff",
                            fontSize: "16px",
                            cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            transition: "all 0.2s",
                        }}
                    >
                        ➤
                    </button>
                </div>
            </div>

            {/* Inline keyframe + typing dot styles */}
            <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .typing-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #6366f1;
          animation: bounce 1.4s infinite;
          animation-delay: calc(var(--i) * 0.2s);
        }
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-8px); opacity: 1; }
        }
        div::-webkit-scrollbar { width: 4px; }
        div::-webkit-scrollbar-track { background: transparent; }
        div::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.3); border-radius: 4px; }
        .mic-listening {
          animation: micPulse 1s ease-in-out infinite;
        }
        @keyframes micPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.4); }
          50% { box-shadow: 0 0 0 10px rgba(239,68,68,0); }
        }
      `}</style>
        </>
    );
};

export default NutritionAssistant;