import {
  instantMeiliSearch,
  MeiliSearch,
} from "@meilisearch/instant-meilisearch";
import { SearchParams } from "../filters/types/search";

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
    params?: SearchParams
  ) {
    return this.client
      .index(index)
      .search<T>(searching, { ...params, filter: params?.filter?.format() });
  }
}

export default Client;
