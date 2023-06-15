import { ATT, CLASS, CT, SZ } from "../constants";
import { colorful } from "../misc/color";
import { getSizeClass } from "../misc/getSizeClass";

export function createFormula(parentSize: SZ):HTMLSpanElement
{
    let formulaElement = document.createElement('span');
    // set CONTAINER_TYPE attribute
    formulaElement.setAttribute(ATT.CONTAINER_TYPE, CT.FORMULA);
    formulaElement.setAttribute(ATT.FONT_SIZE, parentSize);
    // assign classes
    formulaElement.classList.add(CLASS.FORMULA);
    formulaElement.classList.add(getSizeClass(parentSize));
    formulaElement.classList.add(colorful?CLASS.COLOR_FORMULA:CLASS.COLOR_NONE);
    // assign initial content
    formulaElement.innerHTML = '&nbsp;';
    return formulaElement;
}