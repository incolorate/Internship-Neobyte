export default function AdCard({
    title,
    description,
    author,
    image,
    price,
    location,
}) {
    return (
        <div className="shadow-md  bg-white min-w-full max-w-full text-slate-800 h-40 flex">
            <div className="w-52 h-40">
                <img
                    src={image}
                    alt={title}
                    className="p-1 w-52 h-40"
                    loading="lazy"
                />
            </div>
            <div className="flex justify-between w-full">
                <div className="flex justify-between flex-col">
                    <p className="p-1">{title}</p>
                    <p className="p-1 text-sm">{location}</p>
                </div>
                <p className="p-2 font-bold">{price}</p>
            </div>
        </div>
    );
}
