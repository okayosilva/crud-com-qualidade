import { todoController } from "@server/controller/todo";
import { NextApiRequest, NextApiResponse } from "next";
import { GetError } from "./getError";

const { get } = todoController;

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  GetError(request, response);

  try {
    get(request, response);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    response.status(500).json({
      message: "Failed to read todos",
    });
  }
}
