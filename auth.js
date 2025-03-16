// Firebase Authentication
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// Initialize Firebase Auth
const auth = getAuth();

// Login function
async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = "student-dashboard.html"; // Redirect to student dashboard after successful login
    } catch (error) {
        alert("Login failed: " + error.message); // Show error message if login fails
    }
}

// Logout function
function logout() {
    signOut(auth)
        .then(() => {
            window.location.href = "index.html"; // Redirect to login page after logging out
        })
        .catch((error) => {
            console.error("Logout Error:", error); // Log error if logout fails
        });
}

// Check if the user is logged in (Authentication State Listener)
onAuthStateChanged(auth, (user) => {
    if (!user && window.location.pathname !== "/index.html") {
        window.location.href = "index.html"; // Redirect to login if not authenticated
    }
});
