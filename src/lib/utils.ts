export const isObject = <T extends any>(obj: T): boolean => {
    return obj && typeof obj === 'object' && !Array.isArray(obj)
}

export const isSameObject = <T extends any, U extends any>(obj1: T, obj2: U): boolean => {
    let result = true;

    Object.keys(obj1).forEach(key => {
        if (isObject(obj1[key])) {
            if (!isSameObject(obj1[key], obj2[key])) {
                result = false;
            }

        } else if (Array.isArray(obj1[key])) {
            if (obj1[key].length !== obj2[key].length) {
                result = false;

            } else {
                for (let i = 0; i < obj1[key].length; i++) {
                    if (!isSameObject(obj1[key][i], obj2[key][i])) {
                        result = false;
                        break;
                    }
                }
            }

        } else {
            if (!Object.is(obj1[key], obj2[key])) {
                result = false;
            }
        }
    });

    return result;
}
