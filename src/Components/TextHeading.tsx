import * as React from 'react';

export interface ITextHeadingProps {
    level: 1 | 2 | 3 | 4 | 5 | 6;
    children?: React.ReactNode;
}


export function TextHeading (props: ITextHeadingProps) {
    const { children, level } = props;

    switch (level) {
        case 1:
            return <h1 className='heading'>{children}</h1>;
        case 2:
            return <h2 className='heading'>{children}</h2>;
        case 3:
            return <h3 className='heading'>{children}</h3>;
        case 4:
            return <h4 className='heading'>{children}</h4>;
        case 5:
            return <h5 className='heading'>{children}</h5>;
        case 6:
            return <h6 className='heading'>{children}</h6>;
        default:
            return <h1 className='heading'>{children}</h1>;
    }
}
