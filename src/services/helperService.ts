export function isMain(): boolean {
    const {argv} = process
    const stack: string[]|undefined = new Error().stack?.split('\n');

    if (!stack)throw new Error('No stack')

    const caller:string =stack[2].match(/ \((.*)\.ts:\d*:\d*/)![1]

    return argv.find(s=>s.endsWith('.ts'))?.includes(caller) ?? false

}