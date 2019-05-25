/**
 * Based on https://developers.google.com/web/updates/2015/08/using-requestidlecallback
 */
export type RequestIdleCallbackHandle = any;
export type RequestIdleCallbackOptions = {
    timeout: number;
};
export type RequestIdleCallbackDeadline = {
    readonly didTimeout: boolean;
    timeRemaining: (() => number);
};
export type requestIdleCallback = ((
    callback: ((deadline: RequestIdleCallbackDeadline) => void),
    opts?: RequestIdleCallbackOptions,
) => RequestIdleCallbackHandle);
export type cancelRequestIdleCallback = (id: number) => void;
// polyfill for requestIdleCallback
export const wrapRequestIdleCallback: requestIdleCallback = window && 'requestIdleCallback' in window
    ? (window as any).requestIdleCallback
    : function (callback: ((deadline: RequestIdleCallbackDeadline) => void), options?: RequestIdleCallbackOptions) {
        const timeout = options && typeof options.timeout === "number" ? options.timeout : 50
        const start = Date.now();
        return setTimeout(function () {
            callback({
                didTimeout: false,
                timeRemaining: function () {
                    return Math.max(0, timeout - (Date.now() - start));
                }
            });
        }, 0);
    }
// polyfill for cancelRequestIdleCallback
export const warpCancelIdleCallback: cancelRequestIdleCallback = window && 'cancelIdleCallback' in window
    ? (window as any).cancelIdleCallback
    : function (id: number) {
        clearTimeout(id);
    }


