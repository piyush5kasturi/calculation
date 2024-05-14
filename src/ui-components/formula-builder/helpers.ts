import { HELP_TEXT } from './constants';
import { ObjType, PossibleValuesType } from './formula-builder.interface';

const findClosestField = (values: PossibleValuesType[]) => {
  let findClosedParanthesis = 0;
  for (let i = values.length; i > 0; i--) {
    if (values[i - 1]?.value === ')') {
      findClosedParanthesis = i;
    }
    if (
      findClosedParanthesis < i &&
      (values[i - 1]?.type === 'classification' || values[i - 1]?.type === 'field')
    ) {
      return values[i - 1];
    }
  }
};

export function findField(values: PossibleValuesType[], key: number) {
  if (key <= 3) return null;
  const previousIndex = values[key - 1];
  const isOperator =
    previousIndex?.value === '<' ||
    previousIndex?.value === '>' ||
    previousIndex?.value === '=';

  if (isOperator) {
    const item = values[key - 2];
    if (item?.type === 'operator' && (item?.value === '<' || item?.value === '>')) {
      return values[key - 3];
    } else {
      return values[key - 2];
    }
  }

  const findWhereConditionIndex = values.findIndex((v) => v.value === 'WHERE');
  const closestField = findClosestField(values.slice(findWhereConditionIndex + 1, key));
  if (findWhereConditionIndex > 0 && findWhereConditionIndex < key) {
    return closestField;
  }

  return null;
}

export function validateFormula(obj: any) {
  const errors: string[] = [];
  const findOpenCurlyBracket = obj.filter((v: any) => v.value === '{');
  const findClosedCurlyBracket = obj.filter((v: any) => v.value === '}');

  const findOpenBracket = obj.filter((v: any) => v.value === '(');
  const findClosedBracket = obj.filter((v: any) => v.value === ')');

  if (
    (findOpenCurlyBracket?.length > 0 || findClosedCurlyBracket?.length > 0) &&
    findOpenCurlyBracket?.length !== findClosedCurlyBracket?.length
  ) {
    errors.push(HELP_TEXT.ERRORS.CURLY_BRACKETS_ERROR);
  }

  if (
    (findOpenBracket?.length > 0 || findClosedBracket?.length > 0) &&
    findOpenBracket?.length !== findClosedBracket?.length
  ) {
    errors.push(HELP_TEXT.ERRORS.PRANTHESIS_ERROR);
  }

  const isTextValueFilled =
    obj.filter((v: any) => v.type === 'text' && v?.value === '')?.length || 0;

  const isAllValuesFilled = obj.filter((v: any) => v.type === 'none')?.length || 0;
  if (isAllValuesFilled > 0) {
    errors.push(HELP_TEXT.ERRORS.OPEN_EDITOR);
  }

  if (isTextValueFilled > 0) {
    errors.push(HELP_TEXT.ERRORS.TEXT_ERROR);
  }
  return errors;
}

export const findOperator = (values: ObjType[], operator: string): number =>
  values?.length
    ? values.findIndex((v: ObjType) => v?.type === 'operator' && v?.value === operator)
    : -1;

export const setDefaultState = (obj: ObjType[]) => {
  return obj.map((v) => {
    v.is_editing = false;
    v.is_editor_focused = false;
    return v;
  });
};

export const findPositionBeforeIndex = (
  state: ObjType[],
  index: number,
  findingOperator: string,
  shouldBeAfterThisOperator: string,
) => {
  const values = state?.slice(0, index).reverse() || [];
  const findLastOccuranceOfShouldBeOperator =
    findOperator(values, shouldBeAfterThisOperator) > -1
      ? values?.length - findOperator(values, shouldBeAfterThisOperator) - 1
      : -1;
  const findLastOccuranceOfOperator =
    findOperator(values, findingOperator) > -1
      ? values?.length - findOperator(values, findingOperator) - 1
      : -1;

  return findLastOccuranceOfOperator > findLastOccuranceOfShouldBeOperator
    ? findLastOccuranceOfOperator
    : -1;
};

export const findPositionAfterIndex = (
  state: ObjType[],
  index: number,
  findingOperator: string,
  shouldBeBeforeThisOperator: string,
) => {
  const values = state?.slice(index) || [];
  const findLastOccuranceOfShouldBeOperator =
    findOperator(values, shouldBeBeforeThisOperator) > -1
      ? state.slice(0, index)?.length + findOperator(values, shouldBeBeforeThisOperator)
      : -1;

  const findFirstOccuranceOfOperator =
    findOperator(values, findingOperator) > -1
      ? state.slice(0, index)?.length + findOperator(values, findingOperator)
      : -1;

  return findLastOccuranceOfShouldBeOperator > -1
    ? findLastOccuranceOfShouldBeOperator > findFirstOccuranceOfOperator
      ? findFirstOccuranceOfOperator
      : -1
    : findFirstOccuranceOfOperator;
};

export const isClassification = (v: ObjType) =>
  v.type === 'region' ||
  v.type === 'trade' ||
  v.type === 'department' ||
  v.type === 'division' ||
  v?.type === 'userType';

export const isCategory = (v: ObjType) => v?.type === 'category';

export const isCategoryFilter = (v: ObjType) =>
  v.type === 'business_unit' ||
  v.type === 'tag' ||
  v.type === 'job_type' ||
  v.type === 'custom_field' ||
  v.type === 'pricebook_line_item_code' ||
  v.type === 'pricebook_category' ||
  v?.type === 'category_filters';
