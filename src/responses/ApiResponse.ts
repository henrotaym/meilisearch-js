import { trying } from "@henrotaym/helpers";

/** Representing response from API. */
class ApiResponse<R> {
  /** Underlying response. */
  fetch_response: Response;

  /** response body. */
  body?: R | null;

  /** Creating response from a fetch APi response. */
  constructor(fetch_response: Response) {
    this.fetch_response = fetch_response;
  }

  /** Telling if response can be considered as success. */
  ok() {
    return this.fetch_response.ok;
  }

  /** Response status code. */
  getStatus() {
    return this.fetch_response.status;
  }

  /** Telling if response status is same as given one. */
  isStatus(status: number): boolean {
    return this.getStatus() === status;
  }

  /** Setting and getting response body. */
  async getBody(): Promise<R | null> {
    if (this.body !== undefined) {
      return this.body;
    }

    const [, json] = await trying(
      () => this.fetch_response.json() as Promise<R>
    );
    this.body = json;

    return this.body;
  }

  /**
   * Getting response body.
   * Body was already retrieved automatically at this point by getBody
   * @see getBody
   */
  get() {
    return this.body as null | R;
  }

  /** Transforming request to json. */
  toJson() {
    return {
      ok: this.ok(),
      status: this.getStatus(),
      body: this.get(),
    };
  }
}

export default ApiResponse;
