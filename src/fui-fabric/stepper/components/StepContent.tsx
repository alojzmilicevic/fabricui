import * as React from "react";
import { useLayoutEffect, useRef, useState } from "react";
import { StepProps } from "./Step/Step";
import styled from "@emotion/styled";

const Transition = styled.div<{ active: boolean; height: number }>(({ active, height }) => ({
    height: 0,
    minHeight: "0",
    transition: "height 300ms",
    transitionTimingFunction: "easy-in-out",
    overflow: "hidden",
    opacity: 0,
    ...(active && {
        height,
        overflow: "unset",
        opacity: 1,
    }),
}));

const Wrapper = styled.div<{ last: boolean }>(({ last }) => ({
    marginLeft: 12,
    paddingLeft: 20,
    paddingRight: 8,
    ...(!last && {
        borderLeft: "1px solid #bdbdbd",
    }),
}));

const TransitionHeight = ({ children, active }: { children: React.ReactNode; active: boolean }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number>();

    useLayoutEffect(() => {
        if (!ref.current) return;

        setHeight(ref.current.getBoundingClientRect().height);
    }, [active]);

    return (
        <Transition height={height!} active={active}>
            <div ref={ref}>{children}</div>
        </Transition>
    );
};

const StepContent = ({ last = false, active = false, children }: StepContentProps) => (
    <Wrapper last={last}>
        <TransitionHeight active={active}>{children}</TransitionHeight>
    </Wrapper>
);

// Construct a type from StepProps (parent) but force the props to be required unlike the parents props
type StepContentProps = Partial<Pick<StepProps, "last" | "active">> & {
    children: React.ReactNode;
};

export { StepContent };
