import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDoc, getDocs, where, query, collectionGroup, Timestamp } from "firebase/firestore";
import dayjs from 'dayjs'

const firebaseConfig = {
  apiKey: "AIzaSyBEvd7mK6AQMPkAGaLh0AyNzJI6oC8qCjs",
  authDomain: "syntaxsoftwaretest.firebaseapp.com",
  projectId: "syntaxsoftwaretest",
  storageBucket: "syntaxsoftwaretest.appspot.com",
  messagingSenderId: "223803359180",
  appId: "1:223803359180:web:70c34e69552f5cbd802769",
  measurementId: "G-MXQP1YCZ51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
const database = getFirestore(app);



export default class AppService{

    async addReview(review: any): Promise<any> {
        try {
            const docRef = await addDoc(collection(database, "reviews"), {...review, created_at : Timestamp.fromDate(new Date())});
            console.log("Document written with ID: ", docRef.id, docRef);
            return {...review, created_at : {seconds : dayjs().unix()}}

        } catch (e) {
            console.log(e)
            return null
        }
    }

    async addPlace(place: any): Promise<any> {
        try {
            const docRef = await addDoc(collection(database, "places"), place);
            console.log("Document written with ID: ", docRef.id, docRef);
            return {
                ...place,
                id: docRef.id
            }
        } catch (e) {
            console.log(e)
            return null
        }
    }

    async getReviews(placeId: any): Promise<any>{
        const q = query(collection(database, "reviews"), where("placeId", "==", placeId))
        const snapshot = await getDocs(q);
        let arr : any[] = []
        if (snapshot.empty) {
            console.log('No matching documents.');
            return arr;
        }  
        snapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            arr.push(doc.data())
        })

        return arr
    }

    async findPlace(place: any): Promise<any>{
        const q = query(collection(database, "places"), where("address", ">=", place))
        const snapshot = await getDocs(q);
        let arr : any[] = []
        if (snapshot.empty) {
            console.log('No matching documents.');
            return arr;
        }  

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            arr.push(doc.data())
        })

        return arr
    }

    async getAllPlaces(): Promise<any>{
        const querySnapshot = await getDocs(collection(database, "places"));
        const arr : any[] = []
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            arr.push(doc.data())
        });
        return arr
    }

    
}