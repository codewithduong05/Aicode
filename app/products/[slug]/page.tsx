import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailPage from "./ProductDetailPage";
import { getProductBySlug, getProductsBySlugs, productsTable } from "../../lib/fake-db";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return productsTable.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Không tìm thấy sản phẩm | Laptop Store",
    };
  }

  return {
    title: `${product.name} | Laptop Store`,
    description: `${product.cardSpecs}. ${product.category}.`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getProductsBySlugs(product.relatedSlugs);

  return <ProductDetailPage product={product} relatedProducts={relatedProducts} />;
}
