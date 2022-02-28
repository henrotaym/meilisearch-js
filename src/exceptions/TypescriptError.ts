/** Error happening when a request fails. */
class TypescriptError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default TypescriptError;
