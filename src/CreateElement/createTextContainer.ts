import { ATT, CLASS, CT, SZ } from "../constants";
import { colorful } from "../misc/color";
import { getSizeClass } from "../misc/getSizeClass";

export function createTextContainer(parentSize: SZ):HTMLSpanElement
{
    let textContainer = document.createElement('span');
    // set CONTAINER_TYPE attribute
    textContainer.setAttribute(ATT.CONTAINER_TYPE, CT.TEXTCONTAINER);
    textContainer.setAttribute(ATT.FONT_SIZE, parentSize);
    // assign classes
    textContainer.classList.add(CLASS.TEXTCONTAINER);
    textContainer.classList.add(getSizeClass(parentSize));
    textContainer.classList.add(colorful?CLASS.COLOR_TEXTCONTAINER:CLASS.COLOR_NONE);
    // assign initial content
    textContainer.innerHTML = '&nbsp;';
    return textContainer;
}