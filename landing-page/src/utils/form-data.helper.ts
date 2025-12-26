// utils/form-data.helper.ts
export function getChangedFields<T extends object, U extends object>(
  initial: T,
  updated: U,
  options: { skipEmpty?: boolean } = {}
): Partial<U> {
  const changes: Partial<U> = {};

  for (const key in updated) {
    const value = updated[key];
    if (
      options.skipEmpty &&
      (value === "" || value === null || value === undefined)
    ) {
      continue;
    }

    // @ts-expect-error dynamic object compare
    if (value !== initial[key]) {
      changes[key] = value;
    }
  }

  return changes;
}
