/**
 * useSeo — lightweight head tag manager (no extra deps)
 * Updates <title>, meta description, og:title, og:description,
 * og:url, twitter:title, twitter:description and canonical.
 */
interface SeoProps {
  title: string;
  description?: string;
  path?: string; // e.g. "/catalogo"
}

const BASE_URL = "https://sweet-nest-core.lovable.app";
const OG_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/P9ClyVn9vremM2LKZlHbbys2inx2/social-images/social-1771504131133-Diseño_sin_título_(1).webp";

function setMeta(selector: string, value: string) {
  const el = document.querySelector<HTMLMetaElement>(selector);
  if (el) el.setAttribute("content", value);
}

function setLink(rel: string, value: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = value;
}

export function useSeo({ title, description, path = "" }: SeoProps) {
  const fullTitle = title.includes("Papachoa") ? title : `${title} | Papachoa México`;
  const desc =
    description ??
    "Pijamas ultra suaves hechos en México para mamá, papá e hijos. Telas certificadas, estampados únicos y amor en cada costura.";
  const url = `${BASE_URL}${path}`;

  document.title = fullTitle;
  setMeta('meta[name="description"]', desc);
  setMeta('meta[property="og:title"]', fullTitle);
  setMeta('meta[property="og:description"]', desc);
  setMeta('meta[property="og:url"]', url);
  setMeta('meta[property="og:image"]', OG_IMAGE);
  setMeta('meta[name="twitter:title"]', fullTitle);
  setMeta('meta[name="twitter:description"]', desc);
  setLink("canonical", url);
}
