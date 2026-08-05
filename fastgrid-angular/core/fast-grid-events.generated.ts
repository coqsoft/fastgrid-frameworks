/// <reference path="../types/FastGrid.TypeScript.API.d.ts" />

import { Directive, EventEmitter, Input, Output } from "@angular/core";
export interface FastGridAcceptEvent { grid: TGrid; value?: any; parent?: TGrid; parentrow?: TRow; parentcol?: TCol; dialog?: TGrid; }
export interface FastGridAddEvent { grid: TGrid; items?: TRow[]|TCol[]; parent?: TRow|TCol|string; next?: TRow|TCol; action?: number; copytype?: number; cols?: number|boolean; }
export interface FastGridAddDataEvent { grid: TGrid; data?: object; }
export interface FastGridAddedEvent { grid: TGrid; items?: TRow[]|TCol[]; parent?: TRow|TCol|string; next?: TRow|TCol; action?: number; copytype?: number; sources?: TRow[]|TCol[]; }
export interface FastGridAddedToolEvent { grid: TGrid; cell?: TTool; toolbar?: TToolbar; next?: TTool; copy?: TTool; }
export interface FastGridAddedToolbarEvent { grid: TGrid; toolbar?: TToolbar; next?: TToolbar; copy?: TToolbar; all?: TToolbar[]; }
export interface FastGridAddImageEvent { grid: TGrid; image?: any; drop?: number|boolean; }
export interface FastGridAddToolEvent { grid: TGrid; cell?: TTool; toolbar?: TToolbar; next?: TTool; copy?: TTool; }
export interface FastGridAddToolbarEvent { grid: TGrid; toolbar?: TToolbar; next?: TToolbar; copy?: TToolbar; all?: TToolbar[]; }
export interface FastGridAfterSetAttrEvent { grid: TGrid; row?: TRow; col?: TCol; value?: any; changes?: number; }
export interface FastGridAfterSetFormulaEvent { grid: TGrid; row?: TRow; col?: TCol; formula?: string; changes?: number; }
export interface FastGridAfterSetValueEvent { grid: TGrid; row?: TRow; col?: TCol; value?: any; oldvalue?: any; changes?: number; }
export interface FastGridAIGetDynamicInstructionsEvent { grid: TGrid; instructions?: string; }
export interface FastGridAIGetGeneralInstructionsEvent { grid: TGrid; instructions?: string; }
export interface FastGridAIGetStaticInstructionsEvent { grid: TGrid; instructions?: string; }
export interface FastGridAppliedMediaEvent { grid: TGrid; media?: any; apply?: number; }
export interface FastGridApplyMediaEvent { grid: TGrid; media?: any; apply?: number; }
export interface FastGridAutoFillEvent { grid: TGrid; values?: any; attrs?: any; rows?: TRow[]; cols?: TCol[]; orcnt?: number; occnt?: number; rcnt?: number; ccnt?: number; rdir?: number|boolean; cdir?: number|boolean; }
export interface FastGridAutoFilledEvent { grid: TGrid; r1?: TRow; c1?: TCol; r2?: TRow; c2?: TCol; rdir?: number|boolean; cdir?: number|boolean; ro?: TRow; co?: TCol; }
export interface FastGridClickEvent { grid: TGrid; row?: TRow; col?: TCol; x?: number; y?: number; event?: any; prefix?: string; }
export interface FastGridCloseEvent { grid: TGrid; value?: any; parent?: TGrid; parentrow?: TRow; parentcol?: TCol; dialog?: TGrid; }
export interface FastGridCollapseEvent { grid: TGrid; items?: TRow[]|TCol[]; collapse?: number; all?: number|boolean; test?: number|boolean; }
export interface FastGridCollapsedEvent { grid: TGrid; items?: TRow[]|TCol[]; exp?: number; all?: number|boolean; }
export interface FastGridCopiedEvent { grid: TGrid; text?: string; html?: string; event?: Event; }
export interface FastGridCopyEvent { grid: TGrid; cut?: number|boolean; event?: Event; }
export interface FastGridCopyCellsEvent { grid: TGrid; rows?: TRow[]; cols?: TCol[]; }
export interface FastGridDataErrorEvent { grid: TGrid; data?: object; }
export interface FastGridDataGetEvent { grid: TGrid; source?: any; data?: object|string; index?: number; }
export interface FastGridDataSendEvent { grid: TGrid; source?: any; func?: any; index?: number; }
export interface FastGridDblClickEvent { grid: TGrid; row?: TRow; col?: TCol; x?: number; y?: number; event?: any; prefix?: string; }
export interface FastGridDeleteEvent { grid: TGrid; items?: TRow[]|TCol[]; del?: number; test?: number|boolean; }
export interface FastGridDeletedEvent { grid: TGrid; items?: TRow[]|TCol[]; del?: number; }
export interface FastGridDeletingEvent { grid: TGrid; items?: TRow[]|TCol[]; del?: number; }
export interface FastGridDragEvent { grid: TGrid; row?: TRow; col?: TCol; x?: number; y?: number; event?: any; prefix?: string; }
export interface FastGridDragCellEvent { grid: TGrid; row?: TRow; col?: TCol; togrid?: TGrid; torow?: TRow; tocol?: TCol; event?: Event; ghost?: HTMLElement; start?: number|boolean; }
export interface FastGridDraggingEvent { grid: TGrid; src?: TRow|TCol|TTool; to?: TRow|TCol|TTool; type?: number; action?: number; options?: number; event?: any; mouseevent?: Event; }
export interface FastGridDropEvent { grid: TGrid; src?: TRow|TCol; to?: TRow|TCol; type?: number; action?: number; options?: number; event?: any; mouseevent?: Event; }
export interface FastGridDropCellEvent { grid: TGrid; row?: TRow; col?: TCol; togrid?: TGrid; torow?: TRow; tocol?: TCol; event?: Event; }
export interface FastGridDropFileEvent { grid: TGrid; row?: TRow; col?: TCol; files?: File[]; }
export interface FastGridDropFileErrorEvent { grid: TGrid; row?: TRow; col?: TCol; files?: File[]; }
export interface FastGridDroppedEvent { grid: TGrid; src?: TRow|TCol; to?: TRow|TCol; type?: number; action?: number; options?: number; event?: any; mouseevent?: Event; }
export interface FastGridEditChangeEvent { grid: TGrid; row?: TRow; col?: TCol; value?: string; oldvalue?: string; correct?: number|boolean; }
export interface FastGridEndDragEvent { grid: TGrid; src?: TRow|TCol; items?: TRow[]|TCol[]|TTool; action?: number; }
export interface FastGridEndedEditEvent { grid: TGrid; row?: TRow; col?: TCol; value?: string; save?: number|boolean; }
export interface FastGridEndEditEvent { grid: TGrid; row?: TRow; col?: TCol; value?: string; save?: number|boolean; }
export interface FastGridEndResizeEvent { grid: TGrid; src?: any; size?: number; origsize?: number; }
export interface FastGridExportEvent { grid: TGrid; test?: number|boolean; }
export interface FastGridExportedEvent { grid: TGrid; data?: any; }
export interface FastGridFilterEvent { grid: TGrid; part?: string; }
export interface FastGridFilteredEvent { grid: TGrid; part?: string; }
export interface FastGridFilterChangedEvent { grid: TGrid; filter?: TRow|TCol|string; }
export interface FastGridFixedScrollEvent { grid: TGrid; row?: TRow; change?: number; }
export interface FastGridFocusEvent { grid: TGrid; row?: TRow; col?: TCol; rect?: object[]; action?: number; drag?: string; test?: number|boolean; }
export interface FastGridFocusedEvent { grid: TGrid; drag?: string; }
export interface FastGridGenerateIdEvent { grid: TGrid; item?: object; id?: string|number; type?: number; }
export interface FastGridGetAttrEvent { grid: TGrid; row?: TRow; col?: TCol; attr?: string; value?: any; direct?: number; }
export interface FastGridGetDAEvent { grid: TGrid; row?: TRow; col?: TCol; dA?: string; }
export interface FastGridGetFormulaEvent { grid: TGrid; row?: TRow; col?: TCol; formula?: string; edit?: number|boolean; }
export interface FastGridGetGroupDEvent { grid: TGrid; groupcol?: string; group?: string; first?: TRow|TCol; }
export interface FastGridGetGroupStringEvent { grid: TGrid; str?: string; }
export interface FastGridGetMenuCustomEvent { grid: TGrid; itemid?: string; menuname?: string; }
export interface FastGridGetNameEvent { grid: TGrid; item?: TRow|TCol|TToolbar; name?: string; }
export interface FastGridGetNumberEvent { grid: TGrid; row?: TRow; col?: TCol; value?: any; rawvalue?: any; ret?: number; def?: any; }
export interface FastGridGetRangeEvent { grid: TGrid; row?: TRow; col?: TCol; value?: any; rawvalue?: any; ret?: number; def?: any; }
export interface FastGridGetSortStringEvent { grid: TGrid; str?: string; }
export interface FastGridGetStringEvent { grid: TGrid; row?: TRow; col?: TCol; value?: string; rawvalue?: any; src?: number; out?: object; }
export interface FastGridGetValueEvent { grid: TGrid; row?: TRow; col?: TCol; value?: any; direct?: number; }
export interface FastGridGroupEvent { grid: TGrid; part?: string; group?: string; oldgroup?: string; }
export interface FastGridGroupedEvent { grid: TGrid; part?: string; group?: string; oldgroup?: string; oldtree?: string; }
export interface FastGridHidEvent { grid: TGrid; items?: TRow[]|TCol[]; hide?: number|boolean; }
export interface FastGridHideEvent { grid: TGrid; items?: TRow[]|TCol[]; hide?: number|boolean; test?: number|boolean; }
export interface FastGridHideGridEvent { grid: TGrid; clearhtml?: number|boolean; force?: number|boolean; }
export interface FastGridHideTipEvent { grid: TGrid; tip?: object; }
export interface FastGridHideToolEvent { grid: TGrid; cell?: TTool; hide?: number|boolean; test?: number|boolean; }
export interface FastGridHideToolbarEvent { grid: TGrid; toolbar?: TToolbar; hide?: number|boolean; test?: number|boolean; }
export interface FastGridHidGridEvent { grid: TGrid; clearhtml?: number|boolean; }
export interface FastGridImportDataEvent { grid: TGrid; files?: File[]; type?: number; }
export interface FastGridImportDataErrorEvent { grid: TGrid; files?: File[]; errors?: object[]; }
export interface FastGridImportedDataEvent { grid: TGrid; files?: File[]; errors?: object[]; }
export interface FastGridImportingDataEvent { grid: TGrid; data?: any[]; files?: File[]; errors?: object[]; type?: number; }
export interface FastGridIndentEvent { grid: TGrid; items?: TRow[]|TCol[]; level?: number; test?: number|boolean; }
export interface FastGridIndentedEvent { grid: TGrid; items?: TRow[]|TCol[]; level?: number; }
export interface FastGridInitEvent { grid: TGrid; }
export interface FastGridInitializedEvent { grid: TGrid; }
export interface FastGridKeyDownEvent { grid: TGrid; key?: number; event?: any; name?: string; prefix?: string; }
export interface FastGridLoadEvent { grid: TGrid; counter?: number; }
export interface FastGridLoadCookieEvent { grid: TGrid; data?: string; id?: string; date?: number; version?: string; }
export interface FastGridLoadDataEvent { grid: TGrid; src?: any; onfinish?: any; }
export interface FastGridLoadedEvent { grid: TGrid; }
export interface FastGridLoadedCookieEvent { grid: TGrid; data?: string; id?: string; date?: number; version?: string; }
export interface FastGridLoadedDataEvent { grid: TGrid; }
export interface FastGridLoadedChildrenEvent { grid: TGrid; rows?: TRow[]; }
export interface FastGridLoadedMenuEvent { grid: TGrid; row?: TRow; col?: TCol; }
export interface FastGridLoadErrorEvent { grid: TGrid; source?: any; code?: number; message?: string; index?: number; }
export interface FastGridLoadChildrenEvent { grid: TGrid; rows?: TRow[]; source?: any; }
export interface FastGridLoadMenuEvent { grid: TGrid; row?: TRow; col?: TCol; sourc?: any; }
export interface FastGridOpenImageEvent { grid: TGrid; row?: TRow; col?: TCol; test?: number|boolean; }
export interface FastGridPaintEvent { grid: TGrid; }
export interface FastGridPaintedEvent { grid: TGrid; }
export interface FastGridPasteEvent { grid: TGrid; txt?: string[]|string; sourcerows?: TRow[]; sourcecols?: TCol[]; focus?: object[]; single?: number|boolean; }
export interface FastGridPasteAddedEvent { grid: TGrid; rows?: TRow[]; cols?: TCol[]; values?: string[]; sourcerows?: TRow[]; sourcecols?: TCol[]; addedrows?: TRow[]; addedcols?: TCol[]; }
export interface FastGridPasteCellsEvent { grid: TGrid; rows?: TRow[]; cols?: TCol[]; values?: string[]; sourcerows?: TRow[]; sourcecols?: TCol[]; }
export interface FastGridPastedEvent { grid: TGrid; rows?: TRow[]; cols?: TCol[]; values?: string[]; sourcerows?: TRow[]; sourcecols?: TCol[]; addedrows?: TRow[]; addedcols?: TCol[]; }
export interface FastGridPdfEvent { grid: TGrid; }
export interface FastGridPdfSendEvent { grid: TGrid; form?: HTMLElement; }
export interface FastGridPivotCreateEvent { pivot: TGrid; source?: TGrid; rows?: string; cols?: string; data?: string; part?: string; show?: number|boolean; }
export interface FastGridPivotCreatedEvent { pivot: TGrid; source?: TGrid; rows?: string; cols?: string; data?: string; part?: string; show?: number|boolean; }
export interface FastGridPrintEvent { grid: TGrid; }
export interface FastGridPrintCreateEvent { grid: TGrid; }
export interface FastGridPrintedEvent { grid: TGrid; cancelled?: number|boolean; }
export interface FastGridReadyEvent { grid: TGrid; first?: number|boolean; }
export interface FastGridReadyAnimateEvent { grid: TGrid; }
export interface FastGridRemovedToolEvent { grid: TGrid; cell?: TTool; }
export interface FastGridRemovedToolbarEvent { grid: TGrid; toolbar?: TToolbar; }
export interface FastGridRemoveToolEvent { grid: TGrid; cell?: TTool; }
export interface FastGridRemoveToolbarEvent { grid: TGrid; toolbar?: TToolbar; }
export interface FastGridRenderEvent { grid: TGrid; type?: number; }
export interface FastGridResetCookieEvent { grid: TGrid; id?: string; }
export interface FastGridResizeEvent { grid: TGrid; src?: any; size?: number; origsize?: number; prevsize?: number; }
export interface FastGridReversedTreeEvent { grid: TGrid; changed?: number; }
export interface FastGridSaveEvent { grid: TGrid; source?: any; grids?: TGrid[]; }
export interface FastGridSaveAcceptEvent { grid: TGrid; source?: any; data?: object; grids?: TGrid[]; }
export interface FastGridSaveCookieEvent { grid: TGrid; data?: string; id?: string; date?: number; version?: string; action?: number; }
export interface FastGridSaveCookieErrorEvent { grid: TGrid; source?: any; code?: number; message?: string; }
export interface FastGridSavedEvent { grid: TGrid; source?: any; grids?: TGrid[]; }
export interface FastGridSavedCookieEvent { grid: TGrid; data?: string; id?: string; date?: number; version?: string; action?: number; }
export interface FastGridSaveErrorEvent { grid: TGrid; source?: any; code?: number; message?: string; grids?: TGrid[]; }
export interface FastGridSaveChangedEvent { grid: TGrid; item?: TRow|TCol; data?: string; }
export interface FastGridSaveXlsxErrorEvent { grid: TGrid; source?: any; grids?: TGrid[]; }
export interface FastGridScrollEvent { grid: TGrid; rowpart?: string; top?: number; oldtop?: number; colpart?: string; leftp?: number; oldleft?: number; }
export interface FastGridSearchEvent { grid: TGrid; row?: TRow; col?: TCol; value?: any; type?: string; texts?: string[]|string; numbers?: number[]; results?: number; }
export interface FastGridSelectEvent { grid: TGrid; items?: TRow[]|TCol[]; sel?: number; test?: number|boolean; }
export interface FastGridSelectAllEvent { grid: TGrid; sel?: number|boolean; test?: number|boolean; }
export interface FastGridSelectedEvent { grid: TGrid; items?: TRow[]|TCol[]; sel?: number; }
export interface FastGridSelectedAllEvent { grid: TGrid; newselected?: TRows|TCols; oldselected?: TRows|TCols; sel?: number|boolean; test?: number|boolean; }
export interface FastGridSetAttrEvent { grid: TGrid; row?: TRow; col?: TCol; attr?: string; value?: any; changes?: number; }
export interface FastGridSetFormulaEvent { grid: TGrid; row?: TRow; col?: TCol; formula?: string; changes?: number; }
export interface FastGridSetLanguageEvent { grid: TGrid; language?: string; oldlanguage?: string; init?: number|boolean; }
export interface FastGridSetMenuCustomEvent { grid: TGrid; itemid?: string; itemvalue?: any; menuname?: string; }
export interface FastGridSetReversedTreeEvent { grid: TGrid; reversedtree?: number; }
export interface FastGridSetStringEvent { grid: TGrid; row?: TRow; col?: TCol; value?: any; stringvalue?: string; changes?: number; src?: number; }
export interface FastGridSetStyleEvent { grid: TGrid; style?: string; oldstyle?: string; init?: number; }
export interface FastGridSetValueEvent { grid: TGrid; row?: TRow; col?: TCol; value?: any; changes?: number; }
export interface FastGridShowCalendarEvent { grid: TGrid; row?: TRow; col?: TCol; calendar?: any; }
export interface FastGridShowedCalendarEvent { grid: TGrid; row?: TRow; col?: TCol; calendargrid?: TGrid; }
export interface FastGridShowedGridEvent { grid: TGrid; }
export interface FastGridShowedListEvent { grid: TGrid; row?: TRow; col?: TCol; menugrid?: TGrid; }
export interface FastGridShowedMenuEvent { grid: TGrid; row?: TRow; col?: TCol; menugrid?: TGrid; }
export interface FastGridShowedSuggestEvent { grid: TGrid; row?: TRow; col?: TCol; menugrid?: TGrid; formula?: number|boolean; }
export interface FastGridShowGridEvent { grid: TGrid; clearhtml?: number|boolean; }
export interface FastGridShowImageLinkEvent { grid: TGrid; index?: number; href?: string; target?: string; }
export interface FastGridShowLinkEvent { grid: TGrid; row?: TRow; col?: TCol; href?: string; target?: string; }
export interface FastGridShowListEvent { grid: TGrid; row?: TRow; col?: TCol; menu?: any; }
export interface FastGridShowMenuEvent { grid: TGrid; row?: TRow; col?: TCol; menu?: any; }
export interface FastGridShowSuggestEvent { grid: TGrid; row?: TRow; col?: TCol; menu?: any; formula?: number|boolean; }
export interface FastGridShowTipEvent { grid: TGrid; row?: TRow; col?: TCol; tip?: string; }
export interface FastGridSortEvent { grid: TGrid; part?: string; sort?: string; }
export interface FastGridSortedEvent { grid: TGrid; part?: string; group?: string; oldgroup?: string; first?: TRow; last?: TRow; }
export interface FastGridStartDragEvent { grid: TGrid; src?: TRow|TCol; actions?: number; options?: number; }
export interface FastGridStartedEditEvent { grid: TGrid; row?: TRow; col?: TCol; }
export interface FastGridStartEditEvent { grid: TGrid; row?: TRow; col?: TCol; value?: string; test?: number|boolean; }
export interface FastGridStartResizeEvent { grid: TGrid; src?: any; size?: number; }
export interface FastGridStaticEvent { grid: TGrid; row?: TRow; col?: TCol; tag?: HTMLElement; _new?: HTMLElement; }
export interface FastGridTagEvent { grid: TGrid; tag?: HTMLElement; }
export interface FastGridTestAddEvent { grid: TGrid; items?: TRow[]|TCol[]|number; parent?: TRow|TCol|string; next?: TRow|TCol; action?: number; copytype?: number; cols?: number|boolean; test?: number|boolean; }
export interface FastGridTestFilterEvent { grid: TGrid; item?: TRow|TCol; ok?: number|boolean; }
export interface FastGridToolbarCellsEvent { grid: TGrid; toolbar?: TToolbar; }
export interface FastGridUpdatedEvent { grid: TGrid; }
export interface FastGridValidateEvent { grid: TGrid; row?: TRow; col?: TCol; value?: string; error?: number|boolean; edit?: number|boolean; }

