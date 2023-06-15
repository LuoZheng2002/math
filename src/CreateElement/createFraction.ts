import { ATT, CLASS, CT, SZ } from "../constants";
import { colorful } from "../misc/color";
import { getSize, getSizeClass } from "../misc/getSizeClass";

export function createFraction(parentSize: SZ)
{
    // create elements
    let fraction = document.createElement('span');
    let numerator = document.createElement('span');
    let denominator = document.createElement('span');
    let line = document.createElement('span');
    // assign container attributes
    fraction.setAttribute(ATT.CONTAINER_TYPE, CT.FRACTION);
    numerator.setAttribute(ATT.CONTAINER_TYPE, CT.NUMERATOR);
    denominator.setAttribute(ATT.CONTAINER_TYPE, CT.DENOMINATOR);
    // assign size attributes
    let size = getSize(parentSize, 1);
    fraction.setAttribute(ATT.FONT_SIZE, size);
    numerator.setAttribute(ATT.FONT_SIZE, size);
    denominator.setAttribute(ATT.FONT_SIZE, size);
    // assign container classes
    fraction.classList.add(CLASS.FRACTION);
    numerator.classList.add(CLASS.NUMERATOR);
    denominator.classList.add(CLASS.DENOMINATOR);
    line.classList.add(CLASS.FRACTION_LINE);
    // assign size classes
    let sizeClass = getSizeClass(size);
    fraction.classList.add(sizeClass);
    numerator.classList.add(sizeClass);
    denominator.classList.add(sizeClass);
    // assign color classes
    fraction.classList.add(colorful?CLASS.COLOR_FRACTION:CLASS.COLOR_NONE);
    numerator.classList.add(colorful?CLASS.COLOR_NUMERATOR:CLASS.COLOR_NONE);
    denominator.classList.add(colorful?CLASS.COLOR_DENOMINATOR:CLASS.COLOR_NONE);
    // assign content
    numerator.innerHTML = '&nbsp;';
    denominator.innerHTML = '&nbsp;';
    // assemble
    fraction.appendChild(numerator);
    fraction.appendChild(line);
    fraction.appendChild(denominator);

    return fraction;
}