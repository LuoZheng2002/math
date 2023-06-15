import { CLASS, SZ } from "../constants";

function sizeToNum(size:SZ): number
{
    switch(size)
    {
        case SZ.SZ_1:
            return 1;
        case SZ.SZ_2:
            return 2;
        case SZ.SZ_3:
            return 3;
        case SZ.SZ_4:
            return 4;
        default:
            return 5;
    }
}

function numToSize(num: number):SZ
{
    switch(num)
    {
        case 1:
            return SZ.SZ_1;
        case 2:
            return SZ.SZ_2;
        case 3:
            return SZ.SZ_3;
        case 4:
            return SZ.SZ_4;
        default:
            return SZ.SZ_5;
    }
}
export function getNewSize(size: SZ, offset: number)
{
    let num = sizeToNum(size);
    let newNum = num - offset;
    if (newNum <1)
    {
        newNum = 1;
    }
    return numToSize(newNum);
}

export function getSizeClass(size:SZ):string
{
    switch(size)
    {
        case SZ.SZ_1:
            return CLASS.FONT_SIZE_1;
        case SZ.SZ_2:
            return CLASS.FONT_SIZE_2;
        case SZ.SZ_3:
            return CLASS.FONT_SIZE_3;
        case SZ.SZ_4:
            return CLASS.FONT_SIZE_4;
        default:
            return CLASS.FONT_SIZE_5;
    }
}