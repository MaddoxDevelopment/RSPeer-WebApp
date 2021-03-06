export class Util {

    public static async sleep(length: number) {
        return await new Promise(res => setTimeout(res, length))
    }

    public static formatNumber(number: string) {
        return !number ? number : number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    public static formatDate(value : string, includeTime : boolean = false) {
        const date = new Date(value);
        return includeTime ? date.toLocaleString() : date.toDateString();
    };

   public static toDateInputValue(value : string) {
       let local = new Date(value);
       local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
       return local.toJSON().slice(0,10);
   }
    
    public static toByteArray(value : string) {
        const utf8 = unescape(encodeURIComponent(value));
        const arr = [];
        for (let i = 0; i < utf8.length; i++) {
            arr.push(utf8.charCodeAt(i));
        }
        return arr;
    }
    
    public static formatBytes(a : any) {
        if (0 == a) return "0 Bytes";
        const c = 1024, d = 2, e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
            f = Math.floor(Math.log(a) / Math.log(c));
        return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
    }

    public static toCamel(o: any) {
        let newO : any, origKey, newKey, value;
        if (o instanceof Array) {
            newO = [];
            for (origKey in o) {
                value = o[origKey]
                if (typeof value === "object") {
                    value = Util.toCamel(value)
                }
                newO.push(value)
            }
        } else {
            newO = {};
            for (origKey in o) {
                if (o.hasOwnProperty(origKey)) {
                    newKey = (origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey).toString()
                    value = o[origKey]
                    if (value instanceof Array || value != null && value.constructor === Object) {
                        value = Util.toCamel(value)
                    }
                    newO[newKey] = value
                }
            }
        }
        return newO
    };

}