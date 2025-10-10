import React, { useEffect, useRef, useState } from 'react';

const LocationSearch = ({ 
  placeholder = "Search location...",
  onLocationSelect,
  className = "",
  style = {},
  value = "",
  name = "",
  required = false
}) => {
  const inputRef = useRef(null);
  const [address, setAddress] = useState(value);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // Load Google Maps API script
  useEffect(() => {
    if (window.google) {
      setIsScriptLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCGjR_PJHtFewHUhrwRiiVJFkn5_O4e7Yc&libraries=places`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      setIsScriptLoaded(true);
      initializeAutocomplete();
    };

    script.onerror = () => {
      console.error('Failed to load Google Maps API');
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Initialize autocomplete when script is loaded
  useEffect(() => {
    if (isScriptLoaded && inputRef.current) {
      initializeAutocomplete();
    }
  }, [isScriptLoaded]);

  const initializeAutocomplete = () => {
    if (!window.google || !inputRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        componentRestrictions: { country: "in" },
        types: ['geocode', 'establishment'],
        fields: ['formatted_address', 'geometry', 'name', 'place_id', 'address_components']
      }
    );

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      
      if (!place.geometry) {
        console.log("No details available for this place");
        return;
      }

      const locationData = {
        formatted_address: place.formatted_address,
        name: place.name,
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
        place_id: place.place_id,
        address_components: place.address_components
      };

      setAddress(place.formatted_address);
      
      if (onLocationSelect) {
        onLocationSelect(locationData);
      }
    });
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setAddress(value);
    
    // Clear selection if input is empty
    if (value === "" && onLocationSelect) {
      onLocationSelect(null);
    }
  };

  const handleInputFocus = () => {
    // Re-initialize autocomplete on focus to ensure it's working
    if (isScriptLoaded && inputRef.current) {
      initializeAutocomplete();
    }
  };

  return (
    <div className={`location-search-container ${className}`} style={style}>
      <div className="input-wrapper" style={{ position: 'relative', width: '100%' }}>
        <input
          ref={inputRef}
          type="text"
          value={address}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          name={name}
          required={required}
          className="location-input"
          style={{
            width: '100%',
            padding: '12px 40px 12px 15px',
            fontSize: '16px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            outline: 'none',
            transition: 'border-color 0.3s ease',
            fontFamily: 'inherit'
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = '#007bff';
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = '#ddd';
          }}
          
          onBlur={(e) => {
            e.target.style.borderColor = '#ddd';
            e.target.style.boxShadow = 'none';
          }}
        />
        
        
      </div>

      {/* Loading indicator */}
      {!isScriptLoaded && (
        <div style={{ 
          fontSize: '12px', 
          color: '#666', 
          marginTop: '5px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }}>
          <div style={{
            width: '12px',
            height: '12px',
            border: '2px solid #f3f3f3',
            borderTop: '2px solid #007bff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          Loading maps...
        </div>
      )}

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .pac-container {
            z-index: 10000 !important;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border: 1px solid #ddd;
          }

          .pac-item {
            padding: 10px 15px;
            border-bottom: 1px solid #f0f0f0;
            cursor: pointer;
            transition: background-color 0.2s ease;
          }

          .pac-item:hover {
            background-color: #f8f9fa;
          }

          .pac-item-query {
            font-size: 14px;
            color: #333;
          }

          .pac-matched {
            font-weight: bold;
            color: #007bff;
          }
        `}
      </style>
    </div>
  );
};

export default LocationSearch;