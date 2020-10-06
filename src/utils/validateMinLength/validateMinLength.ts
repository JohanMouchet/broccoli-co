const validateMinLength = (value: string, characterCount: number): boolean =>
  value.length >= characterCount ? true : false;

export default validateMinLength;
