import Image from "next/image";
import { prisma } from "@/lib/db/prisma";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import PaginationBar from "@/components/PaginationBar";

interface HomeProps {
  searchParams: { page: string };
}

export default async function Home({
  searchParams: { page = "1" },
}: HomeProps) {
  const currentPage = parseInt(page);

  const pageSize = 6;
  const heroItemCount = 1;
  const totalItemCount = await prisma.product.count();
  const totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize);

  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
    take: pageSize + (currentPage === 1 ? heroItemCount : 0),
    skip:
      (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
  });

  return (
    <div className="flex flex-col items-center">
      {currentPage === 1 && (
        <div className="hero rounded-xl bg-base-300">
          <div className="hero-content flex flex-col gap-3 lg:flex-row lg:justify-start">
            <div>
              <Image
                src={products[0].imageUrl}
                alt={products[0].name}
                width={800}
                height={400}
                className="w-full max-w-lg rounded-lg object-cover hover:shadow-2xl lg:mr-4"
                priority
              />
            </div>
            <div className="flex-col">
              <h1 className="text-3xl font-bold">{products[0].name}</h1>
              <p className="py-4 lg:py-10">{products[0].description}</p>
              <Link
                href={"/products/" + products[0].id}
                className="btn btn-primary"
              >
                Check It Out
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {(currentPage === 1 ? products.slice(1) : products).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>

      {totalPages > 1 && (
        <PaginationBar currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}
