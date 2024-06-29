import { z } from 'zod';
import { Country, State, City }  from 'country-state-city';

const isValidLocation = (
    countryName: string,
    stateName: string,
    cityName: string
): {
    isValidCountry: boolean,
    isValidState: boolean,
    isValidCity: boolean
} => {
    // Validate Country
    const country = Country.getAllCountries().find(country => country.name === countryName);
    const isValidCountry = !!country;

    // Validate State if country is valid
    let isValidState = false;
    let isValidCity = false;
    if (isValidCountry) {
        const state = State.getStatesOfCountry(country.isoCode).find(state => state.name === stateName);
        isValidState = !!state;

        // Validate City if both country and state are valid
        if (state) {
            const city = City.getCitiesOfState(country.isoCode, state.isoCode).find(city => city.name === cityName);
            isValidCity = !!city;
        }
    }

    return {
        isValidCountry,
        isValidState,
        isValidCity
    };
};

const getLabel = (item: string): {
    labelForRequis: string,
    label: string
} => {
    switch (item) {
        case 'country':
            return {
                labelForRequis: `le pays est requis.`,
                label: `Le pays est invalide`
            }
        case 'state':
            // moreLabels = " "
            return {
                labelForRequis: `la région du pays est requis.`,
                label: `la Région est invalide or pas inclue dans le pays  choisit.`
            }
        case 'city':
            // moreLabels = " or pas inclue dans le pays or région choisit."
            return {
                labelForRequis: `la ville du pays est requis.`,
                label: `la Ville est invalide or pas inclue dans le pays  choisit.`
            }
        default: return { 
            labelForRequis: "Country",
            label: "Country"
        }
    }
}

export const validateLocation = (
    value: {
        country: string,
        state: string,
        city: string
    },
    ctx: z.RefinementCtx,
) => {
    const { country, state, city } = value;
    let { isValidCountry, isValidState, isValidCity } = isValidLocation(country, state, city);

    Object.entries(value).forEach(entry => {
        if (!entry[1].trim()) {
            switch (entry[0]) {
                case 'country':
                    isValidCountry = true;
                    break;
                case 'state':
                    isValidState = true;
                    break;
                case 'city':
                    isValidCity = true;
                    break;
            }
            const { labelForRequis } = getLabel(entry[0]);
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `${labelForRequis}`,
                path: [entry[0]],
            });
            return;
        }
    })

    if (!isValidCountry) {
        const { label } = getLabel("country");
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `${label}`,
            path: ["country"],
        });
    }

    if (!isValidState) {
        const { label } = getLabel("state");
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `${label}`,
            path: ["state"],
        });
    }

    if (!isValidCity) {
        const { label } = getLabel("city");
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `${label}`,
            path: ["city"],
        });
    }
};

