import { handleInput } from "./HandleEvent/HandleInput/handleInput";
import { handleKeydown } from "./HandleEvent/HandleKeydown/handleKeydown";
import { assert } from "./misc/assert";
try
{
    let mainDiv = document.getElementById('mainDiv')!;
    assert(mainDiv != null, 'mainDiv is null');
    mainDiv.addEventListener('beforeinput', handleInput);
    mainDiv.addEventListener('keydown', handleKeydown);
}
catch(error)
{
    console.error(error);
}