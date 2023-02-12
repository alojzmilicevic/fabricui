import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

const Wrapper = styled.div<{ show: boolean }>(({ show }) => ({
    opacity: 0,
    transitionProperty: 'opacity',
    transitionDuration: '.25s',
    cursor: 'default',
    ...(show && {
        opacity: '.99',
    }),
}));

const TransitionDelayed = ({ children, delay = 500 }: TransitionDelayedProps) => {
    const [hovered, setHovered] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        if (hovered) {
            const timeout = setTimeout(() => {
                setShow(true);
            }, delay);

            return () => clearTimeout(timeout);
        }
    }, [hovered]);

    const onHover = () => {
        setHovered(true);
    };

    const onLeave = () => {
        setHovered(false);
        setShow(false);
    };

    return (
        <Wrapper show={show} onMouseEnter={onHover} onMouseLeave={onLeave}>
            {children}
        </Wrapper>
    );
};

type TransitionDelayedProps = {
    children: React.ReactNode;
    delay?: number;
};

export { TransitionDelayed };
