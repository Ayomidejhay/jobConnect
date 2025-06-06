import { Client, Account, ID, Databases, Query, Permission, Role } from 'appwrite'; 


const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1') 
    .setProject('682ee932000f7ec3eb5f');

const account = new Account(client);
const databases = new Databases(client);


const DATABASE_ID = '682f2bab0017fe72e22d'; 
const COLLECTION_ID_JOBS = '682f2ddb002b0dac3fa3'; 


// Function to register a new user
export async function registerUser(email, password, name) {
    try {
        
        const response = await account.create(ID.unique(), email, password, name);
        console.log("User registered successfully:", response);
        
        return { success: true, message: "Registration successful!", data: response };
    } catch (error) {
        console.error("Registration error:", error);
        return { success: false, message: error.message || "Registration failed." };
    }
}

// Function to log in a user
export async function loginUser(email, password) {
    try {
       
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
                postedByUserId: userId, 
            },
           
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
 * @returns {Promise<object>} 
 */
export async function getJobPosts() {
    try {
        // Use Query.orderDesc('$createdAt') to get the latest 
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID_JOBS,
            [
               
                Query.orderDesc('$createdAt') // Order by creation date, newest first
                
            ]
        );
       
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


export { client, account, databases };