export interface FastGridOutputEventMap {
   "accept": FastGridAcceptEvent;
   "add": FastGridAddEvent;
   "addData": FastGridAddDataEvent;
   "added": FastGridAddedEvent;
   "addedTool": FastGridAddedToolEvent;
   "addedToolbar": FastGridAddedToolbarEvent;
   "addImage": FastGridAddImageEvent;
   "addTool": FastGridAddToolEvent;
   "addToolbar": FastGridAddToolbarEvent;
   "afterSetAttr": FastGridAfterSetAttrEvent;
   "afterSetFormula": FastGridAfterSetFormulaEvent;
   "afterSetValue": FastGridAfterSetValueEvent;
   "aIGetDynamicInstructions": FastGridAIGetDynamicInstructionsEvent;
   "aIGetGeneralInstructions": FastGridAIGetGeneralInstructionsEvent;
   "aIGetStaticInstructions": FastGridAIGetStaticInstructionsEvent;
   "appliedMedia": FastGridAppliedMediaEvent;
   "applyMedia": FastGridApplyMediaEvent;
   "autoFill": FastGridAutoFillEvent;
   "autoFilled": FastGridAutoFilledEvent;
   "click": FastGridClickEvent;
   "close": FastGridCloseEvent;
   "collapse": FastGridCollapseEvent;
   "collapsed": FastGridCollapsedEvent;
   "copied": FastGridCopiedEvent;
   "copy": FastGridCopyEvent;
   "copyCells": FastGridCopyCellsEvent;
   "dataError": FastGridDataErrorEvent;
   "dataGet": FastGridDataGetEvent;
   "dataSend": FastGridDataSendEvent;
   "dblClick": FastGridDblClickEvent;
   "delete": FastGridDeleteEvent;
   "deleted": FastGridDeletedEvent;
   "deleting": FastGridDeletingEvent;
   "drag": FastGridDragEvent;
   "dragCell": FastGridDragCellEvent;
   "dragging": FastGridDraggingEvent;
   "drop": FastGridDropEvent;
   "dropCell": FastGridDropCellEvent;
   "dropFile": FastGridDropFileEvent;
   "dropFileError": FastGridDropFileErrorEvent;
   "dropped": FastGridDroppedEvent;
   "editChange": FastGridEditChangeEvent;
   "endDrag": FastGridEndDragEvent;
   "endedEdit": FastGridEndedEditEvent;
   "endEdit": FastGridEndEditEvent;
   "endResize": FastGridEndResizeEvent;
   "export": FastGridExportEvent;
   "exported": FastGridExportedEvent;
   "filter": FastGridFilterEvent;
   "filtered": FastGridFilteredEvent;
   "filterChanged": FastGridFilterChangedEvent;
   "fixedScroll": FastGridFixedScrollEvent;
   "focus": FastGridFocusEvent;
   "focused": FastGridFocusedEvent;
   "generateId": FastGridGenerateIdEvent;
   "getAttr": FastGridGetAttrEvent;
   "getDA": FastGridGetDAEvent;
   "getFormula": FastGridGetFormulaEvent;
   "getGroupD": FastGridGetGroupDEvent;
   "getGroupString": FastGridGetGroupStringEvent;
   "getMenuCustom": FastGridGetMenuCustomEvent;
   "getName": FastGridGetNameEvent;
   "getNumber": FastGridGetNumberEvent;
   "getRange": FastGridGetRangeEvent;
   "getSortString": FastGridGetSortStringEvent;
   "getString": FastGridGetStringEvent;
   "getValue": FastGridGetValueEvent;
   "group": FastGridGroupEvent;
   "grouped": FastGridGroupedEvent;
   "hid": FastGridHidEvent;
   "hide": FastGridHideEvent;
   "hideGrid": FastGridHideGridEvent;
   "hideTip": FastGridHideTipEvent;
   "hideTool": FastGridHideToolEvent;
   "hideToolbar": FastGridHideToolbarEvent;
   "hidGrid": FastGridHidGridEvent;
   "importData": FastGridImportDataEvent;
   "importDataError": FastGridImportDataErrorEvent;
   "importedData": FastGridImportedDataEvent;
   "importingData": FastGridImportingDataEvent;
   "indent": FastGridIndentEvent;
   "indented": FastGridIndentedEvent;
   "init": FastGridInitEvent;
   "initialized": FastGridInitializedEvent;
   "keyDown": FastGridKeyDownEvent;
   "load": FastGridLoadEvent;
   "loadCookie": FastGridLoadCookieEvent;
   "loadData": FastGridLoadDataEvent;
   "loaded": FastGridLoadedEvent;
   "loadedCookie": FastGridLoadedCookieEvent;
   "loadedData": FastGridLoadedDataEvent;
   "loadedChildren": FastGridLoadedChildrenEvent;
   "loadedMenu": FastGridLoadedMenuEvent;
   "loadError": FastGridLoadErrorEvent;
   "loadChildren": FastGridLoadChildrenEvent;
   "loadMenu": FastGridLoadMenuEvent;
   "openImage": FastGridOpenImageEvent;
   "paint": FastGridPaintEvent;
   "painted": FastGridPaintedEvent;
   "paste": FastGridPasteEvent;
   "pasteAdded": FastGridPasteAddedEvent;
   "pasteCells": FastGridPasteCellsEvent;
   "pasted": FastGridPastedEvent;
   "pdf": FastGridPdfEvent;
   "pdfSend": FastGridPdfSendEvent;
   "pivotCreate": FastGridPivotCreateEvent;
   "pivotCreated": FastGridPivotCreatedEvent;
   "print": FastGridPrintEvent;
   "printCreate": FastGridPrintCreateEvent;
   "printed": FastGridPrintedEvent;
   "ready": FastGridReadyEvent;
   "readyAnimate": FastGridReadyAnimateEvent;
   "removedTool": FastGridRemovedToolEvent;
   "removedToolbar": FastGridRemovedToolbarEvent;
   "removeTool": FastGridRemoveToolEvent;
   "removeToolbar": FastGridRemoveToolbarEvent;
   "render": FastGridRenderEvent;
   "resetCookie": FastGridResetCookieEvent;
   "resize": FastGridResizeEvent;
   "reversedTree": FastGridReversedTreeEvent;
   "save": FastGridSaveEvent;
   "saveAccept": FastGridSaveAcceptEvent;
   "saveCookie": FastGridSaveCookieEvent;
   "saveCookieError": FastGridSaveCookieErrorEvent;
   "saved": FastGridSavedEvent;
   "savedCookie": FastGridSavedCookieEvent;
   "saveError": FastGridSaveErrorEvent;
   "saveChanged": FastGridSaveChangedEvent;
   "saveXlsxError": FastGridSaveXlsxErrorEvent;
   "scroll": FastGridScrollEvent;
   "search": FastGridSearchEvent;
   "select": FastGridSelectEvent;
   "selectAll": FastGridSelectAllEvent;
   "selected": FastGridSelectedEvent;
   "selectedAll": FastGridSelectedAllEvent;
   "setAttr": FastGridSetAttrEvent;
   "setFormula": FastGridSetFormulaEvent;
   "setLanguage": FastGridSetLanguageEvent;
   "setMenuCustom": FastGridSetMenuCustomEvent;
   "setReversedTree": FastGridSetReversedTreeEvent;
   "setString": FastGridSetStringEvent;
   "setStyle": FastGridSetStyleEvent;
   "setValue": FastGridSetValueEvent;
   "showCalendar": FastGridShowCalendarEvent;
   "showedCalendar": FastGridShowedCalendarEvent;
   "showedGrid": FastGridShowedGridEvent;
   "showedList": FastGridShowedListEvent;
   "showedMenu": FastGridShowedMenuEvent;
   "showedSuggest": FastGridShowedSuggestEvent;
   "showGrid": FastGridShowGridEvent;
   "showImageLink": FastGridShowImageLinkEvent;
   "showLink": FastGridShowLinkEvent;
   "showList": FastGridShowListEvent;
   "showMenu": FastGridShowMenuEvent;
   "showSuggest": FastGridShowSuggestEvent;
   "showTip": FastGridShowTipEvent;
   "sort": FastGridSortEvent;
   "sorted": FastGridSortedEvent;
   "startDrag": FastGridStartDragEvent;
   "startedEdit": FastGridStartedEditEvent;
   "startEdit": FastGridStartEditEvent;
   "startResize": FastGridStartResizeEvent;
   "static": FastGridStaticEvent;
   "tag": FastGridTagEvent;
   "testAdd": FastGridTestAddEvent;
   "testFilter": FastGridTestFilterEvent;
   "toolbarCells": FastGridToolbarCellsEvent;
   "updated": FastGridUpdatedEvent;
   "validate": FastGridValidateEvent;
}

export type FastGridOutputEvent<K extends keyof FastGridOutputEventMap> = FastGridOutputEventMap[K];

export const FASTGRID_EVENT_NAMES = [
   "OnAccept",
   "OnAdd",
   "OnAddData",
   "OnAdded",
   "OnAddedTool",
   "OnAddedToolbar",
   "OnAddImage",
   "OnAddTool",
   "OnAddToolbar",
   "OnAfterSetAttr",
   "OnAfterSetFormula",
   "OnAfterSetValue",
   "OnAIGetDynamicInstructions",
   "OnAIGetGeneralInstructions",
   "OnAIGetStaticInstructions",
   "OnAppliedMedia",
   "OnApplyMedia",
   "OnAutoFill",
   "OnAutoFilled",
   "OnClick",
   "OnClose",
   "OnCollapse",
   "OnCollapsed",
   "OnCopied",
   "OnCopy",
   "OnCopyCells",
   "OnDataError",
   "OnDataGet",
   "OnDataSend",
   "OnDblClick",
   "OnDelete",
   "OnDeleted",
   "OnDeleting",
   "OnDrag",
   "OnDragCell",
   "OnDragging",
   "OnDrop",
   "OnDropCell",
   "OnDropFile",
   "OnDropFileError",
   "OnDropped",
   "OnEditChange",
   "OnEndDrag",
   "OnEndedEdit",
   "OnEndEdit",
   "OnEndResize",
   "OnExport",
   "OnExported",
   "OnFilter",
   "OnFiltered",
   "OnFilterChanged",
   "OnFixedScroll",
   "OnFocus",
   "OnFocused",
   "OnGenerateId",
   "OnGetAttr",
   "OnGetDA",
   "OnGetFormula",
   "OnGetGroupD",
   "OnGetGroupString",
   "OnGetMenuCustom",
   "OnGetName",
   "OnGetNumber",
   "OnGetRange",
   "OnGetSortString",
   "OnGetString",
   "OnGetValue",
   "OnGroup",
   "OnGrouped",
   "OnHid",
   "OnHide",
   "OnHideGrid",
   "OnHideTip",
   "OnHideTool",
   "OnHideToolbar",
   "OnHidGrid",
   "OnImportData",
   "OnImportDataError",
   "OnImportedData",
   "OnImportingData",
   "OnIndent",
   "OnIndented",
   "OnInit",
   "OnInitialized",
   "OnKeyDown",
   "OnLoad",
   "OnLoadCookie",
   "OnLoadData",
   "OnLoaded",
   "OnLoadedCookie",
   "OnLoadedData",
   "OnLoadedChildren",
   "OnLoadedMenu",
   "OnLoadError",
   "OnLoadChildren",
   "OnLoadMenu",
   "OnOpenImage",
   "OnPaint",
   "OnPainted",
   "OnPaste",
   "OnPasteAdded",
   "OnPasteCells",
   "OnPasted",
   "OnPdf",
   "OnPdfSend",
   "OnPivotCreate",
   "OnPivotCreated",
   "OnPrint",
   "OnPrintCreate",
   "OnPrinted",
   "OnReady",
   "OnReadyAnimate",
   "OnRemovedTool",
   "OnRemovedToolbar",
   "OnRemoveTool",
   "OnRemoveToolbar",
   "OnRender",
   "OnResetCookie",
   "OnResize",
   "OnReversedTree",
   "OnSave",
   "OnSaveAccept",
   "OnSaveCookie",
   "OnSaveCookieError",
   "OnSaved",
   "OnSavedCookie",
   "OnSaveError",
   "OnSaveChanged",
   "OnSaveXlsxError",
   "OnScroll",
   "OnSearch",
   "OnSelect",
   "OnSelectAll",
   "OnSelected",
   "OnSelectedAll",
   "OnSetAttr",
   "OnSetFormula",
   "OnSetLanguage",
   "OnSetMenuCustom",
   "OnSetReversedTree",
   "OnSetString",
   "OnSetStyle",
   "OnSetValue",
   "OnShowCalendar",
   "OnShowedCalendar",
   "OnShowedGrid",
   "OnShowedList",
   "OnShowedMenu",
   "OnShowedSuggest",
   "OnShowGrid",
   "OnShowImageLink",
   "OnShowLink",
   "OnShowList",
   "OnShowMenu",
   "OnShowSuggest",
   "OnShowTip",
   "OnSort",
   "OnSorted",
   "OnStartDrag",
   "OnStartedEdit",
   "OnStartEdit",
   "OnStartResize",
   "OnStatic",
   "OnTag",
   "OnTestAdd",
   "OnTestFilter",
   "OnToolbarCells",
   "OnUpdated",
   "OnValidate"
] as const;

export const FASTGRID_EVENT_INPUTS: Readonly<Record<string,string>> = {
   "OnAccept": "onAccept",
   "OnAdd": "onAdd",
   "OnAddData": "onAddData",
   "OnAdded": "onAdded",
   "OnAddedTool": "onAddedTool",
   "OnAddedToolbar": "onAddedToolbar",
   "OnAddImage": "onAddImage",
   "OnAddTool": "onAddTool",
   "OnAddToolbar": "onAddToolbar",
   "OnAfterSetAttr": "onAfterSetAttr",
   "OnAfterSetFormula": "onAfterSetFormula",
   "OnAfterSetValue": "onAfterSetValue",
   "OnAIGetDynamicInstructions": "onAIGetDynamicInstructions",
   "OnAIGetGeneralInstructions": "onAIGetGeneralInstructions",
   "OnAIGetStaticInstructions": "onAIGetStaticInstructions",
   "OnAppliedMedia": "onAppliedMedia",
   "OnApplyMedia": "onApplyMedia",
   "OnAutoFill": "onAutoFill",
   "OnAutoFilled": "onAutoFilled",
   "OnClick": "onClick",
   "OnClose": "onClose",
   "OnCollapse": "onCollapse",
   "OnCollapsed": "onCollapsed",
   "OnCopied": "onCopied",
   "OnCopy": "onCopy",
   "OnCopyCells": "onCopyCells",
   "OnDataError": "onDataError",
   "OnDataGet": "onDataGet",
   "OnDataSend": "onDataSend",
   "OnDblClick": "onDblClick",
   "OnDelete": "onDelete",
   "OnDeleted": "onDeleted",
   "OnDeleting": "onDeleting",
   "OnDrag": "onDrag",
   "OnDragCell": "onDragCell",
   "OnDragging": "onDragging",
   "OnDrop": "onDrop",
   "OnDropCell": "onDropCell",
   "OnDropFile": "onDropFile",
   "OnDropFileError": "onDropFileError",
   "OnDropped": "onDropped",
   "OnEditChange": "onEditChange",
   "OnEndDrag": "onEndDrag",
   "OnEndedEdit": "onEndedEdit",
   "OnEndEdit": "onEndEdit",
   "OnEndResize": "onEndResize",
   "OnExport": "onExport",
   "OnExported": "onExported",
   "OnFilter": "onFilter",
   "OnFiltered": "onFiltered",
   "OnFilterChanged": "onFilterChanged",
   "OnFixedScroll": "onFixedScroll",
   "OnFocus": "onFocus",
   "OnFocused": "onFocused",
   "OnGenerateId": "onGenerateId",
   "OnGetAttr": "onGetAttr",
   "OnGetDA": "onGetDA",
   "OnGetFormula": "onGetFormula",
   "OnGetGroupD": "onGetGroupD",
   "OnGetGroupString": "onGetGroupString",
   "OnGetMenuCustom": "onGetMenuCustom",
   "OnGetName": "onGetName",
   "OnGetNumber": "onGetNumber",
   "OnGetRange": "onGetRange",
   "OnGetSortString": "onGetSortString",
   "OnGetString": "onGetString",
   "OnGetValue": "onGetValue",
   "OnGroup": "onGroup",
   "OnGrouped": "onGrouped",
   "OnHid": "onHid",
   "OnHide": "onHide",
   "OnHideGrid": "onHideGrid",
   "OnHideTip": "onHideTip",
   "OnHideTool": "onHideTool",
   "OnHideToolbar": "onHideToolbar",
   "OnHidGrid": "onHidGrid",
   "OnImportData": "onImportData",
   "OnImportDataError": "onImportDataError",
   "OnImportedData": "onImportedData",
   "OnImportingData": "onImportingData",
   "OnIndent": "onIndent",
   "OnIndented": "onIndented",
   "OnInit": "onInit",
   "OnInitialized": "onInitialized",
   "OnKeyDown": "onKeyDown",
   "OnLoad": "onLoad",
   "OnLoadCookie": "onLoadCookie",
   "OnLoadData": "onLoadData",
   "OnLoaded": "onLoaded",
   "OnLoadedCookie": "onLoadedCookie",
   "OnLoadedData": "onLoadedData",
   "OnLoadedChildren": "onLoadedChildren",
   "OnLoadedMenu": "onLoadedMenu",
   "OnLoadError": "onLoadError",
   "OnLoadChildren": "onLoadChildren",
   "OnLoadMenu": "onLoadMenu",
   "OnOpenImage": "onOpenImage",
   "OnPaint": "onPaint",
   "OnPainted": "onPainted",
   "OnPaste": "onPaste",
   "OnPasteAdded": "onPasteAdded",
   "OnPasteCells": "onPasteCells",
   "OnPasted": "onPasted",
   "OnPdf": "onPdf",
   "OnPdfSend": "onPdfSend",
   "OnPivotCreate": "onPivotCreate",
   "OnPivotCreated": "onPivotCreated",
   "OnPrint": "onPrint",
   "OnPrintCreate": "onPrintCreate",
   "OnPrinted": "onPrinted",
   "OnReady": "onReady",
   "OnReadyAnimate": "onReadyAnimate",
   "OnRemovedTool": "onRemovedTool",
   "OnRemovedToolbar": "onRemovedToolbar",
   "OnRemoveTool": "onRemoveTool",
   "OnRemoveToolbar": "onRemoveToolbar",
   "OnRender": "onRender",
   "OnResetCookie": "onResetCookie",
   "OnResize": "onResize",
   "OnReversedTree": "onReversedTree",
   "OnSave": "onSave",
   "OnSaveAccept": "onSaveAccept",
   "OnSaveCookie": "onSaveCookie",
   "OnSaveCookieError": "onSaveCookieError",
   "OnSaved": "onSaved",
   "OnSavedCookie": "onSavedCookie",
   "OnSaveError": "onSaveError",
   "OnSaveChanged": "onSaveChanged",
   "OnSaveXlsxError": "onSaveXlsxError",
   "OnScroll": "onScroll",
   "OnSearch": "onSearch",
   "OnSelect": "onSelect",
   "OnSelectAll": "onSelectAll",
   "OnSelected": "onSelected",
   "OnSelectedAll": "onSelectedAll",
   "OnSetAttr": "onSetAttr",
   "OnSetFormula": "onSetFormula",
   "OnSetLanguage": "onSetLanguage",
   "OnSetMenuCustom": "onSetMenuCustom",
   "OnSetReversedTree": "onSetReversedTree",
   "OnSetString": "onSetString",
   "OnSetStyle": "onSetStyle",
   "OnSetValue": "onSetValue",
   "OnShowCalendar": "onShowCalendar",
   "OnShowedCalendar": "onShowedCalendar",
   "OnShowedGrid": "onShowedGrid",
   "OnShowedList": "onShowedList",
   "OnShowedMenu": "onShowedMenu",
   "OnShowedSuggest": "onShowedSuggest",
   "OnShowGrid": "onShowGrid",
   "OnShowImageLink": "onShowImageLink",
   "OnShowLink": "onShowLink",
   "OnShowList": "onShowList",
   "OnShowMenu": "onShowMenu",
   "OnShowSuggest": "onShowSuggest",
   "OnShowTip": "onShowTip",
   "OnSort": "onSort",
   "OnSorted": "onSorted",
   "OnStartDrag": "onStartDrag",
   "OnStartedEdit": "onStartedEdit",
   "OnStartEdit": "onStartEdit",
   "OnStartResize": "onStartResize",
   "OnStatic": "onStatic",
   "OnTag": "onTag",
   "OnTestAdd": "onTestAdd",
   "OnTestFilter": "onTestFilter",
   "OnToolbarCells": "onToolbarCells",
   "OnUpdated": "onUpdated",
   "OnValidate": "onValidate"
};

