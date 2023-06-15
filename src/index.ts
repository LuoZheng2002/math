import { handleInput } from "./HandleEvent/HandleInput/handleInput";
import { handleKeydown } from "./HandleEvent/HandleKeydown/handleKeydown";
import { CLASS } from "./constants";
import { assert } from "./misc/assert";
import { colorful } from "./misc/color";
try
{
    let mainDiv = document.getElementById('mainDiv')!;
    mainDiv.classList.add(colorful?CLASS.COLOR_MAINDIV:CLASS.COLOR_NONE);
    assert(mainDiv != null, 'mainDiv is null');
    mainDiv.addEventListener('beforeinput', handleInput);
    mainDiv.addEventListener('keydown', handleKeydown);
}
catch(error)
{
    console.error(error);
}