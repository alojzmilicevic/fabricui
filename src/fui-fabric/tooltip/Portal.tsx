import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

type Styles = { [key: string]: string | number | undefined };

type PortalProps = {
    children: React.ReactNode;
    elementId?: string;
    styles?: Styles;
};

const StyledPortal = styled.div`
    position: absolute;
    inset: 0px auto auto 0px;
    margin: 0;
    background-color: #333;
    z-index: 1300;
`;

export function Portal(props: PortalProps) {
    const { children, elementId = 'react-portal', styles } = props;

    useLayoutEffect(() => {
        let element = document.getElementById(elementId);

        return () => {
            if (element) document.body.removeChild(element);
        };
    }, [elementId]);

    return createPortal(<StyledPortal style={{ ...styles }}>{children}</StyledPortal>, document.body);
}
