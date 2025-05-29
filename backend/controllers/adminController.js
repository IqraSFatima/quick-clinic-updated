import validator from "validator";
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from "cloudinary";
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";


// API for adding doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fee, address } = req.body;
        const imageFile = req.file;

        // Checking for all data to add doctor 
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fee || !address) {
            return res.json({ success: false, message: "Some details are missing." });
        }

        // Validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email address." });
        }

        // Validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must contain at least 8 characters." });
        }

        // Hashing doctor password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fee,
            address: JSON.parse(address),
            date: Date.now(),
        }

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.json({ success: true, message: "Doctor Added Successfully." });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// API for admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            return res.json({ success: true, token });

        } else {
            return res.json({ success: false, message: "Invalid Credentials." });
        }
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
}

// API to get all doctors list for admin panel
const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password');
        return res.json({ success: true, doctors });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
}

// API to get all appointments list
const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({});
        return res.json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
}

// API to cancel appointments
const adminCancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);

        await appointmentModel.findByIdAndUpdate(appointmentId, { canceled: true });

        // Releasing doctor's slot
        const { docId, slotDate, slotTime } = appointmentData;
        const doctorData = await doctorModel.findById(docId);

        let slots_booked = doctorData.slots_booked;
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);

        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        return res.json({ success: true, message: 'Appointment Cancelled Successfully.' });

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
}

// API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
    try {
        const doctors = await doctorModel.find({});
        const patients = await userModel.find({});
        const appointments = await appointmentModel.find({});

        const dashData = {
            doctors: doctors.length,
            patients: patients.length,
            appointments: appointments.length,
            latestAppointments: appointments.reverse().slice(0, 5),
        }

        return res.json({ success: true, dashData });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
}


export { addDoctor, loginAdmin, allDoctors, appointmentsAdmin, adminCancelAppointment, adminDashboard };