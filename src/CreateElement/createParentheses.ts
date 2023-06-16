import { CLASS, CT, SZ } from "../constants";
import { assert } from "../misc/assert";
import { addClass, isType, setSize, setType } from "../misc/attributes";
import { getSizeClass } from "../misc/getSizeClass";

export enum ParenthesisType
{
    LeftParenthesis,
    RightParenthesis,
    Both
}

const leftParenthesis_d = 'M196.206,423.081 c6.076,6.934,5.38,17.484-1.544,23.56c-3.174,2.777-7.098,4.142-11,4.142c-4.641,0-9.26-1.924-12.565-5.69 c-94.511-107.799-94.511-270.386,0-378.184c6.087-6.934,16.609-7.63,23.565-1.549c6.924,6.076,7.62,16.625,1.544,23.56 C112.696,184.169,112.696,327.831,196.206,423.081z';
const rightParenthesis_d = 'M340.902,445.093c-3.305,3.767-7.924,5.69-12.565,5.69 c-3.902,0-7.826-1.365-11-4.142c-6.924-6.076-7.62-16.625-1.544-23.56c83.51-95.25,83.51-238.913,0-334.163 c-6.076-6.934-5.38-17.484,1.544-23.56c6.945-6.082,17.489-5.386,23.565,1.549C435.413,174.707,435.413,337.293,340.902,445.093z';
export function createParentheses(parentSize: SZ, type: ParenthesisType): HTMLElement
{
    // create elements
    let parentheses = document.createElement('span');
    let leftParenthesis: HTMLSpanElement|null = null;
    let rightParenthesis: HTMLSpanElement|null = null;
    let leftParenthesisPlaceHolder: HTMLSpanElement|null = null;
    let rightParenthesisPlaceHolder: HTMLSpanElement|null = null;
    let parenthesesContainer = document.createElement('span');
    if (type == ParenthesisType.Both || type == ParenthesisType.LeftParenthesis)
    {
        leftParenthesis = document.createElement('span');
        leftParenthesisPlaceHolder = document.createElement('span');
        let leftParenthesisSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        let leftParenthesisPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        leftParenthesisSvg.setAttribute('viewBox', '90 25 115 462');
        leftParenthesisSvg.style.width = '100%';
        leftParenthesisSvg.style.height = '100%';
        leftParenthesisSvg.preserveAspectRatio.baseVal.align = SVGPreserveAspectRatio.SVG_PRESERVEASPECTRATIO_NONE;
        leftParenthesisPath.setAttribute('d', leftParenthesis_d);
        leftParenthesis.appendChild(leftParenthesisSvg);
        leftParenthesisSvg.appendChild(leftParenthesisPath);
    }
    if (type == ParenthesisType.Both || type == ParenthesisType.RightParenthesis)
    {
        rightParenthesis = document.createElement('span');
        rightParenthesisPlaceHolder = document.createElement('span');
        let rightParenthesisSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        let rightParenthesisPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        rightParenthesisSvg.setAttribute('viewBox', '307 25 115 462');
        rightParenthesisSvg.style.width = '100%';
        rightParenthesisSvg.style.height = '100%';
        rightParenthesisSvg.style.display='flex';
        rightParenthesisSvg.preserveAspectRatio.baseVal.align = SVGPreserveAspectRatio.SVG_PRESERVEASPECTRATIO_NONE;
        rightParenthesisPath.setAttribute('d', rightParenthesis_d);
        rightParenthesis.appendChild(rightParenthesisSvg);
        rightParenthesisSvg.appendChild(rightParenthesisPath);
    }
    // assign container attributes
    setType(parentheses, CT.PARENTHESES);
    if (leftParenthesis!=null) setType(leftParenthesis, CT.LEFT_PARENTHESIS);
    if (rightParenthesis!=null) setType(rightParenthesis, CT.RIGHT_PARENTHESIS);
    if (leftParenthesisPlaceHolder!=null) setType(leftParenthesisPlaceHolder, CT.PARENTHESIS_PLACEHOLDER);
    if (rightParenthesisPlaceHolder!=null) setType(rightParenthesisPlaceHolder, CT.PARENTHESIS_PLACEHOLDER);
    setType(parenthesesContainer, CT.PARENTHESES_CONTAINER);
    setSize(parentheses, parentSize);
    setSize(parenthesesContainer, parentSize);
    // assign container classes
    addClass(parentheses, CLASS.PARENTHESES);
    if (leftParenthesis!=null) addClass(leftParenthesis, CLASS.LEFT_PARENTHESIS);
    if (rightParenthesis!=null) addClass(rightParenthesis, CLASS.RIGHT_PARENTHESIS);
    if (leftParenthesisPlaceHolder!=null) addClass(leftParenthesisPlaceHolder, CLASS.PARENTHESIS_PLACEHOLDER);
    if (rightParenthesisPlaceHolder!=null) addClass(rightParenthesisPlaceHolder, CLASS.PARENTHESIS_PLACEHOLDER);
    addClass(parenthesesContainer, CLASS.PARENTHESES_CONTAINER);
    // assign size classes
    addClass(parenthesesContainer, getSizeClass(parentSize));
    // assign color classes
    addClass(parentheses, CLASS.COLOR_PARENTHESES);
    if (leftParenthesis!=null) addClass(leftParenthesis, CLASS.COLOR_PARENTHESIS);
    if (rightParenthesis!=null) addClass(rightParenthesis, CLASS.COLOR_PARENTHESIS);
    if (leftParenthesisPlaceHolder!=null) addClass(leftParenthesisPlaceHolder, CLASS.COLOR_PARENTHESIS_PLACEHOLDER);
    if (rightParenthesisPlaceHolder!=null) addClass(rightParenthesisPlaceHolder, CLASS.COLOR_PARENTHESIS_PLACEHOLDER);
    addClass(parenthesesContainer, CLASS.COLOR_PARENTHESES_CONTAINER);
    // assign content for debug
    let str: string;
    switch(type)
    {
        case ParenthesisType.LeftParenthesis:
            str = 'Left';
            break;
        case ParenthesisType.RightParenthesis:
            str = 'Right';
            break;
        default:
            str = 'Both';
            break;
    }
    parenthesesContainer.innerText= 'Parentheses: ' + str;
    // assemble
    if (leftParenthesis!=null && leftParenthesisPlaceHolder!=null)
    {
        parentheses.appendChild(leftParenthesisPlaceHolder);
        parentheses.appendChild(leftParenthesis);
    }
    parentheses.appendChild(parenthesesContainer);
    if (rightParenthesis != null && rightParenthesisPlaceHolder !=null)
    {
        parentheses.appendChild(rightParenthesisPlaceHolder);
        parentheses.appendChild(rightParenthesis);
    }
    return parentheses;
}

