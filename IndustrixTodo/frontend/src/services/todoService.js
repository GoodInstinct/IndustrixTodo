import api from "./api";

export const getTodos = (params) => {
  return api.get("/todos", { params });
};

export const createTodo = (data) => {
  return api.post("/todos", data);
};

export const updateTodo = (id, data) => {
  return api.put(`/todos/${id}`, data);
};

export const deleteTodo = (id) => {
  return api.delete(`/todos/${id}`);
};

export const toggleTodo = (id) => {
  return api.patch(`/todos/${id}/complete`);
};
