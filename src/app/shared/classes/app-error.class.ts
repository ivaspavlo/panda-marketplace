export class AppError extends Error {
  public message: string;
  public code: string;
  public redirect: string;

  constructor(message: string = 'Unknown error occured, please again later.', redirect: string = '', code: string = '') {
    super();
    this.code = code;
    this.redirect = redirect;
    this.message = message;
  }
}
