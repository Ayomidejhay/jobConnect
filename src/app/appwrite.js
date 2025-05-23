import { Client, Account, ID, Databases, Query, Permission, Role } from 'appwrite'; // Assuming 'appwrite' npm package is installed

// Initialize Appwrite Client
// Replace 'YOUR_APPWRITE_ENDPOINT' and 'YOUR_PROJECT_ID' with your actual Appwrite details.
// You can find these in your Appwrite console.
const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1') // Your Appwrite Endpoint (e.g., 'https://cloud.appwrite.io/v1')
    .setProject('682ee932000f7ec3eb5f'); // Your Appwrite Project ID

const account = new Account(client);
const databases = new Databases(client);

// IMPORTANT: Replace with your actual Database ID and Collection ID from Appwrite Console
const DATABASE_ID = '682f2bab0017fe72e22d'; // e.g., '65b2f0a1c...'
const COLLECTION_ID_JOBS = '682f2ddb002b0dac3fa3'; // e.g., '65b2f0d9c...'


// Function to register a new user
export async function registerUser(email, password, name) {
    try {
        // Create a new user account with a unique ID, email, password, and name.
        // ID.unique() generates a unique ID for the user.
        const response = await account.create(ID.unique(), email, password, name);
        console.log("User registered successfully:", response);
        // Optionally, you can create an email session immediately after registration
        // await account.createEmailSession(email, password);
        return { success: true, message: "Registration successful!", data: response };
    } catch (error) {
        console.error("Registration error:", error);
        return { success: false, message: error.message || "Registration failed." };
    }
}

// Function to log in a user
export async function loginUser(email, password) {
    try {
        // Create an email session for the user.
        const response = await account.createEmailPasswordSession(email, password);
        console.log("User logged in successfully:", response);
        return { success: true, message: "Login successful!", data: response };
    } catch (error) {
        console.error("Login error:", error);
        return { success: false, message: error.message || "Login failed." };
    }
}

// Function to log out the current user
export async function logoutUser() {
    try {
        // Delete the current session.
        await account.deleteSession('current');
        console.log("User logged out successfully.");
        return { success: true, message: "Logged out successfully!" };
    } catch (error) {
        console.error("Logout error:", error);
        return { success: false, message: error.message || "Logout failed." };
    }
}

// Function to get the current logged-in user's details
export async function getCurrentUser() {
    try {
        const user = await account.get();
        return { success: true, data: user };
    } catch (error) {
        console.error("Get current user error:", error);
        return { success: false, message: error.message || "Failed to get user." };
    }
}

export async function createJobPost(userId, jobDetails) {
    try {
        const response = await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID_JOBS,
            ID.unique(), // Generate a unique ID for the new document
            {
                title: jobDetails.title,
                company: jobDetails.company,
                location: jobDetails.location,
                locationType: jobDetails.locationType,
                jobType: jobDetails.jobType,
                salary: jobDetails.salary,
                applicationDeadline: jobDetails.applicationDeadline,
                description: jobDetails.description,
                requirements: jobDetails.requirements,
                responsibilities: jobDetails.responsibilities,
                postedByUserId: userId, // Store the ID of the user who posted the job
            },
            // Set permissions for the document:
            // - Anyone can read this document (public job listing)
            // - Only the user who created it can update/delete it (optional, but good practice)
            [
                Permission.read(Role.any()),
               // Permission.update(Role.user(userId)),
                //Permission.delete(Role.user(userId)),
            ]
        );
        console.log("Job post created successfully:", response);
        return { success: true, message: "Job posted successfully!", data: response };
    } catch (error) {
        console.error("Error creating job post:", error);
        return { success: false, message: error.message || "Failed to post job." };
    }
}

/**
 * Function to fetch all job posts from the database.
 * @returns {Promise<object>} Result object containing an array of job documents.
 */
export async function getJobPosts() {
    try {
        // Use Query.orderDesc('$createdAt') to get the latest jobs first
        //console.log(`Appwrite: Fetching jobs with limit=${limit}, offset=${offset}`);
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID_JOBS,
            [
               // Query.limit(limit), // Apply limit
                //Query.offset(offset), // Apply offset
                Query.orderDesc('$createdAt') // Order by creation date, newest first
                // You can add more queries here, e.g., Query.limit(10), Query.offset(0)
            ]
        );
       // console.log(`Appwrite: Fetched ${response.documents.length} documents. Total available: ${response.total}`)
        return { success: true, data: response.documents,  total: response.total };
    } catch (error) {
        console.error("Error fetching job posts:", error);
        if (error.response && error.response.message) {
            console.error("Appwrite API Error Message:", error.response.message);
            return { success: false, message: error.response.message };
        }
        return { success: false, message: error.message || "Failed to fetch job posts." };
    }
}

/**
 * Function to fetch a single job post by its ID from the database.
 * @param {string} jobId - The ID of the job document to fetch.
 * @returns {Promise<object>} Result object containing the job document.
 */
export async function getJobPostById(jobId) {
    try {
        const response = await databases.getDocument(
            DATABASE_ID,
            COLLECTION_ID_JOBS,
            jobId
        );
        console.log(`Job post '${jobId}' fetched successfully:`, response);
        return { success: true, data: response };
    } catch (error) {
        console.error(`Error fetching job post '${jobId}':`, error);
        if (error.response && error.response.message) {
            console.error("Appwrite API Error Message:", error.response.message);
            return { success: false, message: error.response.message };
        }
        return { success: false, message: error.message || "Failed to fetch job post." };
    }
}

// Export the client and account objects if you need direct access in components
export { client, account, databases };
