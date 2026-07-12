import { timingSafeEqual } from "node:crypto";

import type { NextFunction, Request, Response } from "express";

const API_KEY_HEADER = "x-api-key";

function safeEqual(a: string, b: string): boolean {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);

  if (bufferA.length !== bufferB.length) {
    return false;
  }

  return timingSafeEqual(bufferA, bufferB);
}

/**
 * Require a valid API key on protected routes.
 *
 * Fails closed: if no API key is configured on the server, every request is
 * rejected rather than left unauthenticated.
 */
export function requireApiKey(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const expectedKey = process.env.API_KEY;

  if (!expectedKey) {
    res.status(503).json({
      success: false,
      message: "Server authentication is not configured.",
    });
    return;
  }

  const headerValue = req.header(API_KEY_HEADER);
  const providedKey = Array.isArray(headerValue) ? headerValue[0] : headerValue;

  if (!providedKey || !safeEqual(providedKey, expectedKey)) {
    res.status(401).json({
      success: false,
      message: "Unauthorized.",
    });
    return;
  }

  next();
}
