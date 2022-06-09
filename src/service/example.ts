import {ExerciseOptions} from "model/exercise";
import {ExampleGenerator, GeneratorOptions} from "model/generator";
import {createExampleGenerator} from "lib/generator/examples";
import {generateOptions} from "service/exercise";

export const createGenerator = (exercise: ExerciseOptions): ExampleGenerator => {
    const options: GeneratorOptions[] = generateOptions(exercise);
    const generator: ExampleGenerator = createExampleGenerator(options);
    return generator;
}
