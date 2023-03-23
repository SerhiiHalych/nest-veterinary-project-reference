import { Inject } from '@nestjs/common';

import { BaseToken } from '../diTokens';
import type { IDBContext } from './IDBContext';
import { IIdentityContext } from './identity/IIdentityContext';

export abstract class Command<TInput = void, TOutput = void> {
  protected _input: TInput;

  protected abstract _dbContext: IDBContext | null;

  @Inject(BaseToken.IDENTITY_CONTEXT)
  protected _identityContext: IIdentityContext;

  private _rollbackHandlers: Array<
    <TError extends Error>(error: TError) => Promise<any>
  >;

  private _commitHandlers: Array<() => Promise<any>>;

  private _finallyHandlers: Array<() => Promise<any>>;

  constructor() {
    this._rollbackHandlers = [];

    this._commitHandlers = [];

    this._finallyHandlers = [];
  }

  protected addRollbackHandler(
    handler: <TError extends Error>(error: TError) => Promise<any>,
  ): void {
    this._rollbackHandlers.push(handler);
  }

  protected addCommitHandler(handler: () => Promise<any>): void {
    this._commitHandlers.push(handler);
  }

  protected addFinallyHandler(handler: () => Promise<any>): void {
    this._finallyHandlers.push(handler);
  }

  async execute(input: TInput): Promise<TOutput> {
    this._input = input;

    if (this._dbContext) {
      await this._dbContext.startTransaction();
    }

    let result: TOutput;

    try {
      result = await this.implementation(input);

      if (this._dbContext) {
        await this._dbContext.commitTransaction();
      }

      this._commitHandlers.map((action) =>
        setImmediate(() => action.apply(this)),
      );
    } catch (error) {
      if (this._dbContext) {
        await this._dbContext.rollbackTransaction();
      }

      this._rollbackHandlers.map((action) =>
        setImmediate(() => action.apply(this)),
      );

      throw error;
    } finally {
      this._finallyHandlers.map((action) =>
        setImmediate(() => action.apply(this)),
      );
    }

    return result;
  }

  protected abstract implementation(input: TInput): Promise<TOutput> | TOutput;
}