export const FASTGRID_EVENT_OUTPUTS: Readonly<Record<string,string>> = {
   "OnAccept": "accept",
   "OnAdd": "add",
   "OnAddData": "addData",
   "OnAdded": "added",
   "OnAddedTool": "addedTool",
   "OnAddedToolbar": "addedToolbar",
   "OnAddImage": "addImage",
   "OnAddTool": "addTool",
   "OnAddToolbar": "addToolbar",
   "OnAfterSetAttr": "afterSetAttr",
   "OnAfterSetFormula": "afterSetFormula",
   "OnAfterSetValue": "afterSetValue",
   "OnAIGetDynamicInstructions": "aIGetDynamicInstructions",
   "OnAIGetGeneralInstructions": "aIGetGeneralInstructions",
   "OnAIGetStaticInstructions": "aIGetStaticInstructions",
   "OnAppliedMedia": "appliedMedia",
   "OnApplyMedia": "applyMedia",
   "OnAutoFill": "autoFill",
   "OnAutoFilled": "autoFilled",
   "OnClick": "click",
   "OnClose": "close",
   "OnCollapse": "collapse",
   "OnCollapsed": "collapsed",
   "OnCopied": "copied",
   "OnCopy": "copy",
   "OnCopyCells": "copyCells",
   "OnDataError": "dataError",
   "OnDataGet": "dataGet",
   "OnDataSend": "dataSend",
   "OnDblClick": "dblClick",
   "OnDelete": "delete",
   "OnDeleted": "deleted",
   "OnDeleting": "deleting",
   "OnDrag": "drag",
   "OnDragCell": "dragCell",
   "OnDragging": "dragging",
   "OnDrop": "drop",
   "OnDropCell": "dropCell",
   "OnDropFile": "dropFile",
   "OnDropFileError": "dropFileError",
   "OnDropped": "dropped",
   "OnEditChange": "editChange",
   "OnEndDrag": "endDrag",
   "OnEndedEdit": "endedEdit",
   "OnEndEdit": "endEdit",
   "OnEndResize": "endResize",
   "OnExport": "export",
   "OnExported": "exported",
   "OnFilter": "filter",
   "OnFiltered": "filtered",
   "OnFilterChanged": "filterChanged",
   "OnFixedScroll": "fixedScroll",
   "OnFocus": "focus",
   "OnFocused": "focused",
   "OnGenerateId": "generateId",
   "OnGetAttr": "getAttr",
   "OnGetDA": "getDA",
   "OnGetFormula": "getFormula",
   "OnGetGroupD": "getGroupD",
   "OnGetGroupString": "getGroupString",
   "OnGetMenuCustom": "getMenuCustom",
   "OnGetName": "getName",
   "OnGetNumber": "getNumber",
   "OnGetRange": "getRange",
   "OnGetSortString": "getSortString",
   "OnGetString": "getString",
   "OnGetValue": "getValue",
   "OnGroup": "group",
   "OnGrouped": "grouped",
   "OnHid": "hid",
   "OnHide": "hide",
   "OnHideGrid": "hideGrid",
   "OnHideTip": "hideTip",
   "OnHideTool": "hideTool",
   "OnHideToolbar": "hideToolbar",
   "OnHidGrid": "hidGrid",
   "OnImportData": "importData",
   "OnImportDataError": "importDataError",
   "OnImportedData": "importedData",
   "OnImportingData": "importingData",
   "OnIndent": "indent",
   "OnIndented": "indented",
   "OnInit": "init",
   "OnInitialized": "initialized",
   "OnKeyDown": "keyDown",
   "OnLoad": "load",
   "OnLoadCookie": "loadCookie",
   "OnLoadData": "loadData",
   "OnLoaded": "loaded",
   "OnLoadedCookie": "loadedCookie",
   "OnLoadedData": "loadedData",
   "OnLoadedChildren": "loadedChildren",
   "OnLoadedMenu": "loadedMenu",
   "OnLoadError": "loadError",
   "OnLoadChildren": "loadChildren",
   "OnLoadMenu": "loadMenu",
   "OnOpenImage": "openImage",
   "OnPaint": "paint",
   "OnPainted": "painted",
   "OnPaste": "paste",
   "OnPasteAdded": "pasteAdded",
   "OnPasteCells": "pasteCells",
   "OnPasted": "pasted",
   "OnPdf": "pdf",
   "OnPdfSend": "pdfSend",
   "OnPivotCreate": "pivotCreate",
   "OnPivotCreated": "pivotCreated",
   "OnPrint": "print",
   "OnPrintCreate": "printCreate",
   "OnPrinted": "printed",
   "OnReady": "ready",
   "OnReadyAnimate": "readyAnimate",
   "OnRemovedTool": "removedTool",
   "OnRemovedToolbar": "removedToolbar",
   "OnRemoveTool": "removeTool",
   "OnRemoveToolbar": "removeToolbar",
   "OnRender": "render",
   "OnResetCookie": "resetCookie",
   "OnResize": "resize",
   "OnReversedTree": "reversedTree",
   "OnSave": "save",
   "OnSaveAccept": "saveAccept",
   "OnSaveCookie": "saveCookie",
   "OnSaveCookieError": "saveCookieError",
   "OnSaved": "saved",
   "OnSavedCookie": "savedCookie",
   "OnSaveError": "saveError",
   "OnSaveChanged": "saveChanged",
   "OnSaveXlsxError": "saveXlsxError",
   "OnScroll": "scroll",
   "OnSearch": "search",
   "OnSelect": "select",
   "OnSelectAll": "selectAll",
   "OnSelected": "selected",
   "OnSelectedAll": "selectedAll",
   "OnSetAttr": "setAttr",
   "OnSetFormula": "setFormula",
   "OnSetLanguage": "setLanguage",
   "OnSetMenuCustom": "setMenuCustom",
   "OnSetReversedTree": "setReversedTree",
   "OnSetString": "setString",
   "OnSetStyle": "setStyle",
   "OnSetValue": "setValue",
   "OnShowCalendar": "showCalendar",
   "OnShowedCalendar": "showedCalendar",
   "OnShowedGrid": "showedGrid",
   "OnShowedList": "showedList",
   "OnShowedMenu": "showedMenu",
   "OnShowedSuggest": "showedSuggest",
   "OnShowGrid": "showGrid",
   "OnShowImageLink": "showImageLink",
   "OnShowLink": "showLink",
   "OnShowList": "showList",
   "OnShowMenu": "showMenu",
   "OnShowSuggest": "showSuggest",
   "OnShowTip": "showTip",
   "OnSort": "sort",
   "OnSorted": "sorted",
   "OnStartDrag": "startDrag",
   "OnStartedEdit": "startedEdit",
   "OnStartEdit": "startEdit",
   "OnStartResize": "startResize",
   "OnStatic": "static",
   "OnTag": "tag",
   "OnTestAdd": "testAdd",
   "OnTestFilter": "testFilter",
   "OnToolbarCells": "toolbarCells",
   "OnUpdated": "updated",
   "OnValidate": "validate"
};

export const FASTGRID_EVENT_PAYLOAD_FACTORIES: Readonly<Record<string,(args:any[])=>any>> = {
   "OnAccept": (args:any[]) => ({ grid:args[0], value:args[1], parent:args[2], parentrow:args[3], parentcol:args[4], dialog:args[5] }) as FastGridAcceptEvent,
   "OnAdd": (args:any[]) => ({ grid:args[0], items:args[1], parent:args[2], next:args[3], action:args[4], copytype:args[5], cols:args[6] }) as FastGridAddEvent,
   "OnAddData": (args:any[]) => ({ grid:args[0], data:args[1] }) as FastGridAddDataEvent,
   "OnAdded": (args:any[]) => ({ grid:args[0], items:args[1], parent:args[2], next:args[3], action:args[4], copytype:args[5], sources:args[6] }) as FastGridAddedEvent,
   "OnAddedTool": (args:any[]) => ({ grid:args[0], cell:args[1], toolbar:args[2], next:args[3], copy:args[4] }) as FastGridAddedToolEvent,
   "OnAddedToolbar": (args:any[]) => ({ grid:args[0], toolbar:args[1], next:args[2], copy:args[3], all:args[4] }) as FastGridAddedToolbarEvent,
   "OnAddImage": (args:any[]) => ({ grid:args[0], image:args[1], drop:args[2] }) as FastGridAddImageEvent,
   "OnAddTool": (args:any[]) => ({ grid:args[0], cell:args[1], toolbar:args[2], next:args[3], copy:args[4] }) as FastGridAddToolEvent,
   "OnAddToolbar": (args:any[]) => ({ grid:args[0], toolbar:args[1], next:args[2], copy:args[3], all:args[4] }) as FastGridAddToolbarEvent,
   "OnAfterSetAttr": (args:any[]) => ({ grid:args[0], row:args[1], col:args[2], value:args[3], changes:args[4] }) as FastGridAfterSetAttrEvent,
   "OnAfterSetFormula": (args:any[]) => ({ grid:args[0], row:args[1], col:args[2], formula:args[3], changes:args[4] }) as FastGridAfterSetFormulaEvent,
   "OnAfterSetValue": (args:any[]) => ({ grid:args[0], row:args[1], col:args[2], value:args[3], oldvalue:args[4], changes:args[5] }) as FastGridAfterSetValueEvent,
   "OnAIGetDynamicInstructions": (args:any[]) => ({ grid:args[0], instructions:args[1] }) as FastGridAIGetDynamicInstructionsEvent,
   "OnAIGetGeneralInstructions": (args:any[]) => ({ grid:args[0], instructions:args[1] }) as FastGridAIGetGeneralInstructionsEvent,
   "OnAIGetStaticInstructions": (args:any[]) => ({ grid:args[0], instructions:args[1] }) as FastGridAIGetStaticInstructionsEvent,
   "OnAppliedMedia": (args:any[]) => ({ grid:args[0], media:args[1], apply:args[2] }) as FastGridAppliedMediaEvent,
   "OnApplyMedia": (args:any[]) => ({ grid:args[0], media:args[1], apply:args[2] }) as FastGridApplyMediaEvent,
   "OnAutoFill": (args:any[]) => ({ grid:args[0], values:args[1], attrs:args[2], rows:args[3], cols:args[4], orcnt:args[5], occnt:args[6], rcnt:args[7], ccnt:args[8], rdir:args[9], cdir:args[10] }) as FastGridAutoFillEvent,
   "OnAutoFilled": (args:any[]) => ({ grid:args[0], r1:args[1], c1:args[2], r2:args[3], c2:args[4], rdir:args[5], cdir:args[6], ro:args[7], co:args[8] }) as FastGridAutoFilledEvent,
   "OnClick": (args:any[]) => ({ grid:args[0], row:args[1], col:args[2], x:args[3], y:args[4], event:args[5], prefix:args[6] }) as FastGridClickEvent,
   "OnClose": (args:any[]) => ({ grid:args[0], value:args[1], parent:args[2], parentrow:args[3], parentcol:args[4], dialog:args[5] }) as FastGridCloseEvent,
   "OnCollapse": (args:any[]) => ({ grid:args[0], items:args[1], collapse:args[2], all:args[3], test:args[4] }) as FastGridCollapseEvent,
   "OnCollapsed": (args:any[]) => ({ grid:args[0], items:args[1], exp:args[2], all:args[3] }) as FastGridCollapsedEvent,
   "OnCopied": (args:any[]) => ({ grid:args[0], text:args[1], html:args[2], event:args[3] }) as FastGridCopiedEvent,
   "OnCopy": (args:any[]) => ({ grid:args[0], cut:args[1], event:args[2] }) as FastGridCopyEvent,
   "OnCopyCells": (args:any[]) => ({ grid:args[0], rows:args[1], cols:args[2] }) as FastGridCopyCellsEvent,
   "OnDataError": (args:any[]) => ({ grid:args[0], data:args[1] }) as FastGridDataErrorEvent,
   "OnDataGet": (args:any[]) => ({ grid:args[0], source:args[1], data:args[2], index:args[3] }) as FastGridDataGetEvent,
   "OnDataSend": (args:any[]) => ({ grid:args[0], source:args[1], func:args[2], index:args[3] }) as FastGridDataSendEvent,
   "OnDblClick": (args:any[]) => ({ grid:args[0], row:args[1], col:args[2], x:args[3], y:args[4], event:args[5], prefix:args[6] }) as FastGridDblClickEvent,
   "OnDelete": (args:any[]) => ({ grid:args[0], items:args[1], del:args[2], test:args[3] }) as FastGridDeleteEvent,
   "OnDeleted": (args:any[]) => ({ grid:args[0], items:args[1], del:args[2] }) as FastGridDeletedEvent,
   "OnDeleting": (args:any[]) => ({ grid:args[0], items:args[1], del:args[2] }) as FastGridDeletingEvent,
   "OnDrag": (args:any[]) => ({ grid:args[0], row:args[1], col:args[2], x:args[3], y:args[4], event:args[5], prefix:args[6] }) as FastGridDragEvent,
   "OnDragCell": (args:any[]) => ({ grid:args[0], row:args[1], col:args[2], togrid:args[3], torow:args[4], tocol:args[5], event:args[6], ghost:args[7], start:args[8] }) as FastGridDragCellEvent,
   "OnDragging": (args:any[]) => ({ grid:args[0], src:args[1], to:args[2], type:args[3], action:args[4], options:args[5], event:args[6], mouseevent:args[7] }) as FastGridDraggingEvent,
   "OnDrop": (args:any[]) => ({ grid:args[0], src:args[1], to:args[2], type:args[3], action:args[4], options:args[5], event:args[6], mouseevent:args[7] }) as FastGridDropEvent,
   "OnDropCell": (args:any[]) => ({ grid:args[0], row:args[1], col:args[2], togrid:args[3], torow:args[4], tocol:args[5], event:args[6] }) as FastGridDropCellEvent,
   "OnDropFile": (args:any[]) => ({ grid:args[0], row:args[1], col:args[2], files:args[3] }) as FastGridDropFileEvent,
   "OnDropFileError": (args:any[]) => ({ grid:args[0], row:args[1], col:args[2], files:args[3] }) as FastGridDropFileErrorEvent,
   "OnDropped": (args:any[]) => ({ grid:args[0], src:args[1], to:args[2], type:args[3], action:args[4], options:args[5], event:args[6], mouseevent:args[7] }) as FastGridDroppedEvent,
   "OnEditChange": (args:any[]) => ({ grid:args[0], row:args[1], col:args[2], value:args[3], oldvalue:args[4], correct:args[5] }) as FastGridEditChangeEvent,
   "OnEndDrag": (args:any[]) => ({ grid:args[0], src:args[1], items:args[2], action:args[3] }) as FastGridEndDragEvent,
   "OnEndedEdit": (args:any[]) => ({ grid:args[0], row:args[1], col:args[2], value:args[3], save:args[4] }) as FastGridEndedEditEvent,
   "OnEndEdit": (args:any[]) => ({ grid:args[0], row:args[1], col:args[2], value:args[3], save:args[4] }) as FastGridEndEditEvent,
   "OnEndResize": (args:any[]) => ({ grid:args[0], src:args[1], size:args[2], origsize:args[3] }) as FastGridEndResizeEvent,
   "OnExport": (args:any[]) => ({ grid:args[0], test:args[1] }) as FastGridExportEvent,
   "OnExported": (args:any[]) => ({ grid:args[0], data:args[1] }) as FastGridExportedEvent,
   "OnFilter": (args:any[]) => ({ grid:args[0], part:args[1] }) as FastGridFilterEvent,
   "OnFiltered": (args:any[]) => ({ grid:args[0], part:args[1] }) as FastGridFilteredEvent,
   "OnFilterChanged": (args:any[]) => ({ grid:args[0], filter:args[1] }) as FastGridFilterChangedEvent,
   "OnFixedScroll": (args:any[]) => ({ grid:args[0], row:args[1], change:args[2] }) as FastGridFixedScrollEvent,
   "OnFocus": (args:any[]) => ({ grid:args[0], row:args[1], col:args[2], rect:args[3], action:args[4], drag:args[5], test:args[6] }) as FastGridFocusEvent,
   "OnFocused": (args:any[]) => ({ grid:args[0], drag:args[1] }) as FastGridFocusedEvent,
   "OnGenerateId": (args:any[]) => ({ grid:args[0], item:args[1], id:args[2], type:args[3] }) as FastGridGenerateIdEvent,
   "OnGetAttr": (args:any[]) => ({ grid:args[0], row:args[1], col:args[2], attr:args[3], value:args[4], direct:args[5] }) as FastGridGetAttrEvent,
   "OnGetDA": (args:any[]) => ({ grid:args[0], row:args[1], col:args[2], dA:args[3] }) as FastGridGetDAEvent,
   "OnGetFormula": (args:any[]) => ({ grid:args[0], row:args[1], col:args[2], formula:args[3], edit:args[4] }) as FastGridGetFormulaEvent,
   "OnGetGroupD": (args:any[]) => ({ grid:args[0], groupcol:args[1], group:args[2], first:args[3] }) as FastGridGetGroupDEvent,
   "OnGetGroupString": (args:any[]) => ({ grid:args[0], str:args[1] }) as FastGridGetGroupStringEvent,
   "OnGetMenuCustom": (args:any[]) => ({ grid:args[0], itemid:args[1], menuname:args[2] }) as FastGridGetMenuCustomEvent,
   "OnGetName": (args:any[]) => ({ grid:args[0], item:args[1], name:args[2] }) as FastGridGetNameEvent,
   "OnGetNumber": (args:any[]) => ({ grid:args[0], row:args[1], col:args[2], value:args[3], rawvalue:args[4], ret:args[5], def:args[6] }) as FastGridGetNumberEvent,
   "OnGetRange": (args:any[]) => ({ grid:args[0], row:args[1], col:args[2], value:args[3], rawvalue:args[4], ret:args[5], def:args[6] }) as FastGridGetRangeEvent,
   "OnGetSortString": (args:any[]) => ({ grid:args[0], str:args[1] }) as FastGridGetSortStringEvent,
   "OnGetString": (args:any[]) => ({ grid:args[0], row:args[1], col:args[2], value:args[3], rawvalue:args[4], src:args[5], out:args[6] }) as FastGridGetStringEvent,
   "OnGetValue": (args:any[]) => ({ grid:args[0], row:args[1], col:args[2], value:args[3], direct:args[4] }) as FastGridGetValueEvent,
   "OnGroup": (args:any[]) => ({ grid:args[0], part:args[1], group:args[2], oldgroup:args[3] }) as FastGridGroupEvent,
   "OnGrouped": (args:any[]) => ({ grid:args[0], part:args[1], group:args[2], oldgroup:args[3], oldtree:args[4] }) as FastGridGroupedEvent,
   "OnHid": (args:any[]) => ({ grid:args[0], items:args[1], hide:args[2] }) as FastGridHidEvent,
   "OnHide": (args:any[]) => ({ grid:args[0], items:args[1], hide:args[2], test:args[3] }) as FastGridHideEvent,
   "OnHideGrid": (args:any[]) => ({ grid:args[0], clearhtml:args[1], force:args[2] }) as FastGridHideGridEvent,
   "OnHideTip": (args:any[]) => ({ grid:args[0], tip:args[1] }) as FastGridHideTipEvent,
   "OnHideTool": (args:any[]) => ({ grid:args[0], cell:args[1], hide:args[2], test:args[3] }) as FastGridHideToolEvent,
   "OnHideToolbar": (args:any[]) => ({ grid:args[0], toolbar:args[1], hide:args[2], test:args[3] }) as FastGridHideToolbarEvent,
   "OnHidGrid": (args:any[]) => ({ grid:args[0], clearhtml:args[1] }) as FastGridHidGridEvent,
   "OnImportData": (args:any[]) => ({ grid:args[0], files:args[1], type:args[2] }) as FastGridImportDataEvent,
   "OnImportDataError": (args:any[]) => ({ grid:args[0], files:args[1], errors:args[2] }) as FastGridImportDataErrorEvent,
   "OnImportedData": (args:any[]) => ({ grid:args[0], files:args[1], errors:args[2] }) as FastGridImportedDataEvent,
   "OnImportingData": (args:any[]) => ({ grid:args[0], data:args[1], files:args[2], errors:args[3], type:args[4] }) as FastGridImportingDataEvent,
   "OnIndent": (args:any[]) => ({ grid:args[0], items:args[1], level:args[2], test:args[3] }) as FastGridIndentEvent,
   "OnIndented": (args:any[]) => ({ grid:args[0], items:args[1], level:args[2] }) as FastGridIndentedEvent,
   "OnInit": (args:any[]) => ({ grid:args[0] }) as FastGridInitEvent,
   "OnInitialized": (args:any[]) => ({ grid:args[0] }) as FastGridInitializedEvent,
   "OnKeyDown": (args:any[]) => ({ grid:args[0], key:args[1], event:args[2], name:args[3], prefix:args[4] }) as FastGridKeyDownEvent,
   "OnLoad": (args:any[]) => ({ grid:args[0], counter:args[1] }) as FastGridLoadEvent,
   "OnLoadCookie": (args:any[]) => ({ grid:args[0], data:args[1], id:args[2], date:args[3], version:args[4] }) as FastGridLoadCookieEvent,
   "OnLoadData": (args:any[]) => ({ grid:args[0], src:args[1], onfinish:args[2] }) as FastGridLoadDataEvent,
   "OnLoaded": (args:any[]) => ({ grid:args[0] }) as FastGridLoadedEvent,
   "OnLoadedCookie": (args:any[]) => ({ grid:args[0], data:args[1], id:args[2], date:args[3], version:args[4] }) as FastGridLoadedCookieEvent,
   "OnLoadedData": (args:any[]) => ({ grid:args[0] }) as FastGridLoadedDataEvent,
   "OnLoadedChildren": (args:any[]) => ({ grid:args[0], rows:args[1] }) as FastGridLoadedChildrenEvent,
   "OnLoadedMenu": (args:any[]) => ({ grid:args[0], row:args[1], col:args[2] }) as FastGridLoadedMenuEvent,
   "OnLoadError": (args:any[]) => ({ grid:args[0], source:args[1], code:args[2], message:args[3], index:args[4] }) as FastGridLoadErrorEvent,
   "OnLoadChildren": (args:any[]) => ({ grid:args[0], rows:args[1], source:args[2] }) as FastGridLoadChildrenEvent,
   "OnLoadMenu": (args:any[]) => ({ grid:args[0], row:args[1], col:args[2], sourc:args[3] }) as FastGridLoadMenuEvent,
   "OnOpenImage": (args:any[]) => ({ grid:args[0], row:args[1], col:args[2], test:args[3] }) as FastGridOpenImageEvent,
   "OnPaint": (args:any[]) => ({ grid:args[0] }) as FastGridPaintEvent,
   "OnPainted": (args:any[]) => ({ grid:args[0] }) as FastGridPaintedEvent,
   "OnPaste": (args:any[]) => ({ grid:args[0], txt:args[1], sourcerows:args[2], sourcecols:args[3], focus:args[4], single:args[5] }) as FastGridPasteEvent,
   "OnPasteAdded": (args:any[]) => ({ grid:args[0], rows:args[1], cols:args[2], values:args[3], sourcerows:args[4], sourcecols:args[5], addedrows:args[6], addedcols:args[7] }) as FastGridPasteAddedEvent,
   "OnPasteCells": (args:any[]) => ({ grid:args[0], rows:args[1], cols:args[2], values:args[3], sourcerows:args[4], sourcecols:args[5] }) as FastGridPasteCellsEvent,
   "OnPasted": (args:any[]) => ({ grid:args[0], rows:args[1], cols:args[2], values:args[3], sourcerows:args[4], sourcecols:args[5], addedrows:args[6], addedcols:args[7] }) as FastGridPastedEvent,
   "OnPdf": (args:any[]) => ({ grid:args[0] }) as FastGridPdfEvent,
   "OnPdfSend": (args:any[]) => ({ grid:args[0], form:args[1] }) as FastGridPdfSendEvent,
   "OnPivotCreate": (args:any[]) => ({ pivot:args[0], source:args[1], rows:args[2], cols:args[3], data:args[4], part:args[5], show:args[6] }) as FastGridPivotCreateEvent,
   "OnPivotCreated": (args:any[]) => ({ pivot:args[0], source:args[1], rows:args[2], cols:args[3], data:args[4], part:args[5], show:args[6] }) as FastGridPivotCreatedEvent,
   "OnPrint": (args:any[]) => ({ grid:args[0] }) as FastGridPrintEvent,
   "OnPrintCreate": (args:any[]) => ({ grid:args[0] }) as FastGridPrintCreateEvent,
   "OnPrinted": (args:any[]) => ({ grid:args[0], cancelled:args[1] }) as FastGridPrintedEvent,
   "OnReady": (args:any[]) => ({ grid:args[0], first:args[1] }) as FastGridReadyEvent,
   "OnReadyAnimate": (args:any[]) => ({ grid:args[0] }) as FastGridReadyAnimateEvent,
   "OnRemovedTool": (args:any[]) => ({ grid:args[0], cell:args[1] }) as FastGridRemovedToolEvent,
   "OnRemovedToolbar": (args:any[]) => ({ grid:args[0], toolbar:args[1] }) as FastGridRemovedToolbarEvent,
   "OnRemoveTool": (args:any[]) => ({ grid:args[0], cell:args[1] }) as FastGridRemoveToolEvent,
   "OnRemoveToolbar": (args:any[]) => ({ grid:args[0], toolbar:args[1] }) as FastGridRemoveToolbarEvent,
   "OnRender": (args:any[]) => ({ grid:args[0], type:args[1] }) as FastGridRenderEvent,
   "OnResetCookie": (args:any[]) => ({ grid:args[0], id:args[1] }) as FastGridResetCookieEvent,
   "OnResize": (args:any[]) => ({ grid:args[0], src:args[1], size:args[2], origsize:args[3], prevsize:args[4] }) as FastGridResizeEvent,
   "OnReversedTree": (args:any[]) => ({ grid:args[0], changed:args[1] }) as FastGridReversedTreeEvent,
   "OnSave": (args:any[]) => ({ grid:args[0], source:args[1], grids:args[2] }) as FastGridSaveEvent,
   "OnSaveAccept": (args:any[]) => ({ grid:args[0], source:args[1], data:args[2], grids:args[3] }) as FastGridSaveAcceptEvent,
   "OnSaveCookie": (args:any[]) => ({ grid:args[0], data:args[1], id:args[2], date:args[3], version:args[4], action:args[5] }) as FastGridSaveCookieEvent,
   "OnSaveCookieError": (args:any[]) => ({ grid:args[0], source:args[1], code:args[2], message:args[3] }) as FastGridSaveCookieErrorEvent,
   "OnSaved": (args:any[]) => ({ grid:args[0], source:args[1], grids:args[2] }) as FastGridSavedEvent,
   "OnSavedCookie": (args:any[]) => ({ grid:args[0], data:args[1], id:args[2], date:args[3], version:args[4], action:args[5] }) as FastGridSavedCookieEvent,
   "OnSaveError": (args:any[]) => ({ grid:args[0], source:args[1], code:args[2], message:args[3], grids:args[4] }) as FastGridSaveErrorEvent,
   "OnSaveChanged": (args:any[]) => ({ grid:args[0], item:args[1], data:args[2] }) as FastGridSaveChangedEvent,
   "OnSaveXlsxError": (args:any[]) => ({ grid:args[0], source:args[1], grids:args[2] }) as FastGridSaveXlsxErrorEvent,
   "OnScroll": (args:any[]) => ({ grid:args[0], rowpart:args[1], top:args[2], oldtop:args[3], colpart:args[4], leftp:args[5], oldleft:args[6] }) as FastGridScrollEvent,
   "OnSearch": (args:any[]) => ({ grid:args[0], row:args[1], col:args[2], value:args[3], type:args[4], texts:args[5], numbers:args[6], results:args[7] }) as FastGridSearchEvent,
   "OnSelect": (args:any[]) => ({ grid:args[0], items:args[1], sel:args[2], test:args[3] }) as FastGridSelectEvent,
   "OnSelectAll": (args:any[]) => ({ grid:args[0], sel:args[1], test:args[2] }) as FastGridSelectAllEvent,
   "OnSelected": (args:any[]) => ({ grid:args[0], items:args[1], sel:args[2] }) as FastGridSelectedEvent,
   "OnSelectedAll": (args:any[]) => ({ grid:args[0], newselected:args[1], oldselected:args[2], sel:args[3], test:args[4] }) as FastGridSelectedAllEvent,
   "OnSetAttr": (args:any[]) => ({ grid:args[0], row:args[1], col:args[2], attr:args[3], value:args[4], changes:args[5] }) as FastGridSetAttrEvent,
   "OnSetFormula": (args:any[]) => ({ grid:args[0], row:args[1], col:args[2], formula:args[3], changes:args[4] }) as FastGridSetFormulaEvent,
   "OnSetLanguage": (args:any[]) => ({ grid:args[0], language:args[1], oldlanguage:args[2], init:args[3] }) as FastGridSetLanguageEvent,
   "OnSetMenuCustom": (args:any[]) => ({ grid:args[0], itemid:args[1], itemvalue:args[2], menuname:args[3] }) as FastGridSetMenuCustomEvent,
   "OnSetReversedTree": (args:any[]) => ({ grid:args[0], reversedtree:args[1] }) as FastGridSetReversedTreeEvent,
   "OnSetString": (args:any[]) => ({ grid:args[0], row:args[1], col:args[2], value:args[3], stringvalue:args[4], changes:args[5], src:args[6] }) as FastGridSetStringEvent,
   "OnSetStyle": (args:any[]) => ({ grid:args[0], style:args[1], oldstyle:args[2], init:args[3] }) as FastGridSetStyleEvent,
   "OnSetValue": (args:any[]) => ({ grid:args[0], row:args[1], col:args[2], value:args[3], changes:args[4] }) as FastGridSetValueEvent,
   "OnShowCalendar": (args:any[]) => ({ grid:args[0], row:args[1], col:args[2], calendar:args[3] }) as FastGridShowCalendarEvent,
   "OnShowedCalendar": (args:any[]) => ({ grid:args[0], row:args[1], col:args[2], calendargrid:args[3] }) as FastGridShowedCalendarEvent,
   "OnShowedGrid": (args:any[]) => ({ grid:args[0] }) as FastGridShowedGridEvent,
   "OnShowedList": (args:any[]) => ({ grid:args[0], row:args[1], col:args[2], menugrid:args[3] }) as FastGridShowedListEvent,
   "OnShowedMenu": (args:any[]) => ({ grid:args[0], row:args[1], col:args[2], menugrid:args[3] }) as FastGridShowedMenuEvent,
   "OnShowedSuggest": (args:any[]) => ({ grid:args[0], row:args[1], col:args[2], menugrid:args[3], formula:args[4] }) as FastGridShowedSuggestEvent,
   "OnShowGrid": (args:any[]) => ({ grid:args[0], clearhtml:args[1] }) as FastGridShowGridEvent,
   "OnShowImageLink": (args:any[]) => ({ grid:args[0], index:args[1], href:args[2], target:args[3] }) as FastGridShowImageLinkEvent,
   "OnShowLink": (args:any[]) => ({ grid:args[0], row:args[1], col:args[2], href:args[3], target:args[4] }) as FastGridShowLinkEvent,
   "OnShowList": (args:any[]) => ({ grid:args[0], row:args[1], col:args[2], menu:args[3] }) as FastGridShowListEvent,
   "OnShowMenu": (args:any[]) => ({ grid:args[0], row:args[1], col:args[2], menu:args[3] }) as FastGridShowMenuEvent,
   "OnShowSuggest": (args:any[]) => ({ grid:args[0], row:args[1], col:args[2], menu:args[3], formula:args[4] }) as FastGridShowSuggestEvent,
   "OnShowTip": (args:any[]) => ({ grid:args[0], row:args[1], col:args[2], tip:args[3] }) as FastGridShowTipEvent,
   "OnSort": (args:any[]) => ({ grid:args[0], part:args[1], sort:args[2] }) as FastGridSortEvent,
   "OnSorted": (args:any[]) => ({ grid:args[0], part:args[1], group:args[2], oldgroup:args[3], first:args[4], last:args[5] }) as FastGridSortedEvent,
   "OnStartDrag": (args:any[]) => ({ grid:args[0], src:args[1], actions:args[2], options:args[3] }) as FastGridStartDragEvent,
   "OnStartedEdit": (args:any[]) => ({ grid:args[0], row:args[1], col:args[2] }) as FastGridStartedEditEvent,
   "OnStartEdit": (args:any[]) => ({ grid:args[0], row:args[1], col:args[2], value:args[3], test:args[4] }) as FastGridStartEditEvent,
   "OnStartResize": (args:any[]) => ({ grid:args[0], src:args[1], size:args[2] }) as FastGridStartResizeEvent,
   "OnStatic": (args:any[]) => ({ grid:args[0], row:args[1], col:args[2], tag:args[3], _new:args[4] }) as FastGridStaticEvent,
   "OnTag": (args:any[]) => ({ grid:args[0], tag:args[1] }) as FastGridTagEvent,
   "OnTestAdd": (args:any[]) => ({ grid:args[0], items:args[1], parent:args[2], next:args[3], action:args[4], copytype:args[5], cols:args[6], test:args[7] }) as FastGridTestAddEvent,
   "OnTestFilter": (args:any[]) => ({ grid:args[0], item:args[1], ok:args[2] }) as FastGridTestFilterEvent,
   "OnToolbarCells": (args:any[]) => ({ grid:args[0], toolbar:args[1] }) as FastGridToolbarCellsEvent,
   "OnUpdated": (args:any[]) => ({ grid:args[0] }) as FastGridUpdatedEvent,
   "OnValidate": (args:any[]) => ({ grid:args[0], row:args[1], col:args[2], value:args[3], error:args[4], edit:args[5] }) as FastGridValidateEvent
};

