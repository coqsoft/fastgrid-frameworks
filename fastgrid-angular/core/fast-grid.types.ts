/// <reference path="../types/FastGrid.TypeScript.API.d.ts" />
export type FastGridEventName = Extract<keyof TFGrid, `On${string}`>;
export type FastGridEventHandler<K extends FastGridEventName> = TFGrid[K] extends (...args: infer A) => infer R ? (...args: A) => R : never;
export type FastGridEvents = Partial<{ [K in FastGridEventName]: FastGridEventHandler<K> }>;
export type FastGridSource = any;