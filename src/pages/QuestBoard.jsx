import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./QuestBoard.module.css";
import confetti from "canvas-confetti";
import { playCompleteSound } from "../utils/soundEffects";

const triggerConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
};

const handleComplete = (questTitle) => {
  triggerConfetti();
  playCompleteSound();

  const saved = JSON.parse(localStorage.getItem("completedQuests") || "[]");
  if (!saved.includes(questTitle)) {
    const updated = [...saved, questTitle];
    localStorage.setItem("completedQuests", JSON.stringify(updated));
  }
};

const INITIAL_QUESTS = [
  {
    id: 1,
    title: "Deep Ellum Beats",
    desc: "Go to Deep Ellum for a late-night show.",
    category: "Nightlife",
    lng: -96.784,
    lat: 32.7844,
    tip: "Catch a live set at Trees or The Deep Ellum Art Co.",
  },
  {
    id: 2,
    title: "Bishop Secrets",
    desc: "Find the hidden speakeasy in Bishop Arts.",
    category: "Social",
    lng: -96.8283,
    lat: 32.7483,
    tip: "Look for unmarked doors near the alleyways.",
  },
  {
    id: 3,
    title: "Katy Refresh",
    desc: "Walk the Katy Trail and grab a juice.",
    category: "Wellness",
    lng: -96.8066,
    lat: 32.8055,
    tip: "Start near the American Airlines Center for a solid 3-mile loop.",
  },
  {
    id: 4,
    title: "Street Art Hunt",
    desc: "Visit the Fabrication Yard for some street art photos.",
    category: "Culture",
    lng: -96.829,
    lat: 32.766,
    tip: "Wear shoes you don't mind getting dusty.",
  },
  {
    id: 5,
    title: "The Big Eye",
    desc: "Check out the giant eyeball in Downtown.",
    category: "Sightseeing",
    lng: -96.797,
    lat: 32.7801,
    tip: "Best viewed from across the street near The Joule.",
  },
  {
    id: 6,
    title: "Patio Sips",
    desc: "Grab a flight of margaritas at a patio in West Village.",
    category: "Food & Drink",
    lng: -96.7974,
    lat: 32.8037,
    tip: "Great spot for afternoon people-watching.",
  },
  {
    id: 7,
    title: "Reunion Skyline",
    desc: "Watch the sunset from the top of Reunion Tower.",
    category: "Sightseeing",
    lng: -96.8089,
    lat: 32.7752,
    tip: "Book your time slot right before golden hour.",
  },
  {
    id: 8,
    title: "Wild Detectives",
    desc: "Explore the used book stacks at Wild Detectives.",
    category: "Culture",
    lng: -96.8285,
    lat: 32.7485,
    tip: "Grab a glass of wine or coffee while you browse.",
  },
  {
    id: 9,
    title: "Klyde Warren Picnic",
    desc: "Picnic at Klyde Warren Park over the freeway.",
    category: "Wellness",
    lng: -96.8023,
    lat: 32.7888,
    tip: "Grab food from the stationary food trucks on the east side.",
  },
  {
    id: 10,
    title: "M-Line Trolley",
    desc: "Take a ride on the vintage M-Line Trolley.",
    category: "Sightseeing",
    lng: -96.8016,
    lat: 32.799,
    tip: "It's completely free to hop on and off.",
  },
  {
    id: 11,
    title: "Design District Hunt",
    desc: "Hunt for vintage finds at the Design District galleries.",
    category: "Social",
    lng: -96.825,
    lat: 32.79,
    tip: "Check out Weir's Furniture area for hidden antique pop-ups.",
  },
  {
    id: 12,
    title: "Arboretum Bamboo",
    desc: "Walk through the bamboo forest at the Dallas Arboretum.",
    category: "Wellness",
    lng: -96.7163,
    lat: 32.8256,
    tip: "Head straight to the Rory Meyers Children's Adventure Garden grove.",
  },
  {
    id: 13,
    title: "Fair Park Classic",
    desc: "Get a corny dog and see the Texas Star at Fair Park.",
    category: "Sightseeing",
    lng: -96.7629,
    lat: 32.7792,
    tip: "Explore the art deco exhibition halls while you're there.",
  },
  {
    id: 14,
    title: "Arts District Arch",
    desc: "Do a self-guided architecture tour of the Arts District.",
    category: "Culture",
    lng: -96.7954,
    lat: 32.7884,
    tip: "Check out the contrasting designs of the DMA and Nasher Center.",
  },
  {
    id: 15,
    title: "Oak Cliff Tacos",
    desc: "Find the best street tacos in Oak Cliff.",
    category: "Food & Drink",
    lng: -96.8295,
    lat: 32.746,
    tip: "Bring cash just in case the spot is old-school cash-only.",
  },
  {
    id: 16,
    title: "Lakeside Park",
    desc: "Grab a coffee and walk the paths at Lakeside Park in Highland Park.",
    category: "Wellness",
    lng: -96.7938,
    lat: 32.8351,
    tip: "Look for the iconic giant teddy bear statues.",
  },
  {
    id: 17,
    title: "Legacy West Market",
    desc: "Try the food hall and night market at Legacy West in Plano.",
    category: "Food & Drink",
    lng: -96.8229,
    lat: 33.0827,
    tip: "Go with a group so everyone can try different food stalls.",
  },
  {
    id: 18,
    title: "Toyota Music Factory",
    desc: "Catch a concert or walk around the water at Toyota Music Factory in Irving.",
    category: "Nightlife",
    lng: -96.9413,
    lat: 32.8687,
    tip: "The central plaza often has free outdoor live music.",
  },
  {
    id: 19,
    title: "Las Colinas Canals",
    desc: "Explore the canals and gondola rides in Las Colinas.",
    category: "Social",
    lng: -96.945,
    lat: 32.877,
    tip: "Book gondola rides well in advance if you want a sunset slot.",
  },
  {
    id: 20,
    title: "Frisco Square",
    desc: "Shop and dine around the square in historic downtown Frisco.",
    category: "Social",
    lng: -96.8236,
    lat: 33.1506,
    tip: "Great local coffee shops right off the main strip.",
  },
  {
    id: 21,
    title: "Grandscape Play",
    desc: "Check out the indoor mini-golf or food spots at Grandscape in The Colony.",
    category: "Nightlife",
    lng: -96.8778,
    lat: 33.0699,
    tip: "Check out SCHEELS while you're there just to see the giant Ferris wheel.",
  },
  {
    id: 22,
    title: "McKinney Square",
    desc: "Stroll through the historic downtown square in McKinney.",
    category: "Social",
    lng: -96.613,
    lat: 33.1972,
    tip: "The antique stores here are massive and multi-level.",
  },
  {
    id: 23,
    title: "Mustangs of Las Colinas",
    desc: "Visit the Mustangs of Las Colinas sculpture and museum.",
    category: "Sightseeing",
    lng: -96.9431,
    lat: 32.8804,
    tip: "Catch it when the fountain jets are fully running.",
  },
  {
    id: 24,
    title: "Addison Circle",
    desc: "Grab dinner and walk around Addison Circle.",
    category: "Food & Drink",
    lng: -96.8288,
    lat: 32.9575,
    tip: "Surrounded by great patio restaurants.",
  },
  {
    id: 25,
    title: "Downtown Carrollton",
    desc: "Check out the shops and local eateries in Downtown Carrollton.",
    category: "Social",
    lng: -96.9103,
    lat: 32.952,
    tip: "Incredible selection of boba and dessert spots.",
  },
  {
    id: 26,
    title: "Arbor Hills Nature",
    desc: "Walk the trails and check out the historic mill at Arbor Hills Nature Preserve in Plano.",
    category: "Wellness",
    lng: -96.8524,
    lat: 33.0298,
    tip: "The paved trails get busy on weekends—go early.",
  },
  {
    id: 27,
    title: "Uptown McKinney",
    desc: "Spend an afternoon shopping and dining in Uptown Dallas along McKinney Avenue.",
    category: "Social",
    lng: -96.8011,
    lat: 32.802,
    tip: "Hop on the trolley to skip walking blocks between shops.",
  },
  {
    id: 28,
    title: "Harwood District",
    desc: "Grab upscale drinks and dinner in the Harwood District.",
    category: "Nightlife",
    lng: -96.805,
    lat: 32.7915,
    tip: "Very walkable European-style streetscapes.",
  },
  {
    id: 29,
    title: "Cidercade Games",
    desc: "Play retro arcade games at Cidercade Dallas near the Design District.",
    category: "Nightlife",
    lng: -96.8222,
    lat: 32.7905,
    tip: "Entry is a flat fee for unlimited arcade play.",
  },
  {
    id: 30,
    title: "Nasher Garden",
    desc: "Walk through the sculpture garden at the Nasher Sculpture Center.",
    category: "Culture",
    lng: -96.799,
    lat: 32.7876,
    tip: "Very peaceful and quiet spot right in the middle of downtown.",
  },
  {
    id: 31,
    title: "Inwood Theatre",
    desc: "Catch an indie movie and drinks at the historic Inwood Theatre.",
    category: "Culture",
    lng: -96.8265,
    lat: 32.8465,
    tip: "Grab a cocktail and hang out in the retro lounge before showtime.",
  },
  {
    id: 32,
    title: "Lower Greenville",
    desc: "Try out the restaurants and patio scene along Lower Greenville.",
    category: "Nightlife",
    lng: -96.77,
    lat: 32.825,
    tip: "Great neighborhood vibe for bar-hopping.",
  },
  {
    id: 33,
    title: "Pecan Lodge Brisket",
    desc: "Grab legendary brisket at Pecan Lodge in Deep Ellum.",
    category: "Food & Drink",
    lng: -96.7845,
    lat: 32.784,
    tip: "Go for an early lunch to avoid the peak line rush.",
  },
  {
    id: 34,
    title: "Trinity Audubon",
    desc: "Walk the boardwalk at the Trinity River Audubon Center south of downtown.",
    category: "Wellness",
    lng: -96.738,
    lat: 32.709,
    tip: "You won't believe you're still inside Dallas limits.",
  },
  {
    id: 35,
    title: "Downtown Rooftop",
    desc: "Check out the rooftop views and drinks at a Downtown Dallas hotel lounge.",
    category: "Nightlife",
    lng: -96.797,
    lat: 32.778,
    tip: "Catch the city lights right after blue hour.",
  },
  {
    id: 36,
    title: "Knox-Henderson",
    desc: "Explore the shops and boutiques around Knox-Henderson.",
    category: "Social",
    lng: -96.788,
    lat: 32.823,
    tip: "Tons of great brunch spots tucked right off the main strip.",
  },
  {
    id: 37,
    title: "Perot Museum",
    desc: "Visit the Perot Museum of Nature and Science near Victory Park.",
    category: "Nightlife",
    lng: -96.8065,
    lat: 32.7869,
    tip: "Check out their adult-only 'Perot PRIME' nights if available.",
  },
  {
    id: 38,
    title: "White Rock Lake",
    desc: "Rent a paddleboard or kayak at White Rock Lake.",
    category: "Wellness",
    lng: -96.729,
    lat: 32.835,
    tip: "Rentals are usually easiest to book near the sailing club side.",
  },
  {
    id: 39,
    title: "Farmers Market",
    desc: "Check out the local vendor stalls at the Dallas Farmers Market.",
    category: "Food & Drink",
    lng: -96.7925,
    lat: 32.7795,
    tip: "The indoor food hall has amazing local food vendors.",
  },
  {
    id: 40,
    title: "Margaret Hunt Bridge",
    desc: "Walk across the Margaret Hunt Hill Bridge at night for skyline views.",
    category: "Sightseeing",
    lng: -96.816,
    lat: 32.779,
    tip: "Pedestrian walkway is fully lit up and secure at night.",
  },
  {
    id: 41,
    title: "Design Galleries",
    desc: "Explore the galleries and showrooms in the Dallas Design District.",
    category: "Culture",
    lng: -96.825,
    lat: 32.795,
    tip: "Many upscale showrooms are open to public browsing.",
  },
  {
    id: 42,
    title: "Bachman Lake",
    desc: "Take a walk or run through the trails at Bachman Lake.",
    category: "Wellness",
    lng: -96.853,
    lat: 32.855,
    tip: "Watch small planes land at Love Field right across the water.",
  },
  {
    id: 43,
    title: "African American Museum",
    desc: "Visit the African American Museum in Fair Park.",
    category: "Culture",
    lng: -96.76,
    lat: 32.778,
    tip: "Free admission and world-class folk art collections.",
  },
  {
    id: 44,
    title: "Bishop Arts Pastries",
    desc: "Grab pastries and coffee at a local spot in Bishop Arts.",
    category: "Food & Drink",
    lng: -96.828,
    lat: 32.748,
    tip: "Go early before the best pastry items sell out.",
  },
  {
    id: 45,
    title: "Plano Art Walk",
    desc: "Check out the public art installations scattered around downtown Plano.",
    category: "Culture",
    lng: -96.703,
    lat: 33.014,
    tip: "Great wall murals hidden down the alleyways.",
  },
  {
    id: 46,
    title: "The Star in Frisco",
    desc: "Visit the Ford Center at The Star in Frisco.",
    category: "Sightseeing",
    lng: -96.831,
    lat: 33.113,
    tip: "Check out the outdoor plaza surrounded by restaurants.",
  },
  {
    id: 47,
    title: "Frisco Commons",
    desc: "Walk around the scenic paths at Frisco Commons Park.",
    category: "Wellness",
    lng: -96.845,
    lat: 33.138,
    tip: "Beautiful shaded areas and ponds for relaxing.",
  },
  {
    id: 48,
    title: "Asian Trade District",
    desc: "Grab authentic international eats along the Asian Trade District lines in North Dallas.",
    category: "Food & Drink",
    lng: -96.892,
    lat: 32.912,
    tip: "Unbeatable bakeries and noodle spots tucked in the plazas.",
  },
  {
    id: 49,
    title: "Skyline Night Drive",
    desc: "Take a late-night cruise past the lit-up skyscrapers of Downtown Dallas.",
    category: "Nightlife",
    lng: -96.797,
    lat: 32.7767,
    tip: "Take I-30 for the absolute best angle of the skyline towers.",
  },
  {
    id: 50,
    title: "Deep Ellum Murals",
    desc: "Walk around and find the newest street art installations in Deep Ellum.",
    category: "Culture",
    lng: -96.782,
    lat: 32.784,
    tip: "New murals pop up constantly behind the main music venues.",
  },
];

