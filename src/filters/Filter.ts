import { ColumnValue, FilterType, Operator } from "./types";

class Filter<V extends ColumnValue> {
  protected column;

  protected operator;

  protected type;

  protected value;

  public constructor(
    column: string,
    value: V,
    operator: Operator<V> = "=",
    type: FilterType = "AND"
  ) {
    this.column = column;
    this.operator = operator;
    this.type = type;
    this.value = value;
  }

  public format(index: number) {
    return `${index === 0 ? "" : `${this.type} `}${this.column} ${
      this.operator
    } ${this.value}`;
  }
}

export default Filter;
