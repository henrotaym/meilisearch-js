import RequestRelatedException from "../exceptions/RequestRelatedException";
import ApiRequest from "../Request";
import ApiResponse from "./ApiResponse";

/** Trying to get api response from current request. */
class TryGettingApiResponse<R> {
  /** Potential exception. */
  exception: RequestRelatedException<R>;

  /** Potential response. */
  response: ApiResponse<R> | null;

  /** Instanciating class */
  constructor(exceptionMessage?: string) {
    this.exception = new RequestRelatedException(exceptionMessage);
    this.response = null;
  }

  /** Setting error to exception. */
  setError(error: Error) {
    this.exception.setError(error);

    return this;
  }

  /** Setting request to exception. */
  setRequest(request: ApiRequest) {
    this.exception.setRequest(request);

    return this;
  }

  /** Setting response. */
  async setResponse(response: ApiResponse<R>) {
    this.response = response;
    await this.response.getBody();
    this.exception.setResponse(this.response);

    return this;
  }

  /** Telling if response failed */
  failed() {
    return !!(this.exception.hasError() || !this.response?.ok());
  }

  /** Telling if request was successfull. */
  ok() {
    return !this.failed();
  }

  /** Getting response body. */
  get() {
    return this.response ? this.response.get() : this.response;
  }

  /** Getting underlying response. */
  getResponse() {
    return this.response;
  }

  /** Getting exception */
  getException() {
    return this.exception;
  }
}

export default TryGettingApiResponse;
