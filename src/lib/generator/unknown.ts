import {Unknown, UnknownGenerator} from "@/model/generator";
import {genericGenerator} from "@/lib/generator/commons";

export const createGenerator = (unknowns: Unknown[]): UnknownGenerator => {
    if (unknowns.length === 1) {
        return {
            next(): Unknown {
                return unknowns[0];
            }
        }

    } else {
        const values = [...unknowns];
        if (unknowns.includes(Unknown.RESULT) && unknowns.includes(Unknown.OPERAND)) {
            // operandu je vic (min. 2), takze by meli mit vetsi vahu (meli by se vyskytovat casteji) nez vysledek
            values.push(Unknown.OPERAND);
        }
        const valuesFactory = (): Unknown[] => {
            return values;
        }
        const generator = genericGenerator(valuesFactory);
        return {
            next(): Unknown {
                return generator.next();
            }
        }
    }
}
