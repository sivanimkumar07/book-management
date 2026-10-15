
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import BookList from "./BookList";
import BookForm from "./BookForm";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/add" element={<BookForm />} />
        <Route path="/edit/:id" element={<BookForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;