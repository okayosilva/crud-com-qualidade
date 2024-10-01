import { read } from "@core/crud";
import { NextApiRequest, NextApiResponse } from "next";

function get(request: NextApiRequest, response: NextApiResponse) {
  const ALL_TODOS = read();
  response.status(200).json({
    todos: ALL_TODOS,
  });
}
function post() {}

function put() {}

export const todoController = {
  get,
  post,
  put,
};
