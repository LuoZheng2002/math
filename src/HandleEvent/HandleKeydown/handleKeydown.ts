import { assert } from "../../misc/assert";
import { getHTMLContainer } from "../../misc/getHTMLContainer";
import { handleArrowLeft } from "./handleArrowLeft";
import { handleArrowRight } from "./handleArrowRight";
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
            handleArrowRight(range, container, event);
            break;
        case 'ArrowLeft':
            handleArrowLeft(range, container, event);
            break;
        case 'Enter':
            handleEnter(range, container, event);
            break;
    }

}