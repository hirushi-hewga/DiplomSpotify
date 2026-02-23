export type ApiResponse<T> = {
  isSuccess: boolean;
  message: string;
  payload: T;
};