"use client"

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    CitySelect,
    CountrySelect,
    StateSelect,
    LanguageSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { Label } from "./label";


function SelectCountry({ name, title }: {name: string, title: string}) {
    const [country, setCountry] = useState({ id: 0, name: "" });
    const [state, setState] = useState({ id: 0, name: "" });
    const [city, setCity] = useState({ id: 0, name: "" });

    const handleCountryChange = (e: { id: number; name: string }) => {
        setCountry(e);
        // Reset state and city when country changes
        setState({ id: 0, name: "" }); 
        setCity({ id: 0, name: "" });
    };

    const handleStateChange = (e: { id: number; name: string }) => {
        setState(e);
        // Reset city when state changes
        setCity({ id: 0, name: "" }); 
    };

    const handleCityChange = (e: { id: number; name: string }) => {
        setCity(e);
    };

    return (
        <Card className="">
            <CardHeader>
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 desktop:flex-row">
                <div className="grid gap-2">
                    <Label htmlFor={`${name}-country`}>Country</Label>
                    <CountrySelect
                        onChange={handleCountryChange}
                        placeHolder="Select Country"
                    />
                    <input type="hidden" id={`${name}-country`} name={`${name}-country`} value={country.name} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor={`${name}-state`}>State</Label>
                    <StateSelect
                        countryid={country.id}
                        onChange={handleStateChange}
                        placeHolder="Select State"
                    />
                    <input type="hidden" id={`${name}-state`} name={`${name}-state`} value={state.name} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor={`${name}-city`}>City</Label>
                    <CitySelect
                        countryid={country.id}
                        stateid={state.id}
                        onChange={handleCityChange}
                        placeHolder="Select City"
                    />
                    <input type="hidden" id={`${name}-city`} name={`${name}-city`} value={city.name} />
                </div>
            </CardContent>
        </Card>
    );
}

export default SelectCountry;