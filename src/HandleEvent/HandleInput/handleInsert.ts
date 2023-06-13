import { createFormula } from "../../CreateElement/createFormula";
import { ATT, CT } from "../../constants";
import { assert } from "../../misc/assert";

export function handleInsert(range: Range, container: Node, event: InputEvent)
{
    switch(event.data)
    {
        case '$':
            handleDollarSign(range, container, event);
            break;
    }
}
function handleDollarSign(range: Range, container: Node, event: InputEvent)
{
    
    if (container.nodeName == '#text')
    {
        console.log('The container is #text, finding its parent element');
        container = container.parentElement!;
        assert(container!=null, 'The container is #text and it has no parent element');
    }
    let htmlContainer = container as HTMLElement;
    assert(htmlContainer.hasAttribute(ATT.CONTAINER_TYPE), 'container doesn\'t have attribute CONTAINER_TYPE');
    if (htmlContainer.getAttribute(ATT.CONTAINER_TYPE) == CT.MAINDIV)
    {
        // take control
        event.preventDefault();
        // create element
        let formulaElement = createFormula();
        // white space elimination
        if (htmlContainer.innerHTML == '&nbsp;')
        {
            htmlContainer.innerHTML = '';
        }
        // put into place
        htmlContainer.appendChild(formulaElement);
        // set cursor
        range.setStart(formulaElement, 0);
        // send log
        console.log('Inserted a formula element!');
    }
}