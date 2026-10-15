
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API = "https://worksheet-library.mashupstack.com/books";

function BookForm() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [published_year, setPublishedYear] = useState("");
    const [genre, setGenre] = useState("");

    const { id } = useParams();
    const navigate = useNavigate();

    // Load book details when editing
    useEffect(() => {
        if (id) {
            axios.get(API)
                .then((response) => {
                    const data = response.data;
                    const books = Array.isArray(data)
                        ? data
                        : data.books || data.data || [];

                    const book = books.find(
                        (item) => String(item.id) === id
                    );

                    if (book) {
                        setTitle(book.title);
                        setAuthor(book.author);
                        setPublishedYear(book.published_year);
                        setGenre(book.genre);
                    } else {
                        alert("Book not found");
                        navigate("/");
                    }
                })
                .catch(() => alert("Unable to load book"));
        }
    }, [id, navigate]);

    // Add or update a book
    const handleSubmit = async (e) => {
        e.preventDefault();

        const book = {
            title,
            author,
            published_year: Number(published_year),
            genre
        };

        try {
            if (id) {
                await axios.put(`${API}/${id}`, book);
                alert("Book updated successfully");
            } else {
                await axios.post(API, book);
                alert("Book added successfully");
            }

            navigate("/");
        } catch (error) {
            alert("Unable to save book");
        }
    };

    return (
        <div className="container mt-4">
            <h2>{id ? "Edit Book" : "Add New Book"}</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Book Title</label>
                    <input
                        className="form-control"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Author</label>
                    <input
                        className="form-control"
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Published Year</label>
                    <input
                        className="form-control"
                        type="number"
                        value={published_year}
                        onChange={(e) => setPublishedYear(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Genre</label>
                    <input
                        className="form-control"
                        type="text"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-success me-2">
                    {id ? "Update Book" : "Add Book"}
                </button>

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/")}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default BookForm;
