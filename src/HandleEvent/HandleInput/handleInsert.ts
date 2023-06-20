import { createCursorAnchor } from "../../CreateElement/createCursorAnchor";
import { DummyTag, createDummyParenthesis } from "../../CreateElement/createDummyParenthesis";
import { createFormula } from "../../CreateElement/createFormula";
import { createFraction } from "../../CreateElement/createFraction";
import { ParenthesisType, createParentheses, getParenthesesContainer, hasParenthesis } from "../../CreateElement/createParentheses";
import { createSqrt } from "../../CreateElement/createSqrt";
import { createSuperSubScript } from "../../CreateElement/createSuperSubScript";
import { createTextContainer } from "../../CreateElement/createTextContainer";
import { splitTextContainer } from "../../CreateElement/splitTextContainer";
import { ATT, CT, SZ } from "../../constants";
import { assert } from "../../misc/assert";
import { getSize, isType } from "../../misc/attributes";

export function handleInsert(range: Range, container: HTMLElement, event: InputEvent)
{
    if (tryHandleDollarSign(range, container, event)) return;
    if (tryHandleSpace(range, container, event)) return;
    if (tryHandleCaretOrUnderscore(range, container, event)) return;
    if (tryHandleSlash(range, container, event)) return;
    if (tryHandleSqrt(range, container, event)) return;
    if (tryHandleParenthesis(range, container, event)) return;
    tryReplaceWhiteSpace(range, container, event);
}

function tryReplaceWhiteSpace(range: Range, container: HTMLElement, event: InputEvent)
{
    // condition: container's content is a white space
    if (container.innerHTML != '&nbsp;') return;
    event.preventDefault();
    assert(event.data!=null, 'event.data is null');
    if (event.data == ' ')
    {
        console.log('Prevent inserting whitespace on whitespace');
        return;
    }
    switch(container.getAttribute(ATT.CONTAINER_TYPE))
    {
        case CT.MAINDIV:
        case CT.FORMULA:
        case CT.SUPERSCRIPT:
        case CT.SUBSCRIPT:
        case CT.NUMERATOR:
        case CT.DENOMINATOR:
        case CT.SQRT_CONTAINER:
        case CT.PARENTHESES_CONTAINER:
            {
                let textContainer = createTextContainer(container.getAttribute(ATT.FONT_SIZE) as SZ);
                container.innerText = '';
                container.appendChild(textContainer);
                textContainer.innerText = event.data!;
                range.setStart(textContainer, 1);
                console.log('The only white space is replaced by a container.');
            }
            break;
        default:
            container.innerText = event.data!;
            range.setStart(container, 1);
            console.log('The only white space is replaced by the input character.');
    }
}

function tryHandleDollarSign(range: Range, container: HTMLElement, event: InputEvent):boolean
{
    assert(container.hasAttribute(ATT.CONTAINER_TYPE), 'container doesn\'t have attribute CONTAINER_TYPE');
    // judging
    if (event.data != '$') return false;
    let isMainDiv = container.getAttribute(ATT.CONTAINER_TYPE) == CT.MAINDIV;
    let isTextContainer = container.getAttribute(ATT.CONTAINER_TYPE) == CT.TEXTCONTAINER;
    if (!isMainDiv && !isTextContainer) return false;

    // take control
    event.preventDefault();
    // create element
    let formulaElement = createFormula(SZ.SZ_5);
    
    if (isMainDiv)
    {
        // white space elimination
        if (container.innerHTML == '&nbsp;')
        {
            container.innerHTML = '';
        }
        // put into place
        container.appendChild(formulaElement);
    }
    else
    {
        if (range.startOffset == container.innerText.length)
        {
            container.insertAdjacentElement('afterend', formulaElement);
        }
        else if (range.startOffset == 0)
        {
            container.insertAdjacentElement('beforebegin', formulaElement);
        }
        else
        {
            let splitContainers = splitTextContainer(container, range.startOffset);
            let parent = container.parentElement!;
            parent.replaceChild(splitContainers[0], container);
            splitContainers[0].insertAdjacentElement('afterend', formulaElement);
            formulaElement.insertAdjacentElement('afterend', splitContainers[1]);
            console.log('Splitted a text container!');
        }
        if (container.innerHTML == '&nbsp;')
        {
            container.remove();
        }
    }
    // set cursor
    range.setStart(formulaElement, 1);
    range.setEnd(formulaElement, 1);
    // send log
    console.log('Inserted a formula element!');
    return true;

}

