// src/core/container.ts
var StateContainer = class {
  constructor(initialState) {
    this.state = initialState;
    this.version = 0;
  }
};

// src/core/asyncProduce.ts
async function asyncProduce(container, recipe, engine) {
  var _a, _b;
  const baseVersion = container.version;
  const baseState = container.state;
  const draft = engine.createDraft(baseState);
  try {
    await recipe(draft);
  } catch (err) {
    (_a = engine.abortDraft) == null ? void 0 : _a.call(engine, draft);
    return {
      state: container.state,
      status: "aborted",
      version: container.version
    };
  }
  if (container.version !== baseVersion) {
    (_b = engine.abortDraft) == null ? void 0 : _b.call(engine, draft);
    return {
      state: container.state,
      status: "aborted",
      version: container.version
    };
  }
  const nextState = engine.finishDraft(draft);
  container.state = nextState;
  container.version++;
  return {
    state: nextState,
    status: "committed",
    version: container.version
  };
}

// src/engine/immerEngine.ts
import { createDraft, finishDraft } from "immer";
var immerEngine = {
  createDraft(base) {
    return createDraft(base);
  },
  finishDraft(draft) {
    return finishDraft(draft);
  }
};
export {
  StateContainer,
  asyncProduce,
  immerEngine
};
//# sourceMappingURL=index.js.map