import brain from "brain.js";

function makeSamples(n = 200) {
  const samples = [];
  for (let i = 0; i < n; i++) {
    const r = Math.random();
    let alpha, beta, theta, label;

    if (r < 0.33) {
      beta = 17 + Math.random() * 4;
      theta = 2 + Math.random() * 1;
      alpha = 8 + Math.random() * 2;
      label = "attentive";
    } else if (r < 0.66) {
      beta = 12 + Math.random() * 2;
      theta = 4 + Math.random() * 1;
      alpha = 8 + Math.random() * 2;
      label = "neutral";
    } else {
      beta = 8 + Math.random() * 3;
      theta = 7 + Math.random() * 2;
      alpha = 9 + Math.random() * 3;
      label = "drowsy";
    }

    const maxVal = 30;
    const input = {
      alpha: alpha / maxVal,
      beta: beta / maxVal,
      theta: theta / maxVal,
    };

    const output = { attentive: 0, neutral: 0, drowsy: 0 };
    output[label] = 1;
    samples.push({ input, output });
  }
  return samples;
}

const net = new brain.NeuralNetwork({
  hiddenLayers: [6],
  activation: "sigmoid",
  learningRate: 0.01,
});

let trained = false;

export function trainNetwork(onProgress = null) {
  const data = makeSamples(200);
  const stats = net.train(data, {
    iterations: 400,
    errorThresh: 0.005,
    log: false,
    callback: onProgress ? (s) => onProgress(s) : undefined,
    callbackPeriod: 50,
  });
  trained = true;
  return stats;
}

export function predictAttentionLevel(packet) {
  if (!packet) return "neutral";

  const maxVal = 30;
  const input = {
    alpha: packet.alpha / maxVal,
    beta: packet.beta / maxVal,
    theta: packet.theta / maxVal,
  };

  if (!trained) {
    const r = packet.beta / (packet.theta + 0.1);
    if (r < 0.8) return "drowsy";
    if (r > 1.4) return "attentive";
    return "neutral";
  }

  const out = net.run(input);
  return Object.keys(out).reduce((a, b) => (out[a] > out[b] ? a : b));
}
