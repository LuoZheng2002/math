import { ParenthesisType, hasParenthesis } from "../../CreateElement/createParentheses";
import { createTextContainer } from "../../CreateElement/createTextContainer";
import { ATT, CT, SZ } from "../../constants";
import { assert } from "../../misc/assert";
import { getSize, isType } from "../../misc/attributes";
import { getBigContainer } from "../../misc/getBigContainer";
import { Direction, setCursorToContainer } from "../../misc/setCursorToContainer";

export function handleArrow(range: Range, container: HTMLElement, event: KeyboardEvent, direction: Direction)
{
    let bigContainer = getBigContainer(range, container, direction);
    if (bigContainer == null)
    {
        console.log('default cursor moving.');
        return;
    }
    event.preventDefault();
    
    let sibling: HTMLElement = direction == Direction.Left? bigContainer!.previousElementSibling as HTMLElement: bigContainer.nextElementSibling as HTMLElement;
    if (isType(bigContainer, CT.PARENTHESES)
        && ((direction == Direction.Left && !hasParenthesis(bigContainer, ParenthesisType.LeftParenthesis))
        || direction == Direction.Right && !hasParenthesis(bigContainer, ParenthesisType.RightParenthesis)))
    {
        event.preventDefault();
        console.log('Prevent creating new text container because it is in a parentheses scope');
    }
    else if ((sibling == null && !isType(bigContainer, CT.TEXTCONTAINER))
        || ( sibling !=null
        && !isType(bigContainer, CT.TEXTCONTAINER)
        && !isType(sibling, CT.TEXTCONTAINER)))
    {
        let bigContainerParent = bigContainer!.parentElement!;
        while(isType(bigContainerParent, CT.PARENTHESES_CONTAINER))
        {
            bigContainerParent = bigContainerParent.parentElement!;
            assert(isType(bigContainerParent, CT.PARENTHESES), 'The container is supposed to be a parentieses');
            bigContainerParent = bigContainerParent.parentElement!;
        }
        let textContainer = createTextContainer(getSize(bigContainerParent));
        let position = direction == Direction.Left? 'beforebegin': 'afterend';
        bigContainer!.insertAdjacentElement(position as InsertPosition, textContainer);
        range.setStart(textContainer.firstChild!, direction == Direction.Left?1:0);
        range.setEnd(textContainer.firstChild!, direction == Direction.Left?1:0);
        console.log('Inserted a text container');
    }
    else if(sibling == null)
    {
        console.log('Touching border. Cannot go further');
        return;
    }
    else
    {
        setCursorToContainer(range, sibling, direction);
        console.log('Set cursor to the previous/next element');
    }
    if (isType(container, CT.TEXTCONTAINER) && container.innerHTML == '&nbsp;')
    {
        let parent = container.parentElement!;
        let addSpace = parent.childElementCount == 1;
        container.remove();
        if (addSpace)
        {
            parent.innerHTML = '&nbsp;';
        }
        console.log('Remove empty text container');
    }
}