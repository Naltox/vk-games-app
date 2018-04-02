/**
 * Combines className[] to one className
 */
export const combine = (...styles: string[]): string => styles.join(' ')

export const visible = isVisible => {
    return {
        display: isVisible ? 'block' : 'none'
    }
}

/**
 * returns className based on provided rules
 *
 * styleSwitch(1, { '1': 'a', '2': 'b' }) -> 'a'
 */
export function styleSwitch(value: string|number, rules: object): string {
    value = value.toString()

    for (let key in rules) {
        if (key === value) {
            return rules[key]
        }
    }

    return ''
}

export function styleIf(value: boolean, then: string, otherwise: string = ''): string {
    if (value)
        return then
    else
        return otherwise
}