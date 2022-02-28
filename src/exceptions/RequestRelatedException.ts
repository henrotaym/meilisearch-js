import ApiRequest from "../Request";
import ApiResponse from "../responses/ApiResponse";
import TypescriptError from "./TypescriptError";

/** Error happening when a request fails. */
class RequestRelatedException<R> extends TypescriptError {
  /** Related request. */
  request: ApiRequest | null;

  /** Related error. */
  error: Error | null;

  /** Related response. */
  response: ApiResponse<R> | null;

  /** Instanciating request related error. */
  constructor(message = "Request failed.") {
    super(message);
    this.name = "RequestRelatedException";
    this.request = null;
    this.error = null;
    this.response = null;
  }

  /** Setting related request. */
  setRequest(request: ApiRequest): this {
    this.request = request;

    return this;
  }

  /** Setting related response. */
  setResponse(response: ApiResponse<R>): this {
    this.response = response;

    return this;
  }

  /** Setting related error. */
  setError(error: Error): this {
    this.error = error;

    return this;
  }

  /** Telling if this exception is having an error. */
  hasError() {
    return !!this.error;
  }

  /** Getting exception context. */
  context() {
    return {
      response: this.response ? this.response.toJson() : null,
      request: this.request ? this.request.toJson() : null,
      error: this.error,
    };
  }
}

export default RequestRelatedException;
