export type FormValues = {
  name: string;
  formula: {
    type: string;
    value: string;
  }[];
  dataSource: { label: string; value: string | number };
  columns: { label: string; value: string | number };
};
