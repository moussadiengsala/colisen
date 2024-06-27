export default function throttle<T extends (...args: any[]) => void>(func: T, wait: number = 300) {
    let timeout: NodeJS.Timeout | null = null;
    let lastArgs: any[];
    let lastThis: any;
    let lastTime: number = 0;

    const throttled = function(this: ThisParameterType<T>, ...args: Parameters<T>) {
        const context = this;

        const now = Date.now();
        if (!lastTime) lastTime = now;

        const remaining = wait - (now - lastTime);
        lastArgs = args;
        lastThis = context;

        if (remaining <= 0) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            func.apply(context, args);
            lastTime = now;
        } else if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null;
                func.apply(lastThis, lastArgs);
                lastTime = Date.now();
            }, remaining);
        }
    };

    throttled.cancel = function() {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
    };

    return throttled as T & { cancel(): void };
}
