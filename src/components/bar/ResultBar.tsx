import {Answer} from "@/model/examples";
import {ProgressItem} from "@/components/bar/ProgressBar";

type ResultBarProps = {
    values: Answer[],
    click?: (number: number) => void
}

function ResultBar({values, click}: ResultBarProps) {
    const divs = []
    for (let i = 0; i < values.length; i++) {
        if (values[i] === Answer.CORRECT) {
            divs.push(<ProgressItem key={i} value={i} onClick={click} className="bg-positive"/>)

        } else if (values[i] === Answer.WRONG) {
            divs.push(<ProgressItem key={i} value={i} onClick={click} className="bg-negative"/>)

        } else {
            divs.push(<ProgressItem key={i} value={i} className="bg-gray-100"/>)
        }
    }

    return (
        <div className={`relative flex flex-row gap-[0.05rem] h-6`}>
            {divs}
        </div>
    )
}

export default ResultBar;
