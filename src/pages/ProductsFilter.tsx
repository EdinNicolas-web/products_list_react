import { useFetch } from "../hooks/useFetch";
import { ItemProduct } from "../components/ItemProduct";

const ProductsFilter = () => {
  const {
    loadingProducts,
    filteredProducts,
    currentPage,
    listProducts,
    error,
    handleNextPage,
    handleChangeQuery,
  } = useFetch();

  const displayProducts =
    filteredProducts.length > 0 ? filteredProducts : listProducts;

  return (
    <>
      <div className="w-full h-30 bg-blue-300 p-4">
        <h1 className="text-center w-full font-bold text-2xl mb-2">
          Listado de productos
        </h1>
        <input
          type="text"
          placeholder="Buscar productos..."
          onChange={(e) => handleChangeQuery(e.target.value)}
          className="w-full bg-white rounded-sm p-1"
        />
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {loadingProducts && <p className="text-center">Cargando productos...</p>}

      {!loadingProducts && displayProducts.length > 0 && (
        <div className="grid grid-cols-5 gap-4 p-2">
          {displayProducts.map((prod) => (
            <ItemProduct
              key={"product-" + prod.id}
              price={prod.price}
              category={prod.category?.name}
              name={prod.title}
              imageUrl={prod.images?.[0] ?? "https://placehold.co/600x400"}
            />
          ))}
        </div>
      )}

      {!loadingProducts && displayProducts.length === 0 && (
        <p className="text-center">No se encontraron productos</p>
      )}

      {listProducts.length > 0 && (
        <div className="w-full flex flex-col content-center justify-center">
          <p className="text-center">Página actual: {currentPage + 1}</p>
          <button
            type="button"
            className="rounded-xl p-2 bg-green-100 w-40 self-center disabled:opacity-50"
            onClick={handleNextPage}
            disabled={loadingProducts}
          >
            {loadingProducts ? "Cargando..." : "Cargar más"}
          </button>
        </div>
      )}
    </>
  );
};

export default ProductsFilter;