@Directive({ standalone:true })

export abstract class FastGridEventBindings {
   protected abstract requireGrid() : TGrid;

   @Input() onAccept?: TFGrid["OnAccept"];
   @Input() onAdd?: TFGrid["OnAdd"];
   @Input() onAddData?: TFGrid["OnAddData"];
   @Input() onAdded?: TFGrid["OnAdded"];
   @Input() onAddedTool?: TFGrid["OnAddedTool"];
   @Input() onAddedToolbar?: TFGrid["OnAddedToolbar"];
   @Input() onAddImage?: TFGrid["OnAddImage"];
   @Input() onAddTool?: TFGrid["OnAddTool"];
   @Input() onAddToolbar?: TFGrid["OnAddToolbar"];
   @Input() onAfterSetAttr?: TFGrid["OnAfterSetAttr"];
   @Input() onAfterSetFormula?: TFGrid["OnAfterSetFormula"];
   @Input() onAfterSetValue?: TFGrid["OnAfterSetValue"];
   @Input() onAIGetDynamicInstructions?: TFGrid["OnAIGetDynamicInstructions"];
   @Input() onAIGetGeneralInstructions?: TFGrid["OnAIGetGeneralInstructions"];
   @Input() onAIGetStaticInstructions?: TFGrid["OnAIGetStaticInstructions"];
   @Input() onAppliedMedia?: TFGrid["OnAppliedMedia"];
   @Input() onApplyMedia?: TFGrid["OnApplyMedia"];
   @Input() onAutoFill?: TFGrid["OnAutoFill"];
   @Input() onAutoFilled?: TFGrid["OnAutoFilled"];
   @Input() onClick?: TFGrid["OnClick"];
   @Input() onClose?: TFGrid["OnClose"];
   @Input() onCollapse?: TFGrid["OnCollapse"];
   @Input() onCollapsed?: TFGrid["OnCollapsed"];
   @Input() onCopied?: TFGrid["OnCopied"];
   @Input() onCopy?: TFGrid["OnCopy"];
   @Input() onCopyCells?: TFGrid["OnCopyCells"];
   @Input() onDataError?: TFGrid["OnDataError"];
   @Input() onDataGet?: TFGrid["OnDataGet"];
   @Input() onDataSend?: TFGrid["OnDataSend"];
   @Input() onDblClick?: TFGrid["OnDblClick"];
   @Input() onDelete?: TFGrid["OnDelete"];
   @Input() onDeleted?: TFGrid["OnDeleted"];
   @Input() onDeleting?: TFGrid["OnDeleting"];
   @Input() onDrag?: TFGrid["OnDrag"];
   @Input() onDragCell?: TFGrid["OnDragCell"];
   @Input() onDragging?: TFGrid["OnDragging"];
   @Input() onDrop?: TFGrid["OnDrop"];
   @Input() onDropCell?: TFGrid["OnDropCell"];
   @Input() onDropFile?: TFGrid["OnDropFile"];
   @Input() onDropFileError?: TFGrid["OnDropFileError"];
   @Input() onDropped?: TFGrid["OnDropped"];
   @Input() onEditChange?: TFGrid["OnEditChange"];
   @Input() onEndDrag?: TFGrid["OnEndDrag"];
   @Input() onEndedEdit?: TFGrid["OnEndedEdit"];
   @Input() onEndEdit?: TFGrid["OnEndEdit"];
   @Input() onEndResize?: TFGrid["OnEndResize"];
   @Input() onExport?: TFGrid["OnExport"];
   @Input() onExported?: TFGrid["OnExported"];
   @Input() onFilter?: TFGrid["OnFilter"];
   @Input() onFiltered?: TFGrid["OnFiltered"];
   @Input() onFilterChanged?: TFGrid["OnFilterChanged"];
   @Input() onFixedScroll?: TFGrid["OnFixedScroll"];
   @Input() onFocus?: TFGrid["OnFocus"];
   @Input() onFocused?: TFGrid["OnFocused"];
   @Input() onGenerateId?: TFGrid["OnGenerateId"];
   @Input() onGetAttr?: TFGrid["OnGetAttr"];
   @Input() onGetDA?: TFGrid["OnGetDA"];
   @Input() onGetFormula?: TFGrid["OnGetFormula"];
   @Input() onGetGroupD?: TFGrid["OnGetGroupD"];
   @Input() onGetGroupString?: TFGrid["OnGetGroupString"];
   @Input() onGetMenuCustom?: TFGrid["OnGetMenuCustom"];
   @Input() onGetName?: TFGrid["OnGetName"];
   @Input() onGetNumber?: TFGrid["OnGetNumber"];
   @Input() onGetRange?: TFGrid["OnGetRange"];
   @Input() onGetSortString?: TFGrid["OnGetSortString"];
   @Input() onGetString?: TFGrid["OnGetString"];
   @Input() onGetValue?: TFGrid["OnGetValue"];
   @Input() onGroup?: TFGrid["OnGroup"];
   @Input() onGrouped?: TFGrid["OnGrouped"];
   @Input() onHid?: TFGrid["OnHid"];
   @Input() onHide?: TFGrid["OnHide"];
   @Input() onHideGrid?: TFGrid["OnHideGrid"];
   @Input() onHideTip?: TFGrid["OnHideTip"];
   @Input() onHideTool?: TFGrid["OnHideTool"];
   @Input() onHideToolbar?: TFGrid["OnHideToolbar"];
   @Input() onHidGrid?: TFGrid["OnHidGrid"];
   @Input() onImportData?: TFGrid["OnImportData"];
   @Input() onImportDataError?: TFGrid["OnImportDataError"];
   @Input() onImportedData?: TFGrid["OnImportedData"];
   @Input() onImportingData?: TFGrid["OnImportingData"];
   @Input() onIndent?: TFGrid["OnIndent"];
   @Input() onIndented?: TFGrid["OnIndented"];
   @Input() onInit?: TFGrid["OnInit"];
   @Input() onInitialized?: TFGrid["OnInitialized"];
   @Input() onKeyDown?: TFGrid["OnKeyDown"];
   @Input() onLoad?: TFGrid["OnLoad"];
   @Input() onLoadCookie?: TFGrid["OnLoadCookie"];
   @Input() onLoadData?: TFGrid["OnLoadData"];
   @Input() onLoaded?: TFGrid["OnLoaded"];
   @Input() onLoadedCookie?: TFGrid["OnLoadedCookie"];
   @Input() onLoadedData?: TFGrid["OnLoadedData"];
   @Input() onLoadedChildren?: TFGrid["OnLoadedChildren"];
   @Input() onLoadedMenu?: TFGrid["OnLoadedMenu"];
   @Input() onLoadError?: TFGrid["OnLoadError"];
   @Input() onLoadChildren?: TFGrid["OnLoadChildren"];
   @Input() onLoadMenu?: TFGrid["OnLoadMenu"];
   @Input() onOpenImage?: TFGrid["OnOpenImage"];
   @Input() onPaint?: TFGrid["OnPaint"];
   @Input() onPainted?: TFGrid["OnPainted"];
   @Input() onPaste?: TFGrid["OnPaste"];
   @Input() onPasteAdded?: TFGrid["OnPasteAdded"];
   @Input() onPasteCells?: TFGrid["OnPasteCells"];
   @Input() onPasted?: TFGrid["OnPasted"];
   @Input() onPdf?: TFGrid["OnPdf"];
   @Input() onPdfSend?: TFGrid["OnPdfSend"];
   @Input() onPivotCreate?: TFGrid["OnPivotCreate"];
   @Input() onPivotCreated?: TFGrid["OnPivotCreated"];
   @Input() onPrint?: TFGrid["OnPrint"];
   @Input() onPrintCreate?: TFGrid["OnPrintCreate"];
   @Input() onPrinted?: TFGrid["OnPrinted"];
   @Input() onReady?: TFGrid["OnReady"];
   @Input() onReadyAnimate?: TFGrid["OnReadyAnimate"];
   @Input() onRemovedTool?: TFGrid["OnRemovedTool"];
   @Input() onRemovedToolbar?: TFGrid["OnRemovedToolbar"];
   @Input() onRemoveTool?: TFGrid["OnRemoveTool"];
   @Input() onRemoveToolbar?: TFGrid["OnRemoveToolbar"];
   @Input() onRender?: TFGrid["OnRender"];
   @Input() onResetCookie?: TFGrid["OnResetCookie"];
   @Input() onResize?: TFGrid["OnResize"];
   @Input() onReversedTree?: TFGrid["OnReversedTree"];
   @Input() onSave?: TFGrid["OnSave"];
   @Input() onSaveAccept?: TFGrid["OnSaveAccept"];
   @Input() onSaveCookie?: TFGrid["OnSaveCookie"];
   @Input() onSaveCookieError?: TFGrid["OnSaveCookieError"];
   @Input() onSaved?: TFGrid["OnSaved"];
   @Input() onSavedCookie?: TFGrid["OnSavedCookie"];
   @Input() onSaveError?: TFGrid["OnSaveError"];
   @Input() onSaveChanged?: TFGrid["OnSaveChanged"];
   @Input() onSaveXlsxError?: TFGrid["OnSaveXlsxError"];
   @Input() onScroll?: TFGrid["OnScroll"];
   @Input() onSearch?: TFGrid["OnSearch"];
   @Input() onSelect?: TFGrid["OnSelect"];
   @Input() onSelectAll?: TFGrid["OnSelectAll"];
   @Input() onSelected?: TFGrid["OnSelected"];
   @Input() onSelectedAll?: TFGrid["OnSelectedAll"];
   @Input() onSetAttr?: TFGrid["OnSetAttr"];
   @Input() onSetFormula?: TFGrid["OnSetFormula"];
   @Input() onSetLanguage?: TFGrid["OnSetLanguage"];
   @Input() onSetMenuCustom?: TFGrid["OnSetMenuCustom"];
   @Input() onSetReversedTree?: TFGrid["OnSetReversedTree"];
   @Input() onSetString?: TFGrid["OnSetString"];
   @Input() onSetStyle?: TFGrid["OnSetStyle"];
   @Input() onSetValue?: TFGrid["OnSetValue"];
   @Input() onShowCalendar?: TFGrid["OnShowCalendar"];
   @Input() onShowedCalendar?: TFGrid["OnShowedCalendar"];
   @Input() onShowedGrid?: TFGrid["OnShowedGrid"];
   @Input() onShowedList?: TFGrid["OnShowedList"];
   @Input() onShowedMenu?: TFGrid["OnShowedMenu"];
   @Input() onShowedSuggest?: TFGrid["OnShowedSuggest"];
   @Input() onShowGrid?: TFGrid["OnShowGrid"];
   @Input() onShowImageLink?: TFGrid["OnShowImageLink"];
   @Input() onShowLink?: TFGrid["OnShowLink"];
   @Input() onShowList?: TFGrid["OnShowList"];
   @Input() onShowMenu?: TFGrid["OnShowMenu"];
   @Input() onShowSuggest?: TFGrid["OnShowSuggest"];
   @Input() onShowTip?: TFGrid["OnShowTip"];
   @Input() onSort?: TFGrid["OnSort"];
   @Input() onSorted?: TFGrid["OnSorted"];
   @Input() onStartDrag?: TFGrid["OnStartDrag"];
   @Input() onStartedEdit?: TFGrid["OnStartedEdit"];
   @Input() onStartEdit?: TFGrid["OnStartEdit"];
   @Input() onStartResize?: TFGrid["OnStartResize"];
   @Input() onStatic?: TFGrid["OnStatic"];
   @Input() onTag?: TFGrid["OnTag"];
   @Input() onTestAdd?: TFGrid["OnTestAdd"];
   @Input() onTestFilter?: TFGrid["OnTestFilter"];
   @Input() onToolbarCells?: TFGrid["OnToolbarCells"];
   @Input() onUpdated?: TFGrid["OnUpdated"];
   @Input() onValidate?: TFGrid["OnValidate"];

