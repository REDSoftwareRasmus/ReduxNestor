import Cookies from "universal-cookie";



interface CookieActionResult {
    success: boolean
    error?: Error
}

export enum GeoDocCookies {
    MapType = "MAPTYPE"
}


export class CookieHandler {

    private static cookies: Cookies = new Cookies();

    public static get(key: GeoDocCookies): any | null {
        return CookieHandler.cookies.get(key)
    } 

    public static set(key: GeoDocCookies, value: any, options?: object): CookieActionResult {
        try {
            CookieHandler.cookies.set(key, value, options);
            return { success: true, error: null }
        } catch (error) {
            return { success: false, error: error } 
        }
    }

    public static remove(key: GeoDocCookies): CookieActionResult {
        try {
            CookieHandler.cookies.remove(key);
            return { success: true, error: null }
        } catch (error) {
            return { success: false, error: error } 
        }
    }
}
