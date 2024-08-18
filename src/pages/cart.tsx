import axios from "axios";
import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItemCard from "../components/cartItem";
import {
  addToCart,
  calculatePrice,
  discountApplied,
  removeCartItem,
} from "../redux/reducer/cartReducer";
import { RootState, server } from "../redux/reducer/store";
import { CartItem } from "../types/types";

const Cart = () => {
  const { cartItems, subtotal, tax, total, shippingCharges, discount } =
    useSelector((state: RootState) => state.cartReducer);
  const dispatch = useDispatch();

  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

  const incrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity >= cartItem.stock) return;

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };

  const decrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity <= 1) return;
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };

  const removeHandler = (productId: string) => {
    dispatch(removeCartItem(productId));
  };

  useEffect(() => {
    const { token: cancelToken, cancel } = axios.CancelToken.source();
    const timeOutID = setTimeout(() => {
      axios
        .get(`https://mern-ecommerce-server-2.onrender.com/api/v1/payment/discount?coupon=${couponCode}`, {
          cancelToken,
        })
        .then((res) => {
          dispatch(discountApplied(res.data.Discount));
          setIsValidCouponCode(true);
          dispatch(calculatePrice());
        })
        .catch(() => {
          dispatch(discountApplied(0));
          setIsValidCouponCode(false);
          dispatch(calculatePrice());
        });
    }, 1000);

    return () => {
      clearTimeout(timeOutID);
      cancel();
      setIsValidCouponCode(false);
    };
  }, [couponCode]);

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems]);

  return (
    <div className="min-h-screen flex bg-gray-100 p-6">
      <main className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Cart</h2>
        {cartItems.length > 0 ? (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-200 text-gray-600 text-sm uppercase">
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Quantity</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, idx) => (
                <CartItemCard
                  incrementHandler={incrementHandler}
                  decrementHandler={decrementHandler}
                  removeHandler={removeHandler}
                  key={idx}
                  cartItem={item}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <h1 className="text-center text-xl text-gray-600">No Items Added</h1>
        )}
      </main>

      <aside className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
        <p className="text-lg text-gray-700">
          Subtotal: <span className="font-semibold">₹{subtotal}</span>
        </p>
        <p className="text-lg text-gray-700">
          Shipping Charges: <span className="font-semibold">₹{shippingCharges}</span>
        </p>
        <p className="text-lg text-gray-700">
          Tax: <span className="font-semibold">₹{tax}</span>
        </p>
        <p className="text-lg text-gray-700">
          Discount:{" "}
          <span className="font-semibold text-red-600">- ₹{discount}</span>
        </p>
        <p className="text-lg text-gray-800 font-bold mt-4">
          Total: ₹{total}
        </p>

        <input
          type="text"
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="mt-4 w-full p-2 border border-gray-300 rounded"
        />

        {couponCode &&
          (isValidCouponCode ? (
            <span className="text-green-600 mt-2 block">
              ₹{discount} off using the <code>{couponCode}</code>
            </span>
          ) : (
            <span className="text-red-600 mt-2 block">
              Invalid Coupon <VscError />
            </span>
          ))}

        {cartItems.length > 0 && (
          <Link
            to="/shipping"
            className="mt-6 block bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Checkout
          </Link>
        )}
      </aside>
    </div>
  );
};

export default Cart;
