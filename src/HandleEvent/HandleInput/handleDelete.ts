import { addSyntheticLeadingComment } from "../../../node_modules/typescript/lib/typescript";
import { mergeTextContainers } from "../../CreateElement/mergeTextContainers";
import { ATT, CT } from "../../constants";
import { assert } from "../../misc/assert";
import { deleteLastCharacter } from "../../misc/deleteLastCharacter";
import { Direction, setCursorToContainer } from "../../misc/setCursorToContainer";

export function handleDelete(range: Range, container: HTMLElement, event: InputEvent)
{
    if (tryDeleteFront(range, container, event)) return;
    if (tryDeleteContainer(range, container, event)) return;
    if (tryCreateWhiteSpace(range, container, event)) return;
}

function tryDeleteFront(range: Range, container: HTMLElement, event: InputEvent):boolean
{
    if (range.startOffset != 0) return false;
    let parent = container.parentElement!;
    let hasContainer= false;
    let bigContainer :HTMLElement|null = null;
    if (container.previousElementSibling != null)
    {
        bigContainer = container;
        hasContainer = true;
    }
    else if (parent.firstChild == container && parent.previousElementSibling != null)
    {
        bigContainer = parent;
        hasContainer = true;
    }
    if (!hasContainer)
    {
        event.preventDefault();
        console.log('Prevent deleting front.');
        return false;
    }
    event.preventDefault();
    let leftSibling = bigContainer?.previousElementSibling as HTMLElement;
    deleteLastCharacter(leftSibling);
    setCursorToContainer(range, leftSibling, Direction.Left);
    console.log('Set cursor to the previos element before deleting');
    return true;
}

function tryDeleteContainer(range: Range, container: HTMLElement, event: InputEvent):boolean
{
    if (tryDeleteFormula(range, container, event)) return true;
    if (tryDeleteMainDiv(range, container, event)) return true;
    if (tryDeleteSuperSubScript(range, container, event)) return true;
    if (tryDeleteFraction(range, container, event)) return true;
    if (tryDeleteTextContainer(range, container, event)) return true;
    return false;
}
function tryCreateWhiteSpace(range: Range, container: HTMLElement, event: InputEvent):boolean
{
    if (container.innerText.length == 1 && container.innerHTML !='&nbsp;' && range.startOffset == 1)
    {
        event.preventDefault();
        container.innerHTML = '&nbsp;';
        range.setStart(container, 1);
        console.log('Created a white space.');
        return true;
    }
    return false;
}
function createWhiteSpaceForParent(range: Range, parent: HTMLElement)
{
    assert(parent != null, 'parent is null');
    parent.innerHTML = '&nbsp;';
    range.setStart(parent.childNodes[0], 1);
    console.log('Created a white space for parent');
}
function tryDeleteFormula(range: Range, container: HTMLElement, event: InputEvent):boolean
{
    if (container.getAttribute(ATT.CONTAINER_TYPE) != CT.FORMULA)return false;
    if (container.innerHTML != '&nbsp;') return false;
    event.preventDefault();
    normalAndMergeDelete(range, container);
    return true;
}
function tryDeleteMainDiv(range: Range, container: HTMLElement, event: InputEvent): boolean
{
    if (container.getAttribute(ATT.CONTAINER_TYPE) != CT.MAINDIV) return false;
    if (container.innerHTML != '&nbsp;') return false;
    event.preventDefault();
    console.log('Prevent deleting the main div');
    return true;
}
function tryDeleteTextContainer(range: Range, container: HTMLElement, event: InputEvent): boolean
{
    if (container.getAttribute(ATT.CONTAINER_TYPE) != CT.TEXTCONTAINER) return false;
    // if the text container only contains one character, and its parent is formula and has only one child, then delete the container and set the formula to be a white space
    let parent = container.parentElement!;
    let parentTypes:string[] = [CT.FORMULA, CT.SUPERSCRIPT, CT.SUBSCRIPT];
    let isWhiteSpace = container.innerHTML== '&nbsp;';
    let isOnlyChildElement = container.innerText.length == 1
        && parentTypes.includes(parent.getAttribute(ATT.CONTAINER_TYPE)!)
        && parent.childElementCount == 1
        && range.startOffset == 1;
    if (!isWhiteSpace && !isOnlyChildElement) return false;
    event.preventDefault();
    let cursorIsSet = setCursorToAdjacentContainer(range, container);
    container.remove();
    if (!cursorIsSet) createWhiteSpaceForParent(range, parent);
    console.log('Removed a text container.');
    return true;
}

