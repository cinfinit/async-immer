"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  StateContainer: () => StateContainer,
  asyncProduce: () => asyncProduce,
  immerEngine: () => immerEngine
});
module.exports = __toCommonJS(index_exports);

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
var import_immer = require("immer");
var immerEngine = {
  createDraft(base) {
    return (0, import_immer.createDraft)(base);
  },
  finishDraft(draft) {
    return (0, import_immer.finishDraft)(draft);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StateContainer,
  asyncProduce,
  immerEngine
});
//# sourceMappingURL=index.cjs.map