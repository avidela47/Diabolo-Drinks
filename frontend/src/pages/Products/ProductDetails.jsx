import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Revisión creada exitosamente");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <>
      <div>
        <Link
          to="/"
          className="inline-flex items-center px-3 py-2 text-sm text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800 ml-[10.5rem]"
        >
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="12.000000pt"
            height="12.000000pt"
            viewBox="0 0 1280.000000 1226.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,1226.000000) scale(0.100000,-0.100000)"
              fill="#000000"
              stroke="none"
            >
              <path
                d="M5485 11778 c-302 -265 -802 -703 -1110 -973 -308 -270 -1124 -985
-1814 -1589 -1005 -881 -1251 -1101 -1239 -1110 8 -6 900 -825 1983 -1821
1083 -995 2181 -2005 2440 -2242 258 -238 472 -433 475 -433 3 0 4 633 2 1407
-1 774 1 1410 5 1414 11 11 327 -8 458 -27 848 -122 1536 -568 1913 -1239 120
-214 200 -444 248 -710 25 -143 26 -497 1 -650 -71 -430 -267 -850 -561 -1200
-142 -169 -315 -338 -493 -482 -103 -83 -123 -106 -38 -43 63 46 90 54 160 42
46 -8 53 -6 90 21 29 21 23 13 -20 -28 -96 -89 -277 -228 -451 -343 -88 -59
-169 -113 -180 -120 -17 -11 -17 -11 3 -2 12 5 68 10 125 10 l103 0 -25 -21
c-48 -39 14 -2 159 95 145 98 332 242 435 336 l58 54 230 3 c224 2 230 3 261
26 38 28 67 45 52 30 -21 -21 -167 -125 -276 -196 -159 -102 -313 -193 -473
-277 -131 -69 -166 -91 -108 -69 15 6 79 12 143 12 98 2 114 0 100 -11 -26
-22 189 92 300 158 146 88 304 193 444 295 66 48 109 75 95 61 l-25 -27 95 2
95 1 85 72 c120 101 376 353 485 476 572 652 899 1382 1002 2240 21 176 23
624 4 800 -35 321 -94 605 -183 880 -254 784 -726 1480 -1373 2021 -758 635
-1753 1013 -2780 1057 l-160 7 -3 1288 -2 1287 -93 0 -92 0 -550 -482z m2825
-9571 c0 -2 -19 -21 -42 -42 l-43 -40 40 43 c36 39 45 47 45 39z m730 -1 c0
-2 -8 -10 -17 -17 -16 -13 -17 -12 -4 4 13 16 21 21 21 13z"
              />
              <path
                d="M9068 2084 c-32 -25 -58 -48 -58 -50 0 -3 27 16 60 41 52 40 68 55
58 55 -2 0 -29 -21 -60 -46z"
              />
              <path
                d="M7669 2023 c-13 -16 -12 -17 4 -4 16 13 21 21 13 21 -2 0 -10 -8 -17
-17z"
              />
            </g>
          </svg>
          Regresar
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          <div className="flex flex-wrap relative items-between mt-[2rem] ml-[10rem]">
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full xl:w-[35rem] lg:w-[35rem] md:w-[20rem] sm:w-[20rem] mt-[1rem]"
              />

              <HeartIcon product={product} />
            </div>

            <div className="flex flex-col justify-between ml-[2rem] mt-[-1rem]">
              <h2 className="text-2xl font-semibold">{product.name}</h2>
              <p className="my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[#B0B0B0]">
                {product.description}
              </p>

              <p className="text-5xl my-4 font-extrabold">$ {product.price}</p>

              <div className="flex items-center justify-between w-[20rem]">
                <div className="one">
                  <h1 className="flex items-center mb-6">
                    <FaStore className="mr-2 text-white" /> Marca:{" "}
                    {product.size}
                  </h1>
                  <h1 className="flex items-center mb-6 w-[20rem]">
                    <FaClock className="mr-2 text-white" /> Agregado:{" "}
                    {moment(product.createAt).fromNow()}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaStar className="mr-2 text-white" /> Reseñas:{" "}
                    {product.numReviews}
                  </h1>
                </div>

                <div className="two">
                  <h1 className="flex items-center mb-6">
                    <FaStar className="mr-2 text-white" /> Calificacion:{" "}
                    {rating}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaShoppingCart className="mr-2 text-white" /> Cantidad:{" "}
                    {product.quantity}
                  </h1>
                  <h1 className="flex items-center mb-6 w-[10rem]">
                    <FaBox className="mr-2 text-white" /> En Stock:{" "}
                    {product.countInStock}
                  </h1>
                </div>
              </div>

              <div className="flex justify-between flex-wrap">
                <Ratings
                  value={product.rating}
                  text={`: ${product.numReviews} reseñas`}
                />

                {product.countInStock > 0 && (
                  <div>
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="p-2 w-[6rem] rounded-lg text-black"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="btn-container">
                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className="bg-pink-600 text-white py-2 px-4 rounded-lg mt-4 md:mt-0 hover:bg-pink-700"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>

            <div className="mt-[5rem] container flex flex-wrap items-start justify-between ml-[10rem]">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
