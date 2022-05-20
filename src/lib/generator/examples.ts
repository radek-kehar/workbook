import {createGenerator as createOperationGenerator} from "./operations";
import {createGenerator as createGeneratorUnknown} from "./unknown";
import {Answer, BinaryExample, Example, ShowValue, Unknown, ValueExample} from "../../model/examples";
import {ExampleGenerator, GeneratorOptions, Generators, GenericGenerator,} from "../../model/generator";
import {createKeyboard} from "./creator/keyboard";
import {transformOperationToExample} from "./mapper/operationToExample";
import {genericGenerator, getRandomInt} from "./commons";

export const createGenerator = (options: GeneratorOptions[]): ExampleGenerator => {
    const generatorOfGenerators = createGeneratorOfGenerators(options);

    const next = (): Example => {
        const generator = generatorOfGenerators.next();
        const example = transformOperationToExample(generator.operationGenerator.next());
        const unknown = generator.unknownGenerator.next();
        let valueExample: ValueExample;
        if (unknown === Unknown.RESULT) {
            valueExample = example.result;
        } else {
            const exampleValues: ValueExample[] = fillExampleValues(example,[]);
            const random = getRandomInt(0, exampleValues.length - 1);
            valueExample = exampleValues[random];
        }
        valueExample.isUnknown = true;
        valueExample.show = ShowValue.NONE;
        const keyboard = createKeyboard(generator.options);
        return {
            example,
            keyboard,
            answer: Answer.NOT_ANSWERED
        };
    }

    return {
        next
    }
}

const createGeneratorOfGenerators = (generatorOptions: GeneratorOptions[]): GenericGenerator<Generators> => {
    const generators: Generators[] = [];
    for (const options of generatorOptions) {
        const operationGenerator = createOperationGenerator(options);
        const unknownGenerator = createGeneratorUnknown(options.unknowns);
        generators.push({
            operationGenerator,
            unknownGenerator,
            options
        })
    }
    const generatorsFactory = (): Generators[] => {
        return [...generators];
    }
    return genericGenerator(generatorsFactory);
}

const fillExampleValues = (example: BinaryExample, exampleValues: ValueExample[]): ValueExample[] => {
    if ('isUnknown' in example.left) {
        exampleValues.push(example.left);
    } else {
        return fillExampleValues(example.left, exampleValues);
    }
    if ('isUnknown' in example.right) {
        exampleValues.push(example.right);
    } else {
        return fillExampleValues(example.right, exampleValues);
    }
    return exampleValues;
}
