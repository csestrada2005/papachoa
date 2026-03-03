import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Fix iOS 100vh: set --vh to window.innerHeight so sticky sections use real viewport height
const setVH = () => {
  document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
};
setVH();
window.addEventListener("resize", setVH, { passive: true });

createRoot(document.getElementById("root")!).render(<App />);
