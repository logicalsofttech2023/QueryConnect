import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaCar,
  FaHotel,
  FaMoneyBillWave,
  FaChevronDown,
  FaCalendarAlt,
  FaUser,
  FaPhone,
  FaCreditCard,
  FaCity,
  FaTimes,
  FaCheck,
  FaPlus,
  FaMinus,
  FaBook,
} from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import "./DynamicForm.css";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import Checkbox from "@mui/material/Checkbox";
import dayjs from "dayjs";

const data = {
  realEstate: {
    name: "Real Estate",
    icon: FaHome,
    cities: ["Pune", "Mumbai", "Delhi", "Bangalore", "Chennai"],
    areas: {
      Pune: [
        "Kothrud",
        "Baner",
        "Hinjewadi",
        "Viman Nagar",
        "Kharadi",
        "Aundh",
      ],
      Mumbai: ["Andheri", "Bandra", "Powai", "Juhu", "Dadar", "Borivali"],
      Delhi: ["Dwarka", "Connaught Place", "Saket", "Rohini", "Karol Bagh"],
      Bangalore: ["Koramangala", "Indiranagar", "Whitefield", "MG Road"],
      Chennai: ["T Nagar", "Anna Nagar", "Adyar", "Velachery"],
    },
    propertyTypes: ["Apartment", "Villa", "Plot", "Studio", "Penthouse"],
    furnishingTypes: ["Furnished", "Semi-Furnished", "Unfurnished"],
  },
  finance: {
    name: "Finance",
    icon: FaMoneyBillWave,
    serviceTypes: [
      "Personal Loan",
      "Business Loan",
      "Credit Card",
      "Insurance",
      "Home Loan",
      "Car Loan",
    ],
    employmentTypes: ["Salaried", "Self-employed", "Business Owner"],
  },
  automobile: {
    name: "Automobile",
    icon: FaCar,
    vehicleTypes: ["Car", "Bike", "Commercial", "SUV", "Luxury"],
    brands: ["Maruti", "Hyundai", "Tata", "Honda", "Toyota", "BMW", "Mercedes"],
    actions: ["Buy", "Sell", "Rent", "Service"],
  },
  hotels: {
    name: "Hotels",
    icon: FaHotel,
    roomTypes: ["Single", "Double", "Suite", "Deluxe", "Presidential"],
  },
  education: {
    name: "Education",
    icon: FaBook,
    courses: ["Engineering", "Medical", "MBA", "Arts", "Science"],
    levels: ["School", "Undergraduate", "Postgraduate", "PhD"],
  },
  healthcare: {
    name: "Healthcare",
    icon: MdHealthAndSafety,
    services: ["Consultation", "Surgery", "Dental", "Emergency", "Checkup"],
    specialties: ["Cardiology", "Neurology", "Orthopedics", "Pediatrics"],
  },
};

