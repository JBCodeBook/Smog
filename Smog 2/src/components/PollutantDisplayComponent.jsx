import React, { useState } from 'react';
import CustomModal from './CustomModal';
import { Button, ButtonGroup } from "@nextui-org/button";

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
          <Button
            key={pollutant.code}
            onPress={() => toggleModalState(pollutant)}
            color="primary"
            auto
            css={{
              whiteSpace: "nowrap", // Prevents text wrapping
              overflow: "hidden",    // Hides overflowed text
              textOverflow: "ellipsis", // Adds ellipsis if text is too long
              padding: "0 50px", // Adjust padding if needed
            }}
          >
            {pollutant.fullName} = {pollutant.concentration.value}
          </Button>


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
