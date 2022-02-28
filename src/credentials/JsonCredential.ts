import ApiRequest from "../Request";
import Credential from "./Credential";

/** Representing a JSON credential. */
class JsonCredential extends Credential {
  /** Preparing given request. */
  // eslint-disable-next-line class-methods-use-this
  prepare(request: ApiRequest): void {
    request.addHeaders({
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
    });
  }
}

export default JsonCredential;
