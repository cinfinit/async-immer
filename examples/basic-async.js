import { StateContainer, asyncProduce, immerEngine } from "../dist/index.js";

// Mock async functions
const fetchCPU = () => new Promise(res => setTimeout(() => res(55), 100));
const fetchMemory = () => new Promise(res => setTimeout(() => res(80), 100));

const container = new StateContainer({ metrics: { cpu: 0, memory: 0 } });

(async () => {
  await asyncProduce(container, async draft => {
    draft.metrics.cpu = await fetchCPU();
    draft.metrics.memory = await fetchMemory();
  }, immerEngine);

  console.log("Basic Async:", container.state);
  // → { metrics: { cpu: 55, memory: 80 } }
})();
