
export interface Product {
    id: number;
    title: string;
    thumbnail: string;
    description: string;
    brand: string;
    category: string;
    price: number;
    discountPercentage?: number;
    rating: number;
  }
  
  export const fetchProducts = async (page: number = 1, limit: number = 100): Promise<Product[]> => {
    const response = await fetch(`https://dummyjson.com/products?skip=${(page - 1) * limit}&limit=${limit}`);
    const data = await response.json();
    return data.products;
  };
  
  export const fetchCategories = async (): Promise<string[]> => {
    const response = await fetch(`https://dummyjson.com/products/categories`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    const data = await response.json();
    return data; // Assuming the data is directly the array of categories
  };
  
  