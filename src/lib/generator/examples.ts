import {createGenerator as createOperationGenerator} from "@/lib/generator/operations";
import {createGenerator as createGeneratorUnknown} from "@/lib/generator/unknown";
import {Answer, Example} from "@/model/examples";
import {ExampleGenerator, GeneratorOptions, Generators, GenericGenerator,} from "@/model/generator";
import {createKeyboard} from "@/lib/generator/creator/keyboard";
import {transformOperationToExample} from "@/lib/generator/mapper/operationToExample";
import {genericGenerator} from "@/lib/generator/commons";

export const createExampleGenerator = (options: GeneratorOptions[]): ExampleGenerator => {
    const generatorOfGenerators = createGeneratorOfGenerators(options);

    const next = (): Example<any> => {
        const generator = generatorOfGenerators.next();
        const operation = generator.operationGenerator.next();
        const unknown = generator.unknownGenerator.next();
        const example = transformOperationToExample(generator.options, operation, unknown);
        const keyboard = createKeyboard(generator.options, unknown);
        return {
            type: generator.options.type,
            operation: example,
            keyboard,
            answer: Answer.NOT_ANSWERED,
            wasWrongAnswer: undefined,
            asText(): string {
                return example.asText();
            }
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
