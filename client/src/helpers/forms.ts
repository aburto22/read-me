export const validateEmail = (email: string): boolean =>
  /^\S+@\S+\.[A-Za-z]+$/.test(email);
