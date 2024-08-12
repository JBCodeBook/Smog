import React, { useState } from 'react';
import CustomModal from './CustomModal';

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
        }}
      >
        {pollutants.map((pollutant) => (
          <button
            key={pollutant.code}
            onClick={() => toggleModalState(pollutant)}
            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            {pollutant.fullName} = {pollutant.concentration.value}
          </button>
        ))}
        
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
