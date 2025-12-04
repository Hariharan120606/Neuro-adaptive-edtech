import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import EEGStream from "./components/EEGStream";
import OverlayHint from "./components/OverlayHint";
import TrainPanel from "./components/TrainPanel";
import { predictAttentionLevel } from "./ml/attentionModel";

const App = () => {
  const [data, setData] = useState(null);
  const [connected, setConnected] = useState(false);
  const [attentionState, setAttentionState] = useState("neutral");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5050");

    ws.onopen = () => setConnected(true);

    ws.onmessage = (msg) => {
      const packet = JSON.parse(msg.data);
      setData(packet);
      const predicted = predictAttentionLevel(packet);
      setAttentionState(predicted);
    };

    ws.onclose = () => setConnected(false);
    return () => ws.close();
  }, []);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: 20 }}>
      <h1>🧠 NeuroAdaptive EdTech Prototype</h1>
      <p>{connected ? "Connected to EEG stream" : "Waiting for connection..."}</p>
      <EEGStream data={data} />
      <OverlayHint state={attentionState} />
      <TrainPanel />
    </div>
  );
};

const container = document.getElementById("root");
createRoot(container).render(<App />);
