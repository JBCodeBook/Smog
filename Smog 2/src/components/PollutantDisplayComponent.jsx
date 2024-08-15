import React, { useState } from 'react';
import CustomModal from './CustomModal';
import { Button, ButtonGroup } from "@nextui-org/button";
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
          background: "linear-gradient(135deg, rgba(42, 42, 74, 0.9), rgba(255, 75, 209, 0.5))",  // Gradient from Deep Blue to Bright Pink
          boxShadow: "0 0 5rem rgba(0, 75, 209, 0.5)",  // Bright Pink shadow
          borderRadius: "8px"  // Rounded corners
          }}
      >
        <RadialBar pollutants={pollutants}/>
        <PollutantsTable pollutants={pollutants}/>


        {/* {pollutants.map((pollutant) => (
          <Button
          image
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
        ))} */}

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
