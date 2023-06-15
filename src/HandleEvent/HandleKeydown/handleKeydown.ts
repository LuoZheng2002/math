import { assert } from "../../misc/assert";
import { getHTMLContainer } from "../../misc/getHTMLContainer";
import { Direction } from "../../misc/setCursorToContainer";
import { handleArrow } from "./handleArrow";
import { handleEnter } from "./handleEnter";

export function handleKeydown(event: KeyboardEvent)
{
    let selection = window.getSelection();
    assert(selection != null, 'selection is null');
    let range = selection!.getRangeAt(0);
    assert(range != null, 'range is null');
    let container = getHTMLContainer(range.startContainer);
    switch(event.key)
    {
        case 'ArrowRight':
            handleArrow(range, container, event, Direction.Right);
            break;
        case 'ArrowLeft':
            handleArrow(range, container, event, Direction.Left);
            break;
        case 'Enter':
            handleEnter(range, container, event);
            break;
    }

}