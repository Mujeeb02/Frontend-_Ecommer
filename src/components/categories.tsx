import { useCategoriesQuery } from '../redux/api/productApi';
import { Link } from 'react-router-dom';
// Define the type for the category object
export interface Category {
    category: string;
    imageUrl: string;
}

const Categories = () => {
    const { data:categoriesResponse, isLoading } = useCategoriesQuery("");
    console.log("categproes",categoriesResponse)
    // Explicitly cast categoriesResponse.data to Category[]

    return (
        <div className="container mx-auto p-6 flex flex-col items-center justify-center" style={{fontFamily:"ubuntu"}}>
            <h2 className="text-4xl text-gray-500 font-[700] flex justify-center items-center ml-[5vw] mr-[5vw]">Available Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-20 mt-8">
                {!isLoading && categoriesResponse?.data.map((i:Category) => (
                    <Link to="/search"
                        key={i.category}
                        className="h-[25vh] w-[25vh] flex flex-col justify-center items-center bg-white p-4 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-full"
                    >
                        <div className='h-[10vh] w-[5vw]'>
                            <img
                                src={i.imageUrl}
                                alt={i.category}
                                className="w-full h-full rounded-full mb-4"
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
