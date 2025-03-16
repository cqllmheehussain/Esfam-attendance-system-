import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Firebase Configuration (use your credentials from Firebase Console)
const firebaseConfig = {
    apiKey: "AIzaSyBTeWblW5uuLueWTR_1h1XC6tXRn4i2sQI",
    authDomain: "esfam-attendance.firebaseapp.com",
    projectId: "esfam-attendance",
    storageBucket: "esfam-attendance.firebasestorage.app",
    messagingSenderId: "846910951812",
    appId: "1:846910951812:web:1ae305468ea1bfe3d0cdd1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

// Register a student in Firestore
async function registerStudent() {
    const name = document.getElementById("name").value;
    const matric = document.getElementById("matric").value;
    const department = document.getElementById("department").value;
    const level = document.getElementById("level").value;

    // Face API camera access for face detection
    const video = document.getElementById('video');
    const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
    video.srcObject = stream;

    const labeledFaceDescriptors = await loadLabeledImages();
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
    
    video.onplay = () => {
        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors();
            const results = detections.map(d => faceMatcher.findBestMatch(d.descriptor));
            
            if (results.length > 0) {
                const bestMatch = results[0];
                console.log("Detected face with best match: ", bestMatch);
                
                // Save the registration data in Firestore
                await db.collection("students").add({
                    name: name,
                    matric: matric,
                    department: department,
                    level: level,
                    faceDescriptors: bestMatch._descriptor
                });
                
                alert("Student registered successfully");
                stream.getTracks().forEach(track => track.stop()); // Stop the camera after registration
            }
        }, 100);
    }
}

// Function to load labeled face images for face-api.js
async function loadLabeledImages() {
    // Fetch labeled face images from Firebase storage or locally
    const labels = ['student1', 'student2']; // Example labels, you will fetch these from Firebase or local storage
    return Promise.all(
        labels.map(async label => {
            const img = await fetch(`./labeled_images/${label}.jpg`);
            const image = await faceapi.bufferToImage(await img.blob());
            const detections = await faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptor();
            return new faceapi.LabeledFaceDescriptors(label, [detections.descriptor]);
        })
    );
}

// Mark attendance function
async function markAttendance() {
    const video = document.getElementById('attendance-video');
    const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
    video.srcObject = stream;

    const labeledFaceDescriptors = await loadLabeledImages();
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
    
    video.onplay = () => {
        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors();
            const results = detections.map(d => faceMatcher.findBestMatch(d.descriptor));
            
            if (results.length > 0) {
                const bestMatch = results[0];
                console.log("Attendance marked for: ", bestMatch);
                
                // Log attendance in Firestore
                const student = await db.collection('students').where("name", "==", bestMatch.label).get();
                if (!student.empty) {
                    const studentDoc = student.docs[0];
                    await db.collection('attendance').add({
                        matric: studentDoc.id,
                        date: new Date()
                    });
                }

                alert("Attendance marked successfully");
                stream.getTracks().forEach(track => track.stop()); // Stop the camera after marking attendance
            }
        }, 100);
    }
}
