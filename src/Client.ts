import { trying } from "@henrotaym/helpers";
import { TryGettingApiResponse, ApiResponse } from "./responses";
import { Credential } from "./credentials";
import ApiRequest from "./Request";

/** Representing a client performing API requests. */
class Client {
  /** Credential */
  credential?: Credential;

  /** Instanciating client. */
  constructor(credential?: Credential) {
    this.credential = credential;
  }

  /** Setting linked credential. */
  setCredential(credential: Credential) {
    this.credential = credential;

    return this;
  }

  /** Trying to make given request. */
  async try<R>(request: ApiRequest<R>) {
    if (this.credential) {
      this.credential.prepare(request);
    }

    const response = new TryGettingApiResponse<R>();
    response.setRequest(request);

    const [error, fetchedResponse] = await trying(() =>
      fetch(request.getUrl(), request.toFetchParams())
    );

    if (error) {
      response.setError(error);
      return response;
    }

    if (!fetchedResponse) {
      return response;
    }

    return response.setResponse(new ApiResponse<R>(fetchedResponse));
  }
}

export default Client;
