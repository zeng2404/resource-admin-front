import {ILocale} from "../interfaces/ILocale";
import {IntlShape} from "react-intl";

export const stringUtils = {
    isNullOrEmpty: (s: string): boolean => {
        if (!s || s.length === 0) {
            return true;
        }
        return false;
    },
    hasStr: (source: string, target: string): boolean => {
        if (source.indexOf(target) !== -1) {
            return true;
        }
        return false;
    }
};

export const flattenMessages = ((nestedMessages: ILocale, prefix = '') => {
    if (nestedMessages === null) {
        return {}
    }
    return Object.keys(nestedMessages).reduce((messages, key) => {
        const value = nestedMessages[key]
        const prefixedKey = prefix ? `${prefix}.${key}` : key

        if (typeof value === 'string') {
            Object.assign(messages, {[prefixedKey]: value})
        } else {
            Object.assign(messages, flattenMessages(value, prefixedKey))
        }

        return messages
    }, {})
});

export const getIntlMessage = (intl: IntlShape, intlIds: string[]): string[] => {
    const intlMessageArray: string[] = [];
    intlIds.map((item) => {
        intlMessageArray.push(intl.formatMessage({id: item}));
    });
    return intlMessageArray;
}
