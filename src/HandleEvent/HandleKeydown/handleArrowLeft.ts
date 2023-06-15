import { createTextContainer } from "../../CreateElement/createTextContainer";
import { ATT, CT, SZ } from "../../constants";
import { getBigContainer } from "../../misc/getBigContainer";
import { Direction, setCursorToContainer } from "../../misc/setCursorToContainer";

export function handleArrowLeft(range: Range, container: HTMLElement, event: KeyboardEvent)
{
    let parent = container.parentElement!;
    let bigContainer = getBigContainer(range, container, Direction.Left);
    if (bigContainer == null)
    {
        console.log('getBigContainer returns null, so not handling arrow left.');
        return;
    }
    event.preventDefault();
    if((bigContainer!.previousElementSibling == null && bigContainer.getAttribute(ATT.CONTAINER_TYPE) != CT.TEXTCONTAINER)
        || (bigContainer!.previousElementSibling !=null
        && bigContainer.getAttribute(ATT.CONTAINER_TYPE) != CT.TEXTCONTAINER
        && bigContainer!.previousElementSibling.getAttribute(ATT.CONTAINER_TYPE) != CT.TEXTCONTAINER))
    {
        let bigContainerParent = bigContainer!.parentElement!;
        let textContainer = createTextContainer(bigContainerParent.getAttribute(ATT.FONT_SIZE) as SZ);
        bigContainer!.insertAdjacentElement('beforebegin', textContainer);
        range.setStart(textContainer.firstChild!, 1);
        range.setEnd(textContainer.firstChild!, 1);
        console.log('Inserted a text container in the front.');
    }
    else if(bigContainer!.previousElementSibling == null)
    {
        console.log('Touching border. Cannot go further');
    }
    else
    {
        setCursorToContainer(range, bigContainer!.previousElementSibling as HTMLElement, Direction.Left);
        console.log('Set cursor to the previous element');
    }
}