import React, { useState } from "react";
import { trainNetwork } from "../ml/attentionModel";

export default function TrainPanel() {
  const [msg, setMsg] = useState("Not trained");

  const start = async () => {
    setMsg("Training...");
    try {
      await trainNetwork((s) =>
        setMsg(`Iter ${s.iterations} | Error: ${s.error}`)
      );
      setMsg("Trained ✅");
    } catch (e) {
      console.error(e);
      setMsg("Training failed");
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
      <button onClick={start}>Train model</button>
      <div>{msg}</div>
    </div>
  );
}