export function getParenthesesContainer(parentheses: HTMLElement): HTMLElement
{
    let parenthesesContainer = parentheses.firstElementChild as HTMLElement;
    if (!isType(parenthesesContainer, CT.PARENTHESES_CONTAINER))
    {
        parenthesesContainer = parenthesesContainer.nextElementSibling!.nextElementSibling as HTMLElement;
    }
    assert(isType(parenthesesContainer, CT.PARENTHESES_CONTAINER),'The container should be parentheses container');
    return parenthesesContainer;
}

export function hasParenthesis(parentheses: HTMLElement, type: ParenthesisType)
{
    if (type == ParenthesisType.LeftParenthesis)
    {
        let leftParenthesis = parentheses.children[1] as HTMLElement;
        if (isType(leftParenthesis, CT.LEFT_PARENTHESIS))
        {
            return true;
        }
        else
        {
            assert(isType(leftParenthesis, CT.PARENTHESIS_PLACEHOLDER), 'The container should be parentheses placeholder');
            return false;
        }
    }
    else if(type == ParenthesisType.RightParenthesis)
    {
        let rightParenthesis = parentheses.lastElementChild as HTMLElement;
        if(isType(rightParenthesis, CT.RIGHT_PARENTHESIS))
        {
            return true;
        }
        else
        {
            assert(isType(rightParenthesis, CT.PARENTHESES_CONTAINER), 'The container should be parentheses container');
            return false;
        }
    }
    else
    {
        assert(false, 'Unknown option');
        return false;
    }
}