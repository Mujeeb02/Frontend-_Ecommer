import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/cartItem";

const cartItems = [
  {
    productId: "adfgdfs",
    photo: "https://m.media-amazon.com/images/I/71TPda7cwUL._SX679_.jpg",
    name: "MacBook",
    stock: 4,
    price: 5000,
    quantity:5,
  }
];
const subtotal = 5000;
const tax = Math.round(subtotal * 0.18);
const discount = 400;
const shippingcharge = 200;
const total = subtotal + tax - discount + shippingcharge;
const Cart = () => {
  const [coupan, setCoupan] = useState<String>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  useEffect(() => {
    const timedOut = setTimeout(() => {
      if (Math.random() > 0.5) {
        setIsValid(true);
      }
      else {
        setIsValid(false);
      }
    }, 1000)
  }, [coupan])
  return (
    <div className="cart">
      <main>
        {
          cartItems.length>0 ? cartItems.map((item, index) => {
            return <CartItem data={item} key={index} />;
          }):<h1>No Items Added</h1>
        }

      </main>
      <aside>
        <p>Subtotal: {subtotal}</p>
        <p>Tax: {tax}</p>
        <p>Discount: {discount}</p>
        <p>Shipping Charge: {shippingcharge}</p>
        <p><b>Total:</b> {total}</p>
        <input type="text" onChange={(e) => setCoupan(e.target.value)} name="coupanCode" placeholder="Coupan Code" />
        {
          coupan.length > 0 && (isValid ?
            <span className="green">{discount} off using coupan code</span> :
            <span className="red">Invalid Coupan Code</span>)
        }
        {
          cartItems.length>0 && <Link to="/shipping">Check Out</Link>
        }
      </aside>
    </div>
  )
}

export default Cart
