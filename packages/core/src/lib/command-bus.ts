// ---------- Base handler ----------

export abstract class CommandHandler<TPayload = void, TResult = void> {
  /** Type-only anchor: keeps the generics on the instance type even when
   *  subclasses implement `handle` without a parameter. Never emitted. */
  declare readonly __types: { payload: TPayload; result: TResult };

  abstract handle(payload: TPayload): TResult;
}

// ---------- Type plumbing ----------

type AnyHandler = CommandHandler<any, any>;

export type HandlerMap = Record<string, AnyHandler>;

export type PayloadOf<H> = H extends CommandHandler<infer P, any> ? P : never;
export type ResultOf<H> = H extends CommandHandler<any, infer R> ? R : never;

/** Payload argument tuple: omitted entirely when the payload is void/undefined. */
export type PayloadArgs<H> = [PayloadOf<H>] extends [void | undefined]
  ? []
  : [payload: PayloadOf<H>];

// ---------- The bus ----------

export class CommandBus<M extends HandlerMap> {
  private readonly handlers = new Map<keyof M, AnyHandler>();

  register<K extends keyof M>(key: K, handler: M[K]): this {
    if (this.handlers.has(key)) {
      throw new Error(`Handler already registered for "${String(key)}"`);
    }
    this.handlers.set(key, handler);
    return this;
  }

  dispatch<K extends keyof M>(
    key: K,
    ...rest: PayloadArgs<M[K]>
  ): ResultOf<M[K]> {
    const handler = this.handlers.get(key) as M[K] | undefined;
    if (!handler) {
      throw new Error(`No handler registered for "${String(key)}"`);
    }
    return handler.handle(rest[0] as PayloadOf<M[K]>) as ResultOf<M[K]>;
  }
}