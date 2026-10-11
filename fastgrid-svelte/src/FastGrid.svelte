<script>
import { afterUpdate, onMount, tick } from "svelte";

export let src;
export let id = undefined;
export let component = undefined;
let grid = null, root = null, mounted = false, disposed = false, createToken = 0, lastSrc = null;

function isListener(name,value) { return name.startsWith("on") && name!="on" && typeof(value)==="function"; }
function listenerToFastGridEvent(name) { return isListener(name,$$restProps[name]) ? "On"+name.slice(2) : null; }
function requireGrid(){ if(!grid) throw new Error("FastGrid is not initialized yet."); return grid; }
export function getGrid() { return grid; }
export function dispose() { if(grid){ grid.Dispose(1); grid = null; } }
export async function reload(nextSrc = src,type,onfinish,transparent){
   if(!grid){ await createGrid(); return grid; }
   grid.Reload(globalThis.FGrid.RunSources(nextSrc),type,onfinish,transparent);
   return grid;
   }

// FASTGRID_API_METHODS_START
export function AIGetFilter(...args){ return requireGrid().AIGetFilter(...args); }
export function AIAddColsAttrs(...args){ return requireGrid().AIAddColsAttrs(...args); }
export function AISend(...args){ return requireGrid().AISend(...args); }
export function AICancel(...args){ return requireGrid().AICancel(...args); }
export function AIGetTime(...args){ return requireGrid().AIGetTime(...args); }
export function AIGetInputHistory(...args){ return requireGrid().AIGetInputHistory(...args); }
export function AIAddToInputHistory(...args){ return requireGrid().AIAddToInputHistory(...args); }
export function AISetInput(...args){ return requireGrid().AISetInput(...args); }
export function AIGetCredit(...args){ return requireGrid().AIGetCredit(...args); }
export function AISetCredit(...args){ return requireGrid().AISetCredit(...args); }
export function AIEnterCredit(...args){ return requireGrid().AIEnterCredit(...args); }
export function Iter(...args){ return requireGrid().Iter(...args); }
export function IterChildren(...args){ return requireGrid().IterChildren(...args); }
export function IterSimple(...args){ return requireGrid().IterSimple(...args); }
export function IterAll(...args){ return requireGrid().IterAll(...args); }
export function Count(...args){ return requireGrid().Count(...args); }
export function GetFirst(...args){ return requireGrid().GetFirst(...args); }
export function GetFirstVisible(...args){ return requireGrid().GetFirstVisible(...args); }
export function GetLast(...args){ return requireGrid().GetLast(...args); }
export function GetLastVisible(...args){ return requireGrid().GetLastVisible(...args); }
export function GetNext(...args){ return requireGrid().GetNext(...args); }
export function GetNextVisible(...args){ return requireGrid().GetNextVisible(...args); }
export function GetPrev(...args){ return requireGrid().GetPrev(...args); }
export function GetPrevVisible(...args){ return requireGrid().GetPrevVisible(...args); }
export function GetFirstChild(...args){ return requireGrid().GetFirstChild(...args); }
export function GetLastChild(...args){ return requireGrid().GetLastChild(...args); }
export function GetParent(...args){ return requireGrid().GetParent(...args); }
export function GetFirstView(...args){ return requireGrid().GetFirstView(...args); }
export function GetLastView(...args){ return requireGrid().GetLastView(...args); }
export function GetOnPoint(...args){ return requireGrid().GetOnPoint(...args); }
export function Paint(...args){ return requireGrid().Paint(...args); }
export function Repaint(...args){ return requireGrid().Repaint(...args); }
export function RepaintToolbars(...args){ return requireGrid().RepaintToolbars(...args); }
export function FullRepaint(...args){ return requireGrid().FullRepaint(...args); }
export function Update(...args){ return requireGrid().Update(...args); }
export function Later(...args){ return requireGrid().Later(...args); }
export function LaterPaint(...args){ return requireGrid().LaterPaint(...args); }
export function Get(...args){ return requireGrid().Get(...args); }
export function Set(...args){ return requireGrid().Set(...args); }
export function GetValue(...args){ return requireGrid().GetValue(...args); }
export function GetValueSimple(...args){ return requireGrid().GetValueSimple(...args); }
export function GetValueOrig(...args){ return requireGrid().GetValueOrig(...args); }
export function GetNumber(...args){ return requireGrid().GetNumber(...args); }
export function GetRange(...args){ return requireGrid().GetRange(...args); }
export function GetNumbers(...args){ return requireGrid().GetNumbers(...args); }
export function GetString(...args){ return requireGrid().GetString(...args); }
export function SetValue(...args){ return requireGrid().SetValue(...args); }
export function SetString(...args){ return requireGrid().SetString(...args); }
export function ActionClearValue(...args){ return requireGrid().ActionClearValue(...args); }
export function ActionSetCase(...args){ return requireGrid().ActionSetCase(...args); }
export function GetAttr(...args){ return requireGrid().GetAttr(...args); }
export function GetAttrs(...args){ return requireGrid().GetAttrs(...args); }
export function SetAttr(...args){ return requireGrid().SetAttr(...args); }
export function ClearAttr(...args){ return requireGrid().ClearAttr(...args); }
export function GetCfgAttr(...args){ return requireGrid().GetCfgAttr(...args); }
export function SetCfgAttr(...args){ return requireGrid().SetCfgAttr(...args); }
export function SetBookAttr(...args){ return requireGrid().SetBookAttr(...args); }
export function SetNewSheetAttr(...args){ return requireGrid().SetNewSheetAttr(...args); }
export function GetTagAttr(...args){ return requireGrid().GetTagAttr(...args); }
export function SetTagAttr(...args){ return requireGrid().SetTagAttr(...args); }
export function SetIME(...args){ return requireGrid().SetIME(...args); }
export function ActionEdit(...args){ return requireGrid().ActionEdit(...args); }
export function ActionFocusEdit(...args){ return requireGrid().ActionFocusEdit(...args); }
export function ActionEndEdit(...args){ return requireGrid().ActionEndEdit(...args); }
export function ActionSetNoEdit(...args){ return requireGrid().ActionSetNoEdit(...args); }
export function ActionOnChange(...args){ return requireGrid().ActionOnChange(...args); }
export function StartEdit(...args){ return requireGrid().StartEdit(...args); }
export function EndEdit(...args){ return requireGrid().EndEdit(...args); }
export function HasEdit(...args){ return requireGrid().HasEdit(...args); }
export function GetEdit(...args){ return requireGrid().GetEdit(...args); }
export function ActionSelectEdit(...args){ return requireGrid().ActionSelectEdit(...args); }
export function SelectEdit(...args){ return requireGrid().SelectEdit(...args); }
export function InsertEditText(...args){ return requireGrid().InsertEditText(...args); }
export function GetEditValue(...args){ return requireGrid().GetEditValue(...args); }
export function SetEditValue(...args){ return requireGrid().SetEditValue(...args); }
export function ActionOnEditChange(...args){ return requireGrid().ActionOnEditChange(...args); }
export function ActionValidate(...args){ return requireGrid().ActionValidate(...args); }
export function GetError(...args){ return requireGrid().GetError(...args); }
export function SetError(...args){ return requireGrid().SetError(...args); }
export function GetErrors(...args){ return requireGrid().GetErrors(...args); }
export function HasErrors(...args){ return requireGrid().HasErrors(...args); }
export function ClearErrors(...args){ return requireGrid().ClearErrors(...args); }
export function GetMarks(...args){ return requireGrid().GetMarks(...args); }
export function SetMarks(...args){ return requireGrid().SetMarks(...args); }
export function GetLastImage(...args){ return requireGrid().GetLastImage(...args); }
export function FindImages(...args){ return requireGrid().FindImages(...args); }
export function GetImageAttr(...args){ return requireGrid().GetImageAttr(...args); }
export function SetImageAttr(...args){ return requireGrid().SetImageAttr(...args); }
export function GetImageSize(...args){ return requireGrid().GetImageSize(...args); }
export function MoveImage(...args){ return requireGrid().MoveImage(...args); }
export function ResizeImage(...args){ return requireGrid().ResizeImage(...args); }
export function AddImage(...args){ return requireGrid().AddImage(...args); }
export function DeleteImage(...args){ return requireGrid().DeleteImage(...args); }
export function RemoveImage(...args){ return requireGrid().RemoveImage(...args); }
export function ActionDragImage(...args){ return requireGrid().ActionDragImage(...args); }
export function ActionResizeImage(...args){ return requireGrid().ActionResizeImage(...args); }
export function ActionRotateImage(...args){ return requireGrid().ActionRotateImage(...args); }
export function ActionClipImage(...args){ return requireGrid().ActionClipImage(...args); }
export function ActionImageToFront(...args){ return requireGrid().ActionImageToFront(...args); }
export function ActionResetImage(...args){ return requireGrid().ActionResetImage(...args); }
export function ActionOpenImage(...args){ return requireGrid().ActionOpenImage(...args); }
export function ActionDeleteImage(...args){ return requireGrid().ActionDeleteImage(...args); }
export function ActionEnterImageOpacity(...args){ return requireGrid().ActionEnterImageOpacity(...args); }
export function ActionEnterImageLink(...args){ return requireGrid().ActionEnterImageLink(...args); }
export function ActionShowImageLink(...args){ return requireGrid().ActionShowImageLink(...args); }
export function ActionShowLink(...args){ return requireGrid().ActionShowLink(...args); }
export function ActionEnterLink(...args){ return requireGrid().ActionEnterLink(...args); }
export function ActionOnTip(...args){ return requireGrid().ActionOnTip(...args); }
export function ShowTip(...args){ return requireGrid().ShowTip(...args); }
export function HideTip(...args){ return requireGrid().HideTip(...args); }
export function ActionShowTip(...args){ return requireGrid().ActionShowTip(...args); }
export function EditTip(...args){ return requireGrid().EditTip(...args); }
export function ActionEditTip(...args){ return requireGrid().ActionEditTip(...args); }
export function SetTipAction(...args){ return requireGrid().SetTipAction(...args); }
export function GetStatic(...args){ return requireGrid().GetStatic(...args); }
export function ActionClickButton(...args){ return requireGrid().ActionClickButton(...args); }
export function GetHeight(...args){ return requireGrid().GetHeight(...args); }
export function SetHeight(...args){ return requireGrid().SetHeight(...args); }
export function SetRowHeight(...args){ return requireGrid().SetRowHeight(...args); }
export function GetRowTop(...args){ return requireGrid().GetRowTop(...args); }
export function GetWidth(...args){ return requireGrid().GetWidth(...args); }
export function SetWidth(...args){ return requireGrid().SetWidth(...args); }
export function RecalcWidth(...args){ return requireGrid().RecalcWidth(...args); }
export function GetColLeft(...args){ return requireGrid().GetColLeft(...args); }
export function UpdateMargin(...args){ return requireGrid().UpdateMargin(...args); }
export function GetColSpan(...args){ return requireGrid().GetColSpan(...args); }
export function GetSpanCol(...args){ return requireGrid().GetSpanCol(...args); }
export function GetRowSpan(...args){ return requireGrid().GetRowSpan(...args); }
export function GetSpanRow(...args){ return requireGrid().GetSpanRow(...args); }
export function Span(...args){ return requireGrid().Span(...args); }
export function SplitCell(...args){ return requireGrid().SplitCell(...args); }
export function ActionSpan(...args){ return requireGrid().ActionSpan(...args); }
export function ActionSplit(...args){ return requireGrid().ActionSplit(...args); }
export function SetStyle(...args){ return requireGrid().SetStyle(...args); }
export function GetAlign(...args){ return requireGrid().GetAlign(...args); }
export function ActionSetAlign(...args){ return requireGrid().ActionSetAlign(...args); }
export function GetVertAlign(...args){ return requireGrid().GetVertAlign(...args); }
export function ActionSetVertAlign(...args){ return requireGrid().ActionSetVertAlign(...args); }
export function ActionSetWrap(...args){ return requireGrid().ActionSetWrap(...args); }
export function ActionSetIndent(...args){ return requireGrid().ActionSetIndent(...args); }
export function ActionSetRotate(...args){ return requireGrid().ActionSetRotate(...args); }
export function ActionSetColor(...args){ return requireGrid().ActionSetColor(...args); }
export function ActionSetPattern(...args){ return requireGrid().ActionSetPattern(...args); }
export function GetPatternIcon(...args){ return requireGrid().GetPatternIcon(...args); }
export function ActionSetTextColor(...args){ return requireGrid().ActionSetTextColor(...args); }
export function GetTextLine(...args){ return requireGrid().GetTextLine(...args); }
export function ActionSetUnderline(...args){ return requireGrid().ActionSetUnderline(...args); }
export function ActionSetStrike(...args){ return requireGrid().ActionSetStrike(...args); }
export function ActionSetOverline(...args){ return requireGrid().ActionSetOverline(...args); }
export function ActionSetTextLine(...args){ return requireGrid().ActionSetTextLine(...args); }
export function ActionSetTextShadow(...args){ return requireGrid().ActionSetTextShadow(...args); }
export function GetTextStyle(...args){ return requireGrid().GetTextStyle(...args); }
export function ActionSetBold(...args){ return requireGrid().ActionSetBold(...args); }
export function ActionSetItalic(...args){ return requireGrid().ActionSetItalic(...args); }
export function GetTextFont(...args){ return requireGrid().GetTextFont(...args); }
export function ActionSetTextFont(...args){ return requireGrid().ActionSetTextFont(...args); }
export function GetTextSize(...args){ return requireGrid().GetTextSize(...args); }
export function SetTextSize(...args){ return requireGrid().SetTextSize(...args); }
export function ActionSetTextSize(...args){ return requireGrid().ActionSetTextSize(...args); }
export function ActionClearStyle(...args){ return requireGrid().ActionClearStyle(...args); }
export function ActionSetBorder(...args){ return requireGrid().ActionSetBorder(...args); }
export function SetAlternate(...args){ return requireGrid().SetAlternate(...args); }
export function Animate(...args){ return requireGrid().Animate(...args); }
export function ActionSetFormat(...args){ return requireGrid().ActionSetFormat(...args); }
export function ActionEnterFormat(...args){ return requireGrid().ActionEnterFormat(...args); }
export function GetUsedFormats(...args){ return requireGrid().GetUsedFormats(...args); }
export function GetFormatId(...args){ return requireGrid().GetFormatId(...args); }
export function GetFormatFormat(...args){ return requireGrid().GetFormatFormat(...args); }
export function GetType(...args){ return requireGrid().GetType(...args); }
export function ActionSaveCookie(...args){ return requireGrid().ActionSaveCookie(...args); }
export function ActionLoadCookie(...args){ return requireGrid().ActionLoadCookie(...args); }
export function ActionAddCookie(...args){ return requireGrid().ActionAddCookie(...args); }
export function ActionDeleteCookie(...args){ return requireGrid().ActionDeleteCookie(...args); }
export function ActionResetCookie(...args){ return requireGrid().ActionResetCookie(...args); }
export function SaveCookie(...args){ return requireGrid().SaveCookie(...args); }
export function LoadCookie(...args){ return requireGrid().LoadCookie(...args); }
export function AddCookie(...args){ return requireGrid().AddCookie(...args); }
export function DeleteCookie(...args){ return requireGrid().DeleteCookie(...args); }
export function SetCookieId(...args){ return requireGrid().SetCookieId(...args); }
export function GetCookies(...args){ return requireGrid().GetCookies(...args); }
export function ActionCopy(...args){ return requireGrid().ActionCopy(...args); }
export function CopyToClipboard(...args){ return requireGrid().CopyToClipboard(...args); }
export function ActionPaste(...args){ return requireGrid().ActionPaste(...args); }
export function GetSources(...args){ return requireGrid().GetSources(...args); }
export function IsBusy(...args){ return requireGrid().IsBusy(...args); }
export function AddData(...args){ return requireGrid().AddData(...args); }
export function LoadData(...args){ return requireGrid().LoadData(...args); }
export function Dispose(...args){ return requireGrid().Dispose(...args); }
export function Reload(...args){ return requireGrid().Reload(...args); }
export function ActionReload(...args){ return requireGrid().ActionReload(...args); }
export function Render(...args){ return requireGrid().Render(...args); }
export function HideGrid(...args){ return requireGrid().HideGrid(...args); }
export function ShowGrid(...args){ return requireGrid().ShowGrid(...args); }
export function GetActiveSheet(...args){ return requireGrid().GetActiveSheet(...args); }
export function GetSheets(...args){ return requireGrid().GetSheets(...args); }
export function MoveSheet(...args){ return requireGrid().MoveSheet(...args); }
export function SetGridId(...args){ return requireGrid().SetGridId(...args); }
export function ActionDeleteSheet(...args){ return requireGrid().ActionDeleteSheet(...args); }
export function DeleteSheet(...args){ return requireGrid().DeleteSheet(...args); }
export function ActionAddSheet(...args){ return requireGrid().ActionAddSheet(...args); }
export function AddSheet(...args){ return requireGrid().AddSheet(...args); }
export function CopySheet(...args){ return requireGrid().CopySheet(...args); }
export function IterSheets(...args){ return requireGrid().IterSheets(...args); }
export function GetData(...args){ return requireGrid().GetData(...args); }
export function AcceptChanges(...args){ return requireGrid().AcceptChanges(...args); }
export function HasChanges(...args){ return requireGrid().HasChanges(...args); }
export function ActionSave(...args){ return requireGrid().ActionSave(...args); }
export function Save(...args){ return requireGrid().Save(...args); }
export function LoadChildren(...args){ return requireGrid().LoadChildren(...args); }
export function LoadAllChildren(...args){ return requireGrid().LoadAllChildren(...args); }
export function Debug(...args){ return requireGrid().Debug(...args); }
export function GetD(...args){ return requireGrid().GetD(...args); }
export function SetD(...args){ return requireGrid().SetD(...args); }
export function MergeD(...args){ return requireGrid().MergeD(...args); }
export function GetDefAttr(...args){ return requireGrid().GetDefAttr(...args); }
export function SetDefAttr(...args){ return requireGrid().SetDefAttr(...args); }
export function AddEvent(...args){ return requireGrid().AddEvent(...args); }
export function DelEvent(...args){ return requireGrid().DelEvent(...args); }
export function DisableEvent(...args){ return requireGrid().DisableEvent(...args); }
export function EnableEvent(...args){ return requireGrid().EnableEvent(...args); }
export function ActionExport(...args){ return requireGrid().ActionExport(...args); }
export function GetExport(...args){ return requireGrid().GetExport(...args); }
export function ParseExportItems(...args){ return requireGrid().ParseExportItems(...args); }
export function HasFilter(...args){ return requireGrid().HasFilter(...args); }
export function GetFilter(...args){ return requireGrid().GetFilter(...args); }
export function ChangeFilter(...args){ return requireGrid().ChangeFilter(...args); }
export function ClearFilters(...args){ return requireGrid().ClearFilters(...args); }
export function SetFilter(...args){ return requireGrid().SetFilter(...args); }
export function FilterRange(...args){ return requireGrid().FilterRange(...args); }
export function ReFilter(...args){ return requireGrid().ReFilter(...args); }
export function ShowFilterMenu(...args){ return requireGrid().ShowFilterMenu(...args); }
export function ActionShowFilterMenu(...args){ return requireGrid().ActionShowFilterMenu(...args); }
export function SetFilterAction(...args){ return requireGrid().SetFilterAction(...args); }
export function HasFilterAction(...args){ return requireGrid().HasFilterAction(...args); }
export function ActionFocus(...args){ return requireGrid().ActionFocus(...args); }
export function ActionFocusNext(...args){ return requireGrid().ActionFocusNext(...args); }
export function ActionFocusRow(...args){ return requireGrid().ActionFocusRow(...args); }
export function ActionFocusCol(...args){ return requireGrid().ActionFocusCol(...args); }
export function ActionFocusAll(...args){ return requireGrid().ActionFocusAll(...args); }
export function ActionDragFocus(...args){ return requireGrid().ActionDragFocus(...args); }
export function SetFocus(...args){ return requireGrid().SetFocus(...args); }
export function GetFocus(...args){ return requireGrid().GetFocus(...args); }
export function IsFocused(...args){ return requireGrid().IsFocused(...args); }
export function IterFocus(...args){ return requireGrid().IterFocus(...args); }
export function ScrollIntoView(...args){ return requireGrid().ScrollIntoView(...args); }
export function SetFocused(...args){ return requireGrid().SetFocused(...args); }
export function ClearFocused(...args){ return requireGrid().ClearFocused(...args); }
export function GetHover(...args){ return requireGrid().GetHover(...args); }
export function SetHoverImage(...args){ return requireGrid().SetHoverImage(...args); }
export function SetHighlight(...args){ return requireGrid().SetHighlight(...args); }
export function ClearHighlights(...args){ return requireGrid().ClearHighlights(...args); }
export function GetFormula(...args){ return requireGrid().GetFormula(...args); }
export function SetFormula(...args){ return requireGrid().SetFormula(...args); }
export function CalculateFormula(...args){ return requireGrid().CalculateFormula(...args); }
export function SetFormulaLocal(...args){ return requireGrid().SetFormulaLocal(...args); }
export function ActionChooseCells(...args){ return requireGrid().ActionChooseCells(...args); }
export function GetNames(...args){ return requireGrid().GetNames(...args); }
export function SetNames(...args){ return requireGrid().SetNames(...args); }
export function ActionAddName(...args){ return requireGrid().ActionAddName(...args); }
export function Recalculate(...args){ return requireGrid().Recalculate(...args); }
export function GetResult(...args){ return requireGrid().GetResult(...args); }
export function SetResult(...args){ return requireGrid().SetResult(...args); }
export function SetZoom(...args){ return requireGrid().SetZoom(...args); }
export function ActionDragGrid(...args){ return requireGrid().ActionDragGrid(...args); }
export function ActionScroll(...args){ return requireGrid().ActionScroll(...args); }
export function ActionDragScroll(...args){ return requireGrid().ActionDragScroll(...args); }
export function SetCustomScroll(...args){ return requireGrid().SetCustomScroll(...args); }
export function ApplyMedia(...args){ return requireGrid().ApplyMedia(...args); }
export function GetGroup(...args){ return requireGrid().GetGroup(...args); }
export function SetGroup(...args){ return requireGrid().SetGroup(...args); }
export function ReGroup(...args){ return requireGrid().ReGroup(...args); }
export function SetHideGroupCols(...args){ return requireGrid().SetHideGroupCols(...args); }
export function GetGroupCol(...args){ return requireGrid().GetGroupCol(...args); }
export function GetGroupRow(...args){ return requireGrid().GetGroupRow(...args); }
export function GetGroupPos(...args){ return requireGrid().GetGroupPos(...args); }
export function CreatePivot(...args){ return requireGrid().CreatePivot(...args); }
export function GetPivotGrid(...args){ return requireGrid().GetPivotGrid(...args); }
export function GetPivotSource(...args){ return requireGrid().GetPivotSource(...args); }
export function SetRowId(...args){ return requireGrid().SetRowId(...args); }
export function GetIndex(...args){ return requireGrid().GetIndex(...args); }
export function GetByIndex(...args){ return requireGrid().GetByIndex(...args); }
export function GetRowIndex(...args){ return requireGrid().GetRowIndex(...args); }
export function GetColIndex(...args){ return requireGrid().GetColIndex(...args); }
export function GetName(...args){ return requireGrid().GetName(...args); }
export function ActionImport(...args){ return requireGrid().ActionImport(...args); }
export function MergeBooks(...args){ return requireGrid().MergeBooks(...args); }
export function Translate(...args){ return requireGrid().Translate(...args); }
export function SetLanguage(...args){ return requireGrid().SetLanguage(...args); }
export function GetPartAttr(...args){ return requireGrid().GetPartAttr(...args); }
export function SetPartAttr(...args){ return requireGrid().SetPartAttr(...args); }
export function AddPart(...args){ return requireGrid().AddPart(...args); }
export function RemovePart(...args){ return requireGrid().RemovePart(...args); }
export function HidePart(...args){ return requireGrid().HidePart(...args); }
export function SetPartWidth(...args){ return requireGrid().SetPartWidth(...args); }
export function GetPartWidth(...args){ return requireGrid().GetPartWidth(...args); }
export function GetPartScrollWidth(...args){ return requireGrid().GetPartScrollWidth(...args); }
export function SetPartHeight(...args){ return requireGrid().SetPartHeight(...args); }
export function GetPartHeight(...args){ return requireGrid().GetPartHeight(...args); }
export function GetPartScrollHeight(...args){ return requireGrid().GetPartScrollHeight(...args); }
export function GetScrollLeft(...args){ return requireGrid().GetScrollLeft(...args); }
export function SetScrollLeft(...args){ return requireGrid().SetScrollLeft(...args); }
export function GetScrollTop(...args){ return requireGrid().GetScrollTop(...args); }
export function SetScrollTop(...args){ return requireGrid().SetScrollTop(...args); }
export function GetSet(...args){ return requireGrid().GetSet(...args); }
export function SetSet(...args){ return requireGrid().SetSet(...args); }
export function GetRow(...args){ return requireGrid().GetRow(...args); }
export function IsRow(...args){ return requireGrid().IsRow(...args); }
export function GetCol(...args){ return requireGrid().GetCol(...args); }
export function IsCol(...args){ return requireGrid().IsCol(...args); }
export function GetPart(...args){ return requireGrid().GetPart(...args); }
export function GetPos(...args){ return requireGrid().GetPos(...args); }
export function ComparePos(...args){ return requireGrid().ComparePos(...args); }
export function GetGrid(...args){ return requireGrid().GetGrid(...args); }
export function GetFirstBlock(...args){ return requireGrid().GetFirstBlock(...args); }
export function GetLastBlock(...args){ return requireGrid().GetLastBlock(...args); }
export function ActionAddRow(...args){ return requireGrid().ActionAddRow(...args); }
export function ActionAddRows(...args){ return requireGrid().ActionAddRows(...args); }
export function ActionDrag(...args){ return requireGrid().ActionDrag(...args); }
export function Add(...args){ return requireGrid().Add(...args); }
export function Fix(...args){ return requireGrid().Fix(...args); }
export function ActionFix(...args){ return requireGrid().ActionFix(...args); }
export function ActionDragCell(...args){ return requireGrid().ActionDragCell(...args); }
export function DragCell(...args){ return requireGrid().DragCell(...args); }
export function DragRow(...args){ return requireGrid().DragRow(...args); }
export function DragCol(...args){ return requireGrid().DragCol(...args); }
export function ActionDeleteRow(...args){ return requireGrid().ActionDeleteRow(...args); }
export function ActionDeleteRows(...args){ return requireGrid().ActionDeleteRows(...args); }
export function ActionUndeleteRows(...args){ return requireGrid().ActionUndeleteRows(...args); }
export function Delete(...args){ return requireGrid().Delete(...args); }
export function IsDeleted(...args){ return requireGrid().IsDeleted(...args); }
export function ShowDeleted(...args){ return requireGrid().ShowDeleted(...args); }
export function ClearPart(...args){ return requireGrid().ClearPart(...args); }
export function ActionHideRow(...args){ return requireGrid().ActionHideRow(...args); }
export function ActionHideRows(...args){ return requireGrid().ActionHideRows(...args); }
export function ActionShowRows(...args){ return requireGrid().ActionShowRows(...args); }
export function Hide(...args){ return requireGrid().Hide(...args); }
export function IsHidden(...args){ return requireGrid().IsHidden(...args); }
export function ShowHidden(...args){ return requireGrid().ShowHidden(...args); }
export function ActionSelectRow(...args){ return requireGrid().ActionSelectRow(...args); }
export function ActionSelectRows(...args){ return requireGrid().ActionSelectRows(...args); }
export function ActionDragSelectRows(...args){ return requireGrid().ActionDragSelectRows(...args); }
export function ActionDragSelectCols(...args){ return requireGrid().ActionDragSelectCols(...args); }
export function Select(...args){ return requireGrid().Select(...args); }
export function GetSelected(...args){ return requireGrid().GetSelected(...args); }
export function IsSelected(...args){ return requireGrid().IsSelected(...args); }
export function FillRange(...args){ return requireGrid().FillRange(...args); }
export function IsLocked(...args){ return requireGrid().IsLocked(...args); }
export function GetLock(...args){ return requireGrid().GetLock(...args); }
export function SetLock(...args){ return requireGrid().SetLock(...args); }
export function ActionUndo(...args){ return requireGrid().ActionUndo(...args); }
export function ActionRedo(...args){ return requireGrid().ActionRedo(...args); }
export function ClearUndo(...args){ return requireGrid().ClearUndo(...args); }
export function MergeUndo(...args){ return requireGrid().MergeUndo(...args); }
export function RemoveLastUndo(...args){ return requireGrid().RemoveLastUndo(...args); }
export function GetUndo(...args){ return requireGrid().GetUndo(...args); }
export function SetUndo(...args){ return requireGrid().SetUndo(...args); }
export function ShowDialog(...args){ return requireGrid().ShowDialog(...args); }
export function Accept(...args){ return requireGrid().Accept(...args); }
export function ActionClose(...args){ return requireGrid().ActionClose(...args); }
export function Close(...args){ return requireGrid().Close(...args); }
export function GetParentCell(...args){ return requireGrid().GetParentCell(...args); }
export function UpdateAsDialog(...args){ return requireGrid().UpdateAsDialog(...args); }
export function ActionShowMenu(...args){ return requireGrid().ActionShowMenu(...args); }
export function ShowMenu(...args){ return requireGrid().ShowMenu(...args); }
export function LoadMenu(...args){ return requireGrid().LoadMenu(...args); }
export function ActionShowList(...args){ return requireGrid().ActionShowList(...args); }
export function ShowList(...args){ return requireGrid().ShowList(...args); }
export function GetList(...args){ return requireGrid().GetList(...args); }
export function ShowMessage(...args){ return requireGrid().ShowMessage(...args); }
export function ShowMessageLater(...args){ return requireGrid().ShowMessageLater(...args); }
export function HideMessage(...args){ return requireGrid().HideMessage(...args); }
export function Disable(...args){ return requireGrid().Disable(...args); }
export function Enable(...args){ return requireGrid().Enable(...args); }
export function SetShowPrintPageBreaks(...args){ return requireGrid().SetShowPrintPageBreaks(...args); }
export function ActionPrint(...args){ return requireGrid().ActionPrint(...args); }
export function Print(...args){ return requireGrid().Print(...args); }
export function ActionPdf(...args){ return requireGrid().ActionPdf(...args); }
export function Search(...args){ return requireGrid().Search(...args); }
export function GetSearchHistory(...args){ return requireGrid().GetSearchHistory(...args); }
export function ActionSortClick(...args){ return requireGrid().ActionSortClick(...args); }
export function SortClick(...args){ return requireGrid().SortClick(...args); }
export function GetSort(...args){ return requireGrid().GetSort(...args); }
export function SetSort(...args){ return requireGrid().SetSort(...args); }
export function ReSort(...args){ return requireGrid().ReSort(...args); }
export function ActionClearSort(...args){ return requireGrid().ActionClearSort(...args); }
export function GetToolbar(...args){ return requireGrid().GetToolbar(...args); }
export function IsToolbar(...args){ return requireGrid().IsToolbar(...args); }
export function AddToolbar(...args){ return requireGrid().AddToolbar(...args); }
export function RemoveToolbar(...args){ return requireGrid().RemoveToolbar(...args); }
export function ActionHideToolbar(...args){ return requireGrid().ActionHideToolbar(...args); }
export function HideToolbar(...args){ return requireGrid().HideToolbar(...args); }
export function GetTool(...args){ return requireGrid().GetTool(...args); }
export function IsTool(...args){ return requireGrid().IsTool(...args); }
export function ActionHideTool(...args){ return requireGrid().ActionHideTool(...args); }
export function HideTool(...args){ return requireGrid().HideTool(...args); }
export function SetDraggingToolbars(...args){ return requireGrid().SetDraggingToolbars(...args); }
export function SwitchDraggingToolbars(...args){ return requireGrid().SwitchDraggingToolbars(...args); }
export function AddTool(...args){ return requireGrid().AddTool(...args); }
export function RemoveTool(...args){ return requireGrid().RemoveTool(...args); }
export function ActionIndentRow(...args){ return requireGrid().ActionIndentRow(...args); }
export function ActionIndentRows(...args){ return requireGrid().ActionIndentRows(...args); }
export function Indent(...args){ return requireGrid().Indent(...args); }
export function SetReversedTree(...args){ return requireGrid().SetReversedTree(...args); }
export function SetTree(...args){ return requireGrid().SetTree(...args); }
export function HasRowTree(...args){ return requireGrid().HasRowTree(...args); }
export function GetTreeCol(...args){ return requireGrid().GetTreeCol(...args); }
export function HasColTree(...args){ return requireGrid().HasColTree(...args); }
export function ActionCollapseRow(...args){ return requireGrid().ActionCollapseRow(...args); }
export function ActionCollapseRows(...args){ return requireGrid().ActionCollapseRows(...args); }
export function ActionCollapseAllRows(...args){ return requireGrid().ActionCollapseAllRows(...args); }
export function ActionCollapseLevel(...args){ return requireGrid().ActionCollapseLevel(...args); }
export function Collapse(...args){ return requireGrid().Collapse(...args); }
export function IsCollapsed(...args){ return requireGrid().IsCollapsed(...args); }
export function CollapseAll(...args){ return requireGrid().CollapseAll(...args); }
export function ExpandParents(...args){ return requireGrid().ExpandParents(...args); }
export function SetBool(...args){ return requireGrid().SetBool(...args); }
export function ChangeBool(...args){ return requireGrid().ChangeBool(...args); }
export function ActionChangeBool(...args){ return requireGrid().ActionChangeBool(...args); }
export function DateToString(...args){ return requireGrid().DateToString(...args); }
export function StringToDate(...args){ return requireGrid().StringToDate(...args); }
export function ActionShowCalendar(...args){ return requireGrid().ActionShowCalendar(...args); }
export function ShowCalendar(...args){ return requireGrid().ShowCalendar(...args); }
export function NumberToString(...args){ return requireGrid().NumberToString(...args); }
export function StringToNumber(...args){ return requireGrid().StringToNumber(...args); }
// FASTGRID_API_METHODS_END

