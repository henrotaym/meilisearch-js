import { MeiliSearchParams } from "@meilisearch/instant-meilisearch";
import Filters from "../..";

export type SearchParams = Omit<MeiliSearchParams, "filter"> & {
  filter?: Filters;
};
