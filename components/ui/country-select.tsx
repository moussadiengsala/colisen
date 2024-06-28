"use client"
import { Country, State, City }  from 'country-state-city';
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "./label";
import flags from 'react-phone-number-input/flags';
import { Input } from './input';
import { useRouter, useSearchParams } from 'next/navigation';

type CountryType = {
    isoCode: string;
    flag: string;
    name: string
}

type StateType = {
    isoCode: string;
    countryCode: string;
    name: string;
}

type CityType = {
    countryCode: string;
    stateCode: string;
    name: string;
}

type SelectCountryStateCity = {
    name: string,
    className: string
    isForFilter?: boolean
}

function SelectCountryStateCity({ name, className, isForFilter }: SelectCountryStateCity) {
    const [country, setCountry] = useState<CountryType>({ isoCode: "", flag: "", name: "" });
    const [state, setState] = useState<StateType>({ isoCode: "", countryCode:"", name: "" });
    const [city, setCity] = useState<CityType>({ stateCode: "", countryCode: "", name: "" });
    const searchParams = useSearchParams();

    useEffect(() => {
        const countryParam = searchParams.get(`${name}-country`);
        const stateParam = searchParams.get(`${name}-state`);
        const cityParam = searchParams.get(`${name}-city`);

        let initialCountry: CountryType;
        let initialState: StateType;

        (() => {
            if (countryParam) {
                const selectedCountry = Country.getAllCountries().find(c => c.name === countryParam);
                if (selectedCountry) {
                    initialCountry = { isoCode: selectedCountry.isoCode, flag: selectedCountry.flag, name: selectedCountry.name }
                    setCountry(initialCountry);
                    setState({ isoCode: "", countryCode: selectedCountry.isoCode, name: "" })
                    setCity({ countryCode: selectedCountry.isoCode, stateCode: "", name: "" })
                }
            }
        })()

        if (stateParam) {
            const selectedState = State.getAllStates().find(s => s.name === stateParam && s.countryCode === initialCountry.isoCode);
            if (selectedState) {
                initialState = { isoCode: selectedState.isoCode, countryCode: selectedState.countryCode, name: selectedState.name }
                setState(initialState);
                setCity({ countryCode: selectedState.countryCode, stateCode: selectedState.isoCode, name: "" })
            }
        }

        if (cityParam) {
            const selectedCity = City.getAllCities().find(c => c.name === cityParam && c.stateCode === initialState.isoCode && c.countryCode === initialCountry.isoCode);
            if (selectedCity) {
                setCity({ stateCode: selectedCity.stateCode, countryCode: selectedCity.countryCode, name: selectedCity.name });
            }
        }
    }, [name, searchParams]);

    return (    
        <Card>
            <CardContent className={className}>
                <div className="grid gap-2">
                    <Label htmlFor={`${name}-country-name`} >Pays</Label>
                    <SelectCountry country={country} setCountry={setCountry} setState={setState} setCity={setCity} isForFilter={isForFilter} name={name} />
                    <input type="hidden" id={`${name}-country-name`} name={`${name}-country`} value={country.name} />
                    <input type="hidden" id={`${name}-country-flag`} name={`${name}-country-flag`} value={country.flag} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor={`${name}-state`} >Region</Label>
                    <SelectState setState={setState} setCity={setCity} state={state} isForFilter={isForFilter} name={name} />
                    <input type="hidden" id={`${name}-state`} name={`${name}-state`} value={state.name} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor={`${name}-city`} >Ville</Label>
                    <SelectCity setCity={setCity} city={city} isForFilter={isForFilter} name={name} />
                    <input type="hidden" id={`${name}-city`} name={`${name}-city`} value={city.name} />
                </div>
            </CardContent>
        </Card>
    );
}

export default SelectCountryStateCity;

type SetterCountryType = Dispatch<SetStateAction<{
    isoCode: string;
    flag: string;
    name: string;
}>>

type SetterStateType = Dispatch<SetStateAction<{
    isoCode: string;
    countryCode: string;
    name: string;
}>>

type SetterCityType = Dispatch<SetStateAction<{
    stateCode: string;
    countryCode: string;
    name: string;
}>>

type SelectCountryProps = {
    name: string,
    setCountry: SetterCountryType,
    setState: SetterStateType,
    setCity: SetterCityType,
    isForFilter?: boolean,
    country: CountryType
}

