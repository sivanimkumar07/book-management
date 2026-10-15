
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "https://worksheet-library.mashupstack.com/books";

function BookList() {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    // Get all books
    const getBooks = async () => {
        try {
            const response = await axios.get(API);

            // Handle an array or an object containing the array
            const data = response.data;
            setBooks(Array.isArray(data) ? data : data.books || data.data || []);
        } catch (error) {
            alert("Unable to load books");
        }
    };

    useEffect(() => {
        getBooks();
    }, []);

    // Delete a book
    const deleteBook = async (id) => {
        if (window.confirm("Do you want to delete this book?")) {
            try {
                await axios.delete(`${API}/${id}`);
                alert("Book deleted successfully");
                getBooks();
            } catch (error) {
                alert("Unable to delete book");
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Book Manager</h2>

            <button
                className="btn btn-success mb-3"
                onClick={() => navigate("/add")}
            >
                Add New Book
            </button>

            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Year</th>
                        <th>Genre</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.published_year}</td>
                            <td>{book.genre}</td>
                            <td>
                                <button
                                    className="btn btn-primary btn-sm me-2"
                                    onClick={() => navigate(`/edit/${book.id}`)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteBook(book.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {books.length === 0 && <p>No books available.</p>}
        </div>
    );
}

export default BookList;
