import { addSyntheticLeadingComment, isTaggedTemplateExpression } from "../../../node_modules/typescript/lib/typescript";
import { createCursorAnchor } from "../../CreateElement/createCursorAnchor";
import { createDummyParenthesis } from "../../CreateElement/createDummyParenthesis";
import { ParenthesisType, hasParenthesis } from "../../CreateElement/createParentheses";
import { createTextContainer } from "../../CreateElement/createTextContainer";
import { mergeTextContainers } from "../../CreateElement/mergeTextContainers";
import { ATT, CT, SZ } from "../../constants";
import { assert } from "../../misc/assert";
import { getSize, getType, isType } from "../../misc/attributes";
import { getBigContainerExceptText } from "../../misc/getBigContainer";
import { Direction, setCursorToContainer } from "../../misc/setCursorToContainer";
import { combineParentheses, disassembleParentheses, getFlattenedChildren, getParentExceptParentheses, retrieveFlattenedChildren as retrieveChildren, setCursorAfterAnchor, tryCombineParentheses } from "./handleInsert";

export function handleDelete(range: Range, container: HTMLElement, event: InputEvent)
{
    // create white space or delete instantly
    if(isType(container, CT.TEXTCONTAINER))
    {
        let parent = container.parentElement!;
        let isContainerEmpty = container.innerHTML == '&nbsp;';
        let isContainerLengthOne = container.innerText.length == 1;
        let isStartOffsetOne = range.startOffset == 1;
        let isStartOffsetZero = range.startOffset == 0;
        let parentHasOnlyOneChild = parent.childElementCount == 1;
        let isParentParenthesesContainer = isType(parent, CT.PARENTHESES_CONTAINER);
        let leftIsLeftParenthesis = judgeLeftIsLeftParenthesis(range, container, event);
        let leftIsRightParenthesis = judgeLeftIsRightParenthesis(range, container, event);
        if (parentHasOnlyOneChild && (isContainerEmpty || (isContainerLengthOne && isStartOffsetOne)) && !isParentParenthesesContainer)
        {
            deleteTextContainer(range, container, event);
        }
        else if((isContainerEmpty || isStartOffsetZero) && (leftIsLeftParenthesis || leftIsRightParenthesis))
        {
            deleteParenthesis(range, container, event);
        }
        else if(isStartOffsetZero)
        {
            preventDeleteTextContainer(range, container, event);
        }
    }
    else if(isType(container, CT.PARENTHESES_CONTAINER) && container.innerHTML == '&nbsp;')
    {
        deleteParenthesis(range, container, event);
    }
    else if(container.innerHTML == '&nbsp;')
    {
        deleteNonTextContainer(range, container, event);
    }
}

function judgeLeftIsLeftParenthesis(range: Range, container: HTMLElement, event: InputEvent): boolean
{
    let parent = container.parentElement!;
    if (!isType(parent, CT.PARENTHESES_CONTAINER)) return false;
    if (parent.firstElementChild != container) return false;
    return hasParenthesis(parent.parentElement!, ParenthesisType.LeftParenthesis);
}
function judgeLeftIsRightParenthesis(range: Range, container: HTMLElement, event:InputEvent): boolean
{
    let leftSibling = container.previousElementSibling as HTMLElement;
    if (leftSibling == null) return false;
    if (isType(leftSibling, CT.PARENTHESES))
    {
        assert(hasParenthesis(leftSibling, ParenthesisType.RightParenthesis), 'The parentheses should have right parenthesis');
        return true;
    }
    return false;
}

