import { ATT, CLASS, CT, SZ } from "../constants";
import { colorful } from "../misc/color";
import { getNewSize, getSizeClass } from "../misc/getSizeClass";

export function createFraction(parentSize: SZ)
{
    // create elements
    let fraction = document.createElement('span');
    let n_framework = document.createElement('span');
    let d_framework = document.createElement('span');
    let numerator = document.createElement('span');
    let denominator = document.createElement('span');
    // assign container attributes
    fraction.setAttribute(ATT.CONTAINER_TYPE, CT.FRACTION);
    n_framework.setAttribute(ATT.CONTAINER_TYPE, CT.NUMERATOR_FRAEMWORK);
    d_framework.setAttribute(ATT.CONTAINER_TYPE, CT.DENOMINATOR_FRAMEWOKR);
    numerator.setAttribute(ATT.CONTAINER_TYPE, CT.NUMERATOR);
    denominator.setAttribute(ATT.CONTAINER_TYPE, CT.DENOMINATOR);
    // assign size attributes
    let size = getNewSize(parentSize, 1);
    fraction.setAttribute(ATT.FONT_SIZE, size);
    n_framework.setAttribute(ATT.FONT_SIZE, size);
    d_framework.setAttribute(ATT.FONT_SIZE, size);
    numerator.setAttribute(ATT.FONT_SIZE, size);
    denominator.setAttribute(ATT.FONT_SIZE, size);
    // assign container classes
    fraction.classList.add(CLASS.FRACTION);
    n_framework.classList.add(CLASS.NUMERATOR_FRAEMWORK);
    d_framework.classList.add(CLASS.DENOMINATOR_FRAMEWORK);
    numerator.classList.add(CLASS.NUMERATOR);
    denominator.classList.add(CLASS.DENOMINATOR);
    // assign size classes
    let sizeClass = getSizeClass(size);
    fraction.classList.add(sizeClass);
    n_framework.classList.add(sizeClass);
    d_framework.classList.add(sizeClass);
    numerator.classList.add(sizeClass);
    denominator.classList.add(sizeClass);
    // assign color classes
    fraction.classList.add(CLASS.COLOR_FRACTION);
    n_framework.classList.add(CLASS.COLOR_NUMERATOR_FRAMEWORK);
    d_framework.classList.add(CLASS.COLOR_DENOMINATOR_FRAMEWORK);
    numerator.classList.add(CLASS.COLOR_NUMERATOR);
    denominator.classList.add(CLASS.COLOR_DENOMINATOR);
    // assign content
    numerator.innerHTML = '&nbsp;';
    denominator.innerHTML = '&nbsp;';
    // assemble
    fraction.appendChild(n_framework);
    fraction.appendChild(d_framework);
    n_framework.appendChild(numerator);
    d_framework.appendChild(denominator);

    return fraction;
}