function tryHandleSpace(range: Range, container: HTMLElement, event: InputEvent):boolean
{
    if (event.data != ' ') return false;
    let parent = container.parentElement!;
    let formulaContainer: HTMLElement|null = null;
    let hasFormula = false;
    if (container.getAttribute(ATT.CONTAINER_TYPE) == CT.FORMULA && container.innerHTML == '&nbsp;')
    {
        formulaContainer = container;
        hasFormula = true;
    }
    else if (parent.getAttribute(ATT.CONTAINER_TYPE) == CT.FORMULA
        && parent.lastElementChild == container
        && range.startOffset == container.innerText.length)
    {
        formulaContainer = parent;
        hasFormula = true;
    }
    if (!hasFormula) return false;
    if (formulaContainer!.nextElementSibling == null
        || formulaContainer!.nextElementSibling?.getAttribute(ATT.CONTAINER_TYPE) != CT.FORMULA) return false;
    event.preventDefault();
    let textContainer = createTextContainer(formulaContainer!.getAttribute(ATT.FONT_SIZE) as SZ);
    formulaContainer!.insertAdjacentElement('afterend', textContainer);
    range.setStart(textContainer.childNodes[0], 1);
    range.setEnd(textContainer.childNodes[0], 1);
    console.log('Add a text container between formulas!');
    return true;
}

function tryHandleCaretOrUnderscore(range: Range, container: HTMLElement, event: InputEvent): boolean
{
    if (event.data != '^' && event.data != '_') return false;
    let inFormula = false;
    let isTextContainer = false;
    if (container.getAttribute(ATT.CONTAINER_TYPE) == CT.FORMULA && container.innerHTML == '&nbsp;')
    {
        inFormula = true;
        isTextContainer = false;
    }
    else if (container.getAttribute(ATT.CONTAINER_TYPE) == CT.TEXTCONTAINER)
    {
        inFormula = true;
        isTextContainer = true;
    }
    if (!inFormula) return false;
    event.preventDefault();
    let size = container.getAttribute(ATT.FONT_SIZE) as SZ;
    let superSubScript = createSuperSubScript(size);
    normalAndSplitInsert(range, container, superSubScript);
    let targetContainer = event.data == '^'? superSubScript.firstChild!:superSubScript.lastChild!;
    range.setStart(targetContainer.firstChild!, 1);
    range.setEnd(targetContainer.firstChild!, 1);
    return true;
}

