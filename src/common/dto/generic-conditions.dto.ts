export class WhereHasConditions {
  operator: SQLOperator;
  value: string;
}
export class WhereHasConditionsRelation {
  relation: string;
  operator: SQLOperator;
  amount = 1;
}

export enum SortTransaction {
  ASC = 'asc',
  DESC = 'desc',
}

export enum SQLOperator {
  EQ = 'EQ',
  NEQ = 'NEQ',
  GT = 'GT',
}