function setCursorToAdjacentContainer(range: Range, container: HTMLElement):boolean
{
    let parentContainer = container.parentElement!;
    assert(parentContainer!=null, 'parent container does not exist.');
    let adjacentElement: HTMLElement | null = null;
    let leftElement = container.previousElementSibling as HTMLElement;
    let rightElement = container.nextElementSibling as HTMLElement;
    let direction: Direction = Direction.Left;
    if (leftElement!=null)
    {
        adjacentElement = leftElement;
        direction = Direction.Left;
    }
    else if(rightElement != null)
    {
        adjacentElement = rightElement;
        direction = Direction.Right;
    }
    if (adjacentElement!=null)
    {
        setCursorToContainer(range, adjacentElement, direction);
        return true;
    }
    else
    {
        return false;
    }
}

function tryDeleteSuperSubScript(range: Range, container: HTMLElement, event: InputEvent)
{
    if (container.innerHTML != '&nbsp;') return false;
    if (container.getAttribute(ATT.CONTAINER_TYPE) == CT.TEXTCONTAINER)
    {
        container = container.parentElement!;
    }
    if (![CT.SUPERSCRIPT, CT.SUBSCRIPT].includes(container.getAttribute(ATT.CONTAINER_TYPE) as CT)) return false;
    event.preventDefault();
    let superSubScript = container.parentElement!;
    let superScript = superSubScript.firstElementChild!;
    let subScript = superSubScript.lastElementChild!;
    if (superScript.innerHTML !='&nbsp;' || subScript.innerHTML !='&nbsp;')
    {
        console.log('Because either superscript or subscript is not empty, delete is prevented.');
        return false;
    }
    normalAndMergeDelete(range, superSubScript);
    return true;
}

function tryDeleteFraction(range: Range, container: HTMLElement, event: InputEvent)
{
    if (container.innerHTML != '&nbsp;') return false;
    if (container.getAttribute(ATT.CONTAINER_TYPE) == CT.TEXTCONTAINER)
    {
        container = container.parentElement!;
    }
    if (![CT.NUMERATOR, CT.DENOMINATOR].includes(container.getAttribute(ATT.CONTAINER_TYPE) as CT)) return false;
    event.preventDefault();
    let fraction = container.parentElement!;
    let numerator = fraction.firstElementChild!;
    let denominator = fraction.lastElementChild!;
    if (numerator.innerHTML !='&nbsp;' || denominator.innerHTML !='&nbsp;')
    {
        console.log('Because either numerator or denominator is not empty, delete is prevented.');
        return false;
    }
    normalAndMergeDelete(range, fraction);
    return true;
}

function normalAndMergeDelete(range: Range, container: HTMLElement)
{
    let parent = container.parentElement!;
    let leftSibling = container.previousElementSibling as HTMLElement;
    let rightSibling = container.nextElementSibling as HTMLElement;
    // merge text containers
    let cursorIsSet = true;
    if (leftSibling != null && rightSibling != null
        && leftSibling.getAttribute(ATT.CONTAINER_TYPE) == CT.TEXTCONTAINER
        && rightSibling.getAttribute(ATT.CONTAINER_TYPE) == CT.TEXTCONTAINER)
    {
        let offset = leftSibling.innerText.length;
        let mergedContainer = mergeTextContainers(leftSibling, rightSibling);
        parent.removeChild(leftSibling);
        parent.removeChild(rightSibling);
        container.insertAdjacentElement('afterend', mergedContainer);
        range.setStart(mergedContainer.firstChild!, offset);
        console.log('Merged text containers!');
    }
    else if(leftSibling != null)
    {
        setCursorToContainer(range, leftSibling, Direction.Left);
    }
    else if(rightSibling != null)
    {
        setCursorToContainer(range, rightSibling, Direction.Right);
    }
    else
    {
        cursorIsSet = false;
    }
    
    container.remove();
    if (!cursorIsSet)
    {
        createWhiteSpaceForParent(range, parent);
    }
    console.log('Removed a container.');

}