function tryHandleSlash(range: Range, container: HTMLElement, event: InputEvent):boolean
{
    if (event.data != '/') return false;
    if (container.getAttribute(ATT.CONTAINER_TYPE) != CT.TEXTCONTAINER) return false;
    if (container.innerText[range.startOffset-1] !='/') return false;
    event.preventDefault();
    console.log('Handle slash triggered!');
    let size = container.parentElement!.getAttribute(ATT.FONT_SIZE) as SZ;
    let fraction = createFraction(size);
    normalAndSplitInsert(range, container, fraction);
    container = fraction.previousElementSibling as HTMLElement;
    if (container.innerText.length <= 1)
    {
        container.remove();
    }
    else
    {
        container.innerText = container.innerText.substring(0, container.innerText.length-1);
    }
    let targetContainer = fraction.firstElementChild!;
    range.setStart(targetContainer.firstChild!, 1);
    range.setEnd(targetContainer.firstChild!, 1);
    return true;
}
function tryHandleSqrt(range: Range, container: HTMLElement, event: InputEvent): boolean
{
    if (event.data !='t') return false;
    if (!isType(container, CT.TEXTCONTAINER)) return false;
    if (container.innerText.substring(range.startOffset - 3, range.startOffset) != 'sqr') return false;
    event.preventDefault();
    console.log('Handle sqrt triggered!');
    let size = getSize(container.parentElement as HTMLElement);
    let sqrt = createSqrt(size);
    normalAndSplitInsert(range, container, sqrt);
    container = sqrt.previousElementSibling as HTMLElement;
    if (container.innerText == 'sqr')
    {
        container.remove();
    }
    else
    {
        container.innerText = container.innerText.substring(0, container.innerText.length - 3);
    }
    let targetContainer = sqrt.lastElementChild!;
    range.setStart(targetContainer.firstChild!, 1);
    range.setEnd(targetContainer.firstChild!, 1);
    return true;
}
function tryHandleParenthesis(range: Range, container: HTMLElement, event: InputEvent): boolean
{
    if (!['(', ')'].includes(event.data!)) return false;
    console.log('Handle parenthesis triggered!');
    event.preventDefault();
    let parenthesisType = event.data == '('? ParenthesisType.LeftParenthesis: ParenthesisType.RightParenthesis;
    if (!isType(container, CT.TEXTCONTAINER))
    {
        assert(container.innerHTML == '&nbsp;', 'The container should be empty.');
        let textContainer = createTextContainer(getSize(container));
        container.innerText = '';
        container.appendChild(textContainer);
        container = textContainer;
    }
    let parent = container.parentElement!;
    while(isType(parent, CT.PARENTHESES_CONTAINER))
    {
        parent = parent.parentElement!;
        assert(isType(parent, CT.PARENTHESES), 'Parent is supposed to be parentheses');
        parent = parent.parentElement!;
    }
    let dummyParenthesis = createDummyParenthesis(parenthesisType, DummyTag.Create);
    normalAndSplitInsert(range, container, dummyParenthesis);
    let cursorAnchor = createCursorAnchor();
    dummyParenthesis.insertAdjacentElement('afterend', cursorAnchor);
    // break existing parenthesis pairs
    let children = parent.children;
    let newChildren: HTMLElement[] = [];
    for (let index = 0; index < children.length; index++) {
        let child = children[index] as HTMLElement;
        if (isType(child, CT.PARENTHESES))
        {
            disassembleParentheses(child, newChildren);
        }
        else
        {
            newChildren.push(child);
        }
    }
    
    // debug code start
    while(parent.firstElementChild!=null)
    {
        parent.removeChild(parent.firstElementChild);
    }
    for (let index = 0; index < newChildren.length; index++) {
        let child = newChildren[index];
        parent.appendChild(child);
    }
    // debug code end
    setTimeout(()=>{
    let done = false;
    for (let index = 0; index < 10; index++) {
        if (!tryCombineParentheses(newChildren, getSize(parent)))
        {
            done = true;
            break;
        }
    }
    assert(done, 'Recursion goes infinitely.');
    // assign new children to parent
    while(parent.firstElementChild!=null)
    {
        parent.removeChild(parent.firstElementChild);
    }
    for (let index = 0; index < newChildren.length; index++) {
        let child = newChildren[index];
        parent.appendChild(child);
    }
    let cursorAnchorSibling = cursorAnchor.nextElementSibling as HTMLElement;
    let targetContainer: HTMLElement;
    if (cursorAnchorSibling == null || !isType(cursorAnchorSibling, CT.TEXTCONTAINER))
    {
        let textContainer = createTextContainer(getSize(parent));
        cursorAnchor.insertAdjacentElement('afterend', textContainer);
        targetContainer = textContainer;
    }
    else
    {
        targetContainer = cursorAnchorSibling;
    }
    console.log(targetContainer);
    range.setStart(targetContainer.firstChild!, 0);
    range.setEnd(targetContainer.firstChild!, 0);
    cursorAnchor.remove();
    }, 200);
    
    return true;
}
export function setCursorAfterAnchor(range: Range, cursorAnchor: HTMLElement, size: SZ)
{
    let cursorAnchorSibling = cursorAnchor.nextElementSibling as HTMLElement;
    let targetContainer: HTMLElement;
    if (cursorAnchorSibling == null || !isType(cursorAnchorSibling, CT.TEXTCONTAINER))
    {
        let textContainer = createTextContainer(size);
        cursorAnchor.insertAdjacentElement('afterend', textContainer);
        targetContainer = textContainer;
    }
    else
    {
        targetContainer = cursorAnchorSibling;
    }
    console.log(targetContainer);
    range.setStart(targetContainer.firstChild!, 0);
    range.setEnd(targetContainer.firstChild!, 0);
    cursorAnchor.remove();
}
export function getParentExceptParentheses(container: HTMLElement): HTMLElement
{
    let parent = container.parentElement!;
    while(isType(parent, CT.PARENTHESES_CONTAINER))
    {
        parent = parent.parentElement!;
        assert(isType(parent, CT.PARENTHESES), 'Parent is supposed to be parentheses');
        parent = parent.parentElement!;
    }
    return parent;
}
export function getFlattenedChildren(parent: HTMLElement): HTMLElement[]
{
    let children = parent.children;
    let newChildren: HTMLElement[] = [];
    for (let index = 0; index < children.length; index++) {
        let child = children[index] as HTMLElement;
        if (isType(child, CT.PARENTHESES))
        {
            disassembleParentheses(child, newChildren);
        }
        else
        {
            newChildren.push(child);
        }
    }
    return newChildren;
}
export function retrieveFlattenedChildren(parent: HTMLElement, children: HTMLElement[])
{
    while(parent.firstElementChild!=null)
    {
        parent.removeChild(parent.firstElementChild);
    }
    for (let index = 0; index < children.length; index++) {
        let child = children[index];
        
        parent.appendChild(child);
    }
}
export function combineParentheses(flattenedChildren: HTMLElement[], size: SZ)
{
    let done = false;
    for (let index = 0; index < 10; index++) {
        if (!tryCombineParentheses(flattenedChildren, size))
        {
            done = true;
            break;
        }
    }
    assert(done, 'Recursion goes infinitely.');
}
export function disassembleParentheses(parentheses: HTMLElement, newChildren: HTMLElement[])
{
    console.log('Disassembling parentheses!');
    let parenthesesContainer = getParenthesesContainer(parentheses);
    let parenthesesChildren = parenthesesContainer.children;
    if (hasParenthesis(parentheses, ParenthesisType.LeftParenthesis))
    {
        let leftDummyParenthesis = createDummyParenthesis(ParenthesisType.LeftParenthesis, DummyTag.None);
        newChildren.push(leftDummyParenthesis);
    }
    for (let index = 0; index < parenthesesChildren.length; index++) {
        let child = parenthesesChildren[index] as HTMLElement;
        if (isType(child, CT.PARENTHESES))
        {
            disassembleParentheses(child, newChildren);
        }
        else
        {
            newChildren.push(child);
        }
    }
    if (isType(parentheses.lastElementChild as HTMLElement, CT.RIGHT_PARENTHESIS))
    {
        let rightDummyParenthesis = createDummyParenthesis(ParenthesisType.RightParenthesis, DummyTag.None);
        newChildren.push(rightDummyParenthesis);
    }
}


