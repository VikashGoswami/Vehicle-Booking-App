"use client"
import { useState, useEffect } from "react";
import React from "react";
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Box,
} from "@mui/material";

import Card from "@mui/joy/Card";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";

const BookingForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    wheels: "",
    vehicleType: "",
    model: "",
    startDate: "",
    endDate: "",
  });
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [models, setModels] = useState([]);

  useEffect(() => {
    if (formData.wheels) {
      fetch(`/api/vehicleTypes?wheels=${formData.wheels}`)
        .then((response) => response.json())
        .then((data) => setVehicleTypes(data));
    }
  }, [formData.wheels]);

  useEffect(() => {
    if (formData.vehicleType) {
      fetch(`/api/vehicles?vehicleTypeId=${formData.vehicleType}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => setModels(data))
        .catch((error) => {
          console.error("Error fetching vehicles:", error);
        });
    }
  }, [formData.vehicleType]);

  const formFields = [
    {
      id: 0,
      label: "What is your name?",
      component: (
        <div>
          <TextField
            label="First Name"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            required
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Last Name"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            required
            fullWidth
          />
        </div>
      ),
      validate: () =>
        formData.firstName.trim() !== "" && formData.lastName.trim() !== "",
    },
    {
      id: 1,
      label: "Number of wheels",
      component: (
        <div>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="wheels"
              name="wheels"
              value={formData.wheels}
              onChange={(e) =>
                setFormData({ ...formData, wheels: e.target.value })
              }
            >
              <FormControlLabel value="2" control={<Radio />} label="2" />
              <FormControlLabel value="4" control={<Radio />} label="4" />
            </RadioGroup>
          </FormControl>
        </div>
      ),
      validate: () => formData.wheels !== "",
    },
    {
      id: 2,
      label: "Type of vehicle",
      component: (
        <div>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="vehicleType"
              name="vehicleType"
              value={formData.vehicleType}
              onChange={(e) =>
                setFormData({ ...formData, vehicleType: e.target.value })
              }
            >
              {vehicleTypes.map((type) => (
                <FormControlLabel
                  key={type.id}
                  value={type.id.toString()}
                  control={<Radio />}
                  label={type.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
      ),
      validate: () => formData.vehicleType !== "",
    },
    {
      id: 3,
      label: "Specific Model",
      component: (
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="model"
            name="model"
            value={formData.model}
            onChange={(e) =>
              setFormData({ ...formData, model: e.target.value })
            }
          >
            {models.map((model) => (
              <FormControlLabel
                key={model.id}
                value={model.id.toString()}
                control={<Radio />}
                label={model.modelName}
              />
            ))}
          </RadioGroup>
        </FormControl>
      ),
      validate: () => formData.model !== "",
    },
    {
      id: 4,
      label: "Date range picker",
      component: (
        <Box width={500}>
          <DatePicker
            selectsRange
            startDate={formData.startDate}
            endDate={formData.endDate}
            onChange={(dates) =>
              setFormData({
                ...formData,
                startDate: dates[0],
                endDate: dates[1],
              })
            }
            shouldCloseOnSelect={false}
            customInput={
              <TextField
                label="Date Range"
                value={`${formData.startDate || ""} - ${
                  formData.endDate || ""
                }`}
                fullWidth
              />
            }
          />
        </Box>
      ),
      validate: () => formData.startDate !== null && formData.endDate !== null,
    },
  ];
  const handleNext = () => {
    const currentField = formFields[currentStep];
    if (currentField.validate()) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      Swal.fire(
        "Warning!",
        `Please provide a valid answer for ${currentField.label}`,
        "warning"
      );
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    if (!formData.startDate || !formData.endDate) {
      Swal.fire("Warning!", "Please select a valid date range.", "warning");
      return;
    }

    fetch("/api/bookVehicle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          Swal.fire(
            "Booking completed!",
            "Your vehicle has been successfully booked.",
            "success"
          ).then(function () {
            location.reload();
          });
        } else {
          Swal.fire(
            "Warning!",
            "Booking overlaps with an existing booking. Try other dates.",
            "warning"
          );
        }
      })
      .catch((error) => {
        console.error("Error booking vehicle:", error);
        Swal.fire(
          "Error!",
          "Failed to book the vehicle. Please try again.",
          "error"
        );
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Adjust this as needed
      }}
    >
      <div style={{ width: "650rem" }}>
        <Card
          color="warning"
          invertedColors
          variant="outlined"
          style={{ maxWidth: "650px", margin: "auto" }}
        >
          <h2>{formFields[currentStep].label}</h2>
          {formFields[currentStep].component}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            {currentStep > 0 && (
              <Button
                variant="contained"
                color="primary"
                onClick={handlePrevious}
                style={{ marginTop: "20px", marginRight: "10px" }}
              >
                Previous
              </Button>
            )}

            {currentStep < formFields.length - 1 && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                style={{ marginTop: "20px" }}
              >
                Next
              </Button>
            )}

            {currentStep === formFields.length - 1 && (
              <Button
                variant="contained"
                color="success"
                onClick={handleSubmit}
                style={{ marginTop: "20px" }}
              >
                Book Vehicles
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BookingForm;
