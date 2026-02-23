import { VariantProps, cva } from "class-variance-authority";
import { classNames } from "utils/classNames.ts";

import * as React from "react";

const inputVariants = cva(
    "text-[16px] w-full placeholder:text-white font-poppins h-full rounded-[18px] outline-none border ",
    {
        variants: {
            variant: {
                default: "border-neutral-300/80 rounded-2xl font-extralight bg-neutral-50/0 w-full px-[24px] border border-gray-300",
                withIcon: "ps-10 border-white hover:border-yellow",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
);

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement>,
        VariantProps<typeof inputVariants> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, variant, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={classNames(inputVariants({ variant, className }))}
                ref={ref}
                {...props}
            />
        );
    },
);