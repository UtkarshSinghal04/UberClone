import React, { useState, useRef } from "react";
import "remixicon/fonts/remixicon.css";

const LocationSearchPanel = ({activeField, suggestions, setPickup, setDest}) => {
    return (
        <>
            {suggestions.map((item, index) => (
                <div
                    key={index}
                    onClick={() => {
                        if(activeField === 'pickup')
                        {
                            setPickup(item)
                        }
                        else
                        {
                            setDest(item)
                        }
                    }}
                    className="flex items-center my-2 justify-start p-3 mt-3 mb-3 cursor-pointer"
                >
                    <h2 className="bg-white h-8 w-8 flex items-center justify-center rounded-full text-3xl mr-4">
                        <i className="ri-map-pin-line"></i>
                    </h2>
                    <h2 className="text-lg font-medium ml-2">{item}</h2>
                </div>
            ))}
        </>
    );
};

export default LocationSearchPanel;
