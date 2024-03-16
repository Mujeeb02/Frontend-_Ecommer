import { useState } from "react"
import Productcard from "../components/product-card"


const Search = () => {
  const [search, setsearch] = useState("")
  const [category, setCategory] = useState("")
  const [sort, setSort] = useState("")
  const [maxprice, setMaxprice] = useState(100000)
  const [page, setpage] = useState(1);
  const ProductHandler=()=>{

  }
  const isprevpage=page>1;
  const isnextpage=page<4;
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
            <option value="">All</option>
            <option value="camera">Camera</option>
            <option value="game">Game</option>
            <option value="laptop">Laptop</option>
          </select>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input type="text" placeholder="Search an item" value={search} onChange={(e)=>setsearch(e.target.value)} />
        <div className="search-product-list">
          <Productcard name="MacBook" price={500000} productId="abcd" photo="https://m.media-amazon.com/images/I/71TPda7cwUL._SX679_.jpg" stock={5} handler={ProductHandler}/>
        </div>
        <article>
          <button disabled={!isprevpage} onClick={()=>setpage((prev)=>prev-1)}>prev</button>
          <span>{page} of 4</span>
          <button disabled={!isnextpage} onClick={()=>setpage((prev)=>prev+1)}>next</button>
        </article>
      </main>
    </div>
  )
}

export default Search
