import { ATT, CLASS, CT } from "../constants";

export function createFormula():HTMLSpanElement
{
    let formulaElement = document.createElement('span');
    // set CONTAINER_TYPE attribute
    formulaElement.setAttribute(ATT.CONTAINER_TYPE, CT.FORMULA);
    // assign classes
    formulaElement.classList.add(CLASS.FORMULA);
    // assign initial content
    formulaElement.innerHTML = '&nbsp;';
    return formulaElement;
}