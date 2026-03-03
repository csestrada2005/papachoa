import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { isIOS } from "./lib/platform";

// Fix iOS 100vh: set --vh to window.innerHeight so sticky sections use real viewport height
const setVH = () => {
  document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
};
setVH();
window.addEventListener("resize", setVH, { passive: true });

// Add ios-device class for CSS-level iOS fixes
if (isIOS()) {
  document.documentElement.classList.add("ios-device");
}

createRoot(document.getElementById("root")!).render(<App />);
