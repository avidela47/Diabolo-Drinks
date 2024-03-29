import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      <div className="container flex justify-around items-start flex wrap mx-auto mt-8">
        {cartItems.length === 0 ? (
          <div>
            Carrito vacio{" "}
            <Link
              to="/shop"
              className="inline-flex items-center px-3 py-2 text-sm text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800 mr-[8rem]"
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
              Ir a la tienda                           
            </Link>
            <img
          src="/uploads/cartempty.png"
          alt=""
          className="h-[32rem] w-[100%] xl:block md:hidden sm:hidden rounded-lg mt-2"
        />             
          </div>
        ) : (
          <>
            <div className="flex flex-col w-[80%]">
              <h1 className="text-2xl font-semibold mb-4">Carrito</h1>

              {cartItems.map((item) => (
                <div key={item._id} className="flex items-enter mb-[1rem] pb-2">
                  <div className="w-[12rem] h-[6rem]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  <div className="flex-1 ml-4">
                    <Link to={`/product/${item._id}`} className="text-pink-500">
                      {item.name}
                    </Link>

                    <div className="mt-2 text-white">Marca: {item.size}</div>
                    <div className="mt-2 text-white font-bold">
                      $ {item.price} c/u
                    </div>
                  </div>

                  <div className="w-24">
                    <select
                      className="w-full p-1 border rounded text-black"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <button
                      className="text-red-500 mr-[5rem]"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash className="ml-[1rem] mt-[.5rem]" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="mt-8 w-[40rem]">
                <div className="p-4 rounded-lg">
                  <h2 className="text-xl font-semibold mb-2">
                    Cantidad de productos:{" "} (
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  </h2>

                  <div className="text-2xl font-bold mb-6">
                    Total: ${" "}
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed('')}
                  </div>

                  <button
                    className="bg-pink-600 text-white py-2 px-[12rem] rounded-lg mt-4 md:mt-0 hover:bg-pink-700"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Pagar
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
