type Primitive = string | (() => string);

type DeepReadonly<T> = T extends Primitive
  ? T
  : T extends Array<infer U>
  ? ReadonlyArray<DeepReadonly<U>>
  : T extends object
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T;

type ValidateLeaf<T> = T extends Primitive
  ? T
  : T extends object
  ? keyof T extends never
    ? string
    : DeepReadonly<T>
  : never;

type ValidateObject<T> = {
  [K in keyof T]: ValidateLeaf<T[K]>;
};

function typedFreeze<T extends object>(
  obj: ValidateObject<T>
): DeepReadonly<T> {
  Object.freeze(obj);
  return obj as DeepReadonly<T>;
}

// Test cases
const TEST_IDS = typedFreeze({
  key1: { key2: "example1", key3: { key4: "example2" } },
  key5: () => "example3",
});

// Error cases

// const TEST_IDS_INVALID_1 = typedFreeze({
//   key1: { key2: "example1", key3: { key4: "example2" } },
//   key5: () => 10,
// } as const);

// const TEST_IDS_INVALID_2 = typedFreeze({
//   key1: { key2: "example1", key3: { key4: "example2" } },
//   key5: {},
// } as const);

export {};
