export type ValueObj = {
  label: string;
  value: string;
};

export interface Props {
  label?: string;
  value: any;
  disabled?: boolean;
  operators?: string[];
  droppable?: any[];
  filters?: any[];
  onChange: (v: any) => void;
  canDoFilters?: boolean;
  error?: boolean;
  type?: 'category' | 'kpi';
  filtersColumn?: number;
  placeholder?: string;
  operatorsWhenEnclosedWithBracket?: string[];
  operatorsWhenEnclosedWithoutBracket?: string[];
  allowTyping: {
    inCurlyBrackets: boolean;
    outSideCurlyBrackets: boolean;
  };
}

export type ObjType = {
  label: string;
  value: string;
  type: string;
  field_type?: string;
  items?: ValueObj[];
  placeholder?: string;
  helper_text?: string;
  is_editor_focused?: boolean;
  is_editing?: boolean;
  is_highlight?: boolean;
  isGroup?: boolean;
};

export type FilterProp = {
  disabled?: boolean;
  placeholder?: string;
};

export type PossibleValuesType = {
  label: string;
  value: string;
  type: string;
  items?: [];
};
