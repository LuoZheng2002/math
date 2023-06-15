import { createTextContainer } from "../../CreateElement/createTextContainer";
import { ATT, CT, SZ } from "../../constants";
import { getBigContainer } from "../../misc/getBigContainer";
import { Direction, setCursorToContainer } from "../../misc/setCursorToContainer";

export function handleArrowRight(range: Range, container: HTMLElement, event: KeyboardEvent)
{
    let parent = container.parentElement!;
    let bigContainer = getBigContainer(range, container, Direction.Right);
    if (bigContainer == null)
    {
        console.log('getBigContainer returns null, so not handling arrow right.');
        return;
    }
    event.preventDefault();
    if ((bigContainer!.nextElementSibling == null && bigContainer.getAttribute(ATT.CONTAINER_TYPE) != CT.TEXTCONTAINER)
        || ( bigContainer!.nextElementSibling !=null
        && bigContainer.getAttribute(ATT.CONTAINER_TYPE) != CT.TEXTCONTAINER
        && bigContainer!.nextElementSibling!.getAttribute(ATT.CONTAINER_TYPE) != CT.TEXTCONTAINER))
    {
        let bigContainerParent = bigContainer!.parentElement!;
        let textContainer = createTextContainer(bigContainerParent.getAttribute(ATT.FONT_SIZE) as SZ);
        bigContainer!.insertAdjacentElement('afterend', textContainer);
        range.setStart(textContainer.firstChild!, 1);
        range.setEnd(textContainer.firstChild!, 1);
        console.log('Inserted a text container after formula');
    }
    else if(bigContainer!.nextElementSibling == null)
    {
        console.log('Touching border. Cannot go further');
    }
    else
    {
        setCursorToContainer(range, bigContainer!.nextElementSibling as HTMLElement, Direction.Right);
        console.log('Set cursor to the next element');
    }
}