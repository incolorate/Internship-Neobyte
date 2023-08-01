import { useState } from "react";
import { router } from "@inertiajs/react";

const Create = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        router.post("/ads", formData);
    };

    return (
        <div>
            <h1>Create an Ad</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Create Ad</button>
            </form>
        </div>
    );
};

export default Create;
