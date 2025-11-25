const getBackendUrl = () => {
  if (import.meta.env.MODE === "development") {
    return "http://localhost:5000";
  }
  return import.meta.env.VITE_BACKEND_URL;
};

export default getBackendUrl;
