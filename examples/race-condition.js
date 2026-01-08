import { StateContainer, asyncProduce, immerEngine } from "../dist/index.js";

const container = new StateContainer({ value: 0 });

const slowUpdate = async () => {
  await asyncProduce(container, async draft => {
    await new Promise(res => setTimeout(res, 200));
    draft.value = 100;
  }, immerEngine);
};

const fastUpdate = async () => {
  await asyncProduce(container, async draft => {
    draft.value = 50;
  }, immerEngine);
};

(async () => {
  slowUpdate();
  fastUpdate();

  // Wait a bit to let both complete
  await new Promise(res => setTimeout(res, 300));

  console.log("Race Condition:", container.state);
  // → { value: 50 } because slowUpdate was aborted (stale write)
})();