const QuestBoard = () => {
  const navigate = useNavigate();
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [isCompleting, setIsCompleting] = useState(false);

  // Multi-select categories filter
  const [selectedCategories, setSelectedCategories] = useState([]);
  // Dedicated toggle for custom filter
  const [showCustomOnly, setShowCustomOnly] = useState(false);

  // Custom Quest Modal & Edit States
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [editingQuestId, setEditingQuestId] = useState(null);
  const [customTitle, setCustomTitle] = useState("");
  const [customDesc, setCustomDesc] = useState("");
  const [customCategory, setCustomCategory] = useState("Social");
  const [customTip, setCustomTip] = useState("");

  // Load custom quests from localStorage combined with initial quests
  const [quests, setQuests] = useState(() => {
    const savedCustom = localStorage.getItem("customQuests");
    if (savedCustom) {
      try {
        return [...INITIAL_QUESTS, ...JSON.parse(savedCustom)];
      } catch (e) {
        return INITIAL_QUESTS;
      }
    }
    return INITIAL_QUESTS;
  });

  const categories = [...new Set(quests.map((q) => q.category))];

  const toggleCategory = (cat) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const filteredQuests = quests.filter((q) => {
    if (showCustomOnly && !q.isCustom) return false;
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.includes(q.category)
    ) {
      return false;
    }
    return true;
  });

  const handleAccept = (quest) => {
    localStorage.setItem("activeSideQuest", quest.desc);
    setSelectedQuest(quest);
  };

  const completeQuestDirectly = (quest) => {
    setIsCompleting(true);
    handleComplete(quest.desc);

    const savedCompleted = localStorage.getItem("completedQuests");
    let completedQuests = [];
    if (savedCompleted) {
      try {
        completedQuests = JSON.parse(savedCompleted);
      } catch (e) {
        completedQuests = [];
      }
    }
    const updatedCompleted = [...completedQuests, quest.desc];
    localStorage.setItem("completedQuests", JSON.stringify(updatedCompleted));

    setTimeout(() => {
      navigate("/");
    }, 800);
  };

  const findOnMap = (quest) => {
    navigate("/map", {
      state: {
        lng: quest.lng || -96.797,
        lat: quest.lat || 32.7767,
        title: quest.title,
      },
    });
  };

  const openCreatorModalForNew = () => {
    setEditingQuestId(null);
    setCustomTitle("");
    setCustomDesc("");
    setCustomCategory("Social");
    setCustomTip("");
    setIsCreatorOpen(true);
  };

  const openCreatorModalForEdit = (quest) => {
    setEditingQuestId(quest.id);
    setCustomTitle(quest.title);
    setCustomDesc(quest.desc);
    setCustomCategory(quest.category);
    setCustomTip(quest.tip);
    setIsCreatorOpen(true);
  };

  const handleSaveQuest = (e) => {
    e.preventDefault();
    if (!customTitle.trim() || !customDesc.trim()) return;

    let updatedQuests;
    let updatedCustom;

    if (editingQuestId) {
      updatedQuests = quests.map((q) => {
        if (q.id === editingQuestId) {
          return {
            ...q,
            title: customTitle.trim(),
            desc: customDesc.trim(),
            category: customCategory,
            tip: customTip.trim() || "Explore and enjoy!",
          };
        }
        return q;
      });
    } else {
      const newQuest = {
        id: Date.now(),
        title: customTitle.trim(),
        desc: customDesc.trim(),
        category: customCategory,
        tip: customTip.trim() || "Explore and enjoy!",
        lng: -96.797,
        lat: 32.7767,
        isCustom: true,
      };
      updatedQuests = [...quests, newQuest];
    }

    setQuests(updatedQuests);
    updatedCustom = updatedQuests.filter((q) => q.isCustom);
    localStorage.setItem("customQuests", JSON.stringify(updatedCustom));

    setIsCreatorOpen(false);
  };

  const handleDeleteCustomQuest = (questId) => {
    const updatedQuests = quests.filter((q) => q.id !== questId);
    setQuests(updatedQuests);

    const updatedCustom = updatedQuests.filter((q) => q.isCustom);
    localStorage.setItem("customQuests", JSON.stringify(updatedCustom));
  };

  const handleResetCustomQuests = () => {
    if (
      window.confirm("Are you sure you want to delete all your custom quests?")
    ) {
      localStorage.removeItem("customQuests");
      setQuests(INITIAL_QUESTS);
      setSelectedCategories([]);
      setShowCustomOnly(false);
    }
  };

  return (
    <div className={styles.container}>
      <style>{`
        @keyframes questPop {
          0% { transform: scale(1); }
          50% { transform: scale(1.15) rotate(2deg); filter: brightness(1.4); }
          100% { transform: scale(0); opacity: 0; }
        }
        .animating-complete {
          animation: questPop 0.8s ease-in-out forwards;
        }
      `}</style>

      <header className={styles.header}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: "10px",
          }}
        >
          <button className={styles.backBtn} onClick={() => navigate("/")}>
            ← BACK
          </button>
          <div style={{ display: "flex", gap: "8px" }}>
            {quests.some((q) => q.isCustom) && (
              <button
                onClick={handleResetCustomQuests}
                style={{
                  padding: "8px 12px",
                  background: "transparent",
                  color: "#ff5252",
                  border: "1px solid #ff5252",
                  borderRadius: "4px",
                  fontWeight: "bold",
                  fontSize: "0.75rem",
                  cursor: "pointer",
                }}
              >
                Delete All Custom Quests
              </button>
            )}
            <button
              onClick={openCreatorModalForNew}
              style={{
                padding: "8px 14px",
                background: "#d4af37",
                color: "#000",
                border: "none",
                borderRadius: "4px",
                fontWeight: "bold",
                fontSize: "0.75rem",
                cursor: "pointer",
              }}
            >
              + ADD CUSTOM QUEST
            </button>
          </div>
        </div>

        <h1 className={styles.title}>The Quest Board</h1>
        <p className={styles.subtitle}>
          Select your next Dallas adventure manually or add your own.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            justifyContent: "center",
            marginTop: "16px",
          }}
        >
          {categories.map((cat) => {
            const isSelected = selectedCategories.includes(cat);
            return (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "20px",
                  border: "1px solid #d4af37",
                  background: isSelected ? "#d4af37" : "transparent",
                  color: isSelected ? "#000" : "#d4af37",
                  fontWeight: "bold",
                  fontSize: "0.75rem",
                  cursor: "pointer",
                }}
              >
                {cat} {isSelected && "✓"}
              </button>
            );
          })}

          {quests.some((q) => q.isCustom) && (
            <button
              onClick={() => setShowCustomOnly(!showCustomOnly)}
              style={{
                padding: "6px 12px",
                borderRadius: "20px",
                border: "1px solid #d4af37",
                background: showCustomOnly ? "#d4af37" : "transparent",
                color: showCustomOnly ? "#000" : "#d4af37",
                fontWeight: "bold",
                fontSize: "0.75rem",
                cursor: "pointer",
              }}
            >
              ★ Custom Quests {showCustomOnly && "✓"}
            </button>
          )}
        </div>
      </header>

      {/* CUSTOM QUEST CREATOR / EDIT MODAL */}
      {isCreatorOpen && (
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
            onSubmit={handleSaveQuest}
            style={{
              background: "#1c1c1c",
              padding: "2rem",
              borderRadius: "8px",
              maxWidth: "400px",
              width: "90%",
              textAlign: "left",
              border: "1px solid #d4af37",
              color: "#fff",
            }}
          >
            <h3
              style={{
                color: "#d4af37",
                marginBottom: "15px",
                textAlign: "center",
              }}
            >
              {editingQuestId ? "EDIT CUSTOM QUEST" : "CREATE CUSTOM QUEST"}
            </h3>

            <div style={{ marginBottom: "12px" }}>
              <label
                style={{
                  fontSize: "0.75rem",
                  color: "#bbb",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                QUEST TITLE
              </label>
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="e.g., Rooftop Sunset Drinks"
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  background: "#222",
                  border: "1px solid #444",
                  color: "#fff",
                  borderRadius: "4px",
                  fontSize: "0.9rem",
                }}
              />
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label
                style={{
                  fontSize: "0.75rem",
                  color: "#bbb",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                DESCRIPTION
              </label>
              <textarea
                value={customDesc}
                onChange={(e) => setCustomDesc(e.target.value)}
                placeholder="What is the mission?"
                required
                rows="3"
                style={{
                  width: "100%",
                  padding: "8px",
                  background: "#222",
                  border: "1px solid #444",
                  color: "#fff",
                  borderRadius: "4px",
                  fontSize: "0.9rem",
                  resize: "vertical",
                }}
              />
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label
                style={{
                  fontSize: "0.75rem",
                  color: "#bbb",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                CATEGORY
              </label>
              <select
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  background: "#222",
                  border: "1px solid #444",
                  color: "#fff",
                  borderRadius: "4px",
                  fontSize: "0.9rem",
                }}
              >
                <option value="Social">Social</option>
                <option value="Nightlife">Nightlife</option>
                <option value="Wellness">Wellness</option>
                <option value="Culture">Culture</option>
                <option value="Sightseeing">Sightseeing</option>
                <option value="Food & Drink">Food & Drink</option>
              </select>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  fontSize: "0.75rem",
                  color: "#bbb",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                INSIDER TIP (OPTIONAL)
              </label>
              <input
                type="text"
                value={customTip}
                onChange={(e) => setCustomTip(e.target.value)}
                placeholder="e.g., Go right before golden hour."
                style={{
                  width: "100%",
                  padding: "8px",
                  background: "#222",
                  border: "1px solid #444",
                  color: "#fff",
                  borderRadius: "4px",
                  fontSize: "0.9rem",
                }}
              />
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                type="submit"
                style={{
                  flex: 1,
                  padding: "10px",
                  background: "#d4af37",
                  color: "#000",
                  border: "none",
                  fontWeight: "bold",
                  cursor: "pointer",
                  borderRadius: "4px",
                }}
              >
                SAVE QUEST
              </button>
              <button
                type="button"
                onClick={() => setIsCreatorOpen(false)}
                style={{
                  flex: 1,
                  padding: "10px",
                  background: "#333",
                  color: "#fff",
                  border: "none",
                  fontWeight: "bold",
                  cursor: "pointer",
                  borderRadius: "4px",
                }}
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.grid}>
        {filteredQuests.map((quest) => (
          <div
            key={quest.id}
            className={styles.card}
            style={{ position: "relative" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span className={styles.category}>
                {quest.isCustom
                  ? `★ ${quest.category} (Custom)`
                  : quest.category}
              </span>
              <div
                style={{ display: "flex", gap: "6px", alignItems: "center" }}
              >
                {quest.isCustom && (
                  <>
                    <button
                      onClick={() => openCreatorModalForEdit(quest)}
                      title="Edit custom quest"
                      style={{
                        background: "transparent",
                        border: "1px solid #d4af37",
                        color: "#d4af37",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "0.65rem",
                        padding: "2px 6px",
                        fontWeight: "bold",
                      }}
                    >
                      EDIT
                    </button>
                    <button
                      onClick={() => handleDeleteCustomQuest(quest.id)}
                      title="Delete custom quest"
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#ff5252",
                        cursor: "pointer",
                        fontSize: "0.85rem",
                        fontWeight: "bold",
                      }}
                    >
                      ✕
                    </button>
                  </>
                )}
              </div>
            </div>
            <h3 className={styles.cardTitle}>{quest.title}</h3>
            <p className={styles.cardDesc}>{quest.desc}</p>
            <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
              <button
                className={styles.acceptBtn}
                onClick={() => handleAccept(quest)}
                style={{ flex: 1, fontSize: "0.75rem" }}
              >
                ACCEPT
              </button>
              <button
                className={styles.acceptBtn}
                onClick={() => findOnMap(quest)}
                style={{
                  flex: 1,
                  fontSize: "0.75rem",
                  backgroundColor: "#333",
                  color: "#d4af37",
                }}
              >
                MAP
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedQuest && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            className={isCompleting ? "animating-complete" : ""}
            style={{
              background: "#1c1c1c",
              padding: "2rem",
              borderRadius: "8px",
              maxWidth: "400px",
              width: "90%",
              textAlign: "center",
              border: "1px solid #d4af37",
              color: "#fff",
              transition: "transform 0.3s ease",
            }}
          >
            <span
              style={{
                color: "#d4af37",
                fontSize: "0.8rem",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              Quest Accepted!
            </span>
            <h2 style={{ margin: "10px 0", color: "#fff" }}>
              {selectedQuest.title}
            </h2>
            <p
              style={{
                color: "#bbb",
                fontSize: "0.9rem",
                marginBottom: "15px",
              }}
            >
              {selectedQuest.desc}
            </p>

            <div
              style={{
                background: "rgba(212,175,55,0.1)",
                padding: "10px",
                borderRadius: "4px",
                marginBottom: "20px",
                borderLeft: "3px solid #d4af37",
                textAlign: "left",
              }}
            >
              <strong
                style={{
                  fontSize: "0.75rem",
                  color: "#d4af37",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                INSIDER TIP:
              </strong>
              <span style={{ fontSize: "0.85rem", color: "#ddd" }}>
                {selectedQuest.tip}
              </span>
            </div>

            <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
              <button
                onClick={() => completeQuestDirectly(selectedQuest)}
                disabled={isCompleting}
                style={{
                  flex: 1,
                  padding: "10px",
                  background: "#2e7d32",
                  color: "#fff",
                  border: "none",
                  fontWeight: "bold",
                  cursor: "pointer",
                  borderRadius: "4px",
                }}
              >
                COMPLETE
              </button>
              <button
                onClick={() => findOnMap(selectedQuest)}
                disabled={isCompleting}
                style={{
                  flex: 1,
                  padding: "10px",
                  background: "#d4af37",
                  color: "#000",
                  border: "none",
                  fontWeight: "bold",
                  cursor: "pointer",
                  borderRadius: "4px",
                }}
              >
                FIND ON MAP
              </button>
            </div>

            <div style={{ marginBottom: "12px" }}>
              <button
                onClick={() => navigate("/")}
                disabled={isCompleting}
                style={{
                  width: "100%",
                  padding: "10px",
                  background: "#333",
                  color: "#fff",
                  border: "none",
                  fontWeight: "bold",
                  cursor: "pointer",
                  borderRadius: "4px",
                }}
              >
                GO HOME
              </button>
            </div>

            <div>
              <span
                onClick={() => !isCompleting && setSelectedQuest(null)}
                style={{
                  color: "#888",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  textDecoration: "underline",
                }}
              >
                Close
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestBoard;
