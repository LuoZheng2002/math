import { CLASS, CT, SZ } from "../constants";
import { addClass, setSize, setType } from "../misc/attributes";
import { getSizeClass } from "../misc/getSizeClass";


export function createSqrt(parentSize: SZ)
{
    // create elements
    // whole container
    let sqrt = document.createElement('span');
    // head part floating
    let sqrtHead = document.createElement('span');
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    // head part solid
    let sqrtHeadPlaceHolder = document.createElement('span');
    // content part
    let sqrtContainer = document.createElement('span');
    // assign properties
    svg.preserveAspectRatio.baseVal.align = SVGPreserveAspectRatio.SVG_PRESERVEASPECTRATIO_NONE;
    svg.setAttribute('viewBox', '0 0 32 54');
    svg.style.height = '100%';
    svg.style.width = '100%';
    path.setAttribute('d', 'M0 33 L7 27 L12.5 47 L13 47 L30 0 L32 0 L13 54 L11 54 L4.5 31 L0 33')
    
    // assign container attributes
    setType(sqrt, CT.SQRT);
    setType(sqrtHead, CT.SQRT_HEAD);
    setType(sqrtHeadPlaceHolder, CT.SQRT_HEAD_PLACEHOLDER);
    setType(sqrtContainer, CT.SQRT_CONTAINER);
    // assign size attributes
    setSize(sqrt, parentSize);
    setSize(sqrtHead, parentSize);
    setSize(sqrtHeadPlaceHolder, parentSize);
    setSize(sqrtContainer, parentSize);
    // assign container classes
    addClass(sqrt, CLASS.SQRT);
    addClass(sqrtHead, CLASS.SQRT_HEAD);
    addClass(sqrtHeadPlaceHolder, CLASS.SQRT_HEAD_PLACEHOLDER);
    addClass(sqrtContainer, CLASS.SQRT_CONTAINER);
    // assign size classes
    let sizeClass = getSizeClass(parentSize);
    addClass(sqrt, sizeClass);
    addClass(sqrtHead, sizeClass);
    addClass(sqrtHeadPlaceHolder, sizeClass);
    addClass(sqrtContainer, sizeClass);
    // assign color classes
    addClass(sqrt, CLASS.COLOR_SQRT);
    addClass(sqrtHead, CLASS.COLOR_SQRT_HEAD);
    addClass(sqrtHeadPlaceHolder, CLASS.COLOR_SQRT_HEAD_PLACEHOLDER);
    addClass(sqrtContainer, CLASS.COLOR_SQRT_CONTAINER);
    // assign content
    sqrtContainer.innerHTML = '&nbsp;';
    // assemble
    sqrt.appendChild(sqrtHeadPlaceHolder);
    sqrt.appendChild(sqrtHead);
    sqrt.appendChild(sqrtContainer);
    sqrtHead.appendChild(svg);
    svg.appendChild(path);
    return sqrt;
}