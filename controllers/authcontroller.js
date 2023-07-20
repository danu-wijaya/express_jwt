const User = require("../models/User"); // Mengimpor model User dari berkas '../models/User'

// Fungsi untuk menangani error
const handleErrors = (err) => {
  console.log(err.message, err.code); // Mencetak pesan error dan kode error ke konsol
  let errors = { email: '', password: '' }; // Objek untuk menyimpan pesan error terkait email dan password

  // Error duplikasi email
  if (err.code === 11000) { // Jika kode error adalah 11000 (duplikasi)
    errors.email = 'that email is already registered'; // Atur pesan error pada properti email
    return errors; // Mengembalikan objek errors yang berisi pesan error
  }

  // Error validasi
  if (err.message.includes('user validation failed')) { // Jika pesan error berisi "user validation failed"
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message; // Atur pesan error pada properti yang sesuai dengan field (path) yang salah
    });
  }

  return errors; // Mengembalikan objek errors yang berisi pesan error
};

// Controller untuk menampilkan halaman signup (GET request)
module.exports.signup_get = (req, res) => {
  res.render('signup'); // Merender halaman "signup" untuk ditampilkan ke pengguna
};

// Controller untuk menampilkan halaman login (GET request)
module.exports.login_get = (req, res) => {
  res.render('login'); // Merender halaman "login" untuk ditampilkan ke pengguna
};

// Controller untuk memproses data saat signup (POST request)
module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body; // Mendapatkan data email dan password dari body request

  try {
    const user = await User.create({ email, password }); // Membuat user baru dengan menggunakan model User
    res.status(201).json(user); // Mengirim respons berhasil dengan kode status 201 dan data user dalam format JSON
  } catch (err) {
    const errors = handleErrors(err); // Memanggil fungsi handleErrors untuk menangani error yang terjadi
    res.status(400).json({ errors }); // Mengirim respons error dengan kode status 400 dan objek errors yang berisi pesan error
  }
};

// Controller untuk memproses data saat login (POST request)
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body; // Mendapatkan data email dan password dari body request

  console.log(email, password); // Mencetak data email dan password ke konsol
  res.send('user login'); // Mengirim respons "user login"
};
