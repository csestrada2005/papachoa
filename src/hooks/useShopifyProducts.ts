import { useQuery } from "@tanstack/react-query";
import { storefrontApiRequest, STOREFRONT_QUERY, type ShopifyProduct } from "@/lib/shopify";
import type { Product } from "@/data/products";

function mapShopifyProduct(node: ShopifyProduct["node"]): Product {
  const hasMamaBebe = node.tags?.includes("mama-bebe");
  const hasMamaHija = node.tags?.includes("mama-hija");
  const hasPapaHija = node.tags?.includes("papa-hija");

  let collectionAssigned: Product["collection"] = "mama-bebe";
  if (hasMamaBebe) collectionAssigned = "mama-bebe";
  else if (hasMamaHija) collectionAssigned = "mama-hija";
  else if (hasPapaHija) collectionAssigned = "papa-hija";

  const firstVariantId = node.variants?.edges[0]?.node?.id || node.id;

  const variantInventory = node.variants?.edges.map((v) => ({
    id: v.node.id,
    title: v.node.title,
    quantityAvailable: v.node.quantityAvailable,
  })) || [];

  return {
    id: firstVariantId,
    slug: node.handle,
    name: node.title,
    price: parseFloat(node.priceRange.minVariantPrice.amount),
    collection: collectionAssigned,
    image: node.images.edges[0]?.node.url || "/placeholder.svg",
    images: node.images.edges.map((img) => img.node.url),
    shortDescription:
      node.description.length > 100
        ? node.description.substring(0, 100) + "..."
        : node.description,
    longDescription: node.descriptionHtml || node.description,
    tags: node.tags || [],
    sizes:
      node.options.find(
        (opt) => opt.name === "Size" || opt.name === "Talla" || opt.name === "TALLAS"
      )?.values || [],
    material: "Jersey de algodón peinado",
    care: ["Lavar con agua fría"],
    shippingSummary: "Envío a toda la República",
    returnSummary: "30 días para cambios",
    featured: true,
    colorway: "Estándar",
    totalInventory: node.totalInventory,
    variantInventory,
  };
}

async function fetchAllShopifyProducts(): Promise<Product[]> {
  const response = await storefrontApiRequest(STOREFRONT_QUERY, { first: 50 });
  return response.data.products.edges.map(
    ({ node }: { node: ShopifyProduct["node"] }) => mapShopifyProduct(node)
  );
}

export function useShopifyProducts() {
  return useQuery({
    queryKey: ["shopify-products"],
    queryFn: fetchAllShopifyProducts,
    staleTime: 5 * 60 * 1000, // 5 min cache
  });
}

export function useShopifyProductBySlug(slug: string | undefined) {
  const { data: products, isLoading, error } = useShopifyProducts();
  const product = slug ? products?.find((p) => p.slug === slug) : undefined;
  return { product, isLoading, error };
}
