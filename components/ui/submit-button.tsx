"use client";

import { useFormStatus } from "react-dom";
import { type ComponentProps } from "react";
import clsx from "clsx";

type Props = ComponentProps<"button"> & {
    pendingText?: string;
    className?: string;
};

export function SubmitButton({ children, pendingText, className, ...props }: Props) {
    const { pending, action } = useFormStatus();

    const isPending = pending && action === props.formAction;
    // 
    return (
        <button {...props} type="submit" aria-disabled={pending} className={clsx(`bg-custom-dark-10 text-white rounded-md font-bold ${className}`, !className && "p-4")}>
            {isPending ? pendingText : children}
        </button>
    );
}
