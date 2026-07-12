export interface OperationResult {
  success: boolean;
  message: string;
}

export function createSuccessResult(message: string): OperationResult {
  return {
    success: true,
    message,
  };
}