export function SelectCountry({ setCountry, setState, setCity, isForFilter, name, country }: SelectCountryProps) {
    const [searchCountry, setSearchCountry] = useState("");
    const router = useRouter()
    const searchParams = useSearchParams()
    const countries = Country.getAllCountries().filter(country => country.name.toLowerCase().includes(searchCountry.toLowerCase()));

    // const country = Country.getAllCountries();
    const handleCountrySelect = (value: string) => {
        const selectedCountry = countries.find(c => c.name === value);
        if (selectedCountry) {
            setCountry({ isoCode: selectedCountry.isoCode, flag: selectedCountry.flag, name: selectedCountry.name });
            // Reset state and city when country changes
            setState({ isoCode: "", countryCode: selectedCountry.isoCode, name: "" })
            setCity({ countryCode: selectedCountry.isoCode, stateCode: "", name: "" })

            if (isForFilter) {
                // router.push(`/annonce?country=${selectedCountry.name}`);
                const currentParams = new URLSearchParams(searchParams.toString());
                currentParams.set(`${name}-country`, selectedCountry.name);
                currentParams.delete(`${name}-state`);
                currentParams.delete(`${name}-city`);
                router.replace(`/annonce?${currentParams.toString()}`, { scroll: false });
            }

        }
    };

    return (
        <Select onValueChange={handleCountrySelect} value={country.name}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select un Pays" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Pays</SelectLabel>
                    <Input 
                        type="text"
                        value={searchCountry}
                        onChange={(e) => setSearchCountry(e.target.value)}
                        placeholder="Recherchez un pays"
                        className='w-fit m-2'
                    />
                    {countries.map((country) => (
                        <SelectItem value={country.name} key={`country-${country.isoCode}`}>
                            <span>{country.flag}</span>
                            <span className='ml-2'>{country.name}</span>
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

type SelectStateProps = {
    name: string,
    setState: SetterStateType,
    setCity: SetterCityType,
    isForFilter?: boolean,
    state: StateType
}

export function SelectState({ setState, setCity, state, isForFilter, name }: SelectStateProps) {
    const [searchState, setSearchState] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams()
    // const states = State.getAllStates().filter(s => s.countryCode === state.countryCode);
    const states = State.getAllStates().filter(s => s.countryCode === state.countryCode && s.name.toLowerCase().includes(searchState.toLowerCase()));
    const handleCountrySelect = (value: string) => {
        const selectedState = states.find(s => s.name === value);
        if (selectedState) {
            setState({ isoCode: selectedState.isoCode, countryCode: selectedState.countryCode, name: selectedState.name });
            // Reset city when state changes
            setCity({ stateCode: selectedState.isoCode, countryCode: selectedState.countryCode, name: "" })

            if (isForFilter) {
                // router.push(`/annonce?country=${selectedState.countryCode}&state=${selectedState.name}`);
                // router.replace(`/annonce?country=${state.countryCode}&state=${selectedState.name}`);
                const currentParams = new URLSearchParams(searchParams.toString());
                currentParams.set(`${name}-state`, selectedState.name);
                currentParams.delete(`${name}-city`);
                router.replace(`/annonce?${currentParams.toString()}`);
            }
        }
    };

    return (
        <Select onValueChange={handleCountrySelect} value={state.name}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select une Region" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Region</SelectLabel>
                    <Input 
                        type="text"
                        value={searchState}
                        onChange={(e) => setSearchState(e.target.value)}
                        placeholder="Recherchez une région"
                        className="w-fit m-2"
                    />
                    {states.map((state) => (
                        <SelectItem value={state.name} key={`state-${state.isoCode}`}>
                            <span >{state.name}</span>
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

type SelectCityProps = {
    name: string,
    setCity: SetterCityType,
    isForFilter?: boolean,
    city: CityType
}

export function SelectCity({ setCity, city, isForFilter }: SelectCityProps) {
    const [searchCity, setSearchCity] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams()
    const cities = City.getAllCities().filter(c => c.stateCode === city.stateCode && c.countryCode === city.countryCode && c.name.toLowerCase().includes(searchCity.toLowerCase()));

    // console.log(city)
    // const cities = City.getAllCities().filter(c => c.stateCode === city.stateCode);
    // console.log(cities)
    const handleCountrySelect = (value: string) => {
        const selectedCity = cities.find(c => c.name === value);
        if (selectedCity) {
            setCity({countryCode: city.countryCode, stateCode: city.stateCode, name: selectedCity.name })

            if (isForFilter) {
                // router.push(`/annonce?country=${selectedCity.countryCode}&state=${selectedCity.stateCode}&city=${selectedCity.name}`);
                const currentParams = new URLSearchParams(searchParams.toString());
                currentParams.set(`${name}-city`, selectedCity.name);
                router.replace(`/annonce?${currentParams.toString()}`);
            }
        }
    };

    return (
        <Select onValueChange={handleCountrySelect} value={city.name}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select une Region" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Region</SelectLabel>
                    <Input 
                        type="text"
                        value={searchCity}
                        onChange={(e) => setSearchCity(e.target.value)}
                        placeholder="Recherchez une ville"
                        className="w-fit m-2"
                    />
                    {cities.map((city) => (
                        <SelectItem value={city.name} key={`city-${city.name}`}>
                            <span >{city.name}</span>
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}