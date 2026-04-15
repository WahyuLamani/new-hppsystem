# 📊 Sistem Perhitungan HPP Sederhana

Sistem ini digunakan untuk menghitung **Harga Pokok Produksi (HPP)** secara sederhana berdasarkan komponen biaya utama.

## 🎯 Tujuan
Membantu menghitung biaya produksi per produk agar bisa menentukan harga jual dengan tepat.

---

## 🧮 Rumus HPP

```
HPP = (Biaya Bahan Baku + Biaya Tenaga Kerja + Biaya Overhead) / Jumlah Produksi
```

---

## 🧾 Komponen Biaya

### 1. Bahan Baku
Biaya yang digunakan untuk membeli bahan utama.

Contoh:
- Tepung: Rp 50.000
- Gula: Rp 30.000  
- Total: Rp 80.000

---

### 2. Tenaga Kerja
Biaya untuk pekerja yang membuat produk.

Contoh:
- Upah harian: Rp 100.000

---

### 3. Overhead
Biaya tambahan selain bahan dan tenaga kerja.

Contoh:
- Listrik: Rp 20.000
- Gas: Rp 15.000  
- Total: Rp 35.000

---

## 📦 Contoh Perhitungan

```
Total Biaya = 80.000 + 100.000 + 35.000 = 215.000
Jumlah Produksi = 50 pcs

HPP = 215.000 / 50 = 4.300
```

👉 Jadi, **HPP per produk = Rp 4.300**

---

## 💻 Contoh Pseudocode

```javascript
function hitungHPP(bahanBaku, tenagaKerja, overhead, jumlahProduksi) {
  const totalBiaya = bahanBaku + tenagaKerja + overhead;
  return totalBiaya / jumlahProduksi;
}

// Contoh penggunaan
const hpp = hitungHPP(80000, 100000, 35000, 50);
console.log("HPP per produk:", hpp);
```

---

## ⚠️ Catatan
- Pastikan semua biaya dihitung dengan benar
- Jangan lupa masukkan biaya kecil (overhead)
- HPP belum termasuk keuntungan (margin)

---

## 🚀 Pengembangan Selanjutnya
- Tambah margin otomatis
- Integrasi database
- Dashboard laporan
- Multi produk

---

## 👨‍💻 Author
Sistem sederhana untuk pembelajaran & pengembangan aplikasi produksi