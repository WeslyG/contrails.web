type AsyncProcedure<TA extends unknown[]> = (...args: TA) => Promise<void>;

export interface IInterruptibleContext {
    check(): Promise<void>;
}

class InterruptibleContext implements IInterruptibleContext {
    public drawing = false;
    public nextDrawResolve?: (x: boolean) => void;
    public timer: number = new Date().getTime();

    public async check(): Promise<void> {
        if (new Date().getTime() - this.timer > 30) {
            await delay(0);
            if (this.nextDrawResolve != undefined) {
                throw new InterruptedError();
            }
            this.timer = new Date().getTime();
        }
    }

    public async start(): Promise<boolean> {
        if (this.drawing) {
            if (this.nextDrawResolve != undefined) {
                this.nextDrawResolve(false);
            }
            const canContinue = await new Promise(resolve => {
                this.nextDrawResolve = resolve;
            });
            if (!canContinue) {
                return false;
            }
            this.nextDrawResolve = undefined;
            this.drawing = true;
            this.timer = new Date().getTime();
            return true;
        }
        this.drawing = true;
        this.timer = new Date().getTime();
        return true;
    }

    public complete(): void {
        this.drawing = false;
    }

    public cancelComplete(): void {
        if (this.nextDrawResolve != undefined) {
            this.nextDrawResolve(true);
        }
    }
}

export class InterruptedError {}

export function interruptible<TA extends unknown[]>(
    factory: (context: InterruptibleContext) => AsyncProcedure<TA>
): AsyncProcedure<TA> {
    const context = new InterruptibleContext();
    const fn = factory(context);
    return async (...args: TA) => {
        const canContinue = await context.start();
        if (!canContinue) {
            return;
        }
        try {
            await fn(...args);
            context.complete();
        } catch (e) {
            if (e instanceof InterruptedError) {
                context.cancelComplete();
            } else {
                throw e;
            }
        }
    };
}

function delay(timeout: number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}