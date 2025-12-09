"use client";

import { trpc } from "@/trpc/client";
import { useEffect } from "react";

export const PageClient = () => {
    const [data] = trpc.categories.getMany.useSuspenseQuery();

    return (
        <div>
            {JSON.stringify(data)}
        </div>
    );
}