import AppError from "./app-error";
import { ErrorArgs } from "@/app/types/error-args";

class BadGatewayError extends AppError {
  constructor(args: Omit<ErrorArgs, "status">) {
    super({
      status: 502,
      ...args,
    });
  }
}

export default BadGatewayError;
