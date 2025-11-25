const getBackendUrl = () => {
  if (import.meta.env.MODE === "development") {
    return "http://localhost:5000";
  }
  return "https://YOUR-BACKEND.onrender.com";
};

export default getBackendUrl;
