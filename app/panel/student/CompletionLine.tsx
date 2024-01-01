import React from "react";

const CompletionLine = () => {
  return (
    <ul className="steps steps-vertical sm:steps-horizontal w-full">
      <li data-content="✓" className="step step-accent">
        Update Info
      </li>
      <li data-content="✕" className="step step-neutral">
        Team Member
      </li>
      <li data-content="✕" className="step step-neutral">
        Update FYP
      </li>
      <li data-content="✕" className="step step-neutral">
        Request SV
      </li>r
      <li data-content="✕" className="step  step-neutral">
        Complete
      </li>
    </ul>
  );
};

export default CompletionLine;
