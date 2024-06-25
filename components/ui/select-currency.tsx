"use client"

import * as React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface CurrencySelectProps {
    name: string;
    label: string
}

export function CurrencySelect({ name, label }: CurrencySelectProps) {
    const [currency, setCurrency] = React.useState<string>("USD")

    return (
        <div>
            <Label htmlFor={name}>{label}</Label>
            <Select onValueChange={(value) => setCurrency(value)} defaultValue="USD">
                <SelectTrigger id={name}>
                    <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="USD">US Dollar (USD)</SelectItem>
                    <SelectItem value="EUR">Euro (EUR)</SelectItem>
                    <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                    <SelectItem value="JPY">Japanese Yen (JPY)</SelectItem>
                    <SelectItem value="AUD">Australian Dollar (AUD)</SelectItem>
                    <SelectItem value="CAD">Canadian Dollar (CAD)</SelectItem>
                    <SelectItem value="CHF">Swiss Franc (CHF)</SelectItem>
                    <SelectItem value="CNY">Chinese Yuan (CNY)</SelectItem>
                    <SelectItem value="SEK">Swedish Krona (SEK)</SelectItem>
                    <SelectItem value="NZD">New Zealand Dollar (NZD)</SelectItem>
                </SelectContent>
            </Select>
            <input type="hidden" name={name} value={currency} />
        </div>
    )
}
