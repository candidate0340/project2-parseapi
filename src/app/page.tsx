"use client";
import { useState, useEffect } from "react";
import {
  fetchProducts,
  fetchCategories,
  Product,
} from "../services/productService";
import ProductGrid from "../components/productGrid";

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [productsPerPage] = useState<number>(8);

  useEffect(() => {
    setLoading(true);
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
      setLoading(false);
    };

    loadProducts();
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchCategories()
      .then((fetchedCategories) => {
        if (Array.isArray(fetchedCategories)) {
          setCategories(["All", ...fetchedCategories]);
          setLoading(false);
        } else {
          console.error(
            "fetchedCategories is not as expected:",
            fetchedCategories
          );
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setLoading(false);
      });
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to the first page when changing categories
  };

  const formatCategoryLabel = (category: string): string => {
    if (category.startsWith("mens-")) {
      return "Men's " + category.charAt(5).toUpperCase() + category.slice(6);
    } else if (category.startsWith("womens-")) {
      return "Women's " + category.charAt(7).toUpperCase() + category.slice(8);
    } else if (category.startsWith("home-")) {
      return "Home " + category.charAt(5).toUpperCase() + category.slice(6);
    }
    // Default formatting for other categories
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const totalNumberOfPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <div className="container mx-auto my-8">
      <div className="relative todo opacity-0 translate-y-[-20px] transition duration-500 ease-in-out">
        <h1 className="text-2xl font-bold mb-2 flex justify-center">
          Candidate 0340 Project 2
        </h1>
        <p className="mb-4 flex justify-center">
          DummyJson API parsed with Next.js, built with TailwindCSS and GSAP.
        </p>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="mb-4 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`categories px-4 py-2 border rounded hover:text-white active:bg-indigo-600 hover:bg-indigo-300 opacity-0 transition duration-100 ease-in-out gap-2 ${
                  selectedCategory === category
                    ? "bg-indigo-600 text-white"
                    : "bg-white"
                }`}
              >
                {formatCategoryLabel(category)}
              </button>
            ))}
          </div>

          <ProductGrid products={paginatedProducts} />
          <div className="flex justify-center mt-8">
            <button
              className="border px-4 py-2 mx-1"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </button>
            <button
              className="border px-4 py-2 mx-1"
              disabled={currentPage >= totalNumberOfPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsPage;
