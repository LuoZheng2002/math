import { ATT, CT } from "../constants";
import { Direction } from "./setCursorToContainer";

export function getBigContainer(range:Range, container: HTMLElement, direction: Direction): HTMLElement|null
{
    if (container.getAttribute(ATT.CONTAINER_TYPE) == CT.TEXTCONTAINER)
    {
        let leftSibling = container.previousElementSibling;
        let rightSibling = container.nextElementSibling;
        let parent = container.parentElement!;
        if ((direction == Direction.Left && range.startOffset != 0)
            ||(direction == Direction.Right && range.startOffset != container.innerText.length ))
        {
            console.log('Fail to trigger moving cursor.');
            return null;
        }
        else if ((direction == Direction.Left && leftSibling!=null)
            ||(direction == Direction.Right && rightSibling!=null))
        {
            return container;
        }
        else
        {
            
            let bigContainer = getBigContainerExceptText(parent);
            if (bigContainer == null)
            {
                return container;
            }
            else
            {
                return bigContainer;
            }
        }
    }
    else
    {
        return getBigContainerExceptText(container);
    }
}

function getBigContainerExceptText(container: HTMLElement):HTMLElement|null
{
    switch(container.getAttribute(ATT.CONTAINER_TYPE))
    {
        case CT.SUPERSCRIPT:
        case CT.SUBSCRIPT:
        case CT.NUMERATOR:
        case CT.DENOMINATOR:
            return container.parentElement!;
        case CT.FORMULA:
            return container;
        default:
            console.log('Returning null in getBigContainerExceptText, meaning there is situations like text container in div');
            return null;
    }
}