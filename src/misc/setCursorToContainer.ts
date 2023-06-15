import { createTextContainer } from "../CreateElement/createTextContainer";
import { ATT, CT, SZ } from "../constants";
import { assert } from "./assert";

export enum Direction
{
    Left,
    Right
}

export function setCursorToContainer(range: Range, container: HTMLElement, direction: Direction)
{
    switch(container.getAttribute(ATT.CONTAINER_TYPE))
    {
        case CT.FORMULA:
            if (container.innerHTML =='&nbsp;')
            {
                range.setStart(container.firstChild!, direction == Direction.Left?1:0);
                range.setEnd(container.firstChild!, direction == Direction.Left?1:0);
            }
            else
            {
                let lastChild = container.lastElementChild as HTMLElement;
                range.setStart(lastChild.firstChild!, direction == Direction.Left?lastChild.innerText.length:0);
                range.setEnd(lastChild.firstChild!, direction == Direction.Left?lastChild.innerText.length:0);
            }
            break;
        case CT.TEXTCONTAINER:
            console.log(container);
            range.setStart(container.firstChild!, direction == Direction.Left?container.innerText.length:0);
            range.setEnd(container.firstChild!, direction == Direction.Left?container.innerText.length:0);
            break;
        case CT.SUPERSUBSCRIPT:
        case CT.FRACTION: // tou lan
            let superScript = container.firstElementChild as HTMLElement;
            let subScript = container.lastElementChild as HTMLElement;
            let targetContainer:HTMLElement;
            if (subScript.innerHTML !='&nbsp;' && superScript.innerHTML =='&nbsp;')
            {
                targetContainer = subScript;
            }
            else
            {
                targetContainer = superScript;
            }
            if (targetContainer.innerHTML == '&nbsp;')
            {
                range.setStart(targetContainer.firstChild!, direction == Direction.Left?1:0);
                range.setEnd(targetContainer.firstChild!, direction == Direction.Left?1:0);
            }
            else if(direction == Direction.Left)
            {
                let targetSubContainer = targetContainer.lastElementChild as HTMLElement;
                if (targetSubContainer.getAttribute(ATT.CONTAINER_TYPE) != CT.TEXTCONTAINER)
                {
                    let newTextContainer = createTextContainer(targetContainer.getAttribute(ATT.FONT_SIZE) as SZ);
                    targetSubContainer.insertAdjacentElement('afterend', newTextContainer);
                    targetSubContainer = newTextContainer;
                }
                range.setStart(targetSubContainer.firstChild!, targetSubContainer.innerText.length);
                range.setEnd(targetSubContainer.firstChild!, targetSubContainer.innerText.length);
            }
            else
            {
                let targetSubContainer = targetContainer.firstElementChild as HTMLElement;
                if (targetSubContainer.getAttribute(ATT.CONTAINER_TYPE) != CT.TEXTCONTAINER)
                {
                    let newTextContainer = createTextContainer(targetContainer.getAttribute(ATT.FONT_SIZE) as SZ);
                    targetSubContainer.insertAdjacentElement('beforebegin', newTextContainer);
                    targetSubContainer = newTextContainer;
                }
                range.setStart(targetSubContainer.firstChild!, 0);
                range.setEnd(targetSubContainer.firstChild!, 0);
            }
            console.log('Goes to the superscript/subscript');
            break;

        default:
            assert(false, 'unknown container type');
    }
}