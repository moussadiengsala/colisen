"use client";

import { useFormStatus } from "react-dom";
import { type ComponentProps } from "react";

type Props = ComponentProps<"button"> & {
    pendingText?: string;
};

export function SubmitButton({ children, pendingText, ...props }: Props) {
    const { pending, action } = useFormStatus();

    const isPending = pending && action === props.formAction;

    return (
        <button {...props} type="submit" aria-disabled={pending} className="bg-custom-dark-10 text-white p-4 rounded-md">
            {isPending ? pendingText : children}
        </button>
    );
}
