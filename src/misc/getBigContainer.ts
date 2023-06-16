import { parseJsonText } from "../../node_modules/typescript/lib/typescript";
import { ATT, CT } from "../constants";
import { assert } from "./assert";
import { isType } from "./attributes";
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
            {
                let parent = container.parentElement!;
                assert(isType(parent, CT.SUPERSUBSCRIPT), 'The parent is supposed to be superSubScript');
                return parent!;
            }
        case CT.NUMERATOR:
        case CT.DENOMINATOR:
            {
                let parent = container.parentElement!;
                assert(isType(parent, CT.NUMERATOR_FRAEMWORK) || isType(parent, CT.DENOMINATOR_FRAMEWOKR), 'The parent is supposed to be framework.');
                let parent2 = parent.parentElement!;
                assert(isType(parent2, CT.FRACTION), 'Parent\'s parent is supposed to be fraction');
                return parent2;
            }
        case CT.FORMULA:
            return container;
        case CT.SQRT_CONTAINER:
            {
                let parent = container.parentElement!;
                assert(isType(parent, CT.SQRT), 'Parent is supposed to be SQRT');
                return parent;
            }
        case CT.PARENTHESES_CONTAINER:
            {
                let parent = container.parentElement!;
                assert(isType(parent, CT.PARENTHESES), 'Parent is supposed to be parentheses');
                return parent;
            }
        default:
            console.log('Returning null in getBigContainerExceptText, meaning there is situations like text container in div');
            return null;
    }
}