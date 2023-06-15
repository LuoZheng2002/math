import { assert } from "./assert";

export function getHTMLContainer(container: Node):HTMLElement
{
    assert(container!=null, 'container is null');
    if (container.nodeName == '#text')
    {
        container = container.parentElement!;
        assert(container!=null, 'The container is #text and it has no parent element');
    }
    return container as HTMLElement;
}