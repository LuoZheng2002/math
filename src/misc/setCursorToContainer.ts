import { getParenthesesContainer } from "../CreateElement/createParentheses";
import { createTextContainer } from "../CreateElement/createTextContainer";
import { ATT, CT, SZ } from "../constants";
import { assert } from "./assert";
import { getSize, isType } from "./attributes";
import { getNewSize } from "./getSizeClass";

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
            setCursorToComplexContainer(range, container, direction);
            break;
        case CT.TEXTCONTAINER:
            console.log(container);
            range.setStart(container.firstChild!, direction == Direction.Left?container.innerText.length:0);
            range.setEnd(container.firstChild!, direction == Direction.Left?container.innerText.length:0);
            break;
        case CT.SUPERSUBSCRIPT:
            {
                let superScript = container.firstElementChild as HTMLElement;
                let subScript = container.lastElementChild as HTMLElement;
                assert(isType(superScript, CT.SUPERSCRIPT), 'Container is supposed to be superscript');
                assert(isType(subScript, CT.SUBSCRIPT), 'Container is supposed to be subscript');
                let targetContainer:HTMLElement;
                if (subScript.innerHTML !='&nbsp;' && superScript.innerHTML =='&nbsp;')
                {
                    targetContainer = superScript;
                }
                else
                {
                    targetContainer = superScript;
                }
                setCursorToComplexContainer(range, targetContainer, direction);
                break;
            }
        case CT.FRACTION:
            {
                let n_framework = container.firstElementChild as HTMLElement;
                let d_framework = container.lastElementChild as HTMLElement;
                let numerator = n_framework.firstElementChild as HTMLElement;
                let denominator = d_framework.firstElementChild as HTMLElement;
                assert(isType(n_framework, CT.NUMERATOR_FRAEMWORK),'Container is supposed to be numerator framework');
                assert(isType(d_framework, CT.DENOMINATOR_FRAMEWOKR), 'Container is supposed to be denominator framework.');
                assert(isType(numerator, CT.NUMERATOR), 'Container is supposed to be numerator.');
                assert(isType(denominator, CT.DENOMINATOR), 'Container is supposed to be denominator');
                let targetContainer: HTMLElement;
                if (direction == Direction.Left)
                {
                    targetContainer = denominator;
                }
                else
                {
                    targetContainer = numerator;
                }
                setCursorToComplexContainer(range, targetContainer, direction);
                break;
            }
        case CT.SQRT:
            {
                let sqrtContainer = container.lastChild as HTMLElement;
                assert(isType(sqrtContainer, CT.SQRT_CONTAINER), 'Child should be SQRT_CONTAINER');
                setCursorToComplexContainer(range, sqrtContainer, direction);
                break;
            }
        case CT.PARENTHESES:
            {
                let parenthesesContainer = getParenthesesContainer(container);
                setCursorToComplexContainer(range, parenthesesContainer, direction);
                break;
            }
        default:
            assert(false, 'unknown container type');
    }
}

function setCursorToComplexContainer(range: Range, container: HTMLElement, direction: Direction)
{
    if (container.innerHTML == '&nbsp;')
    {
        range.setStart(container.firstChild!, direction == Direction.Left?1:0);
        range.setEnd(container.firstChild!, direction == Direction.Left?1:0);
    }
    else
    {
        let subContainer: HTMLElement;
        if (direction == Direction.Left)
        {
            subContainer = container.lastElementChild as HTMLElement;
        }
        else
        {
            subContainer = container.firstElementChild as HTMLElement;
        }
        while(isType(container, CT.PARENTHESES_CONTAINER))
        {
            container = container.parentElement!;
            assert(isType(container, CT.PARENTHESES), 'The container is supposed to be a parentheses');
            container = container.parentElement!;
        }
        if (!isType(subContainer, CT.TEXTCONTAINER))
        {
            let newTextContainer = createTextContainer(getSize(container));
            let position = direction == Direction.Left? 'afterend': 'beforebegin';
            subContainer.insertAdjacentElement(position as InsertPosition, newTextContainer);
            subContainer = newTextContainer;
        }
        if (direction == Direction.Left)
        {
            range.setStart(subContainer.firstChild!, subContainer.innerText.length);
            range.setEnd(subContainer.firstChild!, subContainer.innerText.length);
        }
        else
        {
            range.setStart(subContainer.firstChild!, 0);
            range.setEnd(subContainer.firstChild!, 0);
        }
    }
    console.log('Goes to sibling container');
}