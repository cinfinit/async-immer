// src/core/container.ts

export class StateContainer<S> {
  state: S
  version: number

  constructor(initialState: S) {
    this.state = initialState
    this.version = 0
  }
}
