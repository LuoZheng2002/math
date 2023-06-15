import {assert} from '../../misc/assert';
import { getHTMLContainer } from '../../misc/getHTMLContainer';
import {handleDelete} from './handleDelete';
import { handleInsert } from './handleInsert';
export function handleInput(event: InputEvent)
{
    let selection = window.getSelection();
    assert(selection != null, 'selection is null');
    let range = selection!.getRangeAt(0);
    assert(range != null, 'range is null');
    let container = getHTMLContainer(range.startContainer);
    switch(event.inputType)
    {
        case 'deleteContentBackward':
            handleDelete(range, container, event);
            break;
        case 'insertText':
            handleInsert(range, container, event);
            break;
    }
}