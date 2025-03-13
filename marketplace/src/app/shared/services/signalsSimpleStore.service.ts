import { computed, Signal, signal } from '@angular/core';

export class SignalsSimpleStoreService<T> {
  state = signal({} as T);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public set<K extends keyof T>(key: K, data: T[K]) {
    this.state.update((currentValue) => ({ ...currentValue, [key]: data }));
  }

  public setState(partialState: Partial<T>): void {
    this.state.update((currentValue) => ({ ...currentValue, ...partialState }));
  }
  
  public select<K extends keyof T>(key: K): Signal<T[K]> {
    return computed(() => this.state()[key]);
  }
}

