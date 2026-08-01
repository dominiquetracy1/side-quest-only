import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import styles from "./QuestMap.module.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const QuestMap = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    const initialLng = location.state?.lng || -96.797;
    const initialLat = location.state?.lat || 32.7767;
    const initialZoom = location.state?.lng ? 15 : 11;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [initialLng, initialLat],
      zoom: initialZoom,
    });

    map.current.on("style.load", () => {
      setIsLoaded(true);
      map.current.resize();

      if (location.state?.lng && location.state?.lat) {
        new mapboxgl.Popup({ offset: 25 })
          .setLngLat([location.state.lng, location.state.lat])
          .setHTML(
            `<h3 style="color:#000; font-weight:bold;">${location.state.title}</h3>`
          )
          .addTo(map.current);
      }
    });

    return () => map.current?.remove();
  }, [location.state]);

  return (
    <div className={styles.mapWrapper}>
      <button className={styles.backBtn} onClick={() => navigate("/")}>
        ← BACK
      </button>

      {!isLoaded && (
        <div className={styles.mapLoader}>
          <div className={styles.spinner}></div>
          <p>IGNITING MAP ENGINE...</p>
        </div>
      )}

      <div ref={mapContainer} className={styles.mapContainer} />
    </div>
  );
};

export default QuestMap;