   @Output() readonly accept = new EventEmitter<FastGridAcceptEvent>();
   @Output() readonly add = new EventEmitter<FastGridAddEvent>();
   @Output() readonly addData = new EventEmitter<FastGridAddDataEvent>();
   @Output() readonly added = new EventEmitter<FastGridAddedEvent>();
   @Output() readonly addedTool = new EventEmitter<FastGridAddedToolEvent>();
   @Output() readonly addedToolbar = new EventEmitter<FastGridAddedToolbarEvent>();
   @Output() readonly addImage = new EventEmitter<FastGridAddImageEvent>();
   @Output() readonly addTool = new EventEmitter<FastGridAddToolEvent>();
   @Output() readonly addToolbar = new EventEmitter<FastGridAddToolbarEvent>();
   @Output() readonly afterSetAttr = new EventEmitter<FastGridAfterSetAttrEvent>();
   @Output() readonly afterSetFormula = new EventEmitter<FastGridAfterSetFormulaEvent>();
   @Output() readonly afterSetValue = new EventEmitter<FastGridAfterSetValueEvent>();
   @Output() readonly aIGetDynamicInstructions = new EventEmitter<FastGridAIGetDynamicInstructionsEvent>();
   @Output() readonly aIGetGeneralInstructions = new EventEmitter<FastGridAIGetGeneralInstructionsEvent>();
   @Output() readonly aIGetStaticInstructions = new EventEmitter<FastGridAIGetStaticInstructionsEvent>();
   @Output() readonly appliedMedia = new EventEmitter<FastGridAppliedMediaEvent>();
   @Output() readonly applyMedia = new EventEmitter<FastGridApplyMediaEvent>();
   @Output() readonly autoFill = new EventEmitter<FastGridAutoFillEvent>();
   @Output() readonly autoFilled = new EventEmitter<FastGridAutoFilledEvent>();
   @Output() readonly click = new EventEmitter<FastGridClickEvent>();
   @Output() readonly close = new EventEmitter<FastGridCloseEvent>();
   @Output() readonly collapse = new EventEmitter<FastGridCollapseEvent>();
   @Output() readonly collapsed = new EventEmitter<FastGridCollapsedEvent>();
   @Output() readonly copied = new EventEmitter<FastGridCopiedEvent>();
   @Output() readonly copy = new EventEmitter<FastGridCopyEvent>();
   @Output() readonly copyCells = new EventEmitter<FastGridCopyCellsEvent>();
   @Output() readonly dataError = new EventEmitter<FastGridDataErrorEvent>();
   @Output() readonly dataGet = new EventEmitter<FastGridDataGetEvent>();
   @Output() readonly dataSend = new EventEmitter<FastGridDataSendEvent>();
   @Output() readonly dblClick = new EventEmitter<FastGridDblClickEvent>();
   @Output() readonly delete = new EventEmitter<FastGridDeleteEvent>();
   @Output() readonly deleted = new EventEmitter<FastGridDeletedEvent>();
   @Output() readonly deleting = new EventEmitter<FastGridDeletingEvent>();
   @Output() readonly drag = new EventEmitter<FastGridDragEvent>();
   @Output() readonly dragCell = new EventEmitter<FastGridDragCellEvent>();
   @Output() readonly dragging = new EventEmitter<FastGridDraggingEvent>();
   @Output() readonly drop = new EventEmitter<FastGridDropEvent>();
   @Output() readonly dropCell = new EventEmitter<FastGridDropCellEvent>();
   @Output() readonly dropFile = new EventEmitter<FastGridDropFileEvent>();
   @Output() readonly dropFileError = new EventEmitter<FastGridDropFileErrorEvent>();
   @Output() readonly dropped = new EventEmitter<FastGridDroppedEvent>();
   @Output() readonly editChange = new EventEmitter<FastGridEditChangeEvent>();
   @Output() readonly endDrag = new EventEmitter<FastGridEndDragEvent>();
   @Output() readonly endedEdit = new EventEmitter<FastGridEndedEditEvent>();
   @Output() readonly endEdit = new EventEmitter<FastGridEndEditEvent>();
   @Output() readonly endResize = new EventEmitter<FastGridEndResizeEvent>();
   @Output() readonly export = new EventEmitter<FastGridExportEvent>();
   @Output() readonly exported = new EventEmitter<FastGridExportedEvent>();
   @Output() readonly filter = new EventEmitter<FastGridFilterEvent>();
   @Output() readonly filtered = new EventEmitter<FastGridFilteredEvent>();
   @Output() readonly filterChanged = new EventEmitter<FastGridFilterChangedEvent>();
   @Output() readonly fixedScroll = new EventEmitter<FastGridFixedScrollEvent>();
   @Output() readonly focus = new EventEmitter<FastGridFocusEvent>();
   @Output() readonly focused = new EventEmitter<FastGridFocusedEvent>();
   @Output() readonly generateId = new EventEmitter<FastGridGenerateIdEvent>();
   @Output() readonly getAttr = new EventEmitter<FastGridGetAttrEvent>();
   @Output() readonly getDA = new EventEmitter<FastGridGetDAEvent>();
   @Output() readonly getFormula = new EventEmitter<FastGridGetFormulaEvent>();
   @Output() readonly getGroupD = new EventEmitter<FastGridGetGroupDEvent>();
   @Output() readonly getGroupString = new EventEmitter<FastGridGetGroupStringEvent>();
   @Output() readonly getMenuCustom = new EventEmitter<FastGridGetMenuCustomEvent>();
   @Output() readonly getName = new EventEmitter<FastGridGetNameEvent>();
   @Output() readonly getNumber = new EventEmitter<FastGridGetNumberEvent>();
   @Output() readonly getRange = new EventEmitter<FastGridGetRangeEvent>();
   @Output() readonly getSortString = new EventEmitter<FastGridGetSortStringEvent>();
   @Output() readonly getString = new EventEmitter<FastGridGetStringEvent>();
   @Output() readonly getValue = new EventEmitter<FastGridGetValueEvent>();
   @Output() readonly group = new EventEmitter<FastGridGroupEvent>();
   @Output() readonly grouped = new EventEmitter<FastGridGroupedEvent>();
   @Output() readonly hid = new EventEmitter<FastGridHidEvent>();
   @Output() readonly hide = new EventEmitter<FastGridHideEvent>();
   @Output() readonly hideGrid = new EventEmitter<FastGridHideGridEvent>();
   @Output() readonly hideTip = new EventEmitter<FastGridHideTipEvent>();
   @Output() readonly hideTool = new EventEmitter<FastGridHideToolEvent>();
   @Output() readonly hideToolbar = new EventEmitter<FastGridHideToolbarEvent>();
   @Output() readonly hidGrid = new EventEmitter<FastGridHidGridEvent>();
   @Output() readonly importData = new EventEmitter<FastGridImportDataEvent>();
   @Output() readonly importDataError = new EventEmitter<FastGridImportDataErrorEvent>();
   @Output() readonly importedData = new EventEmitter<FastGridImportedDataEvent>();
   @Output() readonly importingData = new EventEmitter<FastGridImportingDataEvent>();
   @Output() readonly indent = new EventEmitter<FastGridIndentEvent>();
   @Output() readonly indented = new EventEmitter<FastGridIndentedEvent>();
   @Output() readonly init = new EventEmitter<FastGridInitEvent>();
   @Output() readonly initialized = new EventEmitter<FastGridInitializedEvent>();
   @Output() readonly keyDown = new EventEmitter<FastGridKeyDownEvent>();
   @Output() readonly load = new EventEmitter<FastGridLoadEvent>();
   @Output() readonly loadCookie = new EventEmitter<FastGridLoadCookieEvent>();
   @Output() readonly loadData = new EventEmitter<FastGridLoadDataEvent>();
   @Output() readonly loaded = new EventEmitter<FastGridLoadedEvent>();
   @Output() readonly loadedCookie = new EventEmitter<FastGridLoadedCookieEvent>();
   @Output() readonly loadedData = new EventEmitter<FastGridLoadedDataEvent>();
   @Output() readonly loadedChildren = new EventEmitter<FastGridLoadedChildrenEvent>();
   @Output() readonly loadedMenu = new EventEmitter<FastGridLoadedMenuEvent>();
   @Output() readonly loadError = new EventEmitter<FastGridLoadErrorEvent>();
   @Output() readonly loadChildren = new EventEmitter<FastGridLoadChildrenEvent>();
   @Output() readonly loadMenu = new EventEmitter<FastGridLoadMenuEvent>();
   @Output() readonly openImage = new EventEmitter<FastGridOpenImageEvent>();
   @Output() readonly paint = new EventEmitter<FastGridPaintEvent>();
   @Output() readonly painted = new EventEmitter<FastGridPaintedEvent>();
   @Output() readonly paste = new EventEmitter<FastGridPasteEvent>();
   @Output() readonly pasteAdded = new EventEmitter<FastGridPasteAddedEvent>();
   @Output() readonly pasteCells = new EventEmitter<FastGridPasteCellsEvent>();
   @Output() readonly pasted = new EventEmitter<FastGridPastedEvent>();
   @Output() readonly pdf = new EventEmitter<FastGridPdfEvent>();
   @Output() readonly pdfSend = new EventEmitter<FastGridPdfSendEvent>();
   @Output() readonly pivotCreate = new EventEmitter<FastGridPivotCreateEvent>();
   @Output() readonly pivotCreated = new EventEmitter<FastGridPivotCreatedEvent>();
   @Output() readonly print = new EventEmitter<FastGridPrintEvent>();
   @Output() readonly printCreate = new EventEmitter<FastGridPrintCreateEvent>();
   @Output() readonly printed = new EventEmitter<FastGridPrintedEvent>();
   @Output() readonly ready = new EventEmitter<FastGridReadyEvent>();
   @Output() readonly readyAnimate = new EventEmitter<FastGridReadyAnimateEvent>();
   @Output() readonly removedTool = new EventEmitter<FastGridRemovedToolEvent>();
   @Output() readonly removedToolbar = new EventEmitter<FastGridRemovedToolbarEvent>();
   @Output() readonly removeTool = new EventEmitter<FastGridRemoveToolEvent>();
   @Output() readonly removeToolbar = new EventEmitter<FastGridRemoveToolbarEvent>();
   @Output() readonly render = new EventEmitter<FastGridRenderEvent>();
   @Output() readonly resetCookie = new EventEmitter<FastGridResetCookieEvent>();
   @Output() readonly resize = new EventEmitter<FastGridResizeEvent>();
   @Output() readonly reversedTree = new EventEmitter<FastGridReversedTreeEvent>();
   @Output() readonly save = new EventEmitter<FastGridSaveEvent>();
   @Output() readonly saveAccept = new EventEmitter<FastGridSaveAcceptEvent>();
   @Output() readonly saveCookie = new EventEmitter<FastGridSaveCookieEvent>();
   @Output() readonly saveCookieError = new EventEmitter<FastGridSaveCookieErrorEvent>();
   @Output() readonly saved = new EventEmitter<FastGridSavedEvent>();
   @Output() readonly savedCookie = new EventEmitter<FastGridSavedCookieEvent>();
   @Output() readonly saveError = new EventEmitter<FastGridSaveErrorEvent>();
   @Output() readonly saveChanged = new EventEmitter<FastGridSaveChangedEvent>();
   @Output() readonly saveXlsxError = new EventEmitter<FastGridSaveXlsxErrorEvent>();
   @Output() readonly scroll = new EventEmitter<FastGridScrollEvent>();
   @Output() readonly search = new EventEmitter<FastGridSearchEvent>();
   @Output() readonly select = new EventEmitter<FastGridSelectEvent>();
   @Output() readonly selectAll = new EventEmitter<FastGridSelectAllEvent>();
   @Output() readonly selected = new EventEmitter<FastGridSelectedEvent>();
   @Output() readonly selectedAll = new EventEmitter<FastGridSelectedAllEvent>();
   @Output() readonly setAttr = new EventEmitter<FastGridSetAttrEvent>();
   @Output() readonly setFormula = new EventEmitter<FastGridSetFormulaEvent>();
   @Output() readonly setLanguage = new EventEmitter<FastGridSetLanguageEvent>();
   @Output() readonly setMenuCustom = new EventEmitter<FastGridSetMenuCustomEvent>();
   @Output() readonly setReversedTree = new EventEmitter<FastGridSetReversedTreeEvent>();
   @Output() readonly setString = new EventEmitter<FastGridSetStringEvent>();
   @Output() readonly setStyle = new EventEmitter<FastGridSetStyleEvent>();
   @Output() readonly setValue = new EventEmitter<FastGridSetValueEvent>();
   @Output() readonly showCalendar = new EventEmitter<FastGridShowCalendarEvent>();
   @Output() readonly showedCalendar = new EventEmitter<FastGridShowedCalendarEvent>();
   @Output() readonly showedGrid = new EventEmitter<FastGridShowedGridEvent>();
   @Output() readonly showedList = new EventEmitter<FastGridShowedListEvent>();
   @Output() readonly showedMenu = new EventEmitter<FastGridShowedMenuEvent>();
   @Output() readonly showedSuggest = new EventEmitter<FastGridShowedSuggestEvent>();
   @Output() readonly showGrid = new EventEmitter<FastGridShowGridEvent>();
   @Output() readonly showImageLink = new EventEmitter<FastGridShowImageLinkEvent>();
   @Output() readonly showLink = new EventEmitter<FastGridShowLinkEvent>();
   @Output() readonly showList = new EventEmitter<FastGridShowListEvent>();
   @Output() readonly showMenu = new EventEmitter<FastGridShowMenuEvent>();
   @Output() readonly showSuggest = new EventEmitter<FastGridShowSuggestEvent>();
   @Output() readonly showTip = new EventEmitter<FastGridShowTipEvent>();
   @Output() readonly sort = new EventEmitter<FastGridSortEvent>();
   @Output() readonly sorted = new EventEmitter<FastGridSortedEvent>();
   @Output() readonly startDrag = new EventEmitter<FastGridStartDragEvent>();
   @Output() readonly startedEdit = new EventEmitter<FastGridStartedEditEvent>();
   @Output() readonly startEdit = new EventEmitter<FastGridStartEditEvent>();
   @Output() readonly startResize = new EventEmitter<FastGridStartResizeEvent>();
   @Output() readonly static = new EventEmitter<FastGridStaticEvent>();
   @Output() readonly tag = new EventEmitter<FastGridTagEvent>();
   @Output() readonly testAdd = new EventEmitter<FastGridTestAddEvent>();
   @Output() readonly testFilter = new EventEmitter<FastGridTestFilterEvent>();
   @Output() readonly toolbarCells = new EventEmitter<FastGridToolbarCellsEvent>();
   @Output() readonly updated = new EventEmitter<FastGridUpdatedEvent>();
   @Output() readonly validate = new EventEmitter<FastGridValidateEvent>();

   Accept(value: any, onaccept?: any, level?: number, filteroff?: number|boolean) : number|boolean;
   Accept(...args:any[]) : any { const grid = this.requireGrid(); return (grid.Accept as any).apply(grid,args); }

   AcceptChanges() : void;
   AcceptChanges(...args:any[]) : any { const grid = this.requireGrid(); return (grid.AcceptChanges as any).apply(grid,args); }

