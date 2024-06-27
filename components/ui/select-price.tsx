"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent } from "./card"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "./input"
import throttle from "@/lib/throttle"

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

    const handleCheckboxChange = (item: Price) => {
        const newSelectedItems = selectedItems.find(selected => selected.id === item.id)
            ? selectedItems.filter(selected => selected.id !== item.id)
            : [...selectedItems, item];

        setSelectedItems(newSelectedItems);
        const currentParams = new URLSearchParams(searchParams.toString());
        if (newSelectedItems.find(selected => selected.id === item.id)) {
            currentParams.set(`${item.id}-price`, item.value);
        } else {
            currentParams.delete(`${item.id}-price`);
        }
        router.replace(`/annonce?${currentParams.toString()}`);
    };

    const handleCustomCheckboxChange = () => {
        const isChecked = selectedItems.some(selected => selected.id === "price-custom");

        let newSelectedItems: Price[];
        if (isChecked) {
            newSelectedItems = selectedItems.filter(selected => selected.id !== "price-custom")
            setCustomPrice({min: "", max: ""})
        } else {
            newSelectedItems = [...selectedItems, { id: "price-custom", label: `${customPrice.min}CFA - ${customPrice.max}CFA`, value: `${customPrice.min}-${customPrice.max}` }];
        }

        setSelectedItems(newSelectedItems);

        if (customPrice.min != "" || customPrice.max != "") {
            const currentParams = new URLSearchParams(searchParams.toString());
            if (isChecked) {
                currentParams.delete("price-custom");
            } else {
                currentParams.set("price-custom", `${customPrice.min}-${customPrice.max}`);
            }
            router.replace(`/annonce?${currentParams.toString()}`);
        }
    };

    const throttledCustomPriceChange = throttle(() => {
        console.log('throttle')
        const customItem: Price = { id: "price-custom", label: `${customPrice.min}CFA - ${customPrice.max}CFA`, value: `${customPrice.min}-${customPrice.max}` };
        let newSelectedItems: Price[] = [...selectedItems];
        
        const isContains = selectedItems.find(selected => selected.id === customItem.id)

        if (isContains && (!customPrice.min && !customPrice.max)) {
            newSelectedItems = selectedItems.filter(selected => selected.id !== "price-custom")
        }

        if (!isContains && (customPrice.min || customPrice.max)) {
            newSelectedItems = [...selectedItems, customItem];
        }

        setSelectedItems(newSelectedItems);
        // if (customPrice.min != "" || customPrice.max != "") {
            console.log("Setting custom price")
            const currentParams = new URLSearchParams(searchParams.toString());
            if (!selectedItems.find(selected => selected.id === customItem.id)) {
                currentParams.delete("custom-price");
            } else {
                currentParams.set("custom-price", `${customPrice.min}-${customPrice.max}`);
            }
            router.replace(`/annonce?${currentParams.toString()}`);
        // }
    }, 1000);

    useEffect(() => {
        throttledCustomPriceChange();
        // Clean-up the throttle function on unmount or when customPrice changes
        return () => throttledCustomPriceChange.cancel();
    }, [customPrice.min, customPrice.max]);

    return (
        <Card>
            <CardContent>
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
                            checked={selectedItems.some(selected => selected.id === "price-custom")}
                            onCheckedChange={handleCustomCheckboxChange}
                        />
                        <label
                            htmlFor={`price-custom`}
                            className=" flex text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                            <Input 
                                type="number"
                                placeholder="Min"
                                value={customPrice.min}
                                onChange={(e) => setCustomPrice({ ...customPrice, min: e.target.value })}
                            />
                            <Input 
                                type="number"
                                placeholder="Max"
                                value={customPrice.max}
                                onChange={(e) => setCustomPrice({ ...customPrice, max: e.target.value })}
                            />
                        </label>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
