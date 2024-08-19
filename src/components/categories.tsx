import { useCategoriesQuery } from "../redux/api/productApi";
import { Link } from "react-router-dom";
import { useState } from "react";

// Define the type for the category object
export interface Category {
    category: string;
    imageUrl: string;
}

const Categories = () => {
    const { data: categoriesResponse, isLoading } = useCategoriesQuery("");
    console.log("categories", categoriesResponse);

    // Create an object to track the flip state of each category card
    const [flipped, setFlipped] = useState<{ [key: string]: boolean }>({});

    const handleMouseEnter = (category: string) => {
        setFlipped((prev) => ({ ...prev, [category]: true }));
    };

    const handleMouseLeave = (category: string) => {
        setFlipped((prev) => ({ ...prev, [category]: false }));
    };

    return (
        <div
            className="container mx-auto p-6 flex flex-col items-center md:overflow-hidden"
            style={{ fontFamily: "ubuntu" }}
        >
            <h2 className="stuck text-xl md:text-4xl text-gray-500 font-[700] flex justify-center items-center mb-8">
                Available Categories
            </h2>
            <div className="flex overflow-hidden space-x-6 ml-[220%] sm:ml-0">
                {!isLoading &&
                    categoriesResponse?.data.map((i: Category) => (
                        <Link
                            to="/search"
                            key={i.category}
                            className="relative h-[40vh] w-[35vh] bg-inherit flex flex-col justify-center items-center p-4 transition-transform duration-700 ease-in-out transform hover:scale-105"
                            onMouseEnter={() => handleMouseEnter(i.category)}
                            onMouseLeave={() => handleMouseLeave(i.category)}
                        >
                            <div className="relative w-full h-full shadow-md hover:shadow-lg">
                                <div
                                    className={`relative w-full h-full transition-transform duration-700 ease-in-out transform ${flipped[i.category] ? "rotate-y-180" : ""
                                        }`}
                                >
                                    {/* Front Side - Category Image */}
                                    <div
                                        className={`absolute inset-0 flex items-center justify-center rounded-full transition-all duration-700 ${flipped[i.category]
                                                ? "blur-md opacity-50"
                                                : "blur-0 opacity-100"
                                            }`}
                                    >
                                        <img
                                            src={i.imageUrl}
                                            alt={i.category}
                                            className="w-full h-full"
                                        />
                                    </div>

                                    {/* Back Side - Category Name */}
                                    <div
                                        className={`absolute inset-0 bg-inherit rounded-full p-4 flex flex-col items-center justify-center transform rotate-y-180 ${flipped[i.category] ? "opacity-100" : "opacity-0"
                                            } transition-opacity duration-700 ease-in-out`}
                                    >
                                        <h3 className="text-lg font-semibold text-center">
                                            {i.category}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
};

export default Categories;
