import { useState } from 'react';
import { Stepper } from '../modules/Stepper';
import { Step, StepInfo } from '../components/Step/Step';
import { stepsTestData } from './testData';
import styled from '@emotion/styled';
import { StepLabel } from '../components/StepLabel';
import { StepContent } from '../components/StepContent';
import { StyledTypography } from '../components/StyledTypography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { KeyboardArrowUp } from '@mui/icons-material';

const wrapIndex = (i: number, i_max: number) => ((i % i_max) + i_max) % i_max;

const CircularBackdrop = styled.div(() => ({
    borderRadius: 100,
    width: 48,
    height: 48,
    display: 'flex', 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',

    '&:hover': {
        cursor: 'pointer',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
}));

const ExampleWrapper = styled.div(() => ({
    border: '1px solid',
    borderColor: '#E7EBF0',
    borderRadius: 10,
    padding: 24,
    boxSizing: 'border-box',
    backgroundColor: 'aliceblue',
    height: 700,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    userSelect: 'none',
}));

const StepperControl = ({ setActiveStep, activeStep }: { setActiveStep: (i: number) => void; activeStep: number }) => {
    const onClickUp = () => setActiveStep(wrapIndex(activeStep - 1, stepsTestData.length));
    const onClickDown = () => setActiveStep((activeStep + 1) % stepsTestData.length);

    return (
        <div>
            <h5>Use arrows to change step</h5>
            <p style={{ fontStyle: 'italic', fontSize: '13px', margin: 0 }}>Click on a step to preview it</p>
            <div style={{ display: 'flex', marginTop: 16 }}>
                <CircularBackdrop onClick={onClickDown}>
                    <KeyboardArrowDownIcon />
                </CircularBackdrop>
                <CircularBackdrop onClick={onClickUp} style={{ marginLeft: 24 }}>
                    <KeyboardArrowUp />
                </CircularBackdrop>
            </div>
        </div>
    );
};

const StepperExample = () => {
    const lastSuccessfulIndex = 1;
    const errorText = 'Customer forgot to sign';

    const [activeStep, setActiveStep] = useState<number>(lastSuccessfulIndex);

    const getStatus = (index: number) => {
        if (errorText && index === lastSuccessfulIndex) {
            return 'error';
        }

        if (index <= activeStep) {
            return 'success';
        }

        return undefined;
    };

    return (
        <ExampleWrapper>
            <Stepper activeStep={activeStep}>
                {stepsTestData.map((step: StepInfo, index: number) => (
                    <Step key={step.label}>
                        <StepLabel variant={getStatus(index)}>
                            <StyledTypography>{step.label}</StyledTypography>
                        </StepLabel>
                        <StepContent>
                            <StyledTypography>
                                {index === lastSuccessfulIndex && errorText ? errorText : step.description}
                            </StyledTypography>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>

            <StepperControl activeStep={activeStep} setActiveStep={setActiveStep} />
        </ExampleWrapper>
    );
};

export { StepperExample };
