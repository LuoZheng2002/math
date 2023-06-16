import { ATT } from "../constants";

export function createCursorAnchor(): HTMLElement
{
    let cursorAnchor = document.createElement('span');
    cursorAnchor.setAttribute(ATT.CONTAINER_TYPE, 'CURSOR_ANCHOR');
    return cursorAnchor;
}