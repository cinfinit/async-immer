declare class StateContainer<S> {
    state: S;
    version: number;
    constructor(initialState: S);
}

interface DraftEngine<S = any, D = any> {
    createDraft(base: S): D;
    finishDraft(draft: D): S;
    abortDraft?(draft: D): void;
}

type AsyncProduceStatus = "committed" | "aborted";
interface AsyncProduceResult<S> {
    state: S;
    status: AsyncProduceStatus;
    version: number;
}

declare function asyncProduce<S, D extends S = S>(container: StateContainer<S>, recipe: (draft: D) => Promise<void> | void, engine: DraftEngine<S, D>): Promise<AsyncProduceResult<S>>;

declare const immerEngine: DraftEngine;

export { StateContainer, asyncProduce, immerEngine };
