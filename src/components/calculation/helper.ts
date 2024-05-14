import DROPPABLE_DEFINATIONS from './droppable/defination.json';
import DROPPABLE_LOGICAL from './droppable/logical.json';
import DROPPABLE_OPERATOR from './droppable/operator.json';

export const droppable = [
  ...DROPPABLE_DEFINATIONS,
  ...DROPPABLE_LOGICAL,
  ...DROPPABLE_OPERATOR,
];

export const DATA_TYPE = [
  {
    label: 'Number',
    value: 'decimal',
  },
  {
    label: 'Percentage',
    value: 'percentage',
  },
  {
    label: 'Currency',
    value: 'currency',
  },
];

export const KPI_STATUS = [
  {
    label: 'Active',
    value: 'active',
  },
  {
    label: 'Draft',
    value: 'draft',
  },
  {
    label: 'Inactive',
    value: 'inactive',
  },
];

export const KPI_TYPE_CONSTANT = {
  SEEDED: 'seeded',
  CUSTOM: 'custom',
  COMBINATION: 'combination',
};

export const KPI_TYPE = [
  {
    label: 'Seeded',
    value: KPI_TYPE_CONSTANT.SEEDED,
  },
  {
    label: 'Custom',
    value: KPI_TYPE_CONSTANT.CUSTOM,
  },
  {
    label: 'Combination',
    value: KPI_TYPE_CONSTANT.COMBINATION,
  },
];

export const LOGICAL_OPERATORS = [
  { label: 'AND', value: 'AND' },
  { label: 'OR', value: 'OR' },
];
