"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent } from "./card"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "./input"
import throttle from "@/lib/throttle"
import { Label } from "./label"

type Price = {
    id: string,
    value: string
    label: string
}

const items = [
    {
        id: "tranche1",
        label: "100CFA - 200CFA",
        value: "100-200"
    },
    {
        id: "tranche2",
        label: "200CFA - 300CFA",
        value: "200-300"
    },
    {
        id: "tranche3",
        label: "300CFA - 400CFA",
        value: "300-400"
    },
    {
        id: "tranche4",
        label: "400CFA - 500CFA",
        value: "400-500"
    },
] as const


export default function SelectPrices() {
    const [selectedItems, setSelectedItems] = useState<Price[]>([]);
    const [customPrice, setCustomPrice] = useState<{ min: string, max: string }>({ min: "", max: "" });
    const router = useRouter()
    const searchParams = useSearchParams()

    const updateURLParams = (newSelectedItems: Price[]) => {
        const currentParams = new URLSearchParams(searchParams.toString());
        newSelectedItems.forEach(item => {
            currentParams.set(`${item.id}-price`, item.value);
        });

        [...items.map(value => value.id), "custom"].forEach(id => {
            if (!newSelectedItems.find(selected => selected.id === id)) {
                currentParams.delete(`${id}-price`);
            }
        });

        router.replace(`/announces?${currentParams.toString()}`, { scroll: false });
    };

    const handleCheckboxChange = (item: Price) => {
        const newSelectedItems = selectedItems.find(selected => selected.id === item.id)
            ? selectedItems.filter(selected => selected.id !== item.id)
            : [...selectedItems, item];

        setSelectedItems(newSelectedItems);
        updateURLParams(newSelectedItems);
    };

    const handleCustomCheckboxChange = () => {
        const isChecked = selectedItems.some(selected => selected.id === "custom");

        let newSelectedItems: Price[];
        if (isChecked) {
            newSelectedItems = selectedItems.filter(selected => selected.id !== "custom")
            setCustomPrice({min: "", max: ""})
        } else {
            newSelectedItems = [...selectedItems, { id: "custom", label: `${customPrice.min}CFA - ${customPrice.max}CFA`, value: `${customPrice.min}-${customPrice.max}` }];
        }

        setSelectedItems(newSelectedItems);
        updateURLParams(newSelectedItems);
    };

    const throttledCustomPriceChange = throttle(() => {
        const customItem: Price = { id: "custom", label: `${customPrice.min}CFA - ${customPrice.max}CFA`, value: `${customPrice.min}-${customPrice.max}` };
        let newSelectedItems: Price[] = [...selectedItems];

        const customItemIndex = newSelectedItems.findIndex(selected => selected.id === "custom");

        if (!customPrice.min && !customPrice.max) {
            if (customItemIndex !== -1) {
                newSelectedItems.splice(customItemIndex, 1);
            }
        } else {
            if (customItemIndex !== -1) {
                newSelectedItems[customItemIndex] = customItem;
            } else {
                newSelectedItems.push(customItem);
            }
        }

        setSelectedItems(newSelectedItems);
        updateURLParams(newSelectedItems);
    }, 1000);

    useEffect(() => {
        throttledCustomPriceChange();
        // Clean-up the throttle function on unmount or when customPrice changes
        return () => throttledCustomPriceChange.cancel();
    }, [customPrice.min, customPrice.max]);

    // Initialize selectedItems based on URL parameters when the component mounts
    useEffect(() => {
        const currentParams = new URLSearchParams(searchParams.toString());
        const initialSelectedItems: Price[] = [];
    
        items.forEach(item => {
            const value = currentParams.get(`${item.id}-price`);
            if (value) {
                initialSelectedItems.push({
                    id: item.id,
                    label: item.label,
                    value: item.value
                });
            }
        });
    
        const customValue = currentParams.get("custom-price");
        if (customValue) {
            const [min, max] = customValue.split("-");
            setCustomPrice({ min, max });
            initialSelectedItems.push({
                id: "custom",
                label: `${min}CFA - ${max}CFA`,
                value: customValue
            });
        }
    
        setSelectedItems(initialSelectedItems);
    }, [])

    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex flex-col gap-2">
                    {items.map((item) => (
                        <div className="flex items-center space-x-2" key={item.id}>
                            <Checkbox
                                id={`price-${item.id}`}
                                checked={selectedItems.some(selected => selected.id === item.id)}
                                onCheckedChange={() => handleCheckboxChange(item)}
                            />
                            <label
                                htmlFor={`price-${item}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                {item.label}
                            </label>
                        </div>
                    ))}
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id={`price-custom`}
                            checked={selectedItems.some(selected => selected.id === "custom")}
                            onCheckedChange={handleCustomCheckboxChange}
                        />
                        <Label
                            htmlFor={`price-custom`}
                            className="w-full flex gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                            <Input 
                                type="number"
                                placeholder="Min"
                                value={customPrice.min}
                                onChange={(e) => setCustomPrice({ ...customPrice, min: e.target.value })}
                                className="w-28 flex-1 h-7"
                            />
                            <Input 
                                type="number"
                                placeholder="Max"
                                value={customPrice.max}
                                onChange={(e) => setCustomPrice({ ...customPrice, max: e.target.value })}
                                className="w-28 flex-1 h-7"
                            />
                        </Label>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
