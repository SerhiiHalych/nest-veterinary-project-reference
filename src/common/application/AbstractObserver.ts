export abstract class AbstractObserver<
  TActionCb extends (...args: Parameters<TActionCb>) => void | Promise<void>,
  TSubscriberMetadata = void,
> {
  protected readonly listeners: Map<
    string,
    Map<
      string,
      {
        metadata: TSubscriberMetadata;
        action: TActionCb;
      }
    >
  >;

  constructor() {
    this.listeners = new Map();
  }

  subscribe(
    targetId: string,
    subscriberId: string,
    action: TActionCb,
    metadata: TSubscriberMetadata,
  ): void {
    const listenerExists = this.listeners.has(targetId);

    if (!listenerExists) {
      const subscriberMap = new Map();

      subscriberMap.set(subscriberId, {
        metadata,
        action,
      });

      this.listeners.set(targetId, subscriberMap);

      return;
    }

    const subscriberMap = this.listeners.get(targetId)!;

    subscriberMap.set(subscriberId, {
      metadata,
      action,
    });
  }

  unsubscribe(subscriberId: string): void {
    const listenersToDelete: string[] = [];

    this.listeners.forEach((subscriberMap, key: string) => {
      subscriberMap.delete(subscriberId);

      if (subscriberMap.size === 0) {
        listenersToDelete.push(key);
      }
    });

    listenersToDelete.forEach((listenerToDelete) =>
      this.listeners.delete(listenerToDelete),
    );
  }

  protected async notify(
    targetId: string,
    ...args: Parameters<TActionCb>
  ): Promise<
    | Map<
        string,
        {
          metadata: TSubscriberMetadata;
          action: TActionCb;
        }
      >
    | undefined
  > {
    const listenerExists = this.listeners.has(targetId);

    if (!listenerExists) {
      return;
    }

    const subscriberMap = this.listeners.get(targetId);

    const actions = Array.from(subscriberMap!.values());

    await Promise.all(actions.map(({ action }) => action(...args)));

    return subscriberMap;
  }
}
