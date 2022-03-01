import Filter from "./Filter";
import { ColumnValue, FilterType, Operator } from "./types";

class FilterGroup {
  protected filters: Filter<ColumnValue>[];

  protected type;

  public constructor(type: FilterType = "AND") {
    this.type = type;
    this.filters = [];
  }

  public where<V extends ColumnValue>(
    column: string,
    value: V,
    operator: Operator<V> = "="
  ): FilterGroup {
    this.filters.push(new Filter(column, value, operator, "AND"));
    return this;
  }

  public orWhere<V extends ColumnValue>(
    column: string,
    value: V,
    operator: Operator<V> = "="
  ): FilterGroup {
    this.filters.push(new Filter(column, value, operator, "AND"));
    return this;
  }

  public format(index: number): string {
    const filters = this.filters.reduce(
      (formated, filter, filterIndex) =>
        `${formated} ${filter.format(filterIndex)}`,
      ""
    );

    return `${index === 0 ? "" : this.type} (${filters})`;
  }
}

export default FilterGroup;
