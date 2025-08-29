import { ErrorArgs } from "@/app/types/error-args";

class AppError extends Error {
  status: number;

  constructor({ status, message }: ErrorArgs) {
    super(message);
    this.status = status;
  }
}

export default AppError;
