import { ATT, CT } from "../constants";

export function createCursorAnchor(): HTMLElement
{
    let cursorAnchor = document.createElement('span');
    cursorAnchor.setAttribute(ATT.CONTAINER_TYPE, CT.CURSOR_ANCHOR);
    cursorAnchor.innerText='I';
    return cursorAnchor;
}