// src/engine/immerEngine.ts

import { createDraft, finishDraft } from "immer"
import type { DraftEngine } from "./DraftEngine"

export const immerEngine: DraftEngine = {
  createDraft(base) {
    return createDraft(base)
  },
  finishDraft(draft) {
    return finishDraft(draft)
  }
}
