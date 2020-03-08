import {ILocale} from "../interfaces/ILocale";
import {IntlShape} from "react-intl";

export const stringUtils = {
    isNullOrEmpty: (s: string): boolean => {
        return !s || s.trim().length === 0;
    },
    hasStr: (source: string, target: string): boolean => {
        return source.indexOf(target) !== -1;
    }
};

export const flattenMessages = ((nestedMessages: ILocale, prefix = '') => {
    if (nestedMessages === null) {
        return {}
    }
    return Object.keys(nestedMessages).reduce((messages, key) => {
        const value = nestedMessages[key];
        const prefixedKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === 'string') {
            Object.assign(messages, {[prefixedKey]: value})
        } else {
            Object.assign(messages, flattenMessages(value, prefixedKey))
        }

        return messages
    }, {})
});

export const getIntlMessage = (intl: IntlShape, intlIds: string[]): string[] => {
    return intlIds.flatMap((item) => intl.formatMessage({id: item}));
};


export const formatDateTime = (dateString: string) => {
    const d = new Date(dateString);
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
};


export const getInputRefValue = (inputRef: any) => {
    return (inputRef.current.lastElementChild!.firstChild as HTMLInputElement).value;
};


