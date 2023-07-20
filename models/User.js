// Mengimpor modul mongoose untuk berinteraksi dengan MongoDB
const mongoose = require("mongoose");

// Mengimpor modul validator yang berisi fungsi isEmail untuk memvalidasi email
const { isEmail } = require("validator");

// Membuat skema (schema) untuk model User
const userSchema = new mongoose.Schema({
  email: {
    type: "string", // Tipe data untuk email adalah string
    required: [true, "Please enter a valid email address"], // Email harus diisi dan harus merupakan alamat email yang valid
    unique: true, // Setiap email harus unik (tidak boleh ada duplikat)
    lowercase: true, // Mengubah email menjadi huruf kecil sebelum disimpan di database
    validate: [isEmail, "Please enter a valid email address"], // Melakukan validasi dengan menggunakan fungsi isEmail dari validator
  },
  password: {
    type: "string", // Tipe data untuk password adalah string
    required: [true, "Please enter a valid password"], // Password harus diisi
    minlength: [6, "Minimum password length is 6 characters"], // Panjang password minimal harus 6 karakter
  },
});

// Membuat model User berdasarkan skema userSchema
const User = mongoose.model("user", userSchema);

// Ekspor model User agar bisa digunakan di berkas lain
module.exports = User;
