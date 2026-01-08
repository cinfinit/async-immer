import { StateContainer, asyncProduce, immerEngine } from "../dist/index.js";

const container = new StateContainer({ data: 0 });

const update1 = async () => {
  await asyncProduce(container, async draft => {
    await new Promise(res => setTimeout(res, 100));
    draft.data = 1;
  }, immerEngine);
};

const update2 = async () => {
  await asyncProduce(container, async draft => {
    draft.data = 2;
  }, immerEngine);
};

(async () => {
  update1();
  update2();

  // Wait enough for both
  await new Promise(res => setTimeout(res, 200));

  console.log("Stale Write Protection:", container.state);
  // → { data: 2 }, update1 was aborted because update2 committed first
})();
