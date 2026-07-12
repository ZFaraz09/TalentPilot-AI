import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

export const errorHandler: ErrorRequestHandler = (
  error,
  _request,
  response,
  next
) => {
  if (response.headersSent) {
    next(error);
    return;
  }

  if (error instanceof ZodError) {
    response.status(400).json({
      success: false,
      message: "Invalid resume upload request.",
      issues: error.issues,
    });
    return;
  }

  console.error("Unhandled request error:", error);

  response.status(500).json({
    success: false,
    message: "Request processing failed.",
  });
};