async function createGrid(){
   const token = ++createToken;
   await tick();
   if(disposed || token!==createToken || !root) return;
   const FG = globalThis.FGrid;
   if(!FG || typeof(FG.FastGrid)!=="function") throw new Error("FastGrid script is not loaded. Import from 'fastgrid-svelte' for the trial version, or load the registered FGridE.js before importing 'fastgrid-svelte/registered'.");
   FG.SvelteId = FG.SvelteId+1||1;
   dispose();

   var E = { Sheet:".", Events:{} };
   if(id) E.Cfg = { id:id };
   E.Events.OnTag_AA = function(G,tag){
      if(tag!==root && G.Tag!==root) return;
      if(component!==undefined) G.Component = component;
      grid = G;
      var handler = $$restProps.onTag; if(typeof(handler)==="function") return handler(G,tag);
      };

   for(var name in $$restProps){
      if(name=="onTag" || !isListener(name,$$restProps[name])) continue;
      (function(listener,eventName){
         E.Events[eventName+"_A"] = function(){ 
            var handler = $$restProps[listener]; if(typeof(handler)==="function") return handler.apply(null,arguments); 
            };
         })(name,listenerToFastGridEvent(name));
      }
   const G = FG.FastGrid(FG.MergeSources(FG.RunSources(src),E),root,function(G){ if(component!==undefined) G.Component = component; grid = G; });
   if(G && !grid && token===createToken) grid = G;
   }

function getDomAttrs(){
   var nextDomAttrs = {};
   for(var name in $$restProps) if(!isListener(name,$$restProps[name])) nextDomAttrs[name] = $$restProps[name];
   return nextDomAttrs;
   }

//. Component is assigned in setGrid() and OnTag_AA. It is intentionally not synchronized with a legacy $: statement.
afterUpdate(function(){ if(mounted && !disposed && src!==lastSrc){ lastSrc = src; createGrid(); } });
onMount(function(){ mounted = true; lastSrc = src; createGrid(); return function(){ disposed = true; createToken++; dispose(); }; });
</script>

<div {...getDomAttrs()} {id} bind:this={root}></div>
