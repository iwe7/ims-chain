
export function getPath(key: string, obj: any) {
    let keys: string[] = key.split(".");
    let instance = obj;
    if (keys.length === 1) {
        return {
            value: obj[keys[0]],
            instance
        };
    } else {
        let _keys = keys.reverse();
        let key = _keys.pop();
        while (_keys.length > 0) {
            obj = obj[key];
            instance = obj;
            key = _keys.pop();
        }
        obj = obj[key];
        return { value: obj, instance };
    }
}
