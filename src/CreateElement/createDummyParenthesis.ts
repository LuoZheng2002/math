import { CLASS, CT } from "../constants";
import { addClass, setType } from "../misc/attributes";
import { ParenthesisType } from "./createParentheses";

export const DUMMY_ATTRIBUTE = 'DUMMY_ATTRIBUTE';
export enum DummyTag
{
    None = 'None',
    Create = 'Create',
    Delete = 'Delete'
}

export function createDummyParenthesis(type: ParenthesisType, tag: DummyTag)
{
    // create element
    let dummyParenthesis = document.createElement('span');
    // assign container attributes
    if (type == ParenthesisType.LeftParenthesis)
    {
        setType(dummyParenthesis, CT.LEFT_DUMMY_PARENTHESIS);
    }
    else
    {
        setType(dummyParenthesis, CT.RIGHT_DUMMY_PARENTHESIS);
    }
    // assign container classes
    addClass(dummyParenthesis, CLASS.DUMMY_PARENTHESIS);
    // assign size classes
    addClass(dummyParenthesis, CLASS.FONT_SIZE_5);
    // assign color classes
    addClass(dummyParenthesis, CLASS.COLOR_DUMMY_PARENTHESIS);
    // assign content
    dummyParenthesis.innerText = type == ParenthesisType.LeftParenthesis? '(':')';
    dummyParenthesis.setAttribute(DUMMY_ATTRIBUTE, tag);
    return dummyParenthesis;
}