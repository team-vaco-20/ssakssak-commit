import AppError from "./app-error";

class TooManyRequestsError extends AppError {
  constructor(message: string) {
    super({ message, status: 429 });

    this.name = "TooManyRequestsError";
  }
}

export default TooManyRequestsError;
