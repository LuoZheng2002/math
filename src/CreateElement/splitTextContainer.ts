import { ATT, SZ } from "../constants";
import { createTextContainer } from "./createTextContainer";

export function splitTextContainer(container: HTMLElement, offset: number): [HTMLElement, HTMLElement]
{
    let size = container.getAttribute(ATT.FONT_SIZE) as SZ;
    let container1 = createTextContainer(size);
    let container2 = createTextContainer(size);
    container1.innerText = container.innerText.substring(0, offset);
    container2.innerText = container.innerText.substring(offset, container.innerText.length);
    return [container1, container2];
}