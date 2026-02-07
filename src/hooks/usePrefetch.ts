import { useEffect } from "react";

// Prefetch route modules for instant navigation
const routeModules: Record<string, () => Promise<unknown>> = {
  "/catalogo": () => import("@/pages/Catalogo"),
};

export const usePrefetchRoutes = () => {
  useEffect(() => {
    // Prefetch after initial render is complete
    const prefetchTimeout = setTimeout(() => {
      Object.values(routeModules).forEach((importFn) => {
        importFn();
      });
    }, 100);

    return () => clearTimeout(prefetchTimeout);
  }, []);
};

// Manual prefetch for link hover
export const prefetchRoute = (path: string) => {
  const importFn = routeModules[path];
  if (importFn) {
    importFn();
  }
};
