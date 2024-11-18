import PocketBase from 'pocketbase';
let pb: PocketBase;
try {
    pb = new PocketBase('http://127.0.0.1:8090');
} catch (error) {
    console.error("Error creating PocketBase instance:", error);
}

let users: any[] = [];

// async function seedUsers() {
//     const pb = new PocketBase('http://127.0.0.1:8090');

//     // Login as admin first
//     await pb.admins.authWithPassword('aaron@clearlyinnovative.com', 'password');

//     for (const user of users) {
//         try {
//             // Download the avatar image and create a file blob
//             const avatarResponse = await fetch(user.avatar);
//             const avatarBlob = await avatarResponse.blob();
//             const avatarFile = new File([avatarBlob], 'avatar.jpg', { type: 'image/jpeg' });

//             // Create form data with the user data and avatar
//             const formData = new FormData();
//             Object.entries(user).forEach(([key, value]) => {
//                 if (key !== 'avatar') {
//                     formData.append(key, value as string);
//                 }
//             });
//             formData.append('avatar', avatarFile);

//             // Create the user
//             await pb.collection('users').create(formData);
//             console.log(`Created user: ${user.email}`);
//         } catch (error) {
//             console.error(`Failed to create user ${user.email}:`, error);
//         }
//     }
// }

async function generateUsers() {
    try {
        const response = await fetch("https://randomuser.me/api/?results=25");
        const data = await response.json();
        console.log(data);

        users = data.results.map((user: any) => ({
            email: user.email,
            emailVisibility: true,
            password: "password123", // Same password for all test users
            passwordConfirm: "password123",
            name: `${user.name.first} ${user.name.last}`,
            avatar: user.picture.large, // URL to the avatar
            created: user.registered.date,
            updated: user.registered.date,
        }));
    } catch (error) {
        console.error("Error generating users:", error);
    }
}

generateUsers().then(async () => {
    // await seedUsers();
    console.log(users);
});
