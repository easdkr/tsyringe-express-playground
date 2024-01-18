export class BaseDatasourceException extends Error {
  private _code: string;

  constructor(message: string, code?: string) {
    super(message);
    this._code = code;
    this.name = 'BaseDatasourceException';
  }

  public get code(): string {
    return this._code;
  }
}
