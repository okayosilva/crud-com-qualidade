const get = async () => {
  const response = await fetch("/api/todos");
  const data = await response.json();
  return data.todos;
};

export const TodoController = { get };