function deleteParenthesis(range: Range, container: HTMLElement, event: InputEvent)
{
    event.preventDefault();
    let isParenthesisContainer = isType(container, CT.PARENTHESES_CONTAINER);
    let parenthesesContainer: HTMLElement|null = null;
    if (isParenthesisContainer)
    {
        parenthesesContainer = container;
        assert(isType(parenthesesContainer, CT.PARENTHESES_CONTAINER),'');
        container = container.parentElement!;
        assert(isType(container, CT.PARENTHESES), '');
    }
    let parent = getParentExceptParentheses(container);
    if (isParenthesisContainer)
    {
        let textContainer = createTextContainer(getSize(parent));
        parenthesesContainer!.innerText = '';
        parenthesesContainer!.appendChild(textContainer);
        container = textContainer;
    }
    let cursorAnchor = createCursorAnchor();
    container.insertAdjacentElement('beforebegin', cursorAnchor);
    // break existing parenthesis pairs
    let flattenedChildren = getFlattenedChildren(parent);
    deleteDummyParenthesisBeforeAnchor(flattenedChildren);
    // debug code start
    retrieveChildren(parent, flattenedChildren);
    // debug code end
    setTimeout(()=>{
        combineParentheses(flattenedChildren, getSize(parent));
        // assign new children to parent
        retrieveChildren(parent, flattenedChildren);
        setCursorAfterAnchor(range, cursorAnchor, getSize(parent));
    }, 200);
}

function deleteDummyParenthesisBeforeAnchor(flattenedChildren: HTMLElement[])
{
    flattenedChildren.forEach(element => {
        console.log(element);
    });
    let cursorAnchorIndex = flattenedChildren.findIndex((child)=>{return isType(child, CT.CURSOR_ANCHOR)});
    assert(cursorAnchorIndex != -1, 'Cannot find anchor.');
    let dummyParenthesis = flattenedChildren[cursorAnchorIndex - 1];
    assert(isType(dummyParenthesis, CT.LEFT_DUMMY_PARENTHESIS)
        || isType(dummyParenthesis, CT.RIGHT_DUMMY_PARENTHESIS),'The previous child should be dummy parenthesis');
    flattenedChildren.splice(cursorAnchorIndex - 1, 1);
}

function deleteTextContainer(range: Range, container: HTMLElement, event: InputEvent)
{
    event.preventDefault();
    normalAndMergeDelete(range, container);
}
function preventDeleteTextContainer(range: Range, container: HTMLElement, event: InputEvent)
{
    event.preventDefault();
    container.innerHTML = '&nbsp;';
    console.log('create a white space and prevent deleting.');      
}
function deleteNonTextContainer(range: Range, container: HTMLElement, event: InputEvent)
{
    event.preventDefault();
        let bigContainer = getBigContainerExceptText(container)!;
        assert(bigContainer!=null, 'Big container should not be null');
        switch(getType(bigContainer))
        {
            case CT.MAINDIV:
                console.log('Prevent deleting the main div.');
                break;
            case CT.FORMULA:
            case CT.SQRT:
                if (container.innerHTML == '&nbsp;')
                {
                    normalAndMergeDelete(range, bigContainer);
                }
                else
                {
                    console.log('Cannot delete sqrt because there is still contents');
                }
                break;
            case CT.SUPERSUBSCRIPT:
                {
                    let superScript = bigContainer.firstElementChild!;
                    let subScript = bigContainer.lastElementChild!;
                    if (superScript.innerHTML !='&nbsp;' || subScript.innerHTML !='&nbsp;')
                    {
                        console.log('Because either superscript or subscript is not empty, delete is prevented.');
                    }
                    else
                    {
                        normalAndMergeDelete(range, bigContainer);
                    }
                    break;
                }
            case CT.FRACTION:
                {
                    let numerator = bigContainer.firstElementChild!.firstElementChild as HTMLElement;
                    assert(isType(numerator, CT.NUMERATOR), 'The container is supposed to be a numerator');
                    let denominator = bigContainer.lastElementChild!.firstElementChild as HTMLElement;
                    assert(isType(denominator, CT.DENOMINATOR), 'The container is supposed to be a denominator');
                    if (numerator.innerHTML !='&nbsp;' || denominator.innerHTML !='&nbsp;')
                    {
                        console.log('Because either numerator or denominator is not empty, delete is prevented.');
                    }
                    else
                    {
                        normalAndMergeDelete(range, bigContainer);
                    }
                    break;
                }
            default:
                assert(false,' Unknown big container type');
                break;
        }
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