const DynamicForm = () => {
  const [sector, setSector] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const [isSectorDropdownOpen, setIsSectorDropdownOpen] = useState(false);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [transactionType, setTransactionType] = useState("buy");
  const [city, setCity] = useState("");
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [propertyType, setPropertyType] = useState("");
  const [furnishing, setFurnishing] = useState("");
  const [budget, setBudget] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [income, setIncome] = useState("");
  const [age, setAge] = useState("");
  const [cibil, setCibil] = useState("");
  const [mobile, setMobile] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [autoAction, setAutoAction] = useState("");
  const [autoBudget, setAutoBudget] = useState("");
  const [hotelCity, setHotelCity] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [roomType, setRoomType] = useState("");
  const [guests, setGuests] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [availableAreas, setAvailableAreas] = useState([]);
  const [areaSearch, setAreaSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [isScheduleVisible, setIsScheduleVisible] = useState(true);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    if (sector) {
      setIsFormVisible(true);
      setShowAdditionalFields(false);
    }
  }, [sector]);

  useEffect(() => {
    if (city && data.realEstate.areas[city]) {
      setAvailableAreas(data.realEstate.areas[city]);
      setSelectedAreas([]);
    } else {
      setAvailableAreas([]);
      setSelectedAreas([]);
    }
  }, [city]);

  const filteredAreas = availableAreas.filter((area) =>
    area.toLowerCase().includes(areaSearch.toLowerCase())
  );

  const toggleArea = (area) => {
    setSelectedAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  const removeArea = (area) => {
    setSelectedAreas((prev) => prev.filter((a) => a !== area));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".sector-dropdown")) {
        setIsSectorDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (sector === "realEstate" && city && selectedAreas.length) {
      const desc = `I am looking to ${
        transactionType === "buy" ? "buy" : "rent"
      } a ${propertyType || "property"} in ${selectedAreas.join(
        ", "
      )}, ${city}${budget ? ` within budget ${budget}` : ""}${
        furnishing ? `, ${furnishing.toLowerCase()}` : ""
      }.`;
      setDescription(desc);
      setIsDescriptionVisible(true);
    } else if (sector === "finance" && serviceType) {
      const desc = `I am ${
        employmentType ? employmentType.toLowerCase() : "a customer"
      }${income ? ` with income ₹${income}` : ""}${
        age ? `, ${age} years old` : ""
      }${
        cibil ? `, CIBIL score ${cibil}` : ""
      }, looking for ${serviceType.toLowerCase()}.`;
      setDescription(desc);
      setIsDescriptionVisible(true);
    } else if (sector === "automobile" && vehicleType && autoAction) {
      const desc = `I want to ${autoAction.toLowerCase()} a ${vehicleType.toLowerCase()} (${
        brand || "any brand"
      }${model ? ` ${model}` : ""})${
        autoBudget ? ` within ₹${autoBudget}` : ""
      }.`;
      setDescription(desc);
      setIsDescriptionVisible(true);
    } else if (sector === "hotels" && hotelCity) {
      const desc = `Looking for a hotel in ${hotelCity}${
        checkIn && checkOut ? ` from ${checkIn} to ${checkOut}` : ""
      }${guests ? ` for ${guests} guests` : ""}${
        roomType ? ` (${roomType} room)` : ""
      }.`;
      setDescription(desc);
      setIsDescriptionVisible(true);
    } else if (sector === "education" && serviceType) {
      const desc = `Interested in ${serviceType} education${
        employmentType ? ` at ${employmentType.toLowerCase()} level` : ""
      }.`;
      setDescription(desc);
      setIsDescriptionVisible(true);
    } else if (sector === "healthcare" && serviceType) {
      const desc = `Looking for ${serviceType.toLowerCase()} services${
        employmentType ? ` in ${employmentType.toLowerCase()}` : ""
      }.`;
      setDescription(desc);
      setIsDescriptionVisible(true);
    } else {
      setIsDescriptionVisible(false);
    }
  }, [
    sector,
    transactionType,
    city,
    selectedAreas,
    propertyType,
    furnishing,
    budget,
    serviceType,
    employmentType,
    income,
    age,
    cibil,
    vehicleType,
    brand,
    model,
    autoAction,
    autoBudget,
    hotelCity,
    checkIn,
    checkOut,
    roomType,
    guests,
  ]);

  const handleSectorSelect = (sectorKey) => {
    setSector(sectorKey);
    setIsSectorDropdownOpen(false);
    setIsFormVisible(false);
    setIsDescriptionVisible(false);
    setShowAdditionalFields(false);
    setTransactionType("buy");
    setCity("");
    setSelectedAreas([]);
    setPropertyType("");
    setFurnishing("");
    setBudget("");
    setServiceType("");
    setEmploymentType("");
    setIncome("");
    setAge("");
    setCibil("");
    setMobile("");
    setVehicleType("");
    setBrand("");
    setModel("");
    setAutoAction("");
    setAutoBudget("");
    setHotelCity("");
    setCheckIn("");
    setCheckOut("");
    setRoomType("");
    setGuests("");
    setDescription("");
  };

  const getSectorIcon = (sectorKey) => {
    const SectorIcon = data[sectorKey]?.icon;
    return SectorIcon ? <SectorIcon className="sector-dropdown-icon" /> : null;
  };

  const getSelectedSectorIcon = () => {
    if (!sector) return <FaCity className="sector-dropdown-icon" />;
    const SectorIcon = data[sector]?.icon;
    return SectorIcon ? (
      <SectorIcon className="sector-dropdown-icon" />
    ) : (
      <FaCity className="sector-dropdown-icon" />
    );
  };

  const toggleAdditionalFields = () => {
    setShowAdditionalFields(!showAdditionalFields);
  };

  const sectors = Object.keys(data);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    console.log("Form submitted!");
    let data;
    if (startTime && endTime) {
      data = {
        description,
        industry:sector,
        startTime: dayjs(startTime).format("hh:mm A"),
        endTime: dayjs(endTime).format("hh:mm A"),
      };
    } else {
      data = {
        description,
        industry:sector
      };
    }
    navigate("/login", { state: data });

    handleClose();
  };

  return (
    <div className="form-container" style={{ margin: "0px", padding: "0px" }}>
      <div className="form-header">
        <h2 className="form-title" style={{ color: "white" }}>
          Create Your Query
        </h2>
      </div>

      <form className="dynamic-form">
        {/* Sector Selection */}
        <div className="form-section">
          <label className="form-label">Select Industry</label>
          <div className="sector-dropdown">
            <div
              className={`sector-dropdown-toggle ${
                isSectorDropdownOpen ? "open" : ""
              }`}
              onClick={() => setIsSectorDropdownOpen(!isSectorDropdownOpen)}
            >
              <div className="selected-sector">
                {getSelectedSectorIcon()}
                <span className="selected-sector-text">
                  {sector ? data[sector].name : "Choose a Industry..."}
                </span>
              </div>
              <FaChevronDown
                className={`dropdown-arrow ${
                  isSectorDropdownOpen ? "rotate" : ""
                }`}
              />
            </div>

            {isSectorDropdownOpen && (
              <div className="sector-dropdown-menu">
                {sectors.map((sectorKey) => (
                  <div
                    key={sectorKey}
                    className={`sector-dropdown-item ${
                      sector === sectorKey ? "selected" : ""
                    }`}
                    onClick={() => handleSectorSelect(sectorKey)}
                  >
                    {getSectorIcon(sectorKey)}
                    <span>{data[sectorKey].name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Form Content */}
        <div className={`form-content ${isFormVisible ? "visible" : ""}`}>
          {/* 🏠 Real Estate */}
          {sector === "realEstate" && (
            <div className="sector-form real-estate">
              <h3 className="sector-title">
                <FaHome className="sector-title-icon" />
                Real Estate Requirements
              </h3>

              {/* Mandatory Fields */}
              <div className="mandatory-fields">
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    name="transactionType"
                    value={transactionType}
                    onChange={(e) => setTransactionType(e.target.value)}
                  >
                    <FormControlLabel
                      value="buy"
                      control={
                        <Radio
                          sx={{
                            color: "#1976d2",
                            "&.Mui-checked": { color: "#1976d2" },
                          }}
                        />
                      }
                      label="Buy"
                    />
                    <FormControlLabel
                      value="rent"
                      control={
                        <Radio
                          sx={{
                            color: "#1976d2",
                            "&.Mui-checked": { color: "#1976d2" },
                          }}
                        />
                      }
                      label="Rent"
                    />
                  </RadioGroup>
                </FormControl>

                <div className="dynamic-form-row">
                  <div className="form-group">
                    <label className="form-label">City *</label>
                    <div className="select-wrapper">
                      <select
                        className="form-select"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                      >
                        <option value="">Select City</option>
                        {data.realEstate.cities.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      <FaChevronDown className="select-arrow" />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Preferred Areas *</label>

                  {/* Selected Areas Chips */}
                  {selectedAreas.length > 0 && (
                    <div className="selected-areas">
                      {selectedAreas.map((area) => (
                        <span key={area} className="area-chip">
                          {area}
                          <button
                            type="button"
                            className="area-remove"
                            onClick={() => removeArea(area)}
                          >
                            <FaTimes />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Area Search and Selection */}
                  {city && (
                    <div className="areas-selection">
                      <input
                        type="text"
                        className="form-input area-search"
                        placeholder="Search areas..."
                        value={areaSearch}
                        onChange={(e) => setAreaSearch(e.target.value)}
                      />

                      <div className="areas-list">
                        {filteredAreas.map((area) => (
                          <div
                            key={area}
                            className={`area-option ${
                              selectedAreas.includes(area) ? "selected" : ""
                            }`}
                            onClick={() => toggleArea(area)}
                          >
                            <span className="area-checkbox">
                              {selectedAreas.includes(area) && <FaCheck />}
                            </span>
                            <span className="area-name">{area}</span>
                          </div>
                        ))}
                      </div>

                      {filteredAreas.length === 0 && areaSearch && (
                        <div className="no-areas">No areas found</div>
                      )}
                    </div>
                  )}

                  {!city && (
                    <div className="area-placeholder">
                      Please select a city first to see available areas
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Fields Toggle */}
              <div className="additional-fields-toggle">
                <button
                  type="button"
                  className="toggle-btn"
                  onClick={toggleAdditionalFields}
                >
                  {showAdditionalFields ? <FaMinus /> : <FaPlus />}
                  <span>
                    {showAdditionalFields ? "Hide" : "Show"} Additional Options
                  </span>
                </button>
              </div>

              {/* Additional Optional Fields */}
              {showAdditionalFields && (
                <div className="additional-fields">
                  <div className="dynamic-form-row">
                    <div className="form-group">
                      <label className="form-label">Property Type</label>
                      <div className="select-wrapper">
                        <select
                          className="form-select"
                          value={propertyType}
                          onChange={(e) => setPropertyType(e.target.value)}
                        >
                          <option value="">Select Type</option>
                          {data.realEstate.propertyTypes.map((p) => (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          ))}
                        </select>
                        <FaChevronDown className="select-arrow" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Furnishing Type</label>
                      <div className="select-wrapper">
                        <select
                          className="form-select"
                          value={furnishing}
                          onChange={(e) => setFurnishing(e.target.value)}
                        >
                          <option value="">Select Furnishing</option>
                          {data.realEstate.furnishingTypes.map((f) => (
                            <option key={f} value={f}>
                              {f}
                            </option>
                          ))}
                        </select>
                        <FaChevronDown className="select-arrow" />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Budget (₹)</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Enter budget"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 💰 Finance */}
          {sector === "finance" && (
            <div className="sector-form finance">
              <h3 className="sector-title">
                <FaMoneyBillWave className="sector-title-icon" />
                Financial Services
              </h3>

              {/* Mandatory Fields */}
              <div className="mandatory-fields">
                <div className="form-group">
                  <label className="form-label">Service Type *</label>
                  <div className="select-wrapper">
                    <select
                      className="form-select"
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      required
                    >
                      <option value="">Select Service</option>
                      {data.finance.serviceTypes.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <FaChevronDown className="select-arrow" />
                  </div>
                </div>
              </div>

              {/* Additional Fields Toggle */}
              <div className="additional-fields-toggle">
                <button
                  type="button"
                  className="toggle-btn"
                  onClick={toggleAdditionalFields}
                >
                  {showAdditionalFields ? <FaMinus /> : <FaPlus />}
                  <span>
                    {showAdditionalFields ? "Hide" : "Show"} Additional Details
                  </span>
                </button>
              </div>

              {/* Additional Optional Fields */}
              {showAdditionalFields && (
                <div className="additional-fields">
                  <div className="dynamic-form-row">
                    <div className="form-group">
                      <label className="form-label">Employment Type</label>
                      <div className="select-wrapper">
                        <select
                          className="form-select"
                          value={employmentType}
                          onChange={(e) => setEmploymentType(e.target.value)}
                        >
                          <option value="">Select Employment</option>
                          {data.finance.employmentTypes.map((eType) => (
                            <option key={eType} value={eType}>
                              {eType}
                            </option>
                          ))}
                        </select>
                        <FaChevronDown className="select-arrow" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Monthly Income (₹)</label>
                      <input
                        type="number"
                        className="form-input"
                        placeholder="Enter income"
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="dynamic-form-row">
                    <div className="form-group">
                      <label className="form-label">Age</label>
                      <input
                        type="number"
                        className="form-input"
                        placeholder="Enter age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">CIBIL Score</label>
                      <input
                        type="number"
                        className="form-input"
                        placeholder="Enter CIBIL"
                        value={cibil}
                        onChange={(e) => setCibil(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Mobile Number</label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="Enter mobile number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 🚗 Automobile */}
          {sector === "automobile" && (
            <div className="sector-form automobile">
              <h3 className="sector-title">
                <FaCar className="sector-title-icon" />
                Automobile Services
              </h3>

              {/* Mandatory Fields */}
              <div className="mandatory-fields">
                <div className="dynamic-form-row">
                  <div className="form-group">
                    <label className="form-label">Action *</label>
                    <div className="select-wrapper">
                      <select
                        className="form-select"
                        value={autoAction}
                        onChange={(e) => setAutoAction(e.target.value)}
                        required
                      >
                        <option value="">Select Action</option>
                        {data.automobile.actions.map((a) => (
                          <option key={a} value={a}>
                            {a}
                          </option>
                        ))}
                      </select>
                      <FaChevronDown className="select-arrow" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Vehicle Type *</label>
                    <div className="select-wrapper">
                      <select
                        className="form-select"
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value)}
                        required
                      >
                        <option value="">Select Type</option>
                        {data.automobile.vehicleTypes.map((v) => (
                          <option key={v} value={v}>
                            {v}
                          </option>
                        ))}
                      </select>
                      <FaChevronDown className="select-arrow" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Fields Toggle */}
              <div className="additional-fields-toggle">
                <button
                  type="button"
                  className="toggle-btn"
                  onClick={toggleAdditionalFields}
                >
                  {showAdditionalFields ? <FaMinus /> : <FaPlus />}
                  <span>
                    {showAdditionalFields ? "Hide" : "Show"} Vehicle Details
                  </span>
                </button>
              </div>

              {/* Additional Optional Fields */}
              {showAdditionalFields && (
                <div className="additional-fields">
                  <div className="dynamic-form-row">
                    <div className="form-group">
                      <label className="form-label">Brand</label>
                      <div className="select-wrapper">
                        <select
                          className="form-select"
                          value={brand}
                          onChange={(e) => setBrand(e.target.value)}
                        >
                          <option value="">Select Brand</option>
                          {data.automobile.brands.map((b) => (
                            <option key={b} value={b}>
                              {b}
                            </option>
                          ))}
                        </select>
                        <FaChevronDown className="select-arrow" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Model</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Enter model"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Budget (₹)</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Enter budget"
                      value={autoBudget}
                      onChange={(e) => setAutoBudget(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 🏨 Hotels */}
          {sector === "hotels" && (
            <div className="sector-form hotels">
              <h3 className="sector-title">
                <FaHotel className="sector-title-icon" />
                Hotel Booking
              </h3>

              {/* Mandatory Fields */}
              <div className="mandatory-fields">
                <div className="form-group">
                  <label className="form-label">City *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter city"
                    value={hotelCity}
                    onChange={(e) => setHotelCity(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Additional Fields Toggle */}
              <div className="additional-fields-toggle">
                <button
                  type="button"
                  className="toggle-btn"
                  onClick={toggleAdditionalFields}
                >
                  {showAdditionalFields ? <FaMinus /> : <FaPlus />}
                  <span>
                    {showAdditionalFields ? "Hide" : "Show"} Booking Details
                  </span>
                </button>
              </div>

              {/* Additional Optional Fields */}
              {showAdditionalFields && (
                <div className="additional-fields">
                  <div className="dynamic-form-row">
                    <div className="form-group">
                      <label className="form-label">Check-in Date</label>
                      <input
                        type="date"
                        className="form-input"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Check-out Date</label>
                      <input
                        type="date"
                        className="form-input"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="dynamic-form-row">
                    <div className="form-group">
                      <label className="form-label">Room Type</label>
                      <div className="select-wrapper">
                        <select
                          className="form-select"
                          value={roomType}
                          onChange={(e) => setRoomType(e.target.value)}
                        >
                          <option value="">Select Room</option>
                          {data.hotels.roomTypes.map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                        <FaChevronDown className="select-arrow" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Guests</label>
                      <input
                        type="number"
                        className="form-input"
                        placeholder="Number of guests"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 🎓 Education */}
          {sector === "education" && (
            <div className="sector-form education">
              <h3 className="sector-title">
                <FaUser className="sector-title-icon" />
                Education Services
              </h3>

              {/* Mandatory Fields */}
              <div className="mandatory-fields">
                <div className="form-group">
                  <label className="form-label">Course Type *</label>
                  <div className="select-wrapper">
                    <select
                      className="form-select"
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      required
                    >
                      <option value="">Select Course</option>
                      {data.education.courses.map((course) => (
                        <option key={course} value={course}>
                          {course}
                        </option>
                      ))}
                    </select>
                    <FaChevronDown className="select-arrow" />
                  </div>
                </div>
              </div>

              {/* Additional Fields Toggle */}
              <div className="additional-fields-toggle">
                <button
                  type="button"
                  className="toggle-btn"
                  onClick={toggleAdditionalFields}
                >
                  {showAdditionalFields ? <FaMinus /> : <FaPlus />}
                  <span>
                    {showAdditionalFields ? "Hide" : "Show"} Additional
                    Information
                  </span>
                </button>
              </div>

              {/* Additional Optional Fields */}
              {showAdditionalFields && (
                <div className="additional-fields">
                  <div className="form-group">
                    <label className="form-label">Education Level</label>
                    <div className="select-wrapper">
                      <select
                        className="form-select"
                        value={employmentType}
                        onChange={(e) => setEmploymentType(e.target.value)}
                      >
                        <option value="">Select Level</option>
                        {data.education.levels.map((level) => (
                          <option key={level} value={level}>
                            {level}
                          </option>
                        ))}
                      </select>
                      <FaChevronDown className="select-arrow" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 🏥 Healthcare */}
          {sector === "healthcare" && (
            <div className="sector-form healthcare">
              <h3 className="sector-title">
                <FaUser className="sector-title-icon" />
                Healthcare Services
              </h3>

              {/* Mandatory Fields */}
              <div className="mandatory-fields">
                <div className="form-group">
                  <label className="form-label">Service Type *</label>
                  <div className="select-wrapper">
                    <select
                      className="form-select"
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      required
                    >
                      <option value="">Select Service</option>
                      {data.healthcare.services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                    <FaChevronDown className="select-arrow" />
                  </div>
                </div>
              </div>

              {/* Additional Fields Toggle */}
              <div className="additional-fields-toggle">
                <button
                  type="button"
                  className="toggle-btn"
                  onClick={toggleAdditionalFields}
                >
                  {showAdditionalFields ? <FaMinus /> : <FaPlus />}
                  <span>
                    {showAdditionalFields ? "Hide" : "Show"} Medical Details
                  </span>
                </button>
              </div>

              {/* Additional Optional Fields */}
              {showAdditionalFields && (
                <div className="additional-fields">
                  <div className="form-group">
                    <label className="form-label">Specialty</label>
                    <div className="select-wrapper">
                      <select
                        className="form-select"
                        value={employmentType}
                        onChange={(e) => setEmploymentType(e.target.value)}
                      >
                        <option value="">Select Specialty</option>
                        {data.healthcare.specialties.map((specialty) => (
                          <option key={specialty} value={specialty}>
                            {specialty}
                          </option>
                        ))}
                      </select>
                      <FaChevronDown className="select-arrow" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Description */}
        <div
          className={`description-section ${
            isDescriptionVisible ? "visible" : ""
          }`}
        >
          <label className="form-label">
            Generated Query (You can edit this query)
          </label>
          <textarea
            className="form-textarea"
            rows="3"
            placeholder="Description will appear here as you fill the form..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* Submit Button */}
        {isDescriptionVisible && (
          <button
            type="button"
            className="submit-btn"
            onClick={handleClickOpen}
          >
            Submit Query
          </button>
        )}

        <Dialog open={open} onClose={handleClose} className="beautiful-dialog">
          <DialogTitle>Review Your Query</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You can review and edit your query below before submitting. Make
              sure all details are correct.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="comment"
              label="Edit your query"
              type="text"
              fullWidth
              variant="outlined"
              placeholder="Type or update your query..."
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <FormControlLabel
              onChange={() => setIsScheduleVisible(!isScheduleVisible)}
              control={<Checkbox />}
              label="Add query schedule"
            />

            {!isScheduleVisible && (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["TimePicker"]}>
                  <TimePicker
                    label="Start Time"
                    value={startTime}
                    onChange={(newValue) => setStartTime(newValue)}
                    viewRenderers={{
                      hours: renderTimeViewClock,
                      minutes: renderTimeViewClock,
                      seconds: renderTimeViewClock,
                    }}
                  />
                  <TimePicker
                    label="End Time"
                    value={endTime}
                    onChange={(newValue) => setEndTime(newValue)}
                    viewRenderers={{
                      hours: renderTimeViewClock,
                      minutes: renderTimeViewClock,
                      seconds: renderTimeViewClock,
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
};

export default DynamicForm;
