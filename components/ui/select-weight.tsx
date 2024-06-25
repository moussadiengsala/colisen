"use client"

import * as React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface WeightUnitSelectProps {
    name: string;
    label: string
}

export function WeightUnitSelect({ name, label }: WeightUnitSelectProps) {
    const [unit, setUnit] = React.useState<string>("kg")

    return (
        <div>
            <Label htmlFor={name}>{label}</Label>
            <Select onValueChange={(value) => setUnit(value)} defaultValue="kg">
                <SelectTrigger id={name}>
                    <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="kg">Kilogramme (kg)</SelectItem>
                    <SelectItem value="g">Gramme (g)</SelectItem>
                </SelectContent>
            </Select>
            <input type="hidden" name={name} value={unit} />
        </div>
    )
}
