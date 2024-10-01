import { read } from "@core/crud";
import { NextApiRequest, NextApiResponse } from "next";

function get(request: NextApiRequest, response: NextApiResponse) {
  const ALL_TODOS = read();
  response.status(200).json({
    todos: ALL_TODOS,
  });
}

function getById(request: NextApiRequest, response: NextApiResponse) {
  const { id } = request.query;
  const todoById = read().find((todo) => todo.searchId === id);

  if (!todoById) {
    response.status(404).json({
      message: "Todo not found",
    });
    return;
  }

  response.status(200).json({
    todo: todoById,
  });
}
// function post() {}

// function put() {}

export const todoController = {
  get,
  getById,
};