export function tryCombineParentheses(children: HTMLElement[], size: SZ): boolean
{
    let leftCombined = tryCombineLastLeftParentheses(children, size);
    if (!leftCombined)
    {
        let rightCombined = tryCombineRightParentheses(children, size);
        if (!rightCombined)
        {
            return false;
        }
    }
    return true;
}

function tryCombineLastLeftParentheses(children: HTMLElement[], size: SZ): boolean
{
    let lastLeftDummyParenthesisIndex: number|null = null;
    let firstRightAfterLastLeftDummyParenthesisIndex: number|null = null;
    for (let index = children.length - 1; index >=0; index--) {
        const child = children[index];
        if (isType(child, CT.LEFT_DUMMY_PARENTHESIS))
        {
            lastLeftDummyParenthesisIndex = index;
            break;
        }
    }
    if (lastLeftDummyParenthesisIndex == null) return false;
    for (let index = lastLeftDummyParenthesisIndex + 1; index < children.length; index++) {
        let child = children[index];
        if (isType(child, CT.RIGHT_DUMMY_PARENTHESIS))
        {
            firstRightAfterLastLeftDummyParenthesisIndex = index;
            break;
        }
    }
    let parentheses: HTMLElement;
    if (firstRightAfterLastLeftDummyParenthesisIndex != null)
    {
        parentheses = createParentheses(size, ParenthesisType.Both);
    }
    else
    {
        parentheses = createParentheses(size, ParenthesisType.LeftParenthesis);
        firstRightAfterLastLeftDummyParenthesisIndex = children.length;
    }
    let newChildren: HTMLElement[] = [];
    for (let index = 0; index < lastLeftDummyParenthesisIndex; index++) {
        let child = children[index];
        newChildren.push(child);
    }
    let parenthesesContainer = getParenthesesContainer(parentheses);
    parenthesesContainer.innerText = '';
    if (lastLeftDummyParenthesisIndex + 1 < firstRightAfterLastLeftDummyParenthesisIndex)
    {
        for (let index = lastLeftDummyParenthesisIndex + 1;
            index < firstRightAfterLastLeftDummyParenthesisIndex;
            index++)
        {
            let child = children[index];
            parenthesesContainer.appendChild(child);
        }
    }
    else
    {
        let textContainer = createTextContainer(size);
        parenthesesContainer.appendChild(textContainer);
    }
    newChildren.push(parentheses);
    for (let index = firstRightAfterLastLeftDummyParenthesisIndex + 1;
        index < children.length; index++)
    {
        let child = children[index];
        newChildren.push(child);
    }
    for (let index = 0; index < newChildren.length; index++) {
        let child = newChildren[index];
        console.log(child);
    }
    children.length = 0;
    for (let index = 0; index < newChildren.length; index++) {
        let child = newChildren[index];
        children.push(child);
    }
    return true;
}
function tryCombineRightParentheses(children: HTMLElement[], size: SZ): boolean
{
    console.log('Try combining right parentheses');
    let rightParenthesisIndex: number|null = null;
    for (let index = 0; index < children.length; index++) {
        let child = children[index];
        if (isType(child, CT.RIGHT_DUMMY_PARENTHESIS))
        {
            rightParenthesisIndex = index;
            break;
        }
    }
    if (rightParenthesisIndex == null)
    {
        console.log('Cannot find right parentheses');
        return false;
    }
    let parentheses = createParentheses(size, ParenthesisType.RightParenthesis);
    let parenthesesContainer = parentheses.firstElementChild as HTMLElement;
    assert(isType(parenthesesContainer, CT.PARENTHESES_CONTAINER), 'This container should be parentheses container');
    parenthesesContainer.innerText = '';
    let newChildren: HTMLElement[]= [];
    for (let index = 0; index < rightParenthesisIndex; index++){
        let child = children[index];
        parenthesesContainer.appendChild(child);
    }
    newChildren.push(parentheses);
    for (let index = rightParenthesisIndex + 1; index < children.length; index++) {
        let child = children[index];
        newChildren.push(child);
    }
    children.length = 0;
    for (let index = 0; index < newChildren.length; index++) {
        let child = newChildren[index];
        children.push(child);
    }
    return true;
}

function normalAndSplitInsert(range:Range, container: HTMLElement, newElement: HTMLElement)
{
    if (container.getAttribute(ATT.CONTAINER_TYPE) == CT.TEXTCONTAINER)
    {
        if (range.startOffset == 0)
        {
            container.insertAdjacentElement('beforebegin', newElement);
        }
        else if(range.startOffset == container.innerText.length)
        {
            container.insertAdjacentElement('afterend', newElement);
        }
        else
        {
            let splitContainers = splitTextContainer(container, range.startOffset);
            let parent = container.parentElement!;
            parent.replaceChild(splitContainers[0], container);
            splitContainers[0].insertAdjacentElement('afterend', newElement);
            newElement.insertAdjacentElement('afterend', splitContainers[1]);
            console.log('Splitted a text container!');
        }
    }
    else
    {
        container.innerHTML = '';
        container.appendChild(newElement);
    }
}