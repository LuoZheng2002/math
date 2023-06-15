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

    let button = document.getElementById('button')!;
    let colorStyleSheet = document.getElementById('colorStyleSheet') as HTMLLinkElement;
    let hasBackgroundColor = true;
    button.addEventListener('click', function(event){
        console.log('Background color toggled!');
        hasBackgroundColor = !hasBackgroundColor;
        if (hasBackgroundColor)
        {
            colorStyleSheet.href = 'color.css';
        }
        else
        {
            colorStyleSheet.href = 'no_color.css';
        }
    });
}
catch(error)
{
    console.error(error);
}