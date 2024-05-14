export const OPERATORS = [
  '+',
  '-',
  '*',
  '/',
  '%',
  '=',
  ',',
  '>',
  '<',
  '!',
  '(',
  ')',
  '>=',
  '<=',
];

export const HELP_TEXT = {
  DEFAULT: 'The DQL help text will provide you with guidance on what steps to take!',
  PLACEHOLDER_TEXT: 'Click here for start typing',
  OPEN_FORMULA: 'Click here to see the formula of the KPI',
  SELECT_FILTERS: 'Click here to select the filters for the KPI',
  TEXT_EDITOR:
    'Manually enter a value, then press "Enter" to convert it into a string. The Backspace key can remove the previous element. You can also manually enter an operator.',
  EDITOR_TEXT:
    'Select values from the dropdown menu or enter a value manually, then press "Enter" to convert it into a string.',
  OPERATOR_TEXT:
    'Manually enter an operator value from the list above, then press "Enter" or click on the operator from the list above.',
  PLACEHOLDER_INPUT_TEXT:
    'To create a new text field, simply start typing. Additionally, you can navigate using the arrow keys.',
  EDIT_STRING: 'Double click here to edit the string value.',
  SAVE_STRING: 'To save the new string, simply press "Enter".',
  CHANGE_TEXT: '"Dbl" click here to change the text',
  CHANGE_OPERATOR: 'Click to toggle between "=" and "≠" operators',
  KPI: {
    NO_ANOTTHER_KPI: "You can't use multiple KPI's inside curly brackets",
  },
  CATEGORY: {
    OUTSIDE_CURLY_BRACKETS: "You can't add categoty outside curly brackets",
    NOT_VALID_WITH_CLASSIFICATION: 'Category are not allowed to use with classifications',
  },
  CLASSIFICATIONS: {
    OUTSIDE_CURLY_BRACKETS: "You can't add classification outside curly brackets",
    NOT_VALID_WITH_CATEGORY: 'Classifications are not allowed to used with category',
  },
  ERRORS: {
    CURLY_BRACKETS_ERROR: '"Open" or "Closing" curly brackets are missing.',
    PRANTHESIS_ERROR: '"Open" or "Closing" brackets are missing.',
    OPEN_EDITOR: 'Kindly close all open editors or ensure they are properly filled.',
    TEXT_ERROR: 'Please add valid value in the text field',
  },
};
