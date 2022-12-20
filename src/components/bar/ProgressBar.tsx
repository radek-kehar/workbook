import {classNames} from "@/lib/utils";

type ProgressItemProps = {
    className?: string,
    value: number,
    onClick?: (number: number) => void
}

export const ProgressItem = ({className, value, onClick}: ProgressItemProps) => {
    const handleOnClick = (event: any) => {
        event.preventDefault();
        if (onClick) {
            onClick(event.target.getAttribute('data-value'));
        }
    }

    return (
        <div data-value={value} className={classNames(className, "grow h-6")} onClick={handleOnClick}/>
    )
}

type ProgressInfoProps = {
    value: number,
    max: number
}

export const ProgressInfo = ({value, max}: ProgressInfoProps) => {
    return (
        <div className="absolute flex justify-center items-center text-center text-sm w-full h-6">
            <div className="bg-white text-theme-background font-semibold border rounded border-theme-background pl-4 pr-4">
                {value}. z {max}
            </div>
        </div>
    )
}

type ProgressBarProps = {
    value: number,
    max: number
}

const ProgressBar = ({value, max}: ProgressBarProps) => {
    const divs = []
    for (let i = 0; i < max; i++) {
        if (i < value) {
            divs.push(<ProgressItem key={i} value={i} className="bg-theme-background"/>)
        } else {
            divs.push(<ProgressItem key={i} value={i} className="bg-gray-100"/>)
        }
    }

    return (
        <div className={`relative flex flex-row gap-[0.05rem] h-6`}>
            <ProgressInfo value={value} max={max}/>
            {divs}
        </div>
    )
}

export default ProgressBar;
