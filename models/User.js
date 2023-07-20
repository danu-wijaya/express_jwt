const mongoose = require('mongoose'); // Mengimpor modul mongoose untuk berinteraksi dengan MongoDB
const { isEmail } = require('validator'); // Mengimpor fungsi isEmail dari modul validator untuk memvalidasi email
const bcrypt = require('bcrypt'); // Mengimpor modul bcrypt untuk melakukan hashing password

// Membuat skema (schema) untuk model User
const userSchema = new mongoose.Schema({
  email: {
    type: String, // Tipe data untuk email adalah string
    required: [true, 'Please enter an email'], // Email harus diisi dan memiliki pesan error khusus jika tidak diisi
    unique: true, // Setiap email harus unik (tidak boleh ada duplikat)
    lowercase: true, // Mengubah email menjadi huruf kecil sebelum disimpan di database
    validate: [isEmail, 'Please enter a valid email'], // Melakukan validasi dengan menggunakan fungsi isEmail dari validator
  },
  password: {
    type: String, // Tipe data untuk password adalah string
    required: [true, 'Please enter a password'], // Password harus diisi dan memiliki pesan error khusus jika tidak diisi
    minlength: [6, 'Minimum password length is 6 characters'], // Panjang password minimal harus 6 karakter
  }
});

// Fungsi middleware (pre hook) yang akan dijalankan sebelum dokumen disimpan ke database
userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(); // Membuat "salt" untuk melakukan hashing password
  this.password = await bcrypt.hash(this.password, salt); // Menghash password menggunakan salt yang telah dibuat
  next(); // Melanjutkan proses penyimpanan dokumen ke database
});

// Membuat model User berdasarkan skema userSchema
const User = mongoose.model('user', userSchema);

// Ekspor model User agar bisa digunakan di berkas lain
module.exports = User;
