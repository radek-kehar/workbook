import {Example, ResultExamples} from "@/model/examples";
import {CheckIcon} from "@heroicons/react/24/outline";

const AllCorectResult = () => {
    return (
        <div className="flex flex-col text-center mb-10">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
            </div>
            <div className="text-3xl">Všechno správně!</div>
        </div>
    )
}

const CorectResult = ({value}: { value: Example<any>[] }) => {
    let messageCorrect
    if (value.length === 0) {
        messageCorrect = 'Na poprvé si neodpověděl na žádný příklad správně.';
    } else if (value.length === 1) {
        messageCorrect = 'Na poprvé si odpověděl na 1 příklad správně.';
    } else if (value.length < 5) {
        messageCorrect = `Na poprvé si odpověděl na ${value.length} příklady správně.`;
    } else {
        messageCorrect = `Na poprvé si odpověděl na ${value.length} příkladů správně.`;
    }

    return (
        <div className="text-3xl">{messageCorrect}</div>
    )
}

const WrongResult = ({value}: { value: Example<any>[] }) => {
    return (
        <div className="flex flex-col gap-y-2 text-lg">
            <div className="text-gray-500">Zopakuj si příklady, ve kterých jsi chyboval:</div>
            {value.map((item, idx) => {
                return (
                    <div key={idx}>{item.asText()}</div>
                );
            })}
        </div>
    )
}

const SomeWrongResult = ({value}: ExampleResultProps) => {
    return (
        <div className="flex flex-col gap-y-6 text-center">
            <CorectResult value={value.correct}/>
            <WrongResult value={value.wrong}/>
        </div>
    );
}

type ExampleResultProps = {
    value: ResultExamples
}

const ExampleResult = ({value}: ExampleResultProps) => {
    if (value.wrong.length === 0) {
        return (
            <AllCorectResult/>
        );
    }

    return (
        <SomeWrongResult value={value}/>
    );
}

export default ExampleResult;
