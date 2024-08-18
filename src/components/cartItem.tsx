import { FaTrash } from "react-icons/fa";
import { CartItem } from "../types/types";

type CartItemProps = {
  cartItem: CartItem;
  incrementHandler: (cartItem: CartItem) => void;
  decrementHandler: (cartItem: CartItem) => void;
  removeHandler: (id: string) => void;
};

const CartItemCard = ({
  cartItem,
  incrementHandler,
  decrementHandler,
  removeHandler,
}: CartItemProps) => {
  const { photo, productId, name, price, quantity } = cartItem;
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="py-4 px-6">
        <img
          src={`${photo}`}
          alt={name}
          className="w-16 h-16 rounded-md object-cover inline-block"
        />
        <span className="ml-4 text-gray-700 font-semibold">{name.slice(0,15)}</span>
      </td>
      <td className="py-4 px-6">
        <p className="text-gray-600">₹{price}</p>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center">
          <button
            onClick={() => decrementHandler(cartItem)}
            className="px-3 py-1 bg-gray-300 rounded-l-md hover:bg-gray-400 transition-colors duration-200"
          >
            -
          </button>
          <p className="px-4 text-gray-700">{quantity}</p>
          <button
            onClick={() => incrementHandler(cartItem)}
            className="px-3 py-1 bg-gray-300 rounded-r-md hover:bg-gray-400 transition-colors duration-200"
          >
            +
          </button>
        </div>
      </td>
      <td className="py-4 px-6">
        <p className="text-gray-600">₹{price * quantity}</p>
      </td>
      <td className="py-4 px-6">
        <button
          onClick={() => removeHandler(productId)}
          className="text-red-600 hover:text-red-800 transition-colors duration-200"
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default CartItemCard;
