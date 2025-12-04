export function connectWebSocket(url, onMessage, onStatusChange) {
  const ws = new WebSocket(url);

  ws.onopen = () => onStatusChange(true);
  ws.onclose = () => onStatusChange(false);
  ws.onmessage = (msg) => onMessage(JSON.parse(msg.data));

  return ws;
}
