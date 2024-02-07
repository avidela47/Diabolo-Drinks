import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  // Payment
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  return (
    <div className="mx-auto mt-3">
      <ProgressSteps step1 step2 /> *
      <div className="mt-[-1.2rem] flex justify-around items-center flex-wrap rounded">
        <form onSubmit={submitHandler} className="w-[40rem]">
          <h1 className="text-2xl font-semibold mb-2">Envio</h1>
          <div className="mb-3">
            <label className="block text-white mb-2">Dirección</label>
            <input
              type="text"
              className="py-2 px-4 border rounded-lg w-full bg-[#101011] text-white"
              placeholder="Ingresar dirección"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Ciudad</label>
            <input
              type="text"
              className="py-2 px-4 border rounded-lg w-full bg-[#101011] text-white"
              placeholder="Ingresar Ciudad"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Código Postal</label>
            <input
              type="text"
              className="py-2 px-4 border rounded-lg w-full bg-[#101011] text-white"
              placeholder="Ingresar Código Postal"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">País</label>
            <input
              type="text"
              className="py-2 px-4 border rounded-lg w-full bg-[#101011] text-white"
              placeholder="Ingresar País"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">Seleccionar método</label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-pink-500"
                  name="paymentMethod"
                  value="PayPal"
                  checked={paymentMethod === "PayPal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />

                <span className="ml-2">PayPal o Tarjeta de Crédito</span>
              </label>
            </div>
          </div>
          <button
            className="bg-pink-500 text-white py-2 px-4 rounded-full text-lg w-full hover:bg-pink-600 focus:outline-none focus:ring-2 foucs:ring-pink-500 focus:ring-opacity-50"
            type="submit"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
