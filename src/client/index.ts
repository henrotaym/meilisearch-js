import {
  instantMeiliSearch,
  MeiliSearch,
  MeiliSearchParams,
} from "@meilisearch/instant-meilisearch";
import Filters from "../filters";

/** Meilisearch client. */
class Client {
  /** Meilisearch server url. */
  private url;

  /** Meilisearch key. */
  private key;

  /** Meilisearch underlying client. */
  private client: MeiliSearch;

  /** Constructing client. */
  constructor(url: string, key: string) {
    this.url = url;
    this.key = key;
    this.client = instantMeiliSearch(this.url, this.key).MeiliSearchClient;
  }

  /** Getting underlying client */
  public getClient() {
    return this.client;
  }

  /**
   * Starting a search request.
   * @param index Where to search.
   * @param searching Search value.
   * @param filters Filters to apply.
   * @returns Search results.
   */
  public search<T = Record<string, any>>(
    index: string,
    searching: string,
    filters?: Filters,
    params?: MeiliSearchParams
  ) {
    return this.client
      .index(index)
      .search<T>(searching, { ...params, filter: filters?.format() });
  }
}

export default Client;
