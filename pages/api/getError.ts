import { NextApiRequest, NextApiResponse } from "next";

export function GetError(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== "GET") {
    response.status(405).json({
      message: "Method not allowed",
    });

    return;
  }
}
