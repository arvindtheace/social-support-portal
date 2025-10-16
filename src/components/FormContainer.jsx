import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import Step1Form from './Step1Form';
import Step2Form from './Step2Form';
import Step3Form from './Step3Form';
import { useDispatch } from 'react-redux';
import { savePersonalInfo } from "../store/personalInfoSlice";
import { saveFinancialInfo } from "../store/financialInfoSlice";



const FormContainer = ({ theme }) => {
    const { t } = useTranslation();
    const [activeStep, setActiveStep] = React.useState(0);
    const [isStep1Valid, setIsStep1Valid] = React.useState(false);
    const [step1Data, setStep1Data] = React.useState({});
    const [isStep2Valid, setIsStep2Valid] = React.useState(false);
    const [step2Data, setStep2Data] = React.useState({});
    const dispatch = useDispatch();

    const StepMap = {
        0: <Step1Form onValidityChange={setIsStep1Valid} onDataChange={setStep1Data} />,
        1: <Step2Form onValidityChange={setIsStep2Valid} onDataChange={setStep2Data} />,
        2: <Step3Form />
    }

    console.log('isStep1Valid:', isStep1Valid);
    const steps = [t('step1'), t('step2'), t('step3')];

    const handleNext = () => {
        if(activeStep === 0) {
            dispatch(savePersonalInfo(step1Data));
        }
        else if(activeStep === 1) {
            dispatch(saveFinancialInfo(step2Data));
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const nextDisabled = () => {
        console.log('activeStep:', activeStep);
        if (activeStep === 0) {
            return !isStep1Valid;
        }
        if (activeStep === 1) {
            return !isStep2Valid;
        }
        return false;
    }

    return (
        <Box sx={{ mx: 2 }} dir={theme.direction}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>
                                {label}
                            </StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    {StepMap[activeStep] ? StepMap[activeStep] : <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>}
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            {t('back')}
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button 
                        disabled={nextDisabled()}
                        onClick={handleNext}>
                            {activeStep === steps.length - 1 ? t('finish') : t('next')}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}

export default FormContainer;