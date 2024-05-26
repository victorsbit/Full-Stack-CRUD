export interface BaseResponse<T> {
  responseCode: number;
  success: boolean;
  message: string;
  data?: T;
}
