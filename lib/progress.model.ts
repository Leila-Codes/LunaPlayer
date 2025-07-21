export class ScanProgress {
    processed: number
    discovered: number

    constructor(processed: number = 0, discovered: number = 0) {
        this.processed = processed;
        this.discovered = discovered;
    }

    increaseDiscovered(step: number = 1) {
        console.log(`discovered ${this.processed}/${this.discovered}`)
        this.discovered += step
    }

    incrementProcessed() {
        console.log(`discovered ${this.processed}/${this.discovered}`)
        this.processed++;
    }

    percent(): number {
        return Math.round((this.processed / this.discovered) * 100);
    }
}