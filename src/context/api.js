import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc, query, where, deleteDoc, updateDoc   } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDGWHMK1C7wX1ac5eAguCTBvKf49MAmDMA",
  authDomain: "wefinance-45281.firebaseapp.com",
  projectId: "wefinance-45281",
  storageBucket: "wefinance-45281.appspot.com",
  messagingSenderId: "491323608467",
  appId: "1:491323608467:web:10f3f273097ecdc5a36c66"
};
initializeApp(firebaseConfig);
const db = getFirestore();

export const createData = async (tableName,docId,data) => {
    try {
        await setDoc(doc(db, tableName, docId), data);
        return true;
    } catch (e) {
        return false;
    }
}
export const userLogin = async (phoneNumber,password,cb) => {
    try {
        const querySnapshot = await getDocs(query(collection(db, "users"), where("phoneNumber", "==", phoneNumber), where("password", "==", password)));
        const data = querySnapshot.docs.map(doc => doc.data());
        cb(data)
    } catch (e) {
        cb(e);
    }
}
export const getInvestments = async (phoneNumber,cb) => {
    try {
        const querySnapshot = await getDocs(query(collection(db, "investments"), where("phoneNumber", "==", phoneNumber)));
        const data = querySnapshot.docs.map(doc => doc.data());
        cb(data)
    } catch (e) {
        cb(e);
    }
}
export const getApprovedInvestments = async (phoneNumber,cb) => {
    try {
        const querySnapshot = await getDocs(query(collection(db, "investments"), where("phoneNumber", "==", phoneNumber), where("status", "!=", "MAKE PAYMENT") ));
        const data = querySnapshot.docs.map(doc => doc.data());
        cb(data)
    } catch (e) {
        cb(e);
    }
}
export const getDocuments = async (phoneNumber,cb) => {
    try {
        const querySnapshot = await getDocs(query(collection(db, "documents"), where("phoneNumber", "==", phoneNumber)));
        const data = querySnapshot.docs.map(doc => doc.data());
        cb(data)
    } catch (e) {
        cb(e);
    }
}
export const getTransactionInProgress = async (phoneNumber,cb) => {
    try {
        const querySnapshot = await getDocs(query(collection(db, "paymentInProgress"), where("phoneNumber", "==", phoneNumber)));
        const data = querySnapshot.docs.map(doc => doc.data());
        cb(data)
    } catch (e) {
        cb(e);
    }
}
export const getLoans = async (phoneNumber,cb) => {
    try {
        const querySnapshot = await getDocs(query(collection(db, "loans"), where("phoneNumber", "==", phoneNumber)));
        const data = querySnapshot.docs.map(doc => doc.data());
        cb(data)
    } catch (e) {
        cb(e);
    }
}
export const getApprovedLoans = async (phoneNumber,cb) => {
    try {
        const querySnapshot = await getDocs(query(collection(db, "loans"), where("phoneNumber", "==", phoneNumber), where("status", "!=", "PENDING") ));
        const data = querySnapshot.docs.map(doc => doc.data());
        cb(data)
    } catch (e) {
        cb(e);
    }
}
export const getMyWithdrawals = async (phoneNumber,cb) => {
    try {
        const querySnapshot = await getDocs(query(collection(db, "withdrawals"), where("phoneNumber", "==", phoneNumber) ));
        const data = querySnapshot.docs.map(doc => doc.data());
        cb(data)
    } catch (e) {
        cb(e);
    }
}
export const getWithdrawals = async (cb) => {
    try {
        const querySnapshot = await getDocs(query(collection(db, "withdrawals") ));
        const data = querySnapshot.docs.map(doc => doc.data());
        cb(data)
    } catch (e) {
        cb(e);
    }
}
export const getTotalAmounts = async (cb) => {
    try {
        const querySnapshotInvestment = await getDocs(query(collection(db, "investments"), where("status", "!=", "MAKE PAYMENT")));
        const querySnapshotLoan = await getDocs(query(collection(db, "loans")));

        const investmentData = querySnapshotInvestment.docs.map(doc => doc.data());
        const loanData = querySnapshotLoan.docs.map(doc => doc.data());
        cb({investmentData,loanData})
    } catch (e) {
        cb(false);
    }
}
export const getBankDetails = async (cb) => {
    try {
        const querySnapshot = await getDocs(query(collection(db, "bankaccount")));
        const data = querySnapshot.docs.map(doc => doc.data());
        cb(data)
    } catch (e) {
        cb(e);
    }
}
export const deleteData = async (tableName,docId) => {
    try {
        const q = await deleteDoc(doc(db, tableName, docId));
        return q;
    } catch (e) {
        return false;
    }
}
export const updateTransaction = async (tableName,docId,status) => {
    try {
        const docRef = doc(db, tableName, docId);
        const res = await updateDoc(docRef, {
            status
        });
        return true;
    } catch (e) {
        return false;
    }
}
export const uploadFile = (file,path,cb) =>{
    const storage = getStorage();
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
            default:
        }
    },(error) => {
        cb(false);
    },() => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            cb(downloadURL);
        });
    });
  
}