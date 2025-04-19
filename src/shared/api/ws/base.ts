const connectWS = (): WebSocket | null => {
  const url = process.env.NEXT_PUBLIC_WS_URL;
  if (!url) return null;
  return new WebSocket(url);
};

export { connectWS };
