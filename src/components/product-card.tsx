import { FaPlus } from "react-icons/fa";
import { CartItem } from "../types/types";
type ProductsProps={
  productId:string;
  photo:string;
  name:string;
  price:number;
  stock:number;
  handler:(cartItem:CartItem)=>string | undefined;

}

const Productcard = ({productId,photo,name,price,stock,handler}:ProductsProps) => {
  return (
    <div className="productcard">
      <img src={`https://mern-ecommerce-server-2.onrender.com/${photo}`} alt={name} />
      <p>{name}</p>
      <span>INR{price}</span>
      <div>
        <button onClick={()=>handler({productId,price,quantity:1,stock,name,photo,category:""})}>
          <FaPlus/>
        </button>
      </div>
    </div>
  )
}

export default Productcard
