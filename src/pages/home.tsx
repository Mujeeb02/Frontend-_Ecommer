import { Link } from "react-router-dom"
import Productcard from "../components/product-card"
import { useLatestProductsQuery } from "../redux/api/productApi"
import toast from "react-hot-toast"
import { Skeleton } from "../components/loading"
import { CartItem } from "../types/types"
import { useDispatch } from "react-redux"
import { addToCart } from "../redux/reducer/cartReducer"
import { FaArrowAltCircleRight } from "react-icons/fa";
import Categories from "../components/categories"
import Footer from "../components/footer"
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
    <div className="home bg-[#F3F4F6]">
      {/* Hero Section */}
<div className="flex items-center justify-between text-gray-800 px-10 py-20">
  <div className="w-1/2 h-[60vh] flex flex-col justify-center space-y-6">
    <div className=" w-[70%] bg-white bg-opacity-80 p-8 rounded-lg shadow-lg" style={{fontFamily:"Grey Qo"}}>
      <h1 className="text-3xl font-extrabold leading-tight">
        Discover the Perfect Blend of Style and Savings—Shop the Latest Trends with Unbeatable Deals!
      </h1>
    </div>
    <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg" style={{fontFamily:"QuickSand"}}>
      <h2 className="text-xl font-medium leading-relaxed">
        Upgrade your wardrobe with our exclusive collection. Enjoy fast shipping, easy returns, and 24/7 customer support. Your style journey starts here!
      </h2>
    </div>
    <Link
      to="/search"
      className="w-[40%] inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
    >
      Explore Collections
    </Link>
  </div>
  <div className="w-1/2 h-[80vh]">
    <img
      src="/Hero.png"
      alt="Hero"
      className="w-full h-full object-cover rounded-lg  transform hover:scale-105 transition-transform duration-500"
    />
  </div>
</div>
      <h1 style={{fontFamily:"ubuntu"}} className="text-4xl text-gray-500 font-[700] flex justify-between ml-[5vw] mr-[5vw]">Latest Products <Link to="/search" className="findmore flex justify-center items-center gap-4">more <FaArrowAltCircleRight/></Link> </h1>
      <main className="flex flex-row min-h-[60vh]">
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
      <Categories/>
      <Footer/>
    </div>
  )
}

export default Home
