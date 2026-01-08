// src/engine/DraftEngine.ts

export interface DraftEngine<S = any, D = any> {
  createDraft(base: S): D
  finishDraft(draft: D): S
  abortDraft?(draft: D): void
}
