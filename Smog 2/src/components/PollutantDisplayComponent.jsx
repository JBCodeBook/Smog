import React, { useState } from 'react';
import CustomModal from './CustomModal';
import RadialBar from './RadialBarComponent';
import PollutantsTable from './PollutantsTable';

const PollutantDisplayComponent = ({ pollutants }) => {
  const [modalState, setModalState] = useState(false);
  const [currentPollutant, setCurrentPollutant] = useState(null);

  const toggleModalState = (pollutantData) => {
    setCurrentPollutant(pollutantData);
    setModalState(!modalState);
  };

  return (
    <>
      <div
        className="grid grid-cols-1 gap-4"
        style={{
          position: "relative",
          zIndex: 1000,
          padding: "20px",
          pointerEvents: "auto",
          background: "linear-gradient(135deg, rgba(42, 42, 74, 0.9), rgba(255, 75, 209, 0.5))",  
          boxShadow: "0 0 5rem rgba(0, 75, 209, 0.5)", 
          borderRadius: "8px"  
          }}
      >
        <RadialBar pollutants={pollutants}/>
        <PollutantsTable pollutants={pollutants}/>

        {modalState && (
          <CustomModal
            closeModal={() => setModalState(false)}
            dataContainer={currentPollutant}
          />
        )}
      </div>
    </>
  );
};

export default PollutantDisplayComponent;
