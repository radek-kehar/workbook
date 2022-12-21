import React, {ReactNode} from "react";

type ExampleLayoutProps = {
    children: ReactNode
}

const ExampleLayout = ({children}: ExampleLayoutProps) => {
    return (
        <main>
            {children}
        </main>
    );
};

export default ExampleLayout;
