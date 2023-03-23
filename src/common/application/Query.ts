export abstract class Query<TInput, TOutput> {
  protected _input: TInput;

  async execute(input: TInput): Promise<TOutput> {
    this._input = input;

    const result: TOutput = await this.implementation(input);

    return result;
  }

  protected abstract implementation(input: TInput): Promise<TOutput> | TOutput;
}
