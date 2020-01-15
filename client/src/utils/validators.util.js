export const required = value => (value ? undefined : "Required");
export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
export const minLength4 = minLength(4);
export const number = value =>
  value && isNaN(Number(value)) ? "Must be a number" : undefined;
export const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;
export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
export const passwordsMustMatch = (value, allValues) => {
  return allValues.password !== allValues.passwordConfirmation
    ? "Passwords do not match"
    : undefined;
};
export const aol = value =>
  value && /.+@aol\.com/.test(value)
    ? "Really? You still use AOL for your email?"
    : undefined;
