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