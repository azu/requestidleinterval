import { wrapRequestIdleCallback, warpCancelIdleCallback, RequestIdleCallbackDeadline } from "./requestIdleCallbackPonyfill";
export type requestIdleIntervalOtion = {
    interval: number;
    timeout: number;
}
/**
 * `callback` function is invoked when after `interval` msec and enviroment is idled.
 * `callback` which have a `timeout` specified may be called out-of-order if necessary in order to run them before the timeout elapses.
 * @param callback 
 * @param options 
 * @return {function} return cancelRequestIdleInterval function
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
        intervalState.requestIdleCallbackId = wrapRequestIdleCallback((deadline: RequestIdleCallbackDeadline) => {
            // Use any remaining time, or, if timed out, just run through the tasks.
            while ((deadline.timeRemaining() > 0 || deadline.didTimeout)) {
                callback()
            }
        }, {
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
