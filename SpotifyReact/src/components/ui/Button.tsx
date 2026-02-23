import { VariantProps, cva } from "class-variance-authority";
import { classNames } from "utils/classNames.ts";

import React from "react";

const buttonVariants = cva("flex items-center font-poppins justify-center rounded-[36px] w-full text-[20px]", {
    variants: {
        variant: {
            primary: "font-semibold bg-white",
            secondary: "bg-neutral-50/0 font-semibold text-white border-3 border-white",
            shadow: "text-white bg-[#262626] shadow-[inset_4px_4px_4px_rgba(0,0,0,.25)]",
            transparent: "font-normal text-white backdrop-blur-[8.3px] border-[1px] border-white/[80%] bg-white/[10%]",
            underline: "text-xs text-white hover:bg-lightblue underline font-semibold rounded-none",
            translight: "bg-transparent text-sky hover:bg-lightsky font-semibold",
            lightborder: "border border-sky text-sky text-sm font-main mt-4 rounded-md  w-full hover:bg-lightsky"
        },
        size: {
            default: "w-full h-full",
            sm: "h-9 px-3 py-1",
            md: "px-4 py-3",
            lg: "px-4 py-2",
            xl: "px-8 py-1.5 text-2xl",
        },
    },
    defaultVariants: {
        variant: "primary",
        size: "default",
    },
});

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={classNames(buttonVariants({ variant, size, className }))}
                {...props}
            />
        );
    },
);