/// <reference path="./FastGrid.TypeScript.API.d.ts" />

type TGridRef = import("react").RefObject<TGrid | null>;

declare module "fastgrid-react" {
  type OnEventPropName<K extends string> = K extends `On${infer R}` ? `on${Uncapitalize<R>}` : never;
  type OnEventHandler<K extends keyof TFGrid> = TFGrid[K] extends (...args: infer A) => infer Ret ? (...args: A) => Ret : never;
  type FastGridEventProps = { [K in keyof TFGrid as K extends `On${string}` ? OnEventPropName<K & string> : never]?: OnEventHandler<K> };
  export interface FastGridProps { src: any; id?: string; style?: import("react").CSSProperties; [key: string]: any; }
  export const FastGrid: import("react").ForwardRefExoticComponent < FastGridProps & FastGridEventProps & import("react").RefAttributes<TGrid | null> >;
}