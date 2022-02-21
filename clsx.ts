/**
 * @file clsx
 * @date 2022-02-21
 * @author Zakke
 * @lastModify Zakke 2022-02-21
 */

export interface ClassDictionary {
    [id: string]: unknown;
}

export type ClassValue =
    | ClassArray
    | ClassDictionary
    | string
    | number
    | null
    | boolean
    | undefined;

export type ClassArray = Array<ClassValue>;

function toVal(mix: ClassValue): string {
    let str = '';
    let y;

    // determine if it is a string or a number
    if (typeof mix === 'string' || typeof mix === 'number') {
        str += mix;
    } else if (typeof mix === 'object') {
        // if it is a array
        if (Array.isArray(mix)) {
            for (let k = 0; k < mix.length; k++) {
                if (mix[k]) {
                    if ((y = toVal(mix[k]))) {
                        str && (str += ' ');
                        str += y;
                    }
                }
            }
        }
        // if it is object but not array
        else {
            for (const k in mix) {
                if (mix[k]) {
                    // if str not '', join with ' '
                    str && (str += ' ');
                    str += k;
                }
            }
        }
    }

    return str;
}

export default function (...classes: ClassValue[]): string {
    let temp,
        x,
        str = '';

    for (let i = 0; i < classes.length; i++) {
        if ((temp = classes[i])) {
            if ((x = toVal(temp))) {
                str && (str += ' ');
                str += x;
            }
        }
    }
    return str;
}
