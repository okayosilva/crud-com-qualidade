import { todoController } from "@/server/controller/todo";
import { GetError } from "@api/getError";
import { NextApiRequest, NextApiResponse } from "next";

const { getById } = todoController;

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  GetError(request, response);

  try {
    getById(request, response);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    response.status(500).json({
      message: "Internal server error",
    });
  }
}
