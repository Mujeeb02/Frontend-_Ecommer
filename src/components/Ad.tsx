import { FaShieldAlt, FaShoppingBag, FaTruck, FaPhoneAlt } from 'react-icons/fa';

const ServiceCard = () => {
    const services = [
        {
            icon: <FaShieldAlt size={40} className="text-blue-600 mb-4" />,
            title: "Trusted Shopping",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
            icon: <FaShoppingBag size={40} className="text-blue-600 mb-4" />,
            title: "Quality Product",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
            icon: <FaTruck size={40} className="text-blue-600 mb-4" />,
            title: "Worldwide Delivery",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
            icon: <FaPhoneAlt size={40} className="text-blue-600 mb-4" />,
            title: "Telephone Support",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
    ];

    return (
        <div className="flex flex-wrap justify-center md:justify-between mx-4 my-12">
            {services.map((service, index) => (
                <div key={index} className="w-full md:w-1/4 p-4 text-center">
                    <div className="flex flex-col items-center bg-white shadow-lg p-6 rounded-lg">
                        {service.icon}
                        <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                        <p className="text-gray-500">{service.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ServiceCard;
