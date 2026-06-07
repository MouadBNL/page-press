export type EventMap = Record<string, unknown>;
export type EventHandler<T> = (payload: T) => void;

export class EventBus<Events extends EventMap> {
  private handlers: { [K in keyof Events]?: Set<EventHandler<Events[K]>> } = {};

  /** Subscribe to an event. Returns an unsubscribe function. */
  on<K extends keyof Events>(event: K, handler: EventHandler<Events[K]>): () => void {
    const set = (this.handlers[event] ??= new Set());
    set.add(handler);
    return () => this.off(event, handler);
  }

  /** Subscribe for a single emission, then auto-unsubscribe. */
  once<K extends keyof Events>(event: K, handler: EventHandler<Events[K]>): () => void {
    const wrapper: EventHandler<Events[K]> = (payload) => {
      this.off(event, wrapper);
      handler(payload);
    };
    return this.on(event, wrapper);
  }

  off<K extends keyof Events>(event: K, handler: EventHandler<Events[K]>): void {
    this.handlers[event]?.delete(handler);
  }

  emit<K extends keyof Events>(event: K, payload: Events[K]): void {
    const set = this.handlers[event];
    if (!set) return;
    // Snapshot so handlers unsubscribing mid-emit don't affect iteration
    for (const handler of [...set]) {
      try {
        handler(payload);
      } catch (err) {
        console.error(`EventBus handler for "${String(event)}" threw:`, err);
      }
    }
  }

  /** Clear all handlers for one event, or all events if no argument given. */
  clear<K extends keyof Events>(event?: K): void {
    if (event === undefined) {
      this.handlers = {};
    } else {
      delete this.handlers[event];
    }
  }
}
