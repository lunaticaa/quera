import { TransportLayout } from "./layouts/TransportLayout";
import { useEffect, useState } from "react";
import { StepVariant } from "./constants/StepValriants";
import { TargetCredit } from "./features/TargetCredit";
import { SourceCredit } from "./features/SourceCredit";
import { ReportTransport } from "./features/ReportTransport";

const steps = [TargetCredit, SourceCredit, ReportTransport];

function App() {
  const [stepsForm, setStepsForm] = useState([
    { sourceCredit: "", targetCredit: "", price: "" },
    { cvv2: "", month: "", year: "", dynamicPassword: "", timer: null },
    {},
  ]);
  const [step, setStep] = useState(0);

  const onNextStep = () => {
    if (step < step.length - 1) {
      setStep(step + 1)
    }
  };

  const onPrevStep = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  };

  const getStepValue = (step) => {
    return stepsForm[step]
  };

  const handleStepValue = (step, name, value) => {
    const updatedStepForms = [...stepsForm];
    updatedStepForms[step][name] = value;
    setStepsForm(updatedStepForms)
  };

  const registerInput = (name) => {
    return {
      onchange: (e) => handleStepValue(step, name, e.target.value),
      value: stepsForm[step][name] || '',
    }
  };

  const CurrentStep = steps[step];
  return (
    <TransportLayout>
      <CurrentStep
        registerInput={registerInput}
        handleValue={(name, value) => handleStepValue(step, name, value)}
        getStepValue={getStepValue}
        onNextStep={onNextStep}
        onPrevStep={onPrevStep}
      />
    </TransportLayout>
  );
}

export default App;
