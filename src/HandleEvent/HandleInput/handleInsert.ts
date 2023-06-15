import { createFormula } from "../../CreateElement/createFormula";
import { createFraction } from "../../CreateElement/createFraction";
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