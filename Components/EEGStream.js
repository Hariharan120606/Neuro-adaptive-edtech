import React from "react";

export default function EEGStream({ data }) {
  if (!data) return <p>No signal yet...</p>;

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Live EEG Data</h3>
      <pre
        style={{
          textAlign: "left",
          display: "inline-block",
          background: "#f0f0f0",
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
