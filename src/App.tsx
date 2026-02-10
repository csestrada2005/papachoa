import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import ScrollToTop from "@/components/ScrollToTop";
import LegalPageSkeleton from "@/components/layout/LegalPageSkeleton";
import Index from "./pages/Index";

// Lazy-load secondary routes – keeps initial JS bundle small
const Catalogo = lazy(() => import("./pages/Catalogo"));
const Producto = lazy(() => import("./pages/Producto"));
const Nosotros = lazy(() => import("./pages/Nosotros"));
const Contacto = lazy(() => import("./pages/Contacto"));
const Terminos = lazy(() => import("./pages/Terminos"));
const Devoluciones = lazy(() => import("./pages/Devoluciones"));
const Privacidad = lazy(() => import("./pages/Privacidad"));
const FAQ = lazy(() => import("./pages/FAQ"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Wrap legal pages with their own Suspense boundary for on-brand skeleton
const LegalSuspense = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LegalPageSkeleton />}>{children}</Suspense>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/catalogo" element={<Catalogo />} />
              <Route path="/producto/:slug" element={<Producto />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/terminos" element={<LegalSuspense><Terminos /></LegalSuspense>} />
              <Route path="/devoluciones" element={<LegalSuspense><Devoluciones /></LegalSuspense>} />
              <Route path="/privacidad" element={<LegalSuspense><Privacidad /></LegalSuspense>} />
              <Route path="/faq" element={<LegalSuspense><FAQ /></LegalSuspense>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
