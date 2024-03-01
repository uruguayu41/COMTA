import fs from 'fs';
import Papa from 'papaparse';
import {
    getFirestore,
    collection,
    addDoc,
    doc,
    getDoc,
    arrayRemove,
    getDocs,
    updateDoc,
} from "firebase/firestore";
import { firebaseApp } from "./src/firebase.js";
const db = getFirestore(firebaseApp);

// Read the CSV file
const filePath = 'datos.csv';
const fileContent = fs.readFileSync(filePath, 'utf-8');

// Parse the CSV file
const csvRows = Papa.parse(fileContent, { header: true, skipEmptyLines: true }).data;


csvRows.forEach(async (element) => {
    const id = element.IDENTIFICACION;
    const nombre = element.NOMBRE + " " + element.APELLIDO;
    const sector = element.SECCION;
    const evaluador = element.PORQUIEN;

    const nuevo_empleado = {
        NOMBRE: nombre,
        SECTOR: sector,
        CI: id,
    };
    setTimeout(async () => {
        try {
            const docRef = await addDoc(
              collection(db, "EMPLEADOS"),
              nuevo_empleado
            );
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }, 2000);

});