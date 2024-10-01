import { todoController } from "@server/controller/todo";
import { NextApiRequest, NextApiResponse } from "next";

const { get } = todoController;

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method !== "GET") {
    response.status(405).json({
      message: "Method not allowed",
    });

    return;
  }

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
