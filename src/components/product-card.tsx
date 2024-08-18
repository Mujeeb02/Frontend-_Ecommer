import { CartItem } from "../types/types";

type ProductsProps = {
  productId: string;
  photo: string;
  name: string;
  description:string;
  price: number;
  stock: number;
  handler: (cartItem: CartItem) => string | undefined;
};

const Productcard = ({
  productId,
  photo,
  name,
  description,
  price,
  stock,
  handler,
}: ProductsProps) => {
  return (
    <div>
      <div className="relative flex flex-col items-center justify-between p-4 mt-10 ml-5 rounded-xl bg-white
      border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:-translate-y-1.5">

        {/* Rating Badge */}

        {/* Product Image */}
        <div className="w-full h-36 flex items-center justify-center">
          <img src={photo} alt={name} className="max-h-full max-w-full object-contain rounded-md" />
        </div>

        {/* Product Title */}
        <h3 className="text-gray-900 font-semibold text-md mt-3 mb-2 text-center">{name}</h3>

        {/* Product Description */}
        <p className="text-gray-600 text-sm text-center px-3">
          {description.split(" ").slice(0, 10).join(" ") + "..."}
        </p>
        {/* Price and Cart Actions */}
        <div className="flex justify-between items-center w-full mt-3">
          <p className="text-green-700 font-bold text-lg">${price}</p>
          <button
            onClick={() =>
              handler({
                productId,
                price,
                quantity: 1,
                stock,
                name,
                photo,
                category: "",
              })
            }
            disabled={stock === 0}
            className="text-white bg-gray-500 hover:bg-gray-600 rounded-full font-semibold text-sm py-2 px-4 transition duration-300 ease-in-out shadow-md hover:shadow-lg">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Productcard;
