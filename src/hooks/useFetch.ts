import { useEffect, useMemo, useState } from "react";

export type Product = {
  id: number;
  title: string;
  price: number;
  category: { name: string };
  images: string[];
};

export const useFetch = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [listProducts, setListProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    if (query === "") return listProducts;
    return listProducts.filter((prod) =>
      prod.title.toLowerCase().includes(query.toLocaleLowerCase())
    );
  }, [query, listProducts]);

  useEffect(() => {
    const getProducts = async (page: number) => {
      setLoadingProducts(true);
      setError(null);

      try {
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/products/?limit=10&offset=" +
            page * 10
        );
        if (!response.ok) throw new Error("Error al cargar productos");
        const data: Product[] = await response.json();
        if (listProducts.length > 0) {
          setListProducts((prev) => [...prev, ...data]);
        } else {
          setListProducts(data);
        }
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoadingProducts(false);
      }
    };
    getProducts(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handleChangeQuery = (query: string) => {
    setQuery(query);
  };

  return {
    loadingProducts,
    currentPage,
    filteredProducts,
    listProducts,
    error,
    handleNextPage,
    handleChangeQuery,
  };
};
