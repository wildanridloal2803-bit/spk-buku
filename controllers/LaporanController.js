import db from "../config/database.js";

// SIMPAN LAPORAN
export const simpanLaporan = async (req, res) => {
    try {
        // 1. AMBIL DATA DARI FRONTEND
        // Frontend mengirim JSON: { keterangan: "...", data_json: "..." }
        const { keterangan, data_json } = req.body; 

        // 2. CEK APAKAH DATA_JSON ADA?
        // Kalau undefined/null, kita tolak biar gak error di database
        if (!data_json) {
            return res.status(400).json({msg: "Gagal: Data hasil perhitungan tidak ditemukan (Kosong)."});
        }

        // 3. MASUKKAN KE DATABASE
        // Pastikan kolom di database namanya 'data_json' juga
        await db.query("INSERT INTO laporan (keterangan, data_json) VALUES (?, ?)", [keterangan, data_json]);
        
        res.status(201).json({msg: "Laporan Berhasil Disimpan"});

    } catch (error) {
        console.error("🔥 Error Simpan Laporan:", error);
        res.status(500).json({msg: error.message});
    }
}

// AMBIL SEMUA LAPORAN
export const getLaporan = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM laporan ORDER BY tanggal DESC");
        res.json(rows);
    } catch (error) {
        console.error("🔥 Error Get Laporan:", error);
        res.status(500).json({msg: error.message});
    }
}

// HAPUS LAPORAN
export const hapusLaporan = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM laporan WHERE id_laporan = ?", [id]);
        res.json({msg: "Laporan Dihapus"});
    } catch (error) {
        console.error("🔥 Error Hapus Laporan:", error);
        res.status(500).json({msg: error.message});
    }
}


// import db from "../config/database.js";

// // 1. SIMPAN LAPORAN
// export const simpanLaporan = async (req, res) => {
//     // Ambil data dari Frontend
//     // keterangan: "Laporan Januari"
//     // hasilRanking: Array object hasil hitungan SAW tadi
//     const { keterangan, hasilRanking } = req.body;

//     try {
//         // Trik: Array Object diubah jadi String JSON
//         const jsonString = JSON.stringify(hasilRanking);

//         const sql = "INSERT INTO laporan (keterangan, data_json) VALUES (?, ?)";
//         await db.query(sql, [keterangan, jsonString]);

//         res.json({ msg: "Laporan berhasil disimpan!" });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ msg: "Gagal simpan laporan" });
//     }
// }

// // 2. LIHAT SEMUA LAPORAN
// export const getLaporan = async (req, res) => {
//     try {
//         const [rows] = await db.query("SELECT * FROM laporan ORDER BY tanggal DESC");
        
//         // Data di database kan bentuknya String, kita balikin jadi JSON beneran
//         // Biar Frontend enak bacanya
//         const dataRapih = rows.map(item => ({
//             ...item,
//             data_json: JSON.parse(item.data_json) // Magic happens here
//         }));

//         res.json(dataRapih);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ msg: "Error ambil data" });
//     }
// }

// // 3. HAPUS LAPORAN
// export const hapusLaporan = async (req, res) => {
//     const { id } = req.params;
//     try {
//         await db.query("DELETE FROM laporan WHERE id_laporan = ?", [id]);
//         res.json({ msg: "Laporan dihapus" });
//     } catch (error) {
//         res.status(500).json({ msg: "Gagal hapus" });
//     }
// }