import { createContext, useContext, useState } from "react";
import { getTodos } from "../services/todoService";
import { getCategories } from "../services/categoryService";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [categories, setCategories] = useState([]);

  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 10,
    total: 0,
  });

  const [filters, setFilters] = useState({
    search: "",
    status: null,
    category: null,
    priority: null,
  });

  // Fetch Todos with Filters
  const fetchTodos = async (page = 1, overrideFilters = {}) => {
    const appliedFilters = { ...filters, ...overrideFilters };

    const res = await getTodos({
      page,
      limit: 10,
      search: appliedFilters.search,
      status: appliedFilters.status,
      category_id: appliedFilters.category,
      priority: appliedFilters.priority,
    });

    setTodos(res.data.data);
    setPagination(res.data.pagination);
    setFilters(appliedFilters);
  };

  // Fetch categories
  const fetchCategories = async () => {
    const res = await getCategories();
    setCategories(res.data);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        categories,
        filters,
        pagination,
        fetchTodos,
        fetchCategories,
        setFilters,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodoContext() {
  return useContext(TodoContext);
}
