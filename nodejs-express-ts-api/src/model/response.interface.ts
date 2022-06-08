export interface APIResponse<T> {
  success: boolean;
  message: string;
  result: T;
}
