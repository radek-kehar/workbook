import {GenericGenerator} from "@/model/generator";

class UniqueRandom<T extends any> {
    readonly valuesFactory: () => T[];
    private uniqueRandoms: T[] = [];

    constructor(valuesFactory: () => T[]) {
        this.valuesFactory = valuesFactory;
    }

    private refill(): void {
        // refill the array if needed
        if (!this.uniqueRandoms.length) {
            this.uniqueRandoms = this.valuesFactory();
        }
    }

    getRandom(): T {
        this.refill();
        const index = Math.floor(Math.random() * this.uniqueRandoms.length);
        const val = this.uniqueRandoms[index];
        if (val === null || val === undefined) {
            throw new Error();
        }
        // now remove that value from the array
        this.uniqueRandoms.splice(index, 1);
        return val;
    }
}

export const genericGenerator = <Type>(valuesFactory: () => Type[]): GenericGenerator<Type> => {
    const uniqueRandoms = new UniqueRandom(valuesFactory);
    const next = (): Type => {
        return uniqueRandoms.getRandom();
    }
    return {
        next
    }
}

export const getRandomInt = (min: number, max: number): number => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// class UniqueRandomNumber {
//     readonly min: number;
//     readonly max: number;
//     private uniqueRandoms: number[] = []
//
//     constructor(min: number, max: number) {
//         this.min = min;
//         this.max = max;
//     }
//
//     private refill(): void {
//         // refill the array if needed
//         if (!this.uniqueRandoms.length) {
//             for (let i = this.min; i <= this.max; i++) {
//                 this.uniqueRandoms.push(i);
//             }
//         }
//     }
//
//     getRandom(): number {
//         this.refill();
//         const index = Math.floor(Math.random() * this.uniqueRandoms.length);
//         const val = this.uniqueRandoms[index];
//         // now remove that value from the array
//         this.uniqueRandoms.splice(index, 1);
//         return val;
//     }
//
//     getRandomMax(max: number): number | null {
//         this.refill();
//         const tempIndexes: number[] = [];
//         for (let i = 0; i < this.uniqueRandoms.length; i++) {
//             if (this.uniqueRandoms[i] <= max) {
//                 tempIndexes.push(i);
//             }
//         }
//         if (tempIndexes.length === 0) {
//             return null;
//         }
//         const indexOfTemp = Math.floor(Math.random() * tempIndexes.length);
//         const indexOfUniqueRandom = tempIndexes[indexOfTemp];
//         const val = this.uniqueRandoms[indexOfUniqueRandom];
//         // now remove that value from the array
//         this.uniqueRandoms.splice(indexOfUniqueRandom, 1);
//         return val;
//     }
//
//     remove(value: number) {
//         const index = this.uniqueRandoms.findIndex(item => item === value);
//         if (index > -1) {
//             this.uniqueRandoms.splice(index, 1);
//         }
//     }
// }
//
// export function generatorForAdd(options: GeneratorOptions): NumberGenerator {
//     const {minDigit, maxDigit, count}: { minDigit: number, maxDigit: number, count: number } = options;
//     const uniqueRandoms = Array(count).fill(null).map(item => new UniqueRandomNumber(minDigit, maxDigit));
//
//     const generate = (): number[] => {
//         const result = Array(count);
//         result[0] = uniqueRandoms[0].getRandom();
//         let max = maxDigit - result[0];
//         for (let i = 1; i < count; i++) {
//             if (max > minDigit) {
//                 let temp = uniqueRandoms[i].getRandomMax(max);
//                 if (temp === null) {
//                     temp = getRandomInt(minDigit, max);
//                     uniqueRandoms[i].remove(temp);
//                 }
//                 result[i] = temp;
//                 max = maxDigit - result[i];
//             } else {
//                 result[i] = 0;
//             }
//         }
//         return result;
//     }
//
//     return {
//         generate
//     }
// }
//
// export function generatorForSub(options: GeneratorOptions): NumberGenerator {
//     const {minDigit, maxDigit, count}: { minDigit: number, maxDigit: number, count: number } = options;
//     const uniqueRandoms = Array(count).fill(null).map(item => new UniqueRandomNumber(minDigit, maxDigit));
//
//     const generate = (): number[] => {
//         const result = Array(count);
//         result[0] = uniqueRandoms[0].getRandom();
//         let min = result[0];
//         for (let i = 1; i < count; i++) {
//             if (min > minDigit) {
//                 let temp = uniqueRandoms[i].getRandomMax(min);
//                 if (temp === null) {
//                     temp = getRandomInt(minDigit, min);
//                     uniqueRandoms[i].remove(temp);
//                 }
//                 result[i] = temp;
//                 min = min - result[i];
//             } else {
//                 result[i] = 0;
//             }
//         }
//         return result;
//     }
//
//     return {
//         generate
//     }
// }
