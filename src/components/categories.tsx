import { useCategoriesQuery } from '../redux/api/productApi';
import { Link } from 'react-router-dom';

// Define the type for the category object
export interface Category {
    category: string;
    imageUrl: string;
}

const Categories = () => {
    const { data: categoriesResponse, isLoading } = useCategoriesQuery("");
    console.log("categories", categoriesResponse);

    return (
        <div className="container mx-auto p-6 flex flex-col items-center" style={{ fontFamily: "ubuntu" }}>
            <h2 className="text-xl md:text-4xl text-gray-500 font-[700] flex justify-center items-center mb-8">Available Categories</h2>
            <div className="flex overflow-x-auto space-x-6">
                {!isLoading && categoriesResponse?.data.map((i: Category) => (
                    <Link to="/search"
                        key={i.category}
                        className="h-[25vh] w-[25vh] flex flex-col justify-center items-center bg-white p-4 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-full"
                    >
                        <div className='h-[10vh] w-[10vh]'>
                            <img
                                src={i.imageUrl}
                                alt={i.category}
                                className="w-full h-full rounded-full mb-4 object-cover"
                            />
                        </div>
                        <h3 className="text-lg font-semibold text-center">{i.category}</h3>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Categories;
