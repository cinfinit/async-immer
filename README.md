---

# async-immer

---

## 🔑 async-immer

[![NPM version](https://img.shields.io/npm/v/async-immer.svg?style=flat)](https://www.npmjs.com/package/async-immer) [![NPM downloads](https://img.shields.io/npm/dm/async-immer.svg?style=flat)](https://npmjs.org/package/async-immer)

**`async-immer` lets you safely mutate state across async boundaries without race conditions or stale writes.**

**Immer, but safe for async.**

`async-immer` lets you write mutable-looking code while **safely handling async state updates**, preventing race conditions and stale writes by design.

If you’ve ever wondered:

> *“What happens if two async updates finish out of order?”*

This library exists because of that question.

---

## 🚨 The Problem

Immer is great — **until async enters the picture**.

```ts
setState(prev =>
  produce(prev, async draft => {
    draft.user = await fetchUser();
  })
);
```

Looks harmless.
But now consider:

* Multiple async updates running at the same time
* Slow requests finishing after fast ones
* Older async work overwriting newer state

This leads to:

* ❌ Race conditions
* ❌ Stale writes
* ❌ Heisenbugs in production

Immer cannot protect you here — **by design**.

---

## 💡 The Solution

`async-immer` introduces **versioned, atomic async updates**.

It guarantees that:

* Async mutations commit **only if state hasn’t changed**
* Older async updates **cannot overwrite newer state**
* Failed or stale updates are **safely aborted**
* State updates are **atomic**

All while keeping the **same mental model as Immer**.

---

## ✨ Key Features

* ✅ Async-safe immutable updates
* ✅ Stale write detection
* ✅ Race condition prevention
* ✅ Atomic commits
* ✅ Framework-agnostic (React, Redux, Zustand, Node, etc.)
* ✅ Engine-agnostic (Immer today, custom engines tomorrow)
* ✅ Production-grade by default

---

## 📦 Installation

```bash
npm install async-immer
```

---

## 🧠 Core Concepts

### 1️⃣ `StateContainer`

Holds:

* The current state
* A monotonically increasing version

```ts
const container = new StateContainer({ count: 0 });
```

The version is what **protects you from stale async commits**.

---

### 2️⃣ `asyncProduce`

An async-safe version of `produce`.

```ts

import {StateContainer , asyncProduce ,immerEngine} from 'async-immer'

await asyncProduce(
  container,
  async draft => {
    draft.count += 1;
  },
  immerEngine
);
```

* You can `await` inside
* Mutations are isolated
* Commit happens **only if safe**

---

## 🚀 Basic Usage

### Synchronous update

```ts
import {StateContainer , asyncProduce ,immerEngine} from 'async-immer'

await asyncProduce(container, draft => {
  draft.count += 1;
}, immerEngine);

console.log(container.state);
// { count: 1 }
```

---

### Asynchronous update

```ts
import {StateContainer , asyncProduce ,immerEngine} from 'async-immer'

await asyncProduce(container, async draft => {
  draft.user = await fetchUser();
  draft.permissions = await fetchPermissions();
}, immerEngine);
```

No race conditions.
No stale overwrites.

---

## 🧪 Why This Matters (Real Example)

### Without `async-immer` ❌

```ts
fetchSlow().then(data => setState({ value: data }));
fetchFast().then(data => setState({ value: data }));
```

If `fetchSlow` finishes last → **stale overwrite**.

---

### With `async-immer` ✅

```ts
import {StateContainer , asyncProduce ,immerEngine} from 'async-immer'

asyncProduce(container, async draft => {
  await delay(200);
  draft.value = "slow";
}, immerEngine);

asyncProduce(container, async draft => {
  draft.value = "fast";
}, immerEngine);
```

**Result:**

```ts
{ value: "fast" }
```

The slow update is **automatically aborted**.

---

## 🧯 Error & Stale Handling

Every call returns a result:

```ts
const result = await asyncProduce(...);

if (result.status === "aborted") {
  // stale or failed update
}
```

No silent corruption.
No undefined behavior.

---

## 🧩 Framework-Agnostic by Design

`async-immer` has **zero framework dependencies** apart from immer obviously.

Works with:

* React
* Redux / RTK
* Zustand
* Vue / Pinia
* Node backends
* Real-time systems
* Games / simulations

You control **when and how state is read**.

---

## 🔌 Engine-Agnostic

Immer is just the default engine.

```ts
asyncProduce(container, recipe, immerEngine);
```

Future engines may include, MAY BE:

* Custom immutable engines
* Structural sharing strategies
* Domain-specific draft engines

---

## 🧠 When Should You Use This?

**Great fit for:**

* Async-heavy applications
* Real-time dashboards
* Collaborative tools
* High-concurrency systems
* Anywhere stale state is unacceptable

**Probably overkill for:**

* Purely synchronous state
* Simple forms or local UI state

---

## 🧭 Philosophy

**Correctness first. Convenience second.**

Async bugs don’t show up in dev.
They show up in production.

`async-immer` exists to make those bugs **structurally impossible**.

---

## 🏁 Final Thought

If Immer made immutability ergonomic,
**`async-immer` makes it safe in the real world.**

---

## ❤️ Acknowledgements

Built on top of **Immer**.

---

## Author’s Note
Hi [cinfinit](https://github.com/cinfinit) here 👋

This library was born from the realization that async bugs don’t crash your app — they quietly corrupt it.
By the time you notice, the cause is already gone.
async-immer exists to make those failures explicit, detectable, and impossible to ignore.
Correctness shouldn’t be optional just because async is involved.