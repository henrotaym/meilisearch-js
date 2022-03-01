import FilterGroup from "./FilterGroup";
import { ColumnValue, FilterType, Operator } from "./types";

/** Meilisearch filters. */
class Filters {
  /** Where clauses. */
  protected groups: FilterGroup[];

  /** Initializing query. */
  public constructor() {
    this.groups = [];
  }

  /** AND where group clause.  */
  public where(callback: (group: FilterGroup) => FilterGroup): Filters;

  /** AND where single clause. */
  public where<V extends ColumnValue>(
    name: string,
    value: V,
    operator: Operator<V>
  ): Filters;

  /** Adding AND WHERE clause. */
  public where<V extends ColumnValue>(
    callback: ((group: FilterGroup) => FilterGroup) | string,
    value?: V,
    operator?: Operator<V>
  ): Filters {
    return this.handleWhere("AND", callback, value, operator);
  }

  /** OR where group clause. */
  public orWhere(callback: (group: FilterGroup) => FilterGroup): Filters;

  /** OR where single clause. */
  public orWhere<V extends ColumnValue>(
    name: string,
    value: V,
    operator: Operator<V>
  ): Filters;

  /** Adding OR where clause. */
  public orWhere<V extends ColumnValue>(
    callback: ((group: FilterGroup) => FilterGroup) | string,
    value?: V,
    operator?: Operator<V>
  ): Filters {
    return this.handleWhere("OR", callback, value, operator);
  }

  /** Handling where clauses internally. */
  private handleWhere<V extends ColumnValue>(
    type: FilterType,
    callback: ((group: FilterGroup) => FilterGroup) | string,
    value?: V,
    operator?: Operator<V>
  ): Filters {
    const group = new FilterGroup(type);
    if (typeof callback === "function") {
      this.groups.push(callback(group));
      return this;
    }

    if (!value) return this;

    group.where(callback, value, operator);
    this.groups.push(group);
    return this;
  }

  /** Formatting to meilisearch filter format. */
  public format(): string {
    return this.groups.reduce(
      (formated, group, index) => `${formated} ${group.format(index)}`,
      ""
    );
  }
}

export default Filters;
