import { ATT, CT } from "../constants";
import { assert } from "./assert";

export function deleteLastCharacter(container: HTMLElement)
{
    console.log('Manually delete the last character of a container');
    switch(container.getAttribute(ATT.CONTAINER_TYPE))
    {
        case CT.FORMULA:
            if (container.innerHTML == '&nbsp;')
                break;
            let lastContainer = container.lastChild as HTMLElement;
            deleteLastCharacter(lastContainer);
            break;
        case CT.TEXTCONTAINER:
            if (container.innerText.length == 1)
            {
                container.innerHTML = '&nbsp;';
            }
            else
            {
                container.innerText = container.innerText.substring(0, container.innerText.length - 1);
            }
            break;
        default:
            assert(false, 'unknown container type');
    }
}