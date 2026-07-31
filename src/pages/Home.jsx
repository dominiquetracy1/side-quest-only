import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import styles from "./Home.module.css";
import {
  playRollSound,
  playCompleteSound,
  playRankUpSound,
} from "../utils/soundEffects";

const BOUNTIES = [
  "Go to Deep Ellum for a late-night show.",
  "Find the hidden speakeasy in Bishop Arts.",
  "Walk the Katy Trail and grab a juice.",
  "Visit the Fabrication Yard for some street art photos.",
  "Check out the giant eyeball in Downtown.",
  "Grab a flight of margaritas at a patio in West Village.",
  "Watch the sunset from the top of Reunion Tower.",
  "Explore the used book stacks at Wild Detectives.",
  "Picnic at Klyde Warren Park over the freeway.",
  "Take a ride on the vintage M-Line Trolley.",
  "Hunt for vintage finds at the Design District galleries.",
  "Walk through the bamboo forest at the Dallas Arboretum.",
  "Get a corny dog and see the Texas Star at Fair Park.",
  "Do a self-guided architecture tour of the Arts District.",
  "Find the best street tacos in Oak Cliff.",
  "Grab a coffee and walk the paths at Lakeside Park in Highland Park.",
  "Try the food hall and night market at Legacy West in Plano.",
  "Catch a concert or walk around the water at Toyota Music Factory in Irving.",
  "Explore the canals and gondola rides in Las Colinas.",
  "Shop and dine around the square in historic downtown Frisco.",
  "Check out the indoor mini-golf or food spots at Grandscape in The Colony.",
  "Stroll through the historic downtown square in McKinney.",
  "Visit the Mustangs of Las Colinas sculpture and museum.",
  "Grab dinner and walk around Addison Circle.",
  "Check out the shops and local eateries in Downtown Carrollton.",
  "Walk the trails and check out the historic mill at Arbor Hills Nature Preserve in Plano.",
  "Spend an afternoon shopping and dining in Uptown Dallas along McKinney Avenue.",
  "Grab upscale drinks and dinner in the Harwood District.",
  "Play retro arcade games at Cidercade Dallas near the Design District.",
  "Walk through the sculpture garden at the Nasher Sculpture Center.",
  "Catch an indie movie and drinks at the historic Inwood Theatre.",
  "Try out the restaurants and patio scene along Lower Greenville.",
  "Grab legendary brisket at Pecan Lodge in Deep Ellum.",
  "Walk the boardwalk at the Trinity River Audubon Center south of downtown.",
  "Check out the rooftop views and drinks at a Downtown Dallas hotel lounge.",
  "Explore the shops and boutiques around Knox-Henderson.",
  "Visit the Perot Museum of Nature and Science near Victory Park.",
  "Grab late-night bites and drinks in Knox-Henderson.",
  "Rent a paddleboard or kayak at White Rock Lake.",
  "Check out the local vendor stalls at the Dallas Farmers Market.",
  "Walk across the Margaret Hunt Hill Bridge at night for skyline views.",
  "Explore the galleries and showrooms in the Dallas Design District.",
  "Take a walk or run through the trails at Bachman Lake.",
  "Visit the African American Museum in Fair Park.",
  "Grab pastries and coffee at a local spot in Bishop Arts.",
  "Check out the public art installations scattered around downtown Plano.",
  "Visit the Ford Center at The Star in Frisco.",
  "Walk around the scenic paths at Frisco Commons Park.",
  "Grab authentic international eats along the Asian Trade District lines in North Dallas.",
  "Take a late-night cruise past the lit-up skyscrapers of Downtown Dallas.",
];

