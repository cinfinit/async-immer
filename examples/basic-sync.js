import { StateContainer, asyncProduce, immerEngine } from "../dist/index.js";

const container = new StateContainer({ count: 0 });

(async () => {
  await asyncProduce(container, draft => {
    draft.count += 1;
  }, immerEngine);

  console.log("Basic Sync:", container.state);
  // → { count: 1 }
})();
