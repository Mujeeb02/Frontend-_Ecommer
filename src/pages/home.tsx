import { Link } from "react-router-dom"
import Productcard from "../components/product-card"

const ProductHandler=()=>{
  return {}
}
const Home = () => {
  return (
    <div className="home">
      <section>

      </section>
      <h1>Latest Products <Link to="/search" className="findmore">more</Link> </h1>
      
      <main>
        <Productcard name="MacBook" price={500000} productId="abcd" photo="https://m.media-amazon.com/images/I/71TPda7cwUL._SX679_.jpg" stock={5} handler={ProductHandler}/>
      </main>
    </div>
  )
}

export default Home
