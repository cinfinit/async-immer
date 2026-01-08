// src/types/index.ts

export type AsyncProduceStatus = "committed" | "aborted"

export interface AsyncProduceResult<S> {
  state: S
  status: AsyncProduceStatus
  version: number
}
