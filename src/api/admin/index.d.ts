export interface AdminResponseBody<T = any> {
  Success: boolean;
  ErrorCode: number;
  Data: T;
  Msg: string;
}
