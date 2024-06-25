declare module 'react-country-state-city' {
    export interface Country {
        id: number;
        name: string;
        isoCode: string;
    }
    
    export interface State {
        id: number;
        name: string;
        isoCode: string;
        country_id: number;
    }
    
    export interface City {
        id: number;
        name: string;
        state_id: number;
        country_id: number;
    }
    
    export interface Language {
        code: string;
        name: string;
    }

    export const CountrySelect: React.ComponentType<{ 
        onChange: (value: Country) => void;
        placeHolder?: string;
    }>;

    export const StateSelect: React.ComponentType<{
        countryid: number;
        onChange: (value: State) => void;
        placeHolder?: string;
    }>;

    export const CitySelect: React.ComponentType<{
        countryid: number;
        stateid: number;
        onChange: (value: City) => void;
        placeHolder?: string;
    }>;

    export const LanguageSelect: React.ComponentType<{
        onChange: (value: Language) => void;
        placeHolder?: string;
    }>;
}
