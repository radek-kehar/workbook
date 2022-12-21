import React from "react";

type TextProps = {
    text: string
}

export const PageTitle = ({text}: TextProps) => {
    return (
        <h1 className="text-2xl text-primary">{text}</h1>
    )
}

export const PageDescription = ({text}: TextProps) => {
    return (
        <p className="text-secondary">{text}</p>
    )
}

type PageHeaderProps = {
    title: string,
    description?: string
}

const PageHeader = ({description, title}: PageHeaderProps) => {

    return (
        <div className="border-b border-gray-300 pb-4 mb-4">
            <PageTitle text={title}/>
            <PageDescription text={description}/>
        </div>
    )
}

export default PageHeader;
