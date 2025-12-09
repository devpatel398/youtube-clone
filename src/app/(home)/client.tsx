"use client";

import { trpc } from "@/trpc/client";
import { useEffect } from "react";

export const PageClient = () => {
    const [data] = trpc.hello.useSuspenseQuery({
        text: "Dev",
    });

    return (
        <div>
            Page Client says: {data.greeting}
        </div>
    );
}