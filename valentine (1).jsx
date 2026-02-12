import { useState, useRef, useCallback, useEffect } from "react";

const POTATO_ASKING = (
  <svg viewBox="0 0 200 240" width="180" height="216" xmlns="http://www.w3.org/2000/svg">
    {/* Body */}
    <ellipse cx="100" cy="140" rx="72" ry="85" fill="#D4A574" />
    <ellipse cx="100" cy="140" rx="72" ry="85" fill="url(#potatoGrad)" />
    {/* Spots */}
    <ellipse cx="65" cy="120" rx="8" ry="6" fill="#C4956A" opacity="0.5" />
    <ellipse cx="135" cy="155" rx="6" ry="8" fill="#C4956A" opacity="0.4" />
    <ellipse cx="80" cy="185" rx="7" ry="5" fill="#C4956A" opacity="0.3" />
    {/* Blush */}
    <ellipse cx="60" cy="150" rx="16" ry="10" fill="#FF9999" opacity="0.5" />
    <ellipse cx="140" cy="150" rx="16" ry="10" fill="#FF9999" opacity="0.5" />
    {/* Eyes */}
    <ellipse cx="78" cy="125" rx="10" ry="12" fill="white" />
    <ellipse cx="122" cy="125" rx="10" ry="12" fill="white" />
    <ellipse cx="80" cy="127" rx="6" ry="7" fill="#3D2314" />
    <ellipse cx="124" cy="127" rx="6" ry="7" fill="#3D2314" />
    <ellipse cx="82" cy="124" rx="2.5" ry="2.5" fill="white" />
    <ellipse cx="126" cy="124" rx="2.5" ry="2.5" fill="white" />
    {/* Cute little eyebrows */}
    <path d="M68 110 Q78 104 88 110" stroke="#3D2314" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M112 110 Q122 104 132 110" stroke="#3D2314" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    {/* Smile */}
    <path d="M85 155 Q100 172 115 155" stroke="#3D2314" strokeWidth="3" fill="none" strokeLinecap="round" />
    {/* Arms holding heart */}
    <path d="M35 140 Q20 130 25 110 Q28 100 35 105" stroke="#D4A574" strokeWidth="10" fill="none" strokeLinecap="round" />
    <path d="M165 140 Q180 130 175 110 Q172 100 165 105" stroke="#D4A574" strokeWidth="10" fill="none" strokeLinecap="round" />
    {/* Little heart above */}
    <path d="M88 40 Q88 28 100 28 Q112 28 112 40 Q112 55 100 65 Q88 55 88 40Z" fill="#FF6B8A" />
    {/* Feet */}
    <ellipse cx="78" cy="222" rx="18" ry="8" fill="#C4956A" />
    <ellipse cx="122" cy="222" rx="18" ry="8" fill="#C4956A" />
    <defs>
      <radialGradient id="potatoGrad" cx="40%" cy="35%">
        <stop offset="0%" stopColor="#E8C49A" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#D4A574" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
);

const POTATO_HAPPY = (
  <svg viewBox="0 0 200 240" width="180" height="216" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="100" cy="140" rx="72" ry="85" fill="#D4A574" />
    <ellipse cx="100" cy="140" rx="72" ry="85" fill="url(#potatoGrad2)" />
    <ellipse cx="65" cy="120" rx="8" ry="6" fill="#C4956A" opacity="0.5" />
    <ellipse cx="135" cy="155" rx="6" ry="8" fill="#C4956A" opacity="0.4" />
    <ellipse cx="80" cy="185" rx="7" ry="5" fill="#C4956A" opacity="0.3" />
    {/* Big blush */}
    <ellipse cx="58" cy="148" rx="20" ry="12" fill="#FF9999" opacity="0.6" />
    <ellipse cx="142" cy="148" rx="20" ry="12" fill="#FF9999" opacity="0.6" />
    {/* Happy closed eyes */}
    <path d="M68 125 Q78 115 88 125" stroke="#3D2314" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    <path d="M112 125 Q122 115 132 125" stroke="#3D2314" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    {/* Big open smile */}
    <path d="M78 152 Q100 178 122 152" stroke="#3D2314" strokeWidth="3" fill="#FF9999" strokeLinecap="round" />
    {/* Arms up celebrating */}
    <path d="M32 140 Q12 100 30 75" stroke="#D4A574" strokeWidth="10" fill="none" strokeLinecap="round" />
    <path d="M168 140 Q188 100 170 75" stroke="#D4A574" strokeWidth="10" fill="none" strokeLinecap="round" />
    {/* Hearts around */}
    <path d="M20 65 Q20 55 28 55 Q36 55 36 65 Q36 75 28 82 Q20 75 20 65Z" fill="#FF6B8A" />
    <path d="M160 55 Q160 45 168 45 Q176 45 176 55 Q176 65 168 72 Q160 65 160 55Z" fill="#FF6B8A" />
    <path d="M88 30 Q88 18 100 18 Q112 18 112 30 Q112 45 100 55 Q88 45 88 30Z" fill="#FF6B8A" />
    {/* Sparkles */}
    <text x="145" y="40" fontSize="20" fill="#FFD700">✦</text>
    <text x="40" y="45" fontSize="16" fill="#FFD700">✦</text>
    {/* Feet */}
    <ellipse cx="78" cy="222" rx="18" ry="8" fill="#C4956A" />
    <ellipse cx="122" cy="222" rx="18" ry="8" fill="#C4956A" />
    <defs>
      <radialGradient id="potatoGrad2" cx="40%" cy="35%">
        <stop offset="0%" stopColor="#E8C49A" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#D4A574" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
);

const HEARTS_BG = () => (
  <div style={{
    position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0
  }}>
    {Array.from({ length: 18 }).map((_, i) => (
      <div key={i} style={{
        position: "absolute",
        left: `${(i * 17 + 5) % 100}%`,
        bottom: "-30px",
        fontSize: `${14 + (i % 4) * 8}px`,
        opacity: 0.15 + (i % 3) * 0.08,
        animation: `floatUp ${6 + (i % 5) * 2}s linear infinite`,
        animationDelay: `${(i * 0.8) % 6}s`,
        color: i % 3 === 0 ? "#FF6B8A" : i % 3 === 1 ? "#FF85A1" : "#FFB3C6",
      }}>
        ♥
      </div>
    ))}
  </div>
);

const CONFETTI = () => (
  <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
    {Array.from({ length: 40 }).map((_, i) => {
      const colors = ["#FF6B8A", "#FFD700", "#FF85A1", "#FFB3C6", "#FF4D6D", "#FFA5BA", "#FFCCD5"];
      return (
        <div key={i} style={{
          position: "absolute",
          left: `${Math.random() * 100}%`,
          top: "-20px",
          width: i % 3 === 0 ? "8px" : "6px",
          height: i % 3 === 0 ? "8px" : i % 2 === 0 ? "14px" : "6px",
          borderRadius: i % 3 === 0 ? "50%" : "2px",
          backgroundColor: colors[i % colors.length],
          animation: `confettiFall ${3 + Math.random() * 3}s linear infinite`,
          animationDelay: `${Math.random() * 4}s`,
          opacity: 0.8,
          transform: `rotate(${Math.random() * 360}deg)`,
        }} />
      );
    })}
  </div>
);

const nopeMessages = [
  "hehe nice try 😏",
  "nuh uh! 🙅‍♀️",
  "that button is shy!",
  "can't catch me! 💨",
  "wrong answer babe 💕",
  "try again... or don't 😜",
  "potato says NO to no!",
  "are u sure about that?? 🥺",
  "the only answer is yes! 💖",
];

export default function ValentineQuiz() {
  const [accepted, setAccepted] = useState(false);
  const [nopePos, setNopePos] = useState({ x: 0, y: 0 });
  const [nopeMessage, setNopeMessage] = useState("");
  const [msgVisible, setMsgVisible] = useState(false);
  const [bounceYes, setBounceYes] = useState(false);
  const containerRef = useRef(null);
  const msgCount = useRef(0);

  const moveNopeButton = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const maxX = rect.width - 140;
    const maxY = rect.height - 60;
    const newX = Math.random() * maxX - maxX / 2;
    const newY = Math.random() * maxY - maxY / 2;
    setNopePos({ x: newX, y: newY });

    msgCount.current += 1;
    setNopeMessage(nopeMessages[(msgCount.current - 1) % nopeMessages.length]);
    setMsgVisible(true);
    setBounceYes(true);
    setTimeout(() => setMsgVisible(false), 1800);
    setTimeout(() => setBounceYes(false), 600);
  }, []);

  useEffect(() => {
    // Preload font
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Quicksand:wght@500;700&family=Patrick+Hand&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  if (accepted) {
    return (
      <>
        <style>{`
          @keyframes confettiFall {
            0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
          }
          @keyframes popIn {
            0% { transform: scale(0) rotate(-10deg); opacity: 0; }
            50% { transform: scale(1.15) rotate(3deg); }
            100% { transform: scale(1) rotate(0deg); opacity: 1; }
          }
          @keyframes pulseHeart {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { margin: 0; }
        `}</style>
        <CONFETTI />
        <div style={{
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #FFF0F3 0%, #FFD6E0 30%, #FFACC7 70%, #FF85A1 100%)",
          fontFamily: "'Quicksand', sans-serif",
          padding: "24px",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
        }}>
          <div style={{ animation: "popIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards", zIndex: 1 }}>
            <div style={{ animation: "pulseHeart 1.5s ease-in-out infinite" }}>
              {POTATO_HAPPY}
            </div>
            <h1 style={{
              fontFamily: "'Patrick Hand', cursive",
              fontSize: "clamp(28px, 7vw, 48px)",
              color: "#C7254E",
              marginTop: "16px",
              lineHeight: 1.3,
              textShadow: "0 2px 8px rgba(199, 37, 78, 0.15)",
            }}>
              YAAAY!! 🎉💖
            </h1>
            <p style={{
              fontFamily: "'Patrick Hand', cursive",
              fontSize: "clamp(18px, 4.5vw, 26px)",
              color: "#E8657A",
              marginTop: "12px",
              maxWidth: "340px",
              lineHeight: 1.5,
            }}>
              potato is the happiest potato in the whole world!! 🥔💕
            </p>
            <p style={{
              fontSize: "clamp(14px, 3.5vw, 18px)",
              color: "#D4697C",
              marginTop: "20px",
              fontFamily: "'Patrick Hand', cursive",
            }}>
              happy valentine's day babe ♥
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) rotate(20deg); opacity: 0; }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        @keyframes gentleBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes bounceBtn {
          0% { transform: scale(1); }
          30% { transform: scale(1.15); }
          60% { transform: scale(0.95); }
          100% { transform: scale(1); }
        }
        @keyframes fadeMsg {
          0% { opacity: 0; transform: translateY(8px) scale(0.9); }
          15% { opacity: 1; transform: translateY(0) scale(1); }
          80% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-8px) scale(0.95); }
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { margin: 0; }
      `}</style>
      <HEARTS_BG />
      <div ref={containerRef} style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(160deg, #FFF5F7 0%, #FFE0E8 40%, #FFCCD5 100%)",
        fontFamily: "'Quicksand', sans-serif",
        padding: "24px",
        position: "relative",
        overflow: "hidden",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}>
        <div style={{
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}>
          <div style={{ animation: "gentleBob 3s ease-in-out infinite" }}>
            {POTATO_ASKING}
          </div>

          <h1 style={{
            fontFamily: "'Patrick Hand', cursive",
            fontSize: "clamp(24px, 6.5vw, 42px)",
            color: "#C7254E",
            marginTop: "8px",
            lineHeight: 1.3,
            animation: "wiggle 3s ease-in-out infinite",
            textShadow: "0 2px 8px rgba(199, 37, 78, 0.12)",
          }}>
            Will you be my Valentine? 🥺
          </h1>

          <p style={{
            fontFamily: "'Patrick Hand', cursive",
            fontSize: "clamp(14px, 3.5vw, 18px)",
            color: "#E8657A",
            marginTop: "6px",
            opacity: 0.8,
          }}>
            — from your favourite potato 🥔
          </p>

          {/* Message bubble */}
          <div style={{
            height: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "12px",
          }}>
            {msgVisible && (
              <div style={{
                background: "white",
                borderRadius: "20px",
                padding: "8px 18px",
                boxShadow: "0 4px 16px rgba(199, 37, 78, 0.12)",
                fontFamily: "'Patrick Hand', cursive",
                fontSize: "clamp(14px, 3.5vw, 17px)",
                color: "#D4546A",
                animation: "fadeMsg 1.8s ease forwards",
              }}>
                {nopeMessage}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div style={{
            display: "flex",
            gap: "20px",
            marginTop: "12px",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            minHeight: "80px",
            width: "100%",
            maxWidth: "360px",
          }}>
            <button
              onClick={() => setAccepted(true)}
              style={{
                fontFamily: "'Patrick Hand', cursive",
                fontSize: "clamp(20px, 5vw, 26px)",
                padding: "14px 40px",
                borderRadius: "50px",
                border: "3px solid #FF4D6D",
                background: "linear-gradient(135deg, #FF6B8A, #FF4D6D)",
                color: "white",
                cursor: "pointer",
                boxShadow: "0 6px 24px rgba(255, 77, 109, 0.35), inset 0 1px 0 rgba(255,255,255,0.3)",
                transition: "transform 0.2s, box-shadow 0.2s",
                animation: bounceYes ? "bounceBtn 0.5s ease" : "none",
                zIndex: 2,
                WebkitTapHighlightColor: "transparent",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "scale(1.08)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(255, 77, 109, 0.45), inset 0 1px 0 rgba(255,255,255,0.3)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 6px 24px rgba(255, 77, 109, 0.35), inset 0 1px 0 rgba(255,255,255,0.3)";
              }}
            >
              Definitely! 💖
            </button>

            <button
              onMouseEnter={moveNopeButton}
              onTouchStart={(e) => { e.preventDefault(); moveNopeButton(); }}
              onClick={(e) => { e.preventDefault(); moveNopeButton(); }}
              style={{
                fontFamily: "'Patrick Hand', cursive",
                fontSize: "clamp(16px, 4vw, 20px)",
                padding: "10px 28px",
                borderRadius: "50px",
                border: "2px solid #ccc",
                background: "white",
                color: "#aaa",
                cursor: "pointer",
                transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                transform: `translate(${nopePos.x}px, ${nopePos.y}px)`,
                zIndex: 2,
                whiteSpace: "nowrap",
                WebkitTapHighlightColor: "transparent",
                touchAction: "none",
              }}
            >
              Nope
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
