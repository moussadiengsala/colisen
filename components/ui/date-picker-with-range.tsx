"use client"

import * as React from "react"
import { addDays, format, parseISO } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./popover"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"

type DatePickerWithRangeProps = {
    className?: string,
    name: string,
}

export function DatePickerWithRange({ className, name }: DatePickerWithRangeProps) {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(Date.now()),
        to: addDays(new Date(Date.now()), 30),
    })

    const router = useRouter();
    const searchParams = useSearchParams();

    const handleDateChange = (date: DateRange | undefined) => {
        setDate(date);
        if (date?.from && date?.to) {
            const currentParams = new URLSearchParams(Array.from(searchParams.entries()));
            currentParams.set(`${name}-from`, format(date.from, "yyyy-MM-dd"));
            currentParams.set(`${name}-to`, format(date.to, "yyyy-MM-dd"));
            router.replace(`/announces?${currentParams.toString()}`, {scroll: false});
        }
    };

    // Initialize date based on URL parameters when the component mounts
    React.useEffect(() => {
        const fromParam = searchParams.get(`${name}-from`);
        const toParam = searchParams.get(`${name}-to`);

        if (fromParam && toParam) {
            const fromDate = parseISO(fromParam);
            const toDate = parseISO(toParam);
            setDate({ from: fromDate, to: toDate });
        }
    }, []);

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                        "w-[300px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                {format(date.from, "LLL dd, y")} -{" "}
                                {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={handleDateChange}
                    numberOfMonths={2}
                />
                </PopoverContent>
            </Popover>
        </div>
    )
}
