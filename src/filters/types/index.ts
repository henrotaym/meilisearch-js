/** Available operator while searching strings */
export type StringOperator = "=" | "!=";

/** Available operator while searching numbers. */
export type NumberOperator = StringOperator | ">=" | ">" | "<" | "<=";

/** Available search values. */
export type ColumnValue = string | number;

/** Available search filter types. */
export type FilterType = "AND" | "OR";

/** Getting right operator based on given type. */
export type Operator<E extends string | number> = E extends string
  ? StringOperator
  : NumberOperator;
