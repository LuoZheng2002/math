import { ATT, CLASS, CT, SZ } from "../constants";
import { assert } from "./assert";

export function isType(container: HTMLElement, containerType: CT): boolean
{
    assert(container.hasAttribute(ATT.CONTAINER_TYPE), 'container does not have CONTAINER_TYPE');
    return container.getAttribute(ATT.CONTAINER_TYPE) == containerType;
}

export function setType(container: HTMLElement, containerType: CT)
{
    container.setAttribute(ATT.CONTAINER_TYPE, containerType);
}

export function getType(container: HTMLElement): CT
{
    assert(container.hasAttribute(ATT.CONTAINER_TYPE), 'container does not have CONTAINER_TYPE');
    return container.getAttribute(ATT.CONTAINER_TYPE) as CT;
}

export function getSize(container: HTMLElement): SZ
{
    assert(container.hasAttribute(ATT.FONT_SIZE), 'Container does not have FONT_SIZE attribute');
    return container.getAttribute(ATT.FONT_SIZE) as SZ;
}

export function setSize(container: HTMLElement, size: SZ)
{
    container.setAttribute(ATT.FONT_SIZE, size);
}

export function addClass(container: HTMLElement, cssClass: string)
{
    container.classList.add(cssClass);
}