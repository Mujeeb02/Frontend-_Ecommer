import { Link } from "react-router-dom"
import Productcard from "../components/product-card"
import { useLatestProductsQuery } from "../redux/api/productApi"
import toast from "react-hot-toast"
import { Skeleton } from "../components/loading"
import { CartItem } from "../types/types"
import { useDispatch } from "react-redux"
import { addToCart } from "../redux/reducer/cartReducer"

const Home = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("")
  const dispatch = useDispatch()
  if (isError) {
    toast.error("Cannot fetch latest products...")
  }
  const addToCartHandler = (cartItem: CartItem): string | undefined => {
    if (cartItem.stock < 1) {
      toast.error("Product is out of stock now...")
      return "Product is out of stock"
    }
    dispatch(addToCart(cartItem))
    toast.success("Added to cart")
    return "Added to cart"
  }
  console.log(data?.data)
  return (
    <div className="home">
      <section>
      </section>
      <h1>Latest Products <Link to="/search" className="findmore">more</Link> </h1>
      <main className="">
        {
          isLoading ? <Skeleton /> :
            data?.data.map((i) => (
              <Productcard
                key={i._id}
                name={i.name}
                description={i.description}
                price={i.price}
                productId={i._id}
                photo={i.photo}
                stock={i.stock}
                handler={addToCartHandler}
              />
            ))
        }
      </main>

    </div>
  )
}

export default Home
