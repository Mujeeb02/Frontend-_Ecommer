import { useState } from "react";
import { CartItem } from "../types/types";
type ProductsProps = {
    productId: string;
    photo: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    handler: (cartItem: CartItem) => string | undefined;
};

const LatestProductCard = ({
    productId,
    photo,
    name,
    description,
    price,
    stock,
    handler,
}: ProductsProps) => {
    const [flipped, setFlipped] = useState(false);

    return (
        <div
            className="relative w-64 h-80 mt-10 ml-5 rounded-xl bg-white border border-gray-200 shadow-md transition-transform duration-700 ease-in-out transform hover:scale-105"
            onMouseEnter={() => setFlipped(true)}
            onMouseLeave={() => setFlipped(false)}
        >
            <div
                className={`relative w-full h-full transition-transform duration-700 ease-in-out transform ${flipped ? "rotate-y-180" : ""
                    }`}
            >
                {/* Front Side - Blurred Image */}
                <div
                    className={`absolute w-full h-full inset-0 flex items-center justify-center rounded-md transition-all duration-700 ${flipped ? "blur-md opacity-50" : "blur-0 opacity-100"
                        }`}
                >
                    <img
                        src={photo}
                        alt={name}
                        className="w-full h-full rounded-md"
                    />
                </div>

                {/* Back Side - Details */}
                <div
                    className={`absolute inset-0 bg-inherit rounded-xl p-4 flex flex-col gap-8 items-center justify-center transform rotate-y-180 ${flipped ? "opacity-100" : "opacity-0"
                        } transition-opacity duration-700 ease-in-out`}
                >
                    {/* Product Title */}
                    <h3 className="text-gray-900 font-semibold text-md mb-2 text-center">
                        {name}
                    </h3>

                    {/* Product Description */}
                    <p className="text-gray-600 text-sm text-center px-3 mb-2">
                        {description.split(" ").slice(0, 10).join(" ") + "..."}
                    </p>

                    {/* Price and Cart Action */}
                    <div className="flex justify-between items-center w-full mt-2">
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
                            className="text-white bg-gray-500 hover:bg-gray-600 rounded-full font-semibold text-sm py-2 px-4 transition duration-300 ease-in-out shadow-md hover:shadow-lg"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LatestProductCard;
