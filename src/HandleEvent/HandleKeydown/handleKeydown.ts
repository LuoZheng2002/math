import { assert } from "../../misc/assert";

export function handleKeydown(event: KeyboardEvent)
{
    let selection = window.getSelection();
    assert(selection != null, 'selection is null');
    let range = selection!.getRangeAt(0);
    assert(range != null, 'range is null');
    let container = range.startContainer;
    assert(container!=null, 'container is null');
    
}