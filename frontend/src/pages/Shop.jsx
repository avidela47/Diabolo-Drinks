import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, categoriesQuery.isLoading, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        //Filtrar productos según las categorías marcadas y el filtro de precios
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            // Compruebe si el precio del producto incluye el valor del filtro de precio ingresado
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );

        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter, filteredProductsQuery.isLoading]);

  const handleBrandClick = (size) => {
    const productsBySize = filteredProductsQuery.data?.filter(
      (product) => product.size === size
    );
    dispatch(setProducts(productsBySize));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  // Agregue la opción "Todas las marcas" a marcas únicas
  const uniqueSize = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.size)
          .filter((size) => size !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    // Actualizar el estado del filtro de precios cuando el usuario escribe en el campo de entrada
    setPriceFilter(e.target.value);
  };

  return (
    <>
      <div className="container mx-auto ml-[4rem]">
        <div className="flex md:flex-row">
          <div className="bg-[#151515] p-3 mt-2 mb-2 rounded">
            <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
              Filtrar por categoría
            </h2>

            <div className="p-5 w-[15rem]">
              {categories?.map((c) => (
                <div key={c._id} className="mb-2">
                  <div className="flex ietms-center mr-4">
                    <input
                      type="checkbox"
                      id="red-checkbox"
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />

                    <label
                      htmlFor="pink-checkbox"
                      className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                    >
                      {c.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
              Filtrar por marca
            </h2>

            <div className="p-5">
              {uniqueSize?.map((size) => (
                <>
                  <div className="flex items-enter mr-4 mb-5">
                    <input
                      type="radio"
                      id={size}
                      name="size"
                      onChange={() => handleBrandClick(size)}
                      className="w-4 h-4 text-pink-400 bg-gray-100 border-gray-300 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />

                    <label
                      htmlFor="pink-radio"
                      className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                    >
                      {size}
                    </label>
                  </div>
                </>
              ))}
            </div>

            <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
              Filtrar por precio
            </h2>

            <div className="p-5 w-[15rem]">
              <input
                type="text"
                placeholder="Ingresa precio"
                value={priceFilter}
                onChange={handlePriceChange}
                className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-pink-300"
              />
            </div>

            <div className="p-5 pt-0">
              <button
                className="w-full h4 text-center py-2 bg-black rounded-full mb-2"
                onClick={() => window.location.reload()}
              >
                Reiniciar
              </button>
            </div>
          </div>

          <div className="p-3">
            <h2 className="h4 text-center mb-2">
              {products?.length} Productos
            </h2>
            <div className="flex flex-wrap">
              {products.length === 0 ? (
                <Loader />
              ) : (
                products?.map((p) => (
                  <div className="p-3 ml-12" key={p._id}>
                  <ProductCard p={p} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
