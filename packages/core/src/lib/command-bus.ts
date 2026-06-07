
// ---------- Base handler ----------
 
export abstract class CommandHandler<TPayload = void, TResult = void> {
  abstract handle(payload: TPayload): Promise<TResult>;
}
 
// ---------- Type plumbing ----------
 
type AnyHandler = CommandHandler<any, any>;
 
/** A command map: string keys → concrete handler instance types. */
export type HandlerMap = Record<string, AnyHandler>;
 
/** Pull the payload type out of a handler's `handle` method. */
export type PayloadOf<H> = H extends { handle(payload: infer P): any }
  ? P
  : never;
 
/** Pull the awaited result type out of a handler's `handle` method. */
export type ResultOf<H> = H extends { handle(payload: any): Promise<infer R> }
  ? R
  : never;
 
// ---------- The bus ----------
 
export class CommandBus<M extends HandlerMap> {
  private readonly handlers = new Map<keyof M, AnyHandler>();
 
  /**
   * Register a handler instance. The handler's type is checked against
   * the entry declared in the command map for this key.
   */
  register<K extends keyof M>(key: K, handler: M[K]): this {
    if (this.handlers.has(key)) {
      throw new Error(`Handler already registered for "${String(key)}"`);
    }
    this.handlers.set(key, handler);
    return this;
  }
 
  /**
   * Dispatch a command. The payload argument is required only when the
   * handler's `handle` method accepts a non-`void` payload.
   */
  async dispatch<K extends keyof M>(
    key: K,
    ...rest: PayloadOf<M[K]> extends void ? [] : [payload: PayloadOf<M[K]>]
  ): Promise<ResultOf<M[K]>> {
    const handler = this.handlers.get(key) as M[K] | undefined;
    if (!handler) {
      throw new Error(`No handler registered for "${String(key)}"`);
    }
    const payload = rest[0] as PayloadOf<M[K]>;
    return handler.handle(payload);
  }
}