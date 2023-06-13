import {assert} from '../../misc/assert';
import {handleDelete} from './handleDelete';
import { handleInsert } from './handleInsert';
export function handleInput(event: InputEvent)
{
    let selection = window.getSelection();
    assert(selection != null, 'selection is null');
    let range = selection!.getRangeAt(0);
    assert(range != null, 'range is null');
    let container = range.startContainer;
    assert(container!=null, 'container is null');
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