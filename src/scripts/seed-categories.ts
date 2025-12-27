import { db } from "@/db";
import { categories } from "@/db/schema";

const categoryNames = [
    "Cars and vehicles",
    "Comedy",
    "Education",
    "Gaming",
    "Entertainment",
    "Film and animation",
    "Food",
    "Music",
    "News and politics",
    "People and vlogs",
    "Pets and animals",
    "Science and technology",
    "Sports",
    "Travel and lifestyle",
];

async function main(){
    console.log("Seeding categories...");

    try {
        const values = categoryNames.map((name) => ({
            name,
            description: `Videos related to ${name.toLowerCase()}`,
        }));

        await db.insert(categories).values(values);

        console.log("categories seeding successfully!");
    } catch (error) {
        console.error("Error seeding categories", error);
        process.exit(1);
    }
}

main();