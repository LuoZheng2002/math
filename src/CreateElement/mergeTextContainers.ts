import { ATT, CT, SZ } from "../constants";
import { assert } from "../misc/assert";
import { createTextContainer } from "./createTextContainer";

export function mergeTextContainers(container1: HTMLElement, container2: HTMLElement):HTMLElement
{
    assert(container1.getAttribute(ATT.CONTAINER_TYPE) == CT.TEXTCONTAINER, 'container1 is not text container');
    assert(container2.getAttribute(ATT.CONTAINER_TYPE) == CT.TEXTCONTAINER, 'container2 is not text container');
    let newContainer = createTextContainer(container1.getAttribute(ATT.FONT_SIZE) as SZ);
    newContainer.innerText = container1.innerText + container2.innerText;
    return newContainer;
}