import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

const Wrapper = styled.div<{ show: boolean }>(({ show }) => ({
    opacity: 0,
    transitionProperty: 'opacity',
    transitionDuration: '.25s',
    cursor: 'unset',

    ...(show && {
        opacity: '.99',
    }),
}));

const TransitionDelayed = ({ children, delay = 500, shouldShow }: TransitionDelayedProps) => {
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        if (shouldShow) {
            const timeout = setTimeout(() => {
                setShow(true);
            }, delay);

            return () => {
                setShow(false);
                return clearTimeout(timeout);
            };
        }
    }, [shouldShow]);

    return <Wrapper show={show}>{children}</Wrapper>;
};

type TransitionDelayedProps = {
    children: React.ReactNode;
    delay?: number;
    shouldShow?: boolean;
};

export { TransitionDelayed };
