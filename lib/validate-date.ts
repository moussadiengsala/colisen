import { z } from 'zod';
import { isBefore, isAfter, parseISO, startOfDay } from 'date-fns';

export const validateDate = (
    value: {
        limit: string,
        departure: string,
        arrival: string,
    },
    ctx: z.RefinementCtx
) => {
    const limitDate = parseISO(value.limit);
    const departureDate = parseISO(value.departure);
    const arrivalDate = parseISO(value.arrival);
    const today = startOfDay(new Date());

    if (!value.limit.trim()) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Limit date is required.",
            path: ["limit"],
        });
    }

    if (!value.departure.trim()) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Departure date is required.",
            path: ["departure"],
        });
    }

    if (!value.arrival.trim()) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Arrival date is required.",
            path: ["arrival"],
        });
    }

    if (limitDate && isBefore(limitDate, today)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Limit date should not be in the past.",
            path: ["limit"],
        });
    }

    if (limitDate && departureDate && isAfter(limitDate, departureDate)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Limit date should be before departure date.",
            path: ["limit"],
        });
    }

    if (departureDate && arrivalDate && isAfter(departureDate, arrivalDate)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Departure date should be before arrival date.",
            path: ["departure"],
        });
    }
};