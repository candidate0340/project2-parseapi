// components/ProductGrid.tsx
import React, { useEffect } from "react";
import { Product } from "../services/productService";
import { gsap } from "gsap";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  useEffect(() => {
    gsap.to(".product", {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      ease: "power2.in",
    });
  }, [products]);

  useEffect(() => {
    gsap.to(".todo", {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      ease: "power2.in",
    });
  }, []);

  useEffect(() => {
    gsap.to(".categories", {
      opacity: 1,
      stagger: 0.05,
      ease: "power2.in",
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <div
          key={product.id}
          className="product opacity-0 translate-y-[-20px] bg-white p-4 pb-4 flex flex-col rounded-2xl border-slate-200 border shadow-lg staggered-animation transition duration-500 ease-in-out hover:bg-indigo-600 group-hover:border-indigo-800 group-hover:border group-hover:text-white group"
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-48 object-cover rounded-xl border-slate-200 border"
          />
          <h2 className="text-lg font-bold pt-4 group-hover:text-white ">
            {product.title}
          </h2>
          <p className="group-hover:text-white border-b pb-4">
            {product.brand}
          </p>
          <div className="flex flex-col gap-2 pt-4">
            <p className="group-hover:text-white">
              Price:{" "}
              <span className="line-through text-red-600 group-hover:text-red-300">
                ${product.price.toFixed(2)}
              </span>
            </p>
            <p className="group-hover:text-white">
              Discounted Price:{" "}
              <span className="font-bold">
                $
                {calculateDiscountedPrice(
                  product.price,
                  product.discountPercentage
                ).toFixed(2)}
              </span>
            </p>
            <p className="text-sm text-gray-600 group-hover:text-white">
              Rating: {product.rating.toFixed(1)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

function calculateDiscountedPrice(
  price: number,
  discountPercentage?: number
): number {
  if (!discountPercentage) return price;
  const discountAmount = (price * discountPercentage) / 100;
  return price - discountAmount;
}

export default ProductGrid;
