import AppError from "./app-error";
import { ErrorArgs } from "@/app/types/error-args";

class UnprocessableEntityError extends AppError {
  constructor(args: Omit<ErrorArgs, "status">) {
    super({
      status: 422,
      ...args,
    });
  }
}

export default UnprocessableEntityError;
