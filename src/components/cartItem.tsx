import { FaTrash } from "react-icons/fa"

const CartItem = ({data}:any) => {
  return (
    <div className="cart-item">
      <img src={data.photo} alt={data.name} />
      <article>
        <p>{data.name}</p>
        <p><b>INR{data.price}</b></p>
      </article>
      <div>
        <button>-</button>
        <p>{data.quantity}</p>
        <button>+</button>
      </div>
      <button><FaTrash/></button>
    </div>
  )
}

export default CartItem