   ActionAddCookie(target?: number) : any;
   ActionAddCookie(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionAddCookie as any).apply(grid,args); }

   ActionAddName(target?: number) : any;
   ActionAddName(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionAddName as any).apply(grid,args); }

   ActionAddRow(target?: number, position?: number, action?: number, copytype?: number) : any;
   ActionAddRow(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionAddRow as any).apply(grid,args); }

   ActionAddRows(target?: number, position?: number, action?: number, copytype?: number, min?: number) : any;
   ActionAddRows(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionAddRows as any).apply(grid,args); }

   ActionAddSheet(target?: number, id?: string) : any;
   ActionAddSheet(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionAddSheet as any).apply(grid,args); }

   ActionClearSort(target?: number, part?: string) : any;
   ActionClearSort(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionClearSort as any).apply(grid,args); }

   ActionClearStyle(target?: number, attrs?: string[]|string, cellonly?: number|boolean, nohtml?: number|boolean) : any;
   ActionClearStyle(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionClearStyle as any).apply(grid,args); }

   ActionClearValue(target?: number) : any;
   ActionClearValue(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionClearValue as any).apply(grid,args); }

   ActionClickButton(target?: number, flags?: number) : any;
   ActionClickButton(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionClickButton as any).apply(grid,args); }

   ActionClipImage(target?: number) : any;
   ActionClipImage(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionClipImage as any).apply(grid,args); }

   ActionClose(target?: number, force?: number|boolean) : any;
   ActionClose(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionClose as any).apply(grid,args); }

   ActionCollapseAllRows(target?: number, level?: number, min?: number) : any;
   ActionCollapseAllRows(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionCollapseAllRows as any).apply(grid,args); }

   ActionCollapseLevel(target?: number) : any;
   ActionCollapseLevel(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionCollapseLevel as any).apply(grid,args); }

   ActionCollapseRow(target?: number, collapse?: number, levels?: number) : any;
   ActionCollapseRow(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionCollapseRow as any).apply(grid,args); }

   ActionCollapseRows(target?: number, collapse?: number, levels?: number, min?: number) : any;
   ActionCollapseRows(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionCollapseRows as any).apply(grid,args); }

   ActionCopy(target?: number) : any;
   ActionCopy(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionCopy as any).apply(grid,args); }

   ActionDeleteCookie(target?: number) : any;
   ActionDeleteCookie(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionDeleteCookie as any).apply(grid,args); }

   ActionDeleteImage(target?: number, del?: number) : any;
   ActionDeleteImage(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionDeleteImage as any).apply(grid,args); }

   ActionDeleteRow(target?: number, del?: number, options?: number) : any;
   ActionDeleteRow(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionDeleteRow as any).apply(grid,args); }

   ActionDeleteRows(target?: number, del?: number, options?: number, min?: number) : any;
   ActionDeleteRows(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionDeleteRows as any).apply(grid,args); }

   ActionDeleteSheet(target?: number, hideonly?: number|boolean) : any;
   ActionDeleteSheet(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionDeleteSheet as any).apply(grid,args); }

   ActionDrag(target?: number, actions?: number, options?: number) : any;
   ActionDrag(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionDrag as any).apply(grid,args); }

   ActionDragCell(target?: number) : any;
   ActionDragCell(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionDragCell as any).apply(grid,args); }

   ActionDragFocus(target?: number, type?: number, action?: number, autofilltype?: number) : any;
   ActionDragFocus(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionDragFocus as any).apply(grid,args); }

   ActionDragGrid(target?: number) : any;
   ActionDragGrid(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionDragGrid as any).apply(grid,args); }

   ActionDragImage(target?: number, copy?: number|boolean, onedir?: number|boolean) : any;
   ActionDragImage(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionDragImage as any).apply(grid,args); }

   ActionDragScroll(target?: number) : any;
   ActionDragScroll(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionDragScroll as any).apply(grid,args); }

   ActionDragSelectCols(target?: number, sel?: number) : any;
   ActionDragSelectCols(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionDragSelectCols as any).apply(grid,args); }

   ActionDragSelectRows(target?: number, sel?: number) : any;
   ActionDragSelectRows(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionDragSelectRows as any).apply(grid,args); }

   ActionEdit(target?: number, empty?: number|boolean) : any;
   ActionEdit(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionEdit as any).apply(grid,args); }

   ActionEditTip(target?: number) : any;
   ActionEditTip(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionEditTip as any).apply(grid,args); }

   ActionEndEdit(target?: number, save?: number|boolean) : any;
   ActionEndEdit(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionEndEdit as any).apply(grid,args); }

   ActionEnterFormat(target?: number) : any;
   ActionEnterFormat(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionEnterFormat as any).apply(grid,args); }

   ActionEnterImageLink(target?: number) : any;
   ActionEnterImageLink(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionEnterImageLink as any).apply(grid,args); }

   ActionEnterImageOpacity(target?: number) : any;
   ActionEnterImageOpacity(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionEnterImageOpacity as any).apply(grid,args); }

   ActionEnterLink(target?: number) : any;
   ActionEnterLink(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionEnterLink as any).apply(grid,args); }

   ActionExport(target?: number) : any;
   ActionExport(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionExport as any).apply(grid,args); }

   ActionFix(target?: number, body?: string, cols?: string) : any;
   ActionFix(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionFix as any).apply(grid,args); }

   ActionFocus(target?: number, action?: number) : any;
   ActionFocus(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionFocus as any).apply(grid,args); }

   ActionFocusAll(target?: number, range?: number|boolean) : any;
   ActionFocusAll(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionFocusAll as any).apply(grid,args); }

   ActionFocusCol(target?: number, action?: number) : any;
   ActionFocusCol(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionFocusCol as any).apply(grid,args); }

   ActionFocusEdit(target?: number, action?: number, empty?: number|boolean) : any;
   ActionFocusEdit(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionFocusEdit as any).apply(grid,args); }

   ActionFocusNext(target?: number, dir?: number, options?: number, tab?: number) : any;
   ActionFocusNext(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionFocusNext as any).apply(grid,args); }

   ActionFocusRow(target?: number, action?: number) : any;
   ActionFocusRow(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionFocusRow as any).apply(grid,args); }

   ActionHideRow(target?: number, options?: number) : any;
   ActionHideRow(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionHideRow as any).apply(grid,args); }

   ActionHideRows(target?: number, options?: number, min?: number) : any;
   ActionHideRows(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionHideRows as any).apply(grid,args); }

   ActionHideTool(target?: number) : any;
   ActionHideTool(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionHideTool as any).apply(grid,args); }

   ActionHideToolbar(target?: number) : any;
   ActionHideToolbar(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionHideToolbar as any).apply(grid,args); }

   ActionChangeBool(target?: number, icon?: string, cycle?: number) : any;
   ActionChangeBool(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionChangeBool as any).apply(grid,args); }

   ActionChooseCells(target?: number, type?: number, absolute?: number|boolean) : any;
   ActionChooseCells(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionChooseCells as any).apply(grid,args); }

   ActionImageToFront(target?: number, back?: number) : any;
   ActionImageToFront(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionImageToFront as any).apply(grid,args); }

   ActionImport(target?: number) : any;
   ActionImport(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionImport as any).apply(grid,args); }

   ActionIndentRow(target?: number, level?: number, options?: number, hidden?: number) : any;
   ActionIndentRow(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionIndentRow as any).apply(grid,args); }

   ActionIndentRows(target?: number, level?: number, options?: number, hidden?: number, min?: number) : any;
   ActionIndentRows(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionIndentRows as any).apply(grid,args); }

   ActionLoadCookie(target?: number) : any;
   ActionLoadCookie(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionLoadCookie as any).apply(grid,args); }

   ActionOnEditChange(Grid: TGrid, Row: TRow, Col: TCol, Event: any) : void;
   ActionOnEditChange(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionOnEditChange as any).apply(grid,args); }

   ActionOnChange(Grid: TGrid, Row: TRow, Col: TCol, Event: any) : void;
   ActionOnChange(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionOnChange as any).apply(grid,args); }

   ActionOnTip(Grid: TGrid, Row: TRow, Col: TCol, Event: any) : number|boolean;
   ActionOnTip(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionOnTip as any).apply(grid,args); }

   ActionOpenImage(target?: number) : any;
   ActionOpenImage(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionOpenImage as any).apply(grid,args); }

   ActionPaste(target?: number) : any;
   ActionPaste(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionPaste as any).apply(grid,args); }

   ActionPdf(target?: number) : any;
   ActionPdf(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionPdf as any).apply(grid,args); }

   ActionPrint(target?: number) : any;
   ActionPrint(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionPrint as any).apply(grid,args); }

   ActionRedo(target?: number) : any;
   ActionRedo(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionRedo as any).apply(grid,args); }

   ActionReload(target?: number, flags?: number) : any;
   ActionReload(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionReload as any).apply(grid,args); }

   ActionResetCookie(target?: number, id?: string, sheets?: number|boolean, closedialog?: number|boolean) : any;
   ActionResetCookie(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionResetCookie as any).apply(grid,args); }

   ActionResetImage(target?: number, confirm?: number|boolean) : any;
   ActionResetImage(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionResetImage as any).apply(grid,args); }

   ActionResizeImage(target?: number, free?: number|boolean, onedir?: number|boolean) : any;
   ActionResizeImage(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionResizeImage as any).apply(grid,args); }

   ActionRotateImage(target?: number) : any;
   ActionRotateImage(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionRotateImage as any).apply(grid,args); }

   ActionSave(target?: number, validate?: number) : any;
   ActionSave(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionSave as any).apply(grid,args); }

   ActionSaveCookie(target?: number) : any;
   ActionSaveCookie(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionSaveCookie as any).apply(grid,args); }

   ActionScroll(target?: number, direction?: number, step?: number) : any;
   ActionScroll(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionScroll as any).apply(grid,args); }

   ActionSelectEdit(target?: number, start?: number, end?: number) : any;
   ActionSelectEdit(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionSelectEdit as any).apply(grid,args); }

   ActionSelectRow(target?: number, sel?: number) : any;
   ActionSelectRow(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionSelectRow as any).apply(grid,args); }

   ActionSelectRows(target?: number, sel?: number) : any;
   ActionSelectRows(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionSelectRows as any).apply(grid,args); }

   ActionSetAlign(target?: number, value?: number, clear?: number|boolean) : any;
   ActionSetAlign(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionSetAlign as any).apply(grid,args); }

   ActionSetBold(target?: number, value?: number|boolean) : any;
   ActionSetBold(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionSetBold as any).apply(grid,args); }

   ActionSetBorder(target?: number, edge?: number, color?: string, width?: number, dash?: string, clear?: number, hidden?: number|boolean) : any;
   ActionSetBorder(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionSetBorder as any).apply(grid,args); }

   ActionSetCase(target?: number, lower?: number|boolean) : any;
   ActionSetCase(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionSetCase as any).apply(grid,args); }

   ActionSetColor(target?: number, value?: string) : any;
   ActionSetColor(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionSetColor as any).apply(grid,args); }

   ActionSetFormat(target?: number, value?: string) : any;
   ActionSetFormat(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionSetFormat as any).apply(grid,args); }

   ActionSetIndent(target?: number, value?: number, inc?: number) : any;
   ActionSetIndent(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionSetIndent as any).apply(grid,args); }

   ActionSetItalic(target?: number, value?: number|boolean) : any;
   ActionSetItalic(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionSetItalic as any).apply(grid,args); }

   ActionSetNoEdit(target?: number, value?: number) : any;
   ActionSetNoEdit(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionSetNoEdit as any).apply(grid,args); }

   ActionSetOverline(target?: number, value?: number|boolean) : any;
   ActionSetOverline(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionSetOverline as any).apply(grid,args); }

   ActionSetPattern(target?: number, pattern?: string, patterncolor?: string, color?: string) : any;
   ActionSetPattern(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionSetPattern as any).apply(grid,args); }

   ActionSetRotate(target?: number, value?: number, clear?: number|boolean) : any;
   ActionSetRotate(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionSetRotate as any).apply(grid,args); }

   ActionSetStrike(target?: number, value?: number|boolean) : any;
   ActionSetStrike(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionSetStrike as any).apply(grid,args); }

   ActionSetTextColor(target?: number, value?: string) : any;
   ActionSetTextColor(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionSetTextColor as any).apply(grid,args); }

   ActionSetTextFont(target?: number, value?: string) : any;
   ActionSetTextFont(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionSetTextFont as any).apply(grid,args); }

   ActionSetTextLine(target?: number, shadow?: number, color?: string) : any;
   ActionSetTextLine(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionSetTextLine as any).apply(grid,args); }

   ActionSetTextShadow(target?: number, shadow?: number, color?: string) : any;
   ActionSetTextShadow(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionSetTextShadow as any).apply(grid,args); }

   ActionSetTextSize(target?: number, value?: number, inc?: number) : any;
   ActionSetTextSize(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionSetTextSize as any).apply(grid,args); }

   ActionSetUnderline(target?: number, value?: number|boolean) : any;
   ActionSetUnderline(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionSetUnderline as any).apply(grid,args); }

   ActionSetVertAlign(target?: number, value?: number) : any;
   ActionSetVertAlign(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionSetVertAlign as any).apply(grid,args); }

   ActionSetWrap(target?: number, value?: any) : any;
   ActionSetWrap(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionSetWrap as any).apply(grid,args); }

   ActionShowCalendar(target?: number) : any;
   ActionShowCalendar(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionShowCalendar as any).apply(grid,args); }

   ActionShowFilterMenu(target?: number) : any;
   ActionShowFilterMenu(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionShowFilterMenu as any).apply(grid,args); }

   ActionShowImageLink(target?: number) : any;
   ActionShowImageLink(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionShowImageLink as any).apply(grid,args); }

   ActionShowLink(target?: number) : any;
   ActionShowLink(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionShowLink as any).apply(grid,args); }

   ActionShowList(target?: number) : any;
   ActionShowList(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionShowList as any).apply(grid,args); }

   ActionShowMenu(target?: number, menu?: any, def?: string, type?: number) : any;
   ActionShowMenu(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionShowMenu as any).apply(grid,args); }

   ActionShowRows(target?: number, type?: number, options?: number, min?: number) : any;
   ActionShowRows(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionShowRows as any).apply(grid,args); }

   ActionShowTip(target?: number) : any;
   ActionShowTip(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionShowTip as any).apply(grid,args); }

   ActionSortClick(target?: number, direction?: number|boolean, cols?: number|boolean, sorttype?: number) : any;
   ActionSortClick(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionSortClick as any).apply(grid,args); }

   ActionSpan(target?: number) : any;
   ActionSpan(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionSpan as any).apply(grid,args); }

   ActionSplit(target?: number) : any;
   ActionSplit(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionSplit as any).apply(grid,args); }

   ActionUndeleteRows(target?: number, type?: number, options?: number, min?: number) : any;
   ActionUndeleteRows(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionUndeleteRows as any).apply(grid,args); }

   ActionUndo(target?: number) : any;
   ActionUndo(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionUndo as any).apply(grid,args); }

   ActionValidate(target?: number) : any;
   ActionValidate(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ActionValidate as any).apply(grid,args); }

   Add(src?: any, par?: any, next?: any, options?: number, copytype?: number) : TRow|TCol|TRow[]|TCol[]|null;
   Add(...args:any[]) : any { const grid = this.requireGrid(); return (grid.Add as any).apply(grid,args); }

   AddCookie(id: string, noalert?: number|boolean) : number|boolean;
   AddCookie(...args:any[]) : any { const grid = this.requireGrid(); return (grid.AddCookie as any).apply(grid,args); }

   AddData(data: any, options?: number) : number|boolean;
   AddData(...args:any[]) : any { const grid = this.requireGrid(); return (grid.AddData as any).apply(grid,args); }

   AddEvent(event: string, func: any, ident?: string, book?: number|boolean) : string|number;
   AddEvent(...args:any[]) : any { const grid = this.requireGrid(); return (grid.AddEvent as any).apply(grid,args); }

   AddImage(image: any, changes?: number|boolean) : number;
   AddImage(...args:any[]) : any { const grid = this.requireGrid(); return (grid.AddImage as any).apply(grid,args); }

   AddPart(part: object|string, next?: string|number) : string;
   AddPart(...args:any[]) : any { const grid = this.requireGrid(); return (grid.AddPart as any).apply(grid,args); }

   AddSheet(id?: string, noshow?: number) : TGrid|null;
   AddSheet(...args:any[]) : any { const grid = this.requireGrid(); return (grid.AddSheet as any).apply(grid,args); }

   AddTool(src?: any, par?: TToolbar, next?: TTool, copy?: number|boolean) : TTool|null;
   AddTool(...args:any[]) : any { const grid = this.requireGrid(); return (grid.AddTool as any).apply(grid,args); }

   AddToolbar(src?: any, next?: TToolbar, copy?: number|boolean, all?: number|boolean) : TToolbar|null;
   AddToolbar(...args:any[]) : any { const grid = this.requireGrid(); return (grid.AddToolbar as any).apply(grid,args); }

   AIAddColsAttrs(cols?: object[]) : object[];
   AIAddColsAttrs(...args:any[]) : any { const grid = this.requireGrid(); return (grid.AIAddColsAttrs as any).apply(grid,args); }

   AIAddToInputHistory(text: string) : number|boolean;
   AIAddToInputHistory(...args:any[]) : any { const grid = this.requireGrid(); return (grid.AIAddToInputHistory as any).apply(grid,args); }

   AICancel() : number|boolean;
   AICancel(...args:any[]) : any { const grid = this.requireGrid(); return (grid.AICancel as any).apply(grid,args); }

   AIEnterCredit() : void;
   AIEnterCredit(...args:any[]) : any { const grid = this.requireGrid(); return (grid.AIEnterCredit as any).apply(grid,args); }

   AIGetCredit() : string;
   AIGetCredit(...args:any[]) : any { const grid = this.requireGrid(); return (grid.AIGetCredit as any).apply(grid,args); }

   AIGetFilter(part?: string) : string;
   AIGetFilter(...args:any[]) : any { const grid = this.requireGrid(); return (grid.AIGetFilter as any).apply(grid,args); }

   AIGetInputHistory() : string[]|string;
   AIGetInputHistory(...args:any[]) : any { const grid = this.requireGrid(); return (grid.AIGetInputHistory as any).apply(grid,args); }

   AIGetTime() : number;
   AIGetTime(...args:any[]) : any { const grid = this.requireGrid(); return (grid.AIGetTime as any).apply(grid,args); }

   AISend(text: string, func?: any, row?: TRow, col?: TCol) : number|boolean;
   AISend(...args:any[]) : any { const grid = this.requireGrid(); return (grid.AISend as any).apply(grid,args); }

   AISetCredit(credit: string) : void;
   AISetCredit(...args:any[]) : any { const grid = this.requireGrid(); return (grid.AISetCredit as any).apply(grid,args); }

   AISetInput(row: TRow, col: TCol, value: string, empty: string) : number|boolean;
   AISetInput(...args:any[]) : any { const grid = this.requireGrid(); return (grid.AISetInput as any).apply(grid,args); }

   Animate(items: any, animation: any, type?: number, force?: number|boolean) : number|boolean;
   Animate(...args:any[]) : any { const grid = this.requireGrid(); return (grid.Animate as any).apply(grid,args); }

   ApplyMedia(apply?: number) : void;
   ApplyMedia(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ApplyMedia as any).apply(grid,args); }

   CalculateFormula(row: TRow, col: TCol, formula: string, edit?: number|boolean) : any;
   CalculateFormula(...args:any[]) : any { const grid = this.requireGrid(); return (grid.CalculateFormula as any).apply(grid,args); }

   ClearAttr(row: TRow, col: TCol, attr: string, _default: any, changes?: number) : number|boolean;
   ClearAttr(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ClearAttr as any).apply(grid,args); }

   ClearErrors() : void;
   ClearErrors(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ClearErrors as any).apply(grid,args); }

   ClearFilters(part?: string, type?: number) : void;
   ClearFilters(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ClearFilters as any).apply(grid,args); }

   ClearFocused() : number|boolean;
   ClearFocused(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ClearFocused as any).apply(grid,args); }

   ClearHighlights() : void;
   ClearHighlights(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ClearHighlights as any).apply(grid,args); }

   ClearPart(part: string) : void;
   ClearPart(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ClearPart as any).apply(grid,args); }

   ClearUndo(redo?: number|boolean) : void;
   ClearUndo(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ClearUndo as any).apply(grid,args); }

   Close(force?: number|boolean) : number|boolean;
   Close(...args:any[]) : any { const grid = this.requireGrid(); return (grid.Close as any).apply(grid,args); }

   Collapse(src: TRow|TCol|TRow[]|TCol[], collapse?: number, options?: number, levels?: number) : TRow|TCol|TRow[]|TCol[]|null;
   Collapse(...args:any[]) : any { const grid = this.requireGrid(); return (grid.Collapse as any).apply(grid,args); }

   CollapseAll(level: number, cols?: number|boolean, options?: number) : number|boolean;
   CollapseAll(...args:any[]) : any { const grid = this.requireGrid(); return (grid.CollapseAll as any).apply(grid,args); }

   ComparePos(item1: object, item2: object) : number;
   ComparePos(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ComparePos as any).apply(grid,args); }

   CopySheet(tosheet: string, noshow?: number) : TGrid|null;
   CopySheet(...args:any[]) : any { const grid = this.requireGrid(); return (grid.CopySheet as any).apply(grid,args); }

   CopyToClipboard(text?: string, html?: string, animate?: number|boolean) : void;
   CopyToClipboard(...args:any[]) : any { const grid = this.requireGrid(); return (grid.CopyToClipboard as any).apply(grid,args); }

   Count(part: string, hidden?: number, set?: string|number) : number;
   Count(...args:any[]) : any { const grid = this.requireGrid(); return (grid.Count as any).apply(grid,args); }

   CreatePivot(rows?: string, cols?: string, data?: string, show?: number|boolean, grid?: TGrid, part?: string) : number|boolean;
   CreatePivot(...args:any[]) : any { const grid = this.requireGrid(); return (grid.CreatePivot as any).apply(grid,args); }

   DateToString(date: any, format?: string, range?: number, type?: number, _default?: any, zone?: number) : string;
   DateToString(...args:any[]) : any { const grid = this.requireGrid(); return (grid.DateToString as any).apply(grid,args); }

   Debug(debuglevel?: number, text?: any, text2?: any) : void;
   Debug(...args:any[]) : any { const grid = this.requireGrid(); return (grid.Debug as any).apply(grid,args); }

   Delete(src?: TRow|TCol|TRow[]|TCol[], del?: number, options?: number) : TRow|TCol|TRow[]|TCol[]|null;
   Delete(...args:any[]) : any { const grid = this.requireGrid(); return (grid.Delete as any).apply(grid,args); }

   DeleteCookie(id?: string, noalert?: number|boolean) : number|boolean;
   DeleteCookie(...args:any[]) : any { const grid = this.requireGrid(); return (grid.DeleteCookie as any).apply(grid,args); }

   DeleteImage(index: number, del?: number|boolean) : number|boolean;
   DeleteImage(...args:any[]) : any { const grid = this.requireGrid(); return (grid.DeleteImage as any).apply(grid,args); }

   DeleteSheet(hideonly?: number|boolean, nopaint?: number|boolean, noadd?: number|boolean) : number|boolean;
   DeleteSheet(...args:any[]) : any { const grid = this.requireGrid(); return (grid.DeleteSheet as any).apply(grid,args); }

   DelEvent(event: string, ident?: string, book?: number|boolean) : number|boolean;
   DelEvent(...args:any[]) : any { const grid = this.requireGrid(); return (grid.DelEvent as any).apply(grid,args); }

   Disable(opaque?: number|boolean) : void;
   Disable(...args:any[]) : any { const grid = this.requireGrid(); return (grid.Disable as any).apply(grid,args); }

   DisableEvent(event: string) : void;
   DisableEvent(...args:any[]) : any { const grid = this.requireGrid(); return (grid.DisableEvent as any).apply(grid,args); }

   Dispose(book?: number|boolean) : void;
   Dispose(...args:any[]) : any { const grid = this.requireGrid(); return (grid.Dispose as any).apply(grid,args); }

   DragCell(event: Event, row?: any, col?: any, ghostrect?: number[], ghosthtml?: string) : void;
   DragCell(...args:any[]) : any { const grid = this.requireGrid(); return (grid.DragCell as any).apply(grid,args); }

   DragCol(event: Event, row?: TRow, col?: TCol|object, notstarted?: any) : void;
   DragCol(...args:any[]) : any { const grid = this.requireGrid(); return (grid.DragCol as any).apply(grid,args); }

   DragRow(event: Event, row?: TRow|object, col?: TCol, notstarted?: any) : void;
   DragRow(...args:any[]) : any { const grid = this.requireGrid(); return (grid.DragRow as any).apply(grid,args); }

   EditTip(row: TRow, col: TCol, tip?: string) : void;
   EditTip(...args:any[]) : any { const grid = this.requireGrid(); return (grid.EditTip as any).apply(grid,args); }

   Enable() : void;
   Enable(...args:any[]) : any { const grid = this.requireGrid(); return (grid.Enable as any).apply(grid,args); }

   EnableEvent(event: string) : void;
   EnableEvent(...args:any[]) : any { const grid = this.requireGrid(); return (grid.EnableEvent as any).apply(grid,args); }

   EndEdit(save?: number|boolean, noevent?: number) : number|boolean;
   EndEdit(...args:any[]) : any { const grid = this.requireGrid(); return (grid.EndEdit as any).apply(grid,args); }

   ExpandParents(src: TRow|TCol) : number|boolean;
   ExpandParents(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ExpandParents as any).apply(grid,args); }

   FillRange(NewRange: object[], OldRange: object[], type?: number, attrs?: string[]|string) : object;
   FillRange(...args:any[]) : any { const grid = this.requireGrid(); return (grid.FillRange as any).apply(grid,args); }

   FilterRange(col: string, filter?: string, type?: string, part?: string) : void;
   FilterRange(...args:any[]) : any { const grid = this.requireGrid(); return (grid.FilterRange as any).apply(grid,args); }

   FindImages(row: TRow, col: TCol) : number[];
   FindImages(...args:any[]) : any { const grid = this.requireGrid(); return (grid.FindImages as any).apply(grid,args); }

   Fix(item: TRow|TCol, body?: string, head?: string) : number|boolean;
   Fix(...args:any[]) : any { const grid = this.requireGrid(); return (grid.Fix as any).apply(grid,args); }

   FullRepaint(part?: any) : void;
   FullRepaint(...args:any[]) : any { const grid = this.requireGrid(); return (grid.FullRepaint as any).apply(grid,args); }

   Get(row: any, col: any, attr?: any, def?: any, convert?: object, direct?: number) : any;
   Get(...args:any[]) : any { const grid = this.requireGrid(); return (grid.Get as any).apply(grid,args); }

   GetActiveSheet() : TGrid|null;
   GetActiveSheet(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetActiveSheet as any).apply(grid,args); }

   GetAlign(row: TRow, col: TCol) : number;
   GetAlign(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetAlign as any).apply(grid,args); }

   GetAttr(row: TRow, col: TCol, attr: string, direct?: number) : any;
   GetAttr(item: object, attr: string) : any;
   GetAttr(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetAttr as any).apply(grid,args); }

   GetAttrs(row: TRow, col: TCol, attrs: string[]|string, type?: number) : any;
   GetAttrs(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetAttrs as any).apply(grid,args); }

   GetByIndex(index: string, part?: string, repaint?: number) : TRow|TCol|null;
   GetByIndex(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetByIndex as any).apply(grid,args); }

   GetCfgAttr(attr: string) : any;
   GetCfgAttr(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetCfgAttr as any).apply(grid,args); }

   GetCol(id: string|number) : TCol|null;
   GetCol(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetCol as any).apply(grid,args); }

   GetColIndex(index: number|string, type?: number|boolean) : number|string;
   GetColIndex(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetColIndex as any).apply(grid,args); }

   GetColLeft(col: TCol) : number;
   GetColLeft(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetColLeft as any).apply(grid,args); }

   GetColSpan(row: TRow, col: TCol) : number;
   GetColSpan(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetColSpan as any).apply(grid,args); }

   GetCookies(type?: number, options?: number, version?: string, adddefault?: number|boolean, separator?: number) : string[];
   GetCookies(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetCookies as any).apply(grid,args); }

   GetD(row: TRow, col: TCol) : string;
   GetD(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetD as any).apply(grid,args); }

   GetData(flags?: string, format?: number) : string|object;
   GetData(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetData as any).apply(grid,args); }

   GetDefAttr(type: string, id: string, attr: string) : any;
   GetDefAttr(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetDefAttr as any).apply(grid,args); }

   GetEdit(test?: number|boolean) : any[];
   GetEdit(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetEdit as any).apply(grid,args); }

   GetEditValue() : string;
   GetEditValue(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetEditValue as any).apply(grid,args); }

   GetError(row: TRow, col: TCol) : any;
   GetError(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetError as any).apply(grid,args); }

   GetErrors() : object[];
   GetErrors(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetErrors as any).apply(grid,args); }

   GetExport(format?: string, func?: any) : any;
   GetExport(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetExport as any).apply(grid,args); }

   GetFilter(part?: string, type?: number) : any;
   GetFilter(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetFilter as any).apply(grid,args); }

   GetFirst(part?: string, type?: number, set?: string|number) : TRow|TCol|null;
   GetFirst(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetFirst as any).apply(grid,args); }

   GetFirstBlock(item: TRow|TCol, type?: number) : TRow|TCol|null;
   GetFirstBlock(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetFirstBlock as any).apply(grid,args); }

   GetFirstChild(item: TRow|TCol, type?: number) : TRow|TCol|null;
   GetFirstChild(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetFirstChild as any).apply(grid,args); }

   GetFirstView(part?: string, min?: number, set?: string|number) : TRow|TCol|null;
   GetFirstView(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetFirstView as any).apply(grid,args); }

   GetFirstVisible(part?: string, set?: string|number) : TRow|TCol|null;
   GetFirstVisible(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetFirstVisible as any).apply(grid,args); }

   GetFocus(str?: number) : any[];
   GetFocus(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetFocus as any).apply(grid,args); }

   GetFormatFormat(id: string) : string;
   GetFormatFormat(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetFormatFormat as any).apply(grid,args); }

   GetFormatId(format: string, translate?: number|boolean) : string;
   GetFormatId(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetFormatId as any).apply(grid,args); }

   GetFormula(row: TRow, col: TCol, edit?: number|boolean) : string;
   GetFormula(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetFormula as any).apply(grid,args); }

   GetGrid(obj: object) : TGrid|null;
   GetGrid(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetGrid as any).apply(grid,args); }

   GetGroup(part?: string, array?: number|boolean) : any;
   GetGroup(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetGroup as any).apply(grid,args); }

   GetGroupCol(row: TRow) : TCol|null;
   GetGroupCol(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetGroupCol as any).apply(grid,args); }

   GetGroupPos(row: TRow) : number;
   GetGroupPos(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetGroupPos as any).apply(grid,args); }

   GetGroupRow(col: TCol) : TRow|null;
   GetGroupRow(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetGroupRow as any).apply(grid,args); }

   GetHeight(row: TRow) : number;
   GetHeight(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetHeight as any).apply(grid,args); }

   GetHover() : any[];
   GetHover(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetHover as any).apply(grid,args); }

   GetImageAttr(index: number, attr: string) : any;
   GetImageAttr(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetImageAttr as any).apply(grid,args); }

   GetImageSize(index: number) : number[];
   GetImageSize(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetImageSize as any).apply(grid,args); }

   GetIndex(item: TRow|TCol, plus?: number) : string;
   GetIndex(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetIndex as any).apply(grid,args); }

   GetLast(part?: string, type?: number, set?: string|number) : TRow|TCol|null;
   GetLast(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetLast as any).apply(grid,args); }

   GetLastBlock(item: TRow|TCol, type?: number) : TRow|TCol|null;
   GetLastBlock(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetLastBlock as any).apply(grid,args); }

   GetLastChild(item: TRow|TCol, type?: number) : TRow|TCol|null;
   GetLastChild(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetLastChild as any).apply(grid,args); }

   GetLastImage() : number;
   GetLastImage(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetLastImage as any).apply(grid,args); }

   GetLastView(part?: string, min?: number, set?: string|number) : TRow|TCol|null;
   GetLastView(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetLastView as any).apply(grid,args); }

   GetLastVisible(part?: string, set?: string|number) : TRow|TCol|null;
   GetLastVisible(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetLastVisible as any).apply(grid,args); }

   GetList(row: TRow, col: TCol) : object;
   GetList(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetList as any).apply(grid,args); }

   GetLock(array?: number|boolean) : object;
   GetLock(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetLock as any).apply(grid,args); }

   GetMarks(row: TRow, col: TCol) : string;
   GetMarks(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetMarks as any).apply(grid,args); }

   GetName(item: TRow|TCol) : string;
   GetName(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetName as any).apply(grid,args); }

   GetNames(type?: number) : object[];
   GetNames(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetNames as any).apply(grid,args); }

   GetNext(item: TRow|TCol, type?: number, set?: string|number) : TRow|TCol|null;
   GetNext(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetNext as any).apply(grid,args); }

   GetNextVisible(item: TRow|TCol, set?: string|number) : TRow|TCol|null;
   GetNextVisible(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetNextVisible as any).apply(grid,args); }

   GetNumber(row: TRow, col: TCol, ret?: number, def?: any, val?: any) : any;
   GetNumber(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetNumber as any).apply(grid,args); }

   GetNumbers(row1: TRow, col1: TCol, row2: TRow, col2: TCol, ret?: number, def?: number, direct?: number) : any;
   GetNumbers(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetNumbers as any).apply(grid,args); }

   GetOnPoint(part: string, pos: number, hidden?: number|boolean, set?: string|number) : TRow|TCol|TTool|null;
   GetOnPoint(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetOnPoint as any).apply(grid,args); }

   GetParent(item: TRow|TCol) : TRow|TCol|null;
   GetParent(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetParent as any).apply(grid,args); }

   GetParentCell() : any[];
   GetParentCell(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetParentCell as any).apply(grid,args); }

   GetPart(obj: object) : string;
   GetPart(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetPart as any).apply(grid,args); }

   GetPartAttr(part: string, attr: string, set?: string) : any;
   GetPartAttr(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetPartAttr as any).apply(grid,args); }

   GetPartHeight(part: string) : number;
   GetPartHeight(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetPartHeight as any).apply(grid,args); }

   GetPartScrollHeight(part: string) : number;
   GetPartScrollHeight(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetPartScrollHeight as any).apply(grid,args); }

   GetPartScrollWidth(part: string) : number;
   GetPartScrollWidth(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetPartScrollWidth as any).apply(grid,args); }

   GetPartWidth(part: string) : number;
   GetPartWidth(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetPartWidth as any).apply(grid,args); }

   GetPatternIcon(pattern: string, patterncolor: string, color: string) : number;
   GetPatternIcon(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetPatternIcon as any).apply(grid,args); }

   GetPivotGrid() : TGrid|null;
   GetPivotGrid(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetPivotGrid as any).apply(grid,args); }

   GetPivotSource() : TGrid|null;
   GetPivotSource(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetPivotSource as any).apply(grid,args); }

   GetPos(item: object) : number;
   GetPos(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetPos as any).apply(grid,args); }

   GetPrev(item: TRow|TCol, type?: number, set?: string|number) : TRow|TCol|null;
   GetPrev(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetPrev as any).apply(grid,args); }

   GetPrevVisible(item: TRow|TCol, set?: string|number) : TRow|TCol|null;
   GetPrevVisible(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetPrevVisible as any).apply(grid,args); }

   GetRange(row: TRow, col: TCol, ret?: number, def?: number, val?: number) : any;
   GetRange(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetRange as any).apply(grid,args); }

   GetResult(row: TRow, col: TCol, attr?: string) : any;
   GetResult(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetResult as any).apply(grid,args); }

   GetRow(id: string|number) : TRow|null;
   GetRow(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetRow as any).apply(grid,args); }

   GetRowIndex(index: number|string, type?: number|boolean) : number|string;
   GetRowIndex(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetRowIndex as any).apply(grid,args); }

   GetRowSpan(row: TRow, col: TCol) : number;
   GetRowSpan(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetRowSpan as any).apply(grid,args); }

   GetRowTop(row: TRow) : number;
   GetRowTop(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetRowTop as any).apply(grid,args); }

   GetScrollLeft(part: string) : number;
   GetScrollLeft(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetScrollLeft as any).apply(grid,args); }

   GetScrollTop(part: string) : number;
   GetScrollTop(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetScrollTop as any).apply(grid,args); }

   GetSearchHistory() : object[];
   GetSearchHistory(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetSearchHistory as any).apply(grid,args); }

   GetSelected(type?: number, cols?: number|boolean, nohidden?: number|boolean) : TRow[]|TCol[]|TRows|TCols|number|null;
   GetSelected(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetSelected as any).apply(grid,args); }

   GetSet(row: TRow) : string;
   GetSet(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetSet as any).apply(grid,args); }

   GetSheets(sort?: number, nohidden?: number|boolean) : TGrid[]|string[]|string|null;
   GetSheets(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetSheets as any).apply(grid,args); }

   GetSort(part?: string, object?: number, nodefault?: number|boolean) : object;
   GetSort(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetSort as any).apply(grid,args); }

   GetSources(flags?: number) : any;
   GetSources(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetSources as any).apply(grid,args); }

   GetSpanCol(row: TRow, col: TCol, type?: number) : TCol|null;
   GetSpanCol(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetSpanCol as any).apply(grid,args); }

   GetSpanRow(row: TRow, col: TCol, type?: number) : TRow|null;
   GetSpanRow(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetSpanRow as any).apply(grid,args); }

   GetStatic(row: TRow, col: TCol) : HTMLElement|null;
   GetStatic(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetStatic as any).apply(grid,args); }

   GetString(row: TRow, col: TCol, src?: number, Out?: object, val?: any) : string;
   GetString(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetString as any).apply(grid,args); }

   GetTagAttr(tag: string, attr: string) : any;
   GetTagAttr(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetTagAttr as any).apply(grid,args); }

   GetTextFont(row: TRow, col: TCol) : string|number;
   GetTextFont(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetTextFont as any).apply(grid,args); }

   GetTextLine(row: TRow, col: TCol, bits?: number) : number;
   GetTextLine(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetTextLine as any).apply(grid,args); }

   GetTextSize(row: TRow, col: TCol) : number;
   GetTextSize(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetTextSize as any).apply(grid,args); }

   GetTextStyle(row: TRow, col: TCol, bits?: number) : number;
   GetTextStyle(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetTextStyle as any).apply(grid,args); }

   GetTool(toolbar: TToolbar|string, id: string) : TTool|null;
   GetTool(id: string) : TTool|null;
   GetTool(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetTool as any).apply(grid,args); }

   GetToolbar(id: string) : TToolbar|null;
   GetToolbar(cell: TTool) : TToolbar|null;
   GetToolbar(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetToolbar as any).apply(grid,args); }

   GetTreeCol(row: TRow) : TCol|null;
   GetTreeCol(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetTreeCol as any).apply(grid,args); }

   GetType(row: TRow, col: TCol) : number;
   GetType(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetType as any).apply(grid,args); }

   GetUndo() : object;
   GetUndo(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetUndo as any).apply(grid,args); }

   GetUsedFormats(type?: number) : any;
   GetUsedFormats(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetUsedFormats as any).apply(grid,args); }

   GetValue(row: TRow, col: TCol, direct?: number) : any;
   GetValue(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetValue as any).apply(grid,args); }

   GetValueSimple(row: TRow, col: TCol) : any;
   GetValueSimple(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetValueSimple as any).apply(grid,args); }

   GetVertAlign(row: TRow, col: TCol) : number;
   GetVertAlign(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetVertAlign as any).apply(grid,args); }

   GetWidth(col: TCol) : number;
   GetWidth(...args:any[]) : any { const grid = this.requireGrid(); return (grid.GetWidth as any).apply(grid,args); }

   HasColTree() : number|boolean;
   HasColTree(...args:any[]) : any { const grid = this.requireGrid(); return (grid.HasColTree as any).apply(grid,args); }

   HasEdit() : number;
   HasEdit(...args:any[]) : any { const grid = this.requireGrid(); return (grid.HasEdit as any).apply(grid,args); }

   HasErrors() : number;
   HasErrors(...args:any[]) : any { const grid = this.requireGrid(); return (grid.HasErrors as any).apply(grid,args); }

   HasFilter(part?: string, type?: number) : number|boolean;
   HasFilter(...args:any[]) : any { const grid = this.requireGrid(); return (grid.HasFilter as any).apply(grid,args); }

   HasFilterAction() : number|boolean;
   HasFilterAction(...args:any[]) : any { const grid = this.requireGrid(); return (grid.HasFilterAction as any).apply(grid,args); }

   HasChanges() : number|boolean;
   HasChanges(...args:any[]) : any { const grid = this.requireGrid(); return (grid.HasChanges as any).apply(grid,args); }

   HasRowTree() : number|boolean;
   HasRowTree(...args:any[]) : any { const grid = this.requireGrid(); return (grid.HasRowTree as any).apply(grid,args); }

   Hide(src?: TRow|TCol|TRow[]|TCol[], hide?: number, options?: number, type?: number) : TRow|TCol|TRow[]|TCol[]|null;
   Hide(...args:any[]) : any { const grid = this.requireGrid(); return (grid.Hide as any).apply(grid,args); }

   HideGrid(clearhtml?: number|boolean, closedialog?: number) : number|boolean;
   HideGrid(...args:any[]) : any { const grid = this.requireGrid(); return (grid.HideGrid as any).apply(grid,args); }

   HideMessage(now?: number|boolean) : void;
   HideMessage(...args:any[]) : any { const grid = this.requireGrid(); return (grid.HideMessage as any).apply(grid,args); }

   HidePart(part: object|string, hide?: number|boolean) : void;
   HidePart(...args:any[]) : any { const grid = this.requireGrid(); return (grid.HidePart as any).apply(grid,args); }

   HideTip(noanimate?: number|boolean) : void;
   HideTip(...args:any[]) : any { const grid = this.requireGrid(); return (grid.HideTip as any).apply(grid,args); }

   HideTool(cell: TTool, hide?: number|boolean) : number|boolean;
   HideTool(...args:any[]) : any { const grid = this.requireGrid(); return (grid.HideTool as any).apply(grid,args); }

   HideToolbar(toolbar: TToolbar, hide?: number|boolean) : number|boolean;
   HideToolbar(...args:any[]) : any { const grid = this.requireGrid(); return (grid.HideToolbar as any).apply(grid,args); }

   ChangeBool(row: TRow, col: TCol, cycle?: number, changes?: number) : number|boolean;
   ChangeBool(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ChangeBool as any).apply(grid,args); }

   ChangeFilter(cols?: any[], values?: string[]|string, operators?: string[]|string, row?: TRow, clear?: number) : void;
   ChangeFilter(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ChangeFilter as any).apply(grid,args); }

   Indent(src?: TRow|TCol|TRow[]|TCol[], level?: number, options?: number, hidden?: number) : TRow|TCol|TRow[]|TCol[]|null;
   Indent(...args:any[]) : any { const grid = this.requireGrid(); return (grid.Indent as any).apply(grid,args); }

   InsertEditText(text?: string, select?: number|boolean) : void;
   InsertEditText(...args:any[]) : any { const grid = this.requireGrid(); return (grid.InsertEditText as any).apply(grid,args); }

   IsBusy() : number;
   IsBusy(...args:any[]) : any { const grid = this.requireGrid(); return (grid.IsBusy as any).apply(grid,args); }

   IsCol(col: object) : number|boolean;
   IsCol(...args:any[]) : any { const grid = this.requireGrid(); return (grid.IsCol as any).apply(grid,args); }

   IsCollapsed(src: TRow|TCol) : number|boolean;
   IsCollapsed(...args:any[]) : any { const grid = this.requireGrid(); return (grid.IsCollapsed as any).apply(grid,args); }

   IsDeleted(item: TRow|TCol) : number|boolean;
   IsDeleted(...args:any[]) : any { const grid = this.requireGrid(); return (grid.IsDeleted as any).apply(grid,args); }

   IsFocused(row?: TRow, col?: TCol) : number;
   IsFocused(...args:any[]) : any { const grid = this.requireGrid(); return (grid.IsFocused as any).apply(grid,args); }

   IsHidden(item: TRow|TCol|TToolbar) : number;
   IsHidden(...args:any[]) : any { const grid = this.requireGrid(); return (grid.IsHidden as any).apply(grid,args); }

   IsLocked(lock?: string, all?: number|boolean) : number|boolean;
   IsLocked(...args:any[]) : any { const grid = this.requireGrid(); return (grid.IsLocked as any).apply(grid,args); }

   IsRow(row: object) : number|boolean;
   IsRow(...args:any[]) : any { const grid = this.requireGrid(); return (grid.IsRow as any).apply(grid,args); }

   IsSelected(item: TRow|TCol) : number|boolean;
   IsSelected(...args:any[]) : any { const grid = this.requireGrid(); return (grid.IsSelected as any).apply(grid,args); }

   IsTool(tool: object) : number|boolean;
   IsTool(...args:any[]) : any { const grid = this.requireGrid(); return (grid.IsTool as any).apply(grid,args); }

   IsToolbar(toolbar: object) : number|boolean;
   IsToolbar(...args:any[]) : any { const grid = this.requireGrid(); return (grid.IsToolbar as any).apply(grid,args); }

   Iter(item: TRow|TCol|string, func?: any, type?: number, rev?: number, max?: number, next?: TRow|TCol, set?: string|number) : any;
   Iter(...args:any[]) : any { const grid = this.requireGrid(); return (grid.Iter as any).apply(grid,args); }

   IterAll(part?: string, func?: any) : any;
   IterAll(...args:any[]) : any { const grid = this.requireGrid(); return (grid.IterAll as any).apply(grid,args); }

   IterFocus(func: any, visible?: number|boolean) : number|boolean;
   IterFocus(...args:any[]) : any { const grid = this.requireGrid(); return (grid.IterFocus as any).apply(grid,args); }

   IterChildren(item: TRow|TCol, func?: any, type?: number, rev?: number, max?: number) : any;
   IterChildren(...args:any[]) : any { const grid = this.requireGrid(); return (grid.IterChildren as any).apply(grid,args); }

   IterSheets(func: any, parameters?: any[], type?: number) : void;
   IterSheets(...args:any[]) : any { const grid = this.requireGrid(); return (grid.IterSheets as any).apply(grid,args); }

   IterSimple(item: TRow|TCol, func?: any, include?: number|boolean) : any;
   IterSimple(...args:any[]) : any { const grid = this.requireGrid(); return (grid.IterSimple as any).apply(grid,args); }

   Later(func: any, parameters?: any[], name?: string) : void;
   Later(...args:any[]) : any { const grid = this.requireGrid(); return (grid.Later as any).apply(grid,args); }

   LaterPaint(func: any, parameters?: any[], name?: string) : void;
   LaterPaint(...args:any[]) : any { const grid = this.requireGrid(); return (grid.LaterPaint as any).apply(grid,args); }

   LoadAllChildren(func: any) : number|boolean;
   LoadAllChildren(...args:any[]) : any { const grid = this.requireGrid(); return (grid.LoadAllChildren as any).apply(grid,args); }

   LoadCookie(action?: number, id?: string, version?: string) : any;
   LoadCookie(...args:any[]) : any { const grid = this.requireGrid(); return (grid.LoadCookie as any).apply(grid,args); }

   LoadData(src: any, onfinish?: any, progress?: any) : void;
   LoadData(...args:any[]) : any { const grid = this.requireGrid(); return (grid.LoadData as any).apply(grid,args); }

   LoadChildren(rows: TRow|TRow[], func: any) : void;
   LoadChildren(...args:any[]) : any { const grid = this.requireGrid(); return (grid.LoadChildren as any).apply(grid,args); }

   LoadMenu(row: TRow, col: TCol, func: any, attr?: string) : void;
   LoadMenu(...args:any[]) : any { const grid = this.requireGrid(); return (grid.LoadMenu as any).apply(grid,args); }

   MergeBooks(grid: TGrid) : void;
   MergeBooks(...args:any[]) : any { const grid = this.requireGrid(); return (grid.MergeBooks as any).apply(grid,args); }

   MergeD(defs: string[]|string, Def?: object, id?: string) : string;
   MergeD(...args:any[]) : any { const grid = this.requireGrid(); return (grid.MergeD as any).apply(grid,args); }

   MergeUndo() : void;
   MergeUndo(...args:any[]) : any { const grid = this.requireGrid(); return (grid.MergeUndo as any).apply(grid,args); }

   MoveImage(index: number, row: TRow, col: TCol, x?: number, y?: number, togrid?: TGrid, options?: number) : number;
   MoveImage(...args:any[]) : any { const grid = this.requireGrid(); return (grid.MoveImage as any).apply(grid,args); }

   MoveSheet(next: TGrid) : void;
   MoveSheet(...args:any[]) : any { const grid = this.requireGrid(); return (grid.MoveSheet as any).apply(grid,args); }

   NumberToString(number: number, format?: string, range?: number, type?: number) : string;
   NumberToString(...args:any[]) : any { const grid = this.requireGrid(); return (grid.NumberToString as any).apply(grid,args); }

   Paint() : void;
   Paint(...args:any[]) : any { const grid = this.requireGrid(); return (grid.Paint as any).apply(grid,args); }

   ParseExportItems(items: any, cols: number|boolean, attr: string, max: number, obj: number|boolean) : string[]|string;
   ParseExportItems(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ParseExportItems as any).apply(grid,args); }

   Print(width?: number, height?: number, fit?: number, test?: any) : any;
   Print(...args:any[]) : any { const grid = this.requireGrid(); return (grid.Print as any).apply(grid,args); }

   Recalculate(row?: TRow) : void;
   Recalculate(...args:any[]) : any { const grid = this.requireGrid(); return (grid.Recalculate as any).apply(grid,args); }

   RecalcWidth(col: TCol) : number|boolean;
   RecalcWidth(...args:any[]) : any { const grid = this.requireGrid(); return (grid.RecalcWidth as any).apply(grid,args); }

   ReFilter(part?: string) : void;
   ReFilter(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ReFilter as any).apply(grid,args); }

   ReGroup(part?: string) : void;
   ReGroup(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ReGroup as any).apply(grid,args); }

   Reload(src?: any, type?: number, onfinish?: any, transparent?: number|boolean) : void;
   Reload(...args:any[]) : any { const grid = this.requireGrid(); return (grid.Reload as any).apply(grid,args); }

   RemoveImage(index: number, count?: number) : number|boolean;
   RemoveImage(...args:any[]) : any { const grid = this.requireGrid(); return (grid.RemoveImage as any).apply(grid,args); }

   RemoveLastUndo(count?: number) : void;
   RemoveLastUndo(...args:any[]) : any { const grid = this.requireGrid(); return (grid.RemoveLastUndo as any).apply(grid,args); }

   RemovePart(part: string) : void;
   RemovePart(...args:any[]) : any { const grid = this.requireGrid(); return (grid.RemovePart as any).apply(grid,args); }

   RemoveTool(cell: TTool) : number|boolean;
   RemoveTool(...args:any[]) : any { const grid = this.requireGrid(); return (grid.RemoveTool as any).apply(grid,args); }

   RemoveToolbar(toolbar: TToolbar) : number|boolean;
   RemoveToolbar(...args:any[]) : any { const grid = this.requireGrid(); return (grid.RemoveToolbar as any).apply(grid,args); }

   Render(tag: any) : number|boolean;
   Render(...args:any[]) : any { const grid = this.requireGrid(); return (grid.Render as any).apply(grid,args); }

   Repaint(part?: any, clear?: number) : void;
   Repaint(...args:any[]) : any { const grid = this.requireGrid(); return (grid.Repaint as any).apply(grid,args); }

   RepaintToolbars(clear?: number) : void;
   RepaintToolbars(...args:any[]) : any { const grid = this.requireGrid(); return (grid.RepaintToolbars as any).apply(grid,args); }

   ResizeImage(index: number, width: number, height: number, cx?: number, cy?: number, cwidth?: number, cheight?: number, changes?: number|boolean) : number|boolean;
   ResizeImage(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ResizeImage as any).apply(grid,args); }

   ReSort(part?: string) : void;
   ReSort(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ReSort as any).apply(grid,args); }

   Save(validate?: number) : number|boolean;
   Save(...args:any[]) : any { const grid = this.requireGrid(); return (grid.Save as any).apply(grid,args); }

   SaveCookie(action?: number, id?: string, version?: string) : number|boolean;
   SaveCookie(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SaveCookie as any).apply(grid,args); }

   ScrollIntoView(row?: TRow, col?: TCol, range?: object, scroll?: number) : number|boolean;
   ScrollIntoView(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ScrollIntoView as any).apply(grid,args); }

   Search(text?: any, action?: string, compare?: number, type?: number, multi?: number, options?: number, focuscol?: TCol|string, row?: TRow, col?: TCol) : number|boolean;
   Search(...args:any[]) : any { const grid = this.requireGrid(); return (grid.Search as any).apply(grid,args); }

   Select(src?: TRow|TCol|TRow[]|TCol[], sel?: number) : TRow|TCol|TRow[]|TCol[]|null;
   Select(...args:any[]) : any { const grid = this.requireGrid(); return (grid.Select as any).apply(grid,args); }

   SelectEdit(start?: number, end?: number) : void;
   SelectEdit(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SelectEdit as any).apply(grid,args); }

   Set(row: any, col: any, attr: any, value: any, changes?: number) : number;
   Set(...args:any[]) : any { const grid = this.requireGrid(); return (grid.Set as any).apply(grid,args); }

   SetAlternate(part?: any, alternate?: number, alternatecount?: number, alternatestart?: number, alternatetype?: number, newsheet?: number) : void;
   SetAlternate(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetAlternate as any).apply(grid,args); }

   SetAttr(row: TRow, col: TCol, attr: string, value: any, changes?: number) : number|boolean;
   SetAttr(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetAttr as any).apply(grid,args); }

   SetBookAttr(attr: string, value: any, share?: number|boolean) : number|boolean;
   SetBookAttr(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetBookAttr as any).apply(grid,args); }

   SetBool(row: TRow, col: TCol, value?: number, changes?: number) : number|boolean;
   SetBool(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetBool as any).apply(grid,args); }

   SetCfgAttr(attr: string, value: any) : number|boolean;
   SetCfgAttr(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetCfgAttr as any).apply(grid,args); }

   SetCookieId(id: string) : void;
   SetCookieId(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetCookieId as any).apply(grid,args); }

   SetCustomScroll(scroll?: number, width?: number) : void;
   SetCustomScroll(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetCustomScroll as any).apply(grid,args); }

   SetD(row: TRow, col: TCol, def: string, changes?: number) : number|boolean;
   SetD(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetD as any).apply(grid,args); }

   SetDefAttr(type: string, id: string, attr: string, value: any) : number|boolean;
   SetDefAttr(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetDefAttr as any).apply(grid,args); }

   SetDraggingToolbars(value: number) : void;
   SetDraggingToolbars(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetDraggingToolbars as any).apply(grid,args); }

   SetEditValue(text: string) : void;
   SetEditValue(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetEditValue as any).apply(grid,args); }

   SetError(row: TRow, col: TCol, error: any) : void;
   SetError(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetError as any).apply(grid,args); }

   SetFilter(name: string, filter?: string, part?: string) : void;
   SetFilter(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetFilter as any).apply(grid,args); }

   SetFilterAction(action: number, item?: object, clear?: number|boolean) : void;
   SetFilterAction(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetFilterAction as any).apply(grid,args); }

   SetFocus(row?: TRow, col?: TCol, range?: object, action?: number, scroll?: number, options?: number) : number;
   SetFocus(cells: string, rowpart?: string, colpart?: string, action?: number, scroll?: number, options?: number) : number;
   SetFocus(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetFocus as any).apply(grid,args); }

   SetFocused() : number|boolean;
   SetFocused(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetFocused as any).apply(grid,args); }

   SetFormula(row: TRow, col: TCol, formula: string, changes?: number) : number|boolean;
   SetFormula(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetFormula as any).apply(grid,args); }

   SetFormulaLocal(value: number) : number|boolean;
   SetFormulaLocal(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetFormulaLocal as any).apply(grid,args); }

   SetGridId(id: string, update?: number|boolean) : void;
   SetGridId(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetGridId as any).apply(grid,args); }

   SetGroup(group?: string, part?: string) : void;
   SetGroup(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetGroup as any).apply(grid,args); }

   SetHeight(row: TRow, height: number, changes?: number|boolean) : number|boolean;
   SetHeight(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetHeight as any).apply(grid,args); }

   SetHideGroupCols(value: number) : void;
   SetHideGroupCols(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetHideGroupCols as any).apply(grid,args); }

   SetHighlight(highlight: string, id?: string, Add?: number|boolean) : number|boolean;
   SetHighlight(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetHighlight as any).apply(grid,args); }

   SetHoverImage(value?: number, always?: number|boolean) : object;
   SetHoverImage(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetHoverImage as any).apply(grid,args); }

   SetImageAttr(index: number, attr: string, value?: any, changes?: number|boolean) : number|boolean;
   SetImageAttr(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetImageAttr as any).apply(grid,args); }

   SetIME(ime: number|boolean) : number|boolean;
   SetIME(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetIME as any).apply(grid,args); }

   SetLanguage(language: string) : number|boolean;
   SetLanguage(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetLanguage as any).apply(grid,args); }

   SetLock(lock: string, clear?: number) : void;
   SetLock(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetLock as any).apply(grid,args); }

   SetMarks(row: TRow, col: TCol, value: string) : number|boolean;
   SetMarks(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetMarks as any).apply(grid,args); }

   SetNames(NewNames?: object[], OldNames?: object[], changes?: number) : number|boolean;
   SetNames(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetNames as any).apply(grid,args); }

   SetNewSheetAttr(attr: string, value: any, share?: number|boolean, item?: any) : void;
   SetNewSheetAttr(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetNewSheetAttr as any).apply(grid,args); }

   SetPartAttr(part: string, attr: string, value: any, set?: string) : number|boolean;
   SetPartAttr(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetPartAttr as any).apply(grid,args); }

   SetPartHeight(part: string, height: number, max?: number|boolean) : void;
   SetPartHeight(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetPartHeight as any).apply(grid,args); }

   SetPartWidth(part: string, width: number, max?: number|boolean) : void;
   SetPartWidth(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetPartWidth as any).apply(grid,args); }

   SetResult(row: TRow, col: TCol, value?: any, always?: number, attr?: string) : number|boolean;
   SetResult(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetResult as any).apply(grid,args); }

   SetReversedTree(value: number) : number|boolean;
   SetReversedTree(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetReversedTree as any).apply(grid,args); }

   SetRowHeight(rowheight: number) : void;
   SetRowHeight(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetRowHeight as any).apply(grid,args); }

   SetRowId(row: TRow, id: string|number) : number|boolean;
   SetRowId(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetRowId as any).apply(grid,args); }

   SetScrollLeft(part: string, scroll: number) : number;
   SetScrollLeft(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetScrollLeft as any).apply(grid,args); }

   SetScrollTop(part: string, scroll: number) : number;
   SetScrollTop(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetScrollTop as any).apply(grid,args); }

   SetSet(row: TRow, set?: string) : number|boolean;
   SetSet(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetSet as any).apply(grid,args); }

   SetShowPrintPageBreaks(value: number, always?: number|boolean) : void;
   SetShowPrintPageBreaks(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetShowPrintPageBreaks as any).apply(grid,args); }

   SetSort(sort?: string, part?: string) : void;
   SetSort(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetSort as any).apply(grid,args); }

   SetString(row: TRow, col: TCol, value: string, changes?: number) : number|boolean;
   SetString(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetString as any).apply(grid,args); }

   SetStyle(style?: string, styleicons?: string) : number|boolean;
   SetStyle(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetStyle as any).apply(grid,args); }

   SetTagAttr(tag: string, attr: string, value: any) : number|boolean;
   SetTagAttr(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetTagAttr as any).apply(grid,args); }

   SetTextSize(value: number) : void;
   SetTextSize(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetTextSize as any).apply(grid,args); }

   SetTipAction(value?: number) : void;
   SetTipAction(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetTipAction as any).apply(grid,args); }

   SetTree(part: string, col: string|TCol) : number|boolean;
   SetTree(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetTree as any).apply(grid,args); }

   SetUndo(undo: string[]|string) : void;
   SetUndo(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetUndo as any).apply(grid,args); }

   SetValue(row: TRow, col: TCol, value: any, changes?: number, compare?: number|boolean, fast?: number) : number|boolean;
   SetValue(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetValue as any).apply(grid,args); }

   SetWidth(col: TCol, width: number, changes?: number|boolean) : number|boolean;
   SetWidth(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetWidth as any).apply(grid,args); }

   SetZoom(zoom?: number) : void;
   SetZoom(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SetZoom as any).apply(grid,args); }

   ShowCalendar(row: TRow, col: TCol) : any;
   ShowCalendar(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ShowCalendar as any).apply(grid,args); }

   ShowDeleted(show: number|boolean, cols?: number|boolean) : number|boolean;
   ShowDeleted(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ShowDeleted as any).apply(grid,args); }

   ShowDialog(row?: TRow, col?: TCol, dialog?: any) : TGrid|null;
   ShowDialog(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ShowDialog as any).apply(grid,args); }

   ShowFilterMenu(row: TRow, col: TCol) : number|boolean;
   ShowFilterMenu(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ShowFilterMenu as any).apply(grid,args); }

   ShowGrid() : number|boolean;
   ShowGrid(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ShowGrid as any).apply(grid,args); }

   ShowHidden(show: number|boolean, cols?: number|boolean) : number|boolean;
   ShowHidden(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ShowHidden as any).apply(grid,args); }

   ShowList(row: TRow, col: TCol) : any|number|boolean;
   ShowList(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ShowList as any).apply(grid,args); }

   ShowMenu(row: TRow, col: TCol, menu?: any, def?: string, type?: number) : any;
   ShowMenu(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ShowMenu as any).apply(grid,args); }

   ShowMessage(message: any, _default?: string, func?: any, translate?: object) : number|boolean;
   ShowMessage(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ShowMessage as any).apply(grid,args); }

   ShowMessageLater(laterfunc: any, parameters: any[], message: any, _default?: string, func?: any, translate?: object) : number|boolean;
   ShowMessageLater(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ShowMessageLater as any).apply(grid,args); }

   ShowTip(row: TRow, col: TCol, tip: string, tipplace?: object) : void;
   ShowTip(...args:any[]) : any { const grid = this.requireGrid(); return (grid.ShowTip as any).apply(grid,args); }

   SortClick(row: TRow|TCol, col: TCol|TRow, direction?: number|boolean, sorttype?: number) : void;
   SortClick(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SortClick as any).apply(grid,args); }

   Span(row1: TRow, col1: TCol, row2: TRow, col2: TCol, split?: number|boolean, changes?: number|boolean) : number|boolean;
   Span(...args:any[]) : any { const grid = this.requireGrid(); return (grid.Span as any).apply(grid,args); }

   SplitCell(row: TRow, col: TCol, changes?: number|boolean) : number|boolean;
   SplitCell(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SplitCell as any).apply(grid,args); }

   StartEdit(row?: TRow, col?: TCol, empty?: number|boolean) : number|boolean;
   StartEdit(...args:any[]) : any { const grid = this.requireGrid(); return (grid.StartEdit as any).apply(grid,args); }

   StringToDate(string: string, format?: string, range?: number, type?: number, _default?: any) : number;
   StringToDate(...args:any[]) : any { const grid = this.requireGrid(); return (grid.StringToDate as any).apply(grid,args); }

   StringToNumber(string: string, format?: string, range?: number, type?: number) : number;
   StringToNumber(...args:any[]) : any { const grid = this.requireGrid(); return (grid.StringToNumber as any).apply(grid,args); }

   SwitchDraggingToolbars(all?: number|boolean) : void;
   SwitchDraggingToolbars(...args:any[]) : any { const grid = this.requireGrid(); return (grid.SwitchDraggingToolbars as any).apply(grid,args); }

   Translate(text: string, type?: number, separator?: string, param?: object) : string;
   Translate(...args:any[]) : any { const grid = this.requireGrid(); return (grid.Translate as any).apply(grid,args); }

   Update(type?: number, event?: Event) : void;
   Update(...args:any[]) : any { const grid = this.requireGrid(); return (grid.Update as any).apply(grid,args); }

   UpdateAsDialog(type?: number) : void;
   UpdateAsDialog(...args:any[]) : any { const grid = this.requireGrid(); return (grid.UpdateAsDialog as any).apply(grid,args); }

   UpdateMargin(part?: any, clear?: number|boolean) : void;
   UpdateMargin(...args:any[]) : any { const grid = this.requireGrid(); return (grid.UpdateMargin as any).apply(grid,args); }
}