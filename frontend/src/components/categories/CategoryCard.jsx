import { Link } from "react-router-dom";

const CategoryCard = ({ name, image, slug }) => {
    return (
        <Link
            to={`/products?category=${slug}`}
            className="group rounded-xl bg-gray-100 p-4 hover:bg-gray-200 transition"
        >
            <div className="flex flex-col items-center gap-2">
                <img
                    src={image}
                    alt={name}
                    className="h-16 w-16 object-contain group-hover:scale-105 transition"
                />
                <span className="text-sm font-medium text-gray-700">
                    {name}
                </span>
            </div>
        </Link>
    );
};

export default CategoryCard;
