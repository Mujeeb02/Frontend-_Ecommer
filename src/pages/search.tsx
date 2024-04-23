import { useState } from "react"
import Productcard from "../components/product-card"
import { useCategoriesQuery, useSearchProductsQuery } from "../redux/api/productApi"
import { customError } from "../types/api-types"
import toast from "react-hot-toast"
import { Skeleton } from "../components/loading"
import { CartItem } from "../types/types"
import { addToCart } from "../redux/reducer/cartReducer"
import { useDispatch } from "react-redux"


const Search = () => {
  const dispatch=useDispatch()
  const { data: categoriesResponse, isLoading, isError, error } = useCategoriesQuery("")
  const [search, setsearch] = useState("")
  const [category, setCategory] = useState("")
  const [sort, setSort] = useState("")
  const [maxprice, setMaxprice] = useState(100000)
  const [page, setpage] = useState(1);
  const ProductHandler = () => {

  }
  const isprevpage = page > 1;
  const isnextpage = page < 4;

  const { isLoading: productLoading, data: searchedData,isError:productIsError,error:productError } = useSearchProductsQuery({
    search,
    category,
    sort,
    page,
    price: maxprice
  })
  console.log(searchedData)
  if (isError) {
    const err = error as customError
    toast.error(err.data.message)
  }
  if (productIsError) {
    const err = productError as customError
    toast.error(err.data.message)
  }

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) {
      toast.error("Product is out of stock now...")
    }
    dispatch(addToCart(cartItem))
    toast.success("Added to cart")
  }
  return (
    <div className="product-search-page">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>
        <div>
          <h4>Max Price : {maxprice || " "}</h4>
          <input type="range" min={100} max={100000} value={maxprice} onChange={(e) => setMaxprice(Number(e.target.value))} />
        </div>
        <div>
          <h4>Category</h4>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">ALL</option>
            {!isLoading && categoriesResponse?.data.map((i) => (
              <option key={i} value={i}>{i.toUpperCase()}</option>
            ))}

          </select>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input type="text" placeholder="Search an item" value={search} onChange={(e) => setsearch(e.target.value)} />
        {
          productLoading ? (<Skeleton length={10} />) : (<div className="search-product-list">
            {
              !productLoading && searchedData?.data.map((i) => (
                <Productcard
                  name={i.name}
                  price={i.price}
                  productId={i._id}
                  photo={i.photo}
                  stock={i.stock}
                  handler={addToCartHandler} />
              ))
            }
          </div>)
        }
        {
          searchedData && searchedData.totalPage > 1 && (
            <article>
              <button disabled={!isprevpage} onClick={() => setpage((prev) => prev - 1)}>prev</button>
              <span>{page} of 4</span>
              <button disabled={!isnextpage} onClick={() => setpage((prev) => prev + 1)}>next</button>
            </article>
          )
        }
      </main>
    </div>
  )
}

export default Search
