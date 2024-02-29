class AppError extends Error {
  status_code: number;
  constructor(status: number = 400, message: string) {
    super(message);
    this.status_code = status;
  }
}

export default AppError;
