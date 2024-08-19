import { useState } from "react";
import Productcard from "../components/product-card";
import { useCategoriesQuery, useSearchProductsQuery } from "../redux/api/productApi";
import { customError } from "../types/api-types";
import toast from "react-hot-toast";
import { Skeleton } from "../components/loading";
import { CartItem } from "../types/types";
import { addToCart } from "../redux/reducer/cartReducer";
import { useDispatch } from "react-redux";

const Search = () => {
  const dispatch = useDispatch();
  const { data: categoriesResponse, isLoading, isError, error } = useCategoriesQuery("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [maxprice, setMaxprice] = useState(100000);
  const [page, setPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to control sidebar visibility
  const isPrevPage = page > 1;
  const isNextPage = page < 4;

  const { isLoading: productLoading, data: searchedData, isError: productIsError, error: productError } = useSearchProductsQuery({
    search,
    category,
    sort,
    page,
    price: maxprice,
  });

  console.log(searchedData);

  if (isError) {
    const err = error as customError;
    toast.error(err.data.message);
  }
  if (productIsError) {
    const err = productError as customError;
    toast.error(err.data.message);
  }

  const addToCartHandler = (cartItem: CartItem): string | undefined => {
    if (cartItem.stock < 1) {
      toast.error("Product is out of stock now...");
      return "Product is out of stock";
    }
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
    return "Added to cart";
  };

  return (
    <div className="product-search-page bg-[#F3F4F6]">
      {/* Hamburger Button for Small Screens */}
      <button
        className="sm:hidden p-4 bg-gray-700 text-white rounded-full fixed top-16 right-4 z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
          />
        </svg>
      </button>

      {/* Sidebar / Filter Section */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 fixed  top-0 left-0 w-64 h-full sm:h-auto bg-white shadow-lg z-40 transition-transform duration-300 ease-in-out sm:static p-6`}
      >
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
          <input
            type="range"
            min={100}
            max={100000}
            value={maxprice}
            onChange={(e) => setMaxprice(Number(e.target.value))}
          />
        </div>
        <div>
          <h4>Category</h4>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">ALL</option>
            {!isLoading &&
              categoriesResponse?.data.map((i) => (
                <option key={i.category} value={i.category}>
                  {i.category.toUpperCase()}
                </option>
              ))}
          </select>
        </div>
      </aside>

      <main className="ml-0 p-6">
        <h1>Products</h1>
        <input
          type="text"
          placeholder="Search an item"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {productLoading ? (
          <Skeleton length={10} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl p-2 mx-auto gap-5 min-h-[80vh] mb-10">
            {!productLoading &&
              searchedData?.data.map((i) => (
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
              ))}
          </div>
        )}
        {searchedData && searchedData.totalPage > 1 && (
          <article>
            <button disabled={!isPrevPage} onClick={() => setPage((prev) => prev - 1)}>
              prev
            </button>
            <span>{page} of 4</span>
            <button disabled={!isNextPage} onClick={() => setPage((prev) => prev + 1)}>
              next
            </button>
          </article>
        )}
      </main>
    </div>
  );
};

export default Search;
