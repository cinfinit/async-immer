import type { DraftEngine } from "../engine/DraftEngine"
import type { AsyncProduceResult } from "../types"
import { StateContainer } from "./container"


export async function asyncProduce<S, D extends S = S>(
  container: StateContainer<S>,
  recipe: (draft: D) => Promise<void> | void,
  engine: DraftEngine<S, D>
): Promise<AsyncProduceResult<S>> {
  const baseVersion = container.version
  const baseState = container.state

  const draft = engine.createDraft(baseState)

  try {
    await recipe(draft)
  } catch (err) {
    engine.abortDraft?.(draft)
    return {
      state: container.state,
      status: "aborted",
      version: container.version
    }
  }

  // 🚨 Commit gate (race + stale protection)
  if (container.version !== baseVersion) {
    engine.abortDraft?.(draft)
    return {
      state: container.state,
      status: "aborted",
      version: container.version
    }
  }

  // ✅ Atomic commit
  const nextState = engine.finishDraft(draft)
  container.state = nextState
  container.version++

  return {
    state: nextState,
    status: "committed",
    version: container.version
  }
}
