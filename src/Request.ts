import {
  ApiRequestAsJson,
  ApiRequestData,
  ApiRequestHeaders,
  ApiRequestQuery,
  ApiRequestVerb,
  ApiRequestToFetchParams,
} from "./types/requests";

/** Representing an API request. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class ApiRequest<R = any> {
  /** Request base url. */
  baseUrl: string;

  /** Request url. */
  url: string;

  /** Request verb. */
  verb: ApiRequestVerb;

  /** Request data. */
  data: ApiRequestData;

  /** Request query. */
  query: ApiRequestQuery;

  /** Request query. */
  headers: ApiRequestHeaders;

  /** Request adding credentials cookies. */
  usingCredentials: boolean;

  /** Initializing underlying parameters. */
  constructor() {
    this.baseUrl = "";
    this.url = "";
    this.verb = "GET";
    this.data = {};
    this.query = {};
    this.headers = {};
    this.usingCredentials = false;
  }

  /** Setting request verb. */
  setVerb(verb: ApiRequestVerb): this {
    this.verb = verb;

    return this;
  }

  /** Setting url. */
  setUrl(url: string): this {
    const queryIndex = url.indexOf("?");

    if (queryIndex === -1) {
      this.url = url;

      return this;
    }

    this.url = url.substring(0, queryIndex);
    const query: ApiRequestQuery = {};
    new URLSearchParams(url.substring(queryIndex)).forEach((value, key) => {
      query[key] = value;
    });

    return this.addQuery(query);
  }

  /** Setting baseUrl used by this request.
   * @param {string} baseUrl
   * @returns {Request} */
  setBaseUrl(baseUrl: string): this {
    this.baseUrl = baseUrl;

    return this;
  }

  /** Adding data to request. */
  addData(data: ApiRequestData): this {
    this.data = { ...this.data, ...data };

    return this;
  }

  /** Adding query to request. */
  addQuery(query: ApiRequestQuery): this {
    this.query = { ...this.query, ...query };

    return this;
  }

  /** Adding headers to request. */
  addHeaders(headers: ApiRequestHeaders): this {
    this.headers = { ...this.headers, ...headers };

    return this;
  }

  /** Telling if request should add cookies. */
  withCredentials(isHavingCredentials: boolean): this {
    this.usingCredentials = isHavingCredentials;

    return this;
  }

  /** Telling if request is having query. */
  havingQuery(): boolean {
    return !this.isEmpty(this.query);
  }

  /** Telling if request is having data. */
  havingData(): boolean {
    return !this.isEmpty(this.data);
  }

  /** Telling if request should send cookies. */
  havingCredentials(): boolean {
    return this.usingCredentials;
  }

  /** Telling if request is having headers. */
  havingHeaders(): boolean {
    return !this.isEmpty(this.headers);
  }

  /** Telling if given object is empty. */
  // eslint-disable-next-line class-methods-use-this
  isEmpty(object: Record<string, any>): boolean {
    return Object.keys(object).length === 0;
  }

  /** Transforming request to fetch API requests parameters. */
  toFetchParams(): ApiRequestToFetchParams {
    const params: ApiRequestToFetchParams = { method: this.verb };

    if (this.havingData()) {
      params.body = JSON.stringify(this.data);
    }

    if (this.havingHeaders()) {
      params.headers = this.headers;
    }

    if (this.havingCredentials()) {
      params.credentials = "include";
    }

    return params;
  }

  /** Transforming to fetch API url. */
  getUrl(): string {
    const shouldAddSlash = this.baseUrl.charAt(this.baseUrl.length - 1) !== "/";
    const url = `${this.baseUrl}${shouldAddSlash ? "/" : ""}${this.url}`;

    if (!this.havingQuery()) {
      return url;
    }

    return `${url}?${new URLSearchParams(this.query).toString()}`;
  }

  /** Transforming request to json. */
  toJson(): ApiRequestAsJson {
    return {
      verb: this.verb,
      baseUrl: this.baseUrl,
      url: this.url,
      url_with_query: this.getUrl(),
      query: this.query,
      headers: this.headers,
      data: this.data,
      usingCredentials: this.usingCredentials,
    };
  }
}

export default ApiRequest;
