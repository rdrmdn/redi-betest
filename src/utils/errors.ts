export class UnauthorizedError extends Error {
    constructor(message?: string) {
        const overridenMessage: string = message || "Unauthorized";
        super(overridenMessage);
        this.name = "UnauthorizedError";
    }
}

export class NotFoundError extends Error {
    constructor(message?: string) {
      const overridenMessage: string = message || "Requested data not found";
      super(overridenMessage);
      this.name = "NotFoundError";
    }
  }

  export class UnprocessableError extends Error {
    public data?: unknown;
    constructor(message?: string, data?: unknown) {
      const overridenMessage: string = message || "Unprocessable entity";
      super(overridenMessage);
  
      this.data = data;
      this.name = "UnprocessableError";
    }
  }