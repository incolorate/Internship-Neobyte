export default function AdCard({ title, description, author }) {
    return (
        <div className="shadow-md h-52 bg-white w-52 text-slate-800">
            <p>Title: {title}</p>
            <p>Description: {description}</p>
            <p>Author:{author}</p>
        </div>
    );
}
