import { ATT, CLASS, CT, SZ } from "../constants";
import { colorful } from "../misc/color";
import { getSize, getSizeClass } from "../misc/getSizeClass";

export function createSuperSubScript(parentSize: SZ)
{
    // create elements
    let superSubScript = document.createElement('span');
    let superScript = document.createElement('span');
    let subScript = document.createElement('span');
    // assign container attributes
    superSubScript.setAttribute(ATT.CONTAINER_TYPE, CT.SUPERSUBSCRIPT);
    superScript.setAttribute(ATT.CONTAINER_TYPE, CT.SUPERSCRIPT);
    subScript.setAttribute(ATT.CONTAINER_TYPE, CT.SUBSCRIPT);
    // assign size attributes
    let size = getSize(parentSize,2);
    superSubScript.setAttribute(ATT.FONT_SIZE, size);
    superScript.setAttribute(ATT.FONT_SIZE, size);
    subScript.setAttribute(ATT.FONT_SIZE, size);
    // assign container classes
    superSubScript.classList.add(CLASS.SUPERSUBSCRIPT);
    superScript.classList.add(CLASS.SUPERSCRIPT);
    subScript.classList.add(CLASS.SUBSCRIPT);
    // assign size classes
    let sizeClass = getSizeClass(size);
    superSubScript.classList.add(sizeClass);
    superScript.classList.add(sizeClass);
    subScript.classList.add(sizeClass);
    // assign color classes
    superSubScript.classList.add(colorful?CLASS.COLOR_SUPERSUBSCRIPT:CLASS.COLOR_NONE);
    superScript.classList.add(colorful?CLASS.COLOR_SUPERSCRIPT:CLASS.COLOR_NONE);
    subScript.classList.add(colorful?CLASS.COLOR_SUBSCRIPT:CLASS.COLOR_NONE);
    // assign content
    superScript.innerHTML = '&nbsp;';
    subScript.innerHTML = '&nbsp;';
    // assemble
    superSubScript.appendChild(superScript);
    superSubScript.appendChild(subScript);
    
    return superSubScript;
}