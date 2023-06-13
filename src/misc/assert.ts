export function assert(statement:boolean, message:string) {
    if (!statement)
    {
        throw new Error(message);
    }
}