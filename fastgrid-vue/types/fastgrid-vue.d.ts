/// <reference path="./FastGrid.TypeScript.API.d.ts" />
import type { DefineComponent, HTMLAttributes, Ref } from "vue";
export type FastGridListener = (...args: any[]) => any;
export interface FastGridProps extends Omit<HTMLAttributes, "id"> { src: any; id?: string; [key: string]: any; }
export type FastGridInstance = TGrid & {
   readonly grid: TGrid | null;
   getGrid(): TGrid | null;
   reload(src?: any, type?: number, onfinish?: any, transparent?: number | boolean): Promise<TGrid | null>;
   dispose(): void;
   };
export type FastGridRef = Ref<FastGridInstance | null>;
export type TGridRef = Ref<TGrid | null>;
export const FastGrid: DefineComponent<FastGridProps,FastGridInstance>;