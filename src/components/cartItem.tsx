import { FaTrash } from "react-icons/fa"
import { CartItem } from "../types/types";

type CartItemProps = {
  cartItem: CartItem;
  incrementHandler: (cartItem:CartItem) => void;
  decrementHandler: (cartItem:CartItem) => void;
  removeHandler: (id: string) => void;
};
const CartItemCard = ({cartItem,
  incrementHandler,
  decrementHandler,
  removeHandler,
}: CartItemProps) => {
  const { photo, productId, name, price, quantity } = cartItem;
  return (
    <div className="cart-item">
      <img src={`https://mern-ecommerce-server-2.onrender.com/${photo}`} alt={name} />
      <article>
        <p>{name}</p>
        <p><b>INR{price}</b></p>
      </article>
      <div>
        <button onClick={() => decrementHandler(cartItem)}>-</button>
        <p>{quantity}</p>
        <button onClick={() => incrementHandler(cartItem)}>+</button>
      </div>
      <button onClick={() => removeHandler(productId)}><FaTrash/></button>
    </div>
  )
}

export default CartItemCard
