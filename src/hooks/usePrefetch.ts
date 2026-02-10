import { useEffect } from "react";

// Prefetch route modules for instant navigation
const routeModules: Record<string, () => Promise<unknown>> = {
  "/catalogo": () => import("@/pages/Catalogo"),
  "/nosotros": () => import("@/pages/Nosotros"),
  "/contacto": () => import("@/pages/Contacto"),
  "/terminos": () => import("@/pages/Terminos"),
  "/devoluciones": () => import("@/pages/Devoluciones"),
  "/privacidad": () => import("@/pages/Privacidad"),
  "/faq": () => import("@/pages/FAQ"),
};

export const usePrefetchRoutes = () => {
  useEffect(() => {
    // Use requestIdleCallback when available for zero-impact prefetch
    const schedule = typeof requestIdleCallback === "function"
      ? requestIdleCallback
      : (cb: () => void) => setTimeout(cb, 200);

    const id = schedule(() => {
      Object.values(routeModules).forEach((importFn) => importFn());
    });

    return () => {
      if (typeof cancelIdleCallback === "function") {
        cancelIdleCallback(id as number);
      } else {
        clearTimeout(id as number);
      }
    };
  }, []);
};

// Manual prefetch for link hover
export const prefetchRoute = (path: string) => {
  const importFn = routeModules[path];
  if (importFn) importFn();
};
