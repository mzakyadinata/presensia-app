# 📘 Presensia Apps

Presensia Apps adalah aplikasi frontend berbasis React untuk keperluan **presensi dan manajemen karyawan**. Dirancang sebagai SPA (Single Page Application), aplikasi ini mempermudah proses absensi dan pengelolaan administrasi karyawan dengan tampilan modern dan interaktif.

---

## ✨ Fitur Utama

### 👤 Untuk Karyawan
- 📍 Absensi berdasarkan lokasi terkini (lokasi user vs kantor, radius akan dihitung di backend)
- 📸 Upload foto bukti absensi
- 📝 Pengajuan:
  - Lembur
  - Izin
  - Reimburse
  - Ubah shift
  - Kunjungan klien
- 💬 Chat grup project *(frontend only)*
- 🤖 Chatbot AI & kalkulator gaji *(frontend only)*

### 🛠️ Untuk Admin
- 📋 Manajemen & monitoring pengajuan karyawan
- ✅ Persetujuan absensi, izin, lembur, dll

---

## 🧰 Teknologi yang Digunakan

- ⚛️ React 19
- 🎨 Tailwind CSS v4.1 + DaisyUI v5.0.43
- ⚡ Vite (dev server & build tool)
- 🗺️ Leaflet & react-leaflet (lokasi/peta)
- 📦 Tools tambahan: axios, date-fns, framer-motion, react-router-dom

---

## ⚙️ Cara Instalasi

### 1. Clone repository
```bash
git clone git@github.com/mzakyadinata/presensia-app.git
cd presensia-app
```

### 2. Install dependency
```bash
npm install
```

### 3. Jalankan di mode development
```bash
npm run dev
```

### 4. Build untuk production
```bash
npm run build
```

---

## 📦 JSON 
Beberapa fitur seperti check-in, check-out, dan log absensi terhubung ke sample data JSON (db.json) untuk keperluan testing atau demo.

### 1. Pindah ke Folder Lain
Pastikan saat ini berada di folder yang berbeda dengan code 'main' 

### 2. Clone JSON
```bash
git clone -b json https://github.com/mzakyadinata/presensia-app.git presensia-json
cd presensia-json
```

### 3, Install JSON Server 
```bash
npm install -g json-server
```

### 5. Jalankan Server 
```bash
json-server --watch db.json --port 3001
```

---


## 🔓 Lisensi

📖 Open source untuk keperluan pengembangan. Namun, project ini dirancang untuk digunakan oleh perusahaan tertentu. Hubungi pemilik repositori untuk penggunaan lebih lanjut.

---

## 🤝 Kontribusi

Belum ada kontributor aktif saat ini. Kamu bisa bantu dengan membuka issue atau pull request jika tertarik.

---
