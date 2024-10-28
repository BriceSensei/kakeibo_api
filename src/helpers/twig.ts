import { readFileSync } from 'fs';
export class TwigFormatter {
    body: string;
    variables: { [key: string]: any; };
    format() {
        Object.entries(this.variables).forEach(([key, value]) => {
            this.body = this.body.replaceAll(`{{ ${key} }}`, value.toString());
        })
    }
    constructor(path: string, variables: { [key: string]: any }) {
        this.body = readFileSync(path).toString();

        this.variables = variables;
    }
}