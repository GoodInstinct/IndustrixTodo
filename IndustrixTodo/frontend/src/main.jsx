import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import MainLayout from "./layout/mainlayout.jsx";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import TodosPage from "./pages/TodosPage.jsx";

import { TodoProvider } from "./context/TodoContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TodoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<TodosPage />} />
            <Route path="todos" element={<TodosPage />} />
            <Route path="categories" element={<CategoriesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TodoProvider>
  </React.StrictMode>
);
