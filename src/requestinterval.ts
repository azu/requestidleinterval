import { wrapRequestIdleCallback, warpCancelIdleCallback } from "./requestIdleCallbackPonyfill";
export type requestIdleIntervalOtion = {
    interval: number;
    timeout: number;
}
/**
 * `callback` function is invoked when after `interval` msec and enviroment is idled.
 * `callback` which have a `timeout` specified may be called out-of-order if necessary in order to run them before the timeout elapses.
 * @param callback 
 * @param options 
 */
export const requestIdleInterval = (callback: () => void, options: requestIdleIntervalOtion) => {
    const intervalState: {
        intervalId?: any
        requestIdleCallbackId?: number,
        isCanceled: boolean;
    } = {
        isCanceled: false
    };
    intervalState.intervalId = setInterval(() => {
        // If it already canceled, does not request callback
        if (intervalState.isCanceled) {
            return;
        }
        intervalState.requestIdleCallbackId = wrapRequestIdleCallback(callback, {
            timeout: options.timeout
        });
    }, options.interval);
    // return cancel function
    return function cancelRequestIdleInterval() {
        intervalState.isCanceled = true;
        if (intervalState.intervalId !== undefined) {
            clearInterval(intervalState.intervalId);
        }
        if (intervalState.requestIdleCallbackId !== undefined) {
            warpCancelIdleCallback(intervalState.requestIdleCallbackId);
        }
    }
}
