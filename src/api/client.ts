import PocketBase from 'pocketbase';
import { users } from '../scripts/seed-data';

const pb = new PocketBase('http://127.0.0.1:8090');
export default pb;


export const loadSeedData = async () => {
    try {
        await pb.admins.authWithPassword(
            "aaron+admin@clearlyinnovative.com",
            "password123"
        );

        const contacts = await pb.collection("contacts").getFullList();
        console.log("Existing contacts:", contacts.length);

        if (contacts.length === 0) {
            console.log("Starting to create contacts...");

            // Process records sequentially instead of all at once
            for (const user of users) {
                try {
                    const newContact = await pb.collection("contacts").create(user);
                    console.log("Created contact:", newContact.id);
                } catch (error) {
                    console.error("Error creating contact:", error);
                    // Continue with next record even if one fails
                }
            }
        }

        await pb.admins.client.authStore.clear();
    } catch (error) {
        console.error("Error in loadSeedData:", error);
    }
};
