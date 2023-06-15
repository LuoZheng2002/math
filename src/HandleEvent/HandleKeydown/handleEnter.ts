export function handleEnter(range: Range, container: HTMLElement, event: KeyboardEvent)
{
    event.preventDefault();
    console.log('Prevented enter!');
}