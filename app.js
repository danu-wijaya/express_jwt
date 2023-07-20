const express = require("express"); // Mengimpor modul express untuk membuat dan mengelola aplikasi web
const mongoose = require("mongoose"); // Mengimpor modul mongoose untuk berinteraksi dengan MongoDB
const authRoutes = require("./routes/authRoutes"); // Mengimpor rute yang berhubungan dengan autentikasi dari berkas 'authRoutes'
const cookieParser = require("cookie-parser"); // Mengimpor modul cookie-parser untuk bekerja dengan cookies

const app = express(); // Membuat instance dari aplikasi express

// Middleware untuk mengizinkan parsing JSON dari body request
app.use(express.json());

// Middleware untuk mengakses file statis di folder 'public'
app.use(express.static("public"));

app.use(cookieParser()); // Menggunakan cookie-parser sebagai middleware untuk bekerja dengan cookies

// Mengatur view engine menjadi EJS (Embedded JavaScript)
app.set("view engine", "ejs");

// Menghubungkan aplikasi ke database MongoDB
const dbURI = "mongodb://localhost:27017/node-auth"; // URI (Uniform Resource Identifier) untuk database MongoDB
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }) // Menggunakan method connect dari mongoose untuk terhubung ke database
  .then((result) => app.listen(3000)) // Jika koneksi berhasil, aplikasi akan mendengarkan permintaan pada port 3000
  .catch((err) => console.log(err)); // Jika koneksi gagal, pesan error akan dicetak ke konsol

// Rute untuk halaman utama ('/') yang merender view 'home'
app.get("/", (req, res) => res.render("home"));

// Rute untuk halaman 'smoothies' yang merender view 'smoothies'
app.get("/smoothies", (req, res) => res.render("smoothies"));

// Menggunakan rute yang berhubungan dengan autentikasi yang telah diimpor sebelumnya
app.use(authRoutes); // Menggunakan rute yang berhubungan dengan autentikasi yang telah diimpor dari 'authRoutes'

