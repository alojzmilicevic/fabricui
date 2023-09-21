import styled from "@emotion/styled";
import * as React from "react";
import { ReactElement, useState } from "react";

const Wrapper = styled.div(() => ({
    maxWidth: 500,
}));

const INITIAL_STATE = -1;

const Stepper = ({ activeStep, children }: StepperProps) => {
    const childrenArray = React.Children.toArray(children).filter(Boolean);
    const [previewStep, setPreviewStep] = useState<number>(INITIAL_STATE);

    const onClick = (clickedIndex: number) => {
        if (clickedIndex === activeStep) {
            setPreviewStep(INITIAL_STATE);
        } else {
            setPreviewStep(clickedIndex);
        }
    };

    const steps = childrenArray.map((step, index: number) => {
        const el = step as ReactElement;
        const active = previewStep !== INITIAL_STATE ? previewStep === index : activeStep === index;
        return React.cloneElement(el, {
            index: index + 1,
            last: index + 1 === childrenArray.length,
            active,
            completed: index <= activeStep,
            onClick: () => onClick(index),
            ...el.props,
        });
    });

    return <Wrapper>{steps}</Wrapper>;
};

type StepperProps = {
    activeStep: number;
    children?: React.ReactNode;
};

export { Stepper };
