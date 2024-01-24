export class UnimplementedError extends Error {
  constructor() {
    const callingFunctionName = UnimplementedError.getCallingFunctionName();
    super(`${callingFunctionName} is not implemented yet.`);
    this.name = "UnimplementedError";
  }

  private static getCallingFunctionName(): string {
    const stackTrace = new Error().stack;
    if (!stackTrace) {
      return "Unknown Function";
    }

    const stackLines = stackTrace.split("\n");
    if (stackLines.length >= 4) {
      const callingLine = stackLines[3].trim();
      const match = callingLine.match(/at (.+) \(/);
      if (match && match.length > 1) {
        return match[1];
      }
    }

    return "Unknown Function";
  }
}