const Home = () => {
  const navigate = useNavigate();
  const [currentBounty, setCurrentBounty] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [completedQuests, setCompletedQuests] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [hoverText, setHoverText] = useState("Side Quests Only");

  const [userName, setUserName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const savedName = localStorage.getItem("questUserName");
    if (savedName) {
      setUserName(savedName);
    } else {
      setIsModalOpen(true);
    }

    const savedQuest = localStorage.getItem("activeSideQuest");
    if (savedQuest) setCurrentBounty(savedQuest);

    const savedCompleted = localStorage.getItem("completedQuests");
    if (savedCompleted) {
      try {
        setCompletedQuests(JSON.parse(savedCompleted));
      } catch (e) {
        setCompletedQuests([]);
      }
    }
  }, []);

  const handleNameSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const name = inputValue.trim();
    localStorage.setItem("questUserName", name);
    setUserName(name);
    setIsModalOpen(false);

    try {
      await fetch(
        "https://discord.com/api/webhooks/1532628667178418340/Q7lLlzfRtBk2abrXCzsz29fnWMybA1QmXt2M7buZo2WfCJ6Hgr3sPgU3liTG9c7Bh7_4",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: `🚨 New Quest User Logged In: **${name}**`,
          }),
        }
      );
    } catch (err) {
      // Catch block
    }
  };

  const getRank = (count) => {
    if (count >= 15) return "Dallas Legend";
    if (count >= 10) return "Local Guide";
    if (count >= 5) return "Urban Explorer";
    return userName || "Newcomer";
  };

  const rollBounty = () => {
    playRollSound();
    setIsSearching(true);
    setCurrentBounty("");

    setTimeout(() => {
      const randomQuest = BOUNTIES[Math.floor(Math.random() * BOUNTIES.length)];
      setCurrentBounty(randomQuest);
      localStorage.setItem("activeSideQuest", randomQuest);
      setIsSearching(false);
    }, 1500);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const completeQuest = () => {
    if (!currentBounty) return;
    triggerConfetti();
    playCompleteSound();

    const newCount = completedQuests.length + 1;
    if (newCount === 5 || newCount === 10 || newCount === 15) {
      playRankUpSound();
    }

    const updatedCompleted = [...completedQuests, currentBounty];
    setCompletedQuests(updatedCompleted);
    localStorage.setItem("completedQuests", JSON.stringify(updatedCompleted));
    setCurrentBounty("");
    localStorage.removeItem("activeSideQuest");
  };

  const abandonQuest = () => {
    setCurrentBounty("");
    localStorage.removeItem("activeSideQuest");
  };

  return (
    <main className={styles.container}>
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
          }}
        >
          <form
            onSubmit={handleNameSubmit}
            style={{
              background: "#1c1c1c",
              padding: "2rem",
              borderRadius: "8px",
              maxWidth: "350px",
              width: "90%",
              textAlign: "center",
              border: "1px solid #d4af37",
              color: "#fff",
            }}
          >
            <h3 style={{ color: "#d4af37", marginBottom: "10px" }}>
              CHOOSE YOUR ADVENTURE
            </h3>
            <p
              style={{
                fontSize: "0.85rem",
                color: "#bbb",
                marginBottom: "15px",
              }}
            >
              Enter your name to begin your adventure:
            </p>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Your name..."
              required
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "15px",
                background: "#222",
                border: "1px solid #444",
                color: "#fff",
                borderRadius: "4px",
                fontSize: "1rem",
                textAlign: "center",
              }}
            />
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "10px",
                background: "#d4af37",
                color: "#000",
                border: "none",
                fontWeight: "bold",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              START
            </button>
          </form>
        </div>
      )}

      <div
        className={styles.streakBadge}
        onClick={() => {
          triggerConfetti();
          setShowCompleted(!showCompleted);
        }}
        style={{ cursor: "pointer" }}
        title="Click to toggle completed quest history"
      >
        <span className={styles.rankText}>
          {getRank(completedQuests.length)}
        </span>
        <div className={styles.streakCount}>
          🏆 {completedQuests.length} Quests
        </div>
      </div>

      {showCompleted && (
        <div className={styles.bountyPopup} style={{ marginBottom: "20px" }}>
          <button
            className={styles.closeBtn}
            onClick={() => setShowCompleted(false)}
          >
            ✕
          </button>
          <div className={styles.bountyContent}>
            <span
              style={{
                display: "block",
                marginBottom: "10px",
                fontWeight: "bold",
              }}
            >
              COMPLETED QUESTS:
            </span>
            {completedQuests.length === 0 ? (
              <p>No completed quests yet.</p>
            ) : (
              <ul style={{ textAlign: "left", paddingLeft: "20px", margin: 0 }}>
                {completedQuests.map((quest, index) => (
                  <li key={index} style={{ marginBottom: "6px" }}>
                    {quest}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      <h1 className={styles.title}>{hoverText}</h1>
      <p className={styles.subtitle}>
        Curated Dallas adventures for your next great story.
      </p>

      {(isSearching || currentBounty) && (
        <div className={styles.displayArea}>
          {isSearching && (
            <div className={styles.loader}>SEARCHING QUEST BOARD...</div>
          )}

          {currentBounty && !isSearching && (
            <div className={styles.bountyPopup}>
              <button className={styles.closeBtn} onClick={abandonQuest}>
                ✕
              </button>
              <div className={styles.bountyContent}>
                <span>ACTIVE QUEST:</span> {currentBounty}
              </div>
              <div className={styles.popupButtons}>
                <button className={styles.completeBtn} onClick={completeQuest}>
                  QUEST COMPLETED
                </button>
                <button className={styles.rerollBtn} onClick={rollBounty}>
                  TRY ANOTHER
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <div className={styles.buttonGroup}>
        <button
          className={styles.primaryButton}
          onClick={() => navigate("/map")}
          onMouseEnter={() => setHoverText("Navigate Dallas")}
          onMouseLeave={() => setHoverText("Side Quests Only")}
        >
          VIEW MAP
        </button>
        <button
          className={styles.secondaryButton}
          onClick={() => navigate("/board")}
          onMouseEnter={() => setHoverText("Pick a Mission")}
          onMouseLeave={() => setHoverText("Side Quests Only")}
        >
          QUEST BOARD
        </button>
        {!currentBounty && (
          <button
            className={`${styles.secondaryButton} ${styles.bounty}`}
            onClick={rollBounty}
            onMouseEnter={() => setHoverText("Roll the Dice")}
            onMouseLeave={() => setHoverText("Side Quests Only")}
            disabled={isSearching}
          >
            {isSearching ? "ROLLING..." : "DAILY BOUNTY"}
          </button>
        )}
      </div>
    </main>
  );
};

export default Home;
