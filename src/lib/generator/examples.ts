import {createGenerator as createOperationGenerator} from "./operations";
import {createGenerator as createGeneratorUnknown} from "./unknown";
import {Answer, Example} from "../../model/examples";
import {ExampleGenerator, GeneratorOptions, Generators, GenericGenerator,} from "../../model/generator";
import {createKeyboard} from "./creator/keyboard";
import {transformOperationToExample} from "./mapper/operationToExample";
import {genericGenerator} from "./commons";

export const createExampleGenerator = (options: GeneratorOptions[]): ExampleGenerator => {
    const generatorOfGenerators = createGeneratorOfGenerators(options);

    const next = (): Example<any> => {
        const generator = generatorOfGenerators.next();
        const operation = generator.operationGenerator.next();
        const unknown = generator.unknownGenerator.next();
        const example = transformOperationToExample(generator.options, operation, unknown);
        const keyboard = createKeyboard(generator.options);
        return {
            type: generator.options.type,
            operation: example,
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
