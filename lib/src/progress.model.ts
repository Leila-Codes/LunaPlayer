export class ScanProgress {
    private _processed: number
    private _discovered: number

    constructor(processed: number = 0, discovered: number = 0) {
        this._processed = processed;
        this._discovered = discovered;
    }

    increaseDiscovered(step: number = 1) {
        console.log(`discovered ${this._processed}/${this._discovered}`)
        this._discovered += step
    }

    incrementProcessed() {
        console.log(`discovered ${this._processed}/${this._discovered}`)
        this._processed++;
    }

    percent(): number {
        return Math.round((this._processed / this._discovered) * 100);
    }
}