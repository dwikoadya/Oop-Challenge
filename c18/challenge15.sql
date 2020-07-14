/* task 1 */
SELECT mahasiswa.nim, mahasiswa.nama, mahasiswa.umur, mahasiswa.alamat, jurusan.nama_jurusan FROM mahasiswa INNER JOIN jurusan ON mahasiswa.jurusan_id = jurusan.jurusan_id;

/* task 2 */
SELECT * FROM mahasiswa WHERE mahasiswa.umur < 20;

/* task 3*/
SELECT  mahasiswa.* , krs.nilai FROM mahasiswa INNER JOIN krs ON mahasiswa.nim = krs.nim WHERE  krs.nilai = 'A' OR krs.nilai = 'B';

/* task 4*/
SELECT mahasiswa.* , SUM(mata_kuliah.sks) jumlah_sks 
FROM mahasiswa, mata_kuliah INNER JOIN krs ON krs.nim = mahasiswa.nim AND krs.matkul_id = mata_kuliah.matkul_id GROUP BY mahasiswa.nim HAVING jumlah_sks > 10;

/* task 5 */
SELECT mahasiswa.* , mata_kuliah.nama 
FROM mahasiswa, mata_kuliah INNER JOIN krs ON krs.nim = mahasiswa.nim AND krs.matkul_id = mata_kuliah.matkul_id WHERE mata_kuliah.nama = 'Data Mining';

/* task 6 */
SELECT dosen.* , count(DISTINCT mahasiswa.nama) jumlah_mahasiswa 
FROM dosen, mahasiswa INNER JOIN krs ON krs.dosen_id = dosen.dosen_id AND krs.nim = mahasiswa.nim GROUP BY dosen.dosen_id;

/* task 7 */
SELECT * FROM mahasiswa ORDER BY umur ASC;

/* task 8 */
SELECT mahasiswa.nim, mahasiswa.nama nama_mahasiswa, mahasiswa.alamat, mahasiswa.umur,jurusan.nama_jurusan, dosen.nama nama_dosen, mata_kuliah.nama nama_matakuliah, krs.nilai 
FROM mahasiswa, dosen, mata_kuliah 
INNER JOIN krs ON krs.nim = mahasiswa.nim AND krs.dosen_id = dosen.dosen_id AND krs.matkul_id = mata_kuliah.matkul_id
INNER JOIN jurusan ON  mahasiswa.jurusan_id = jurusan.jurusan_id
WHERE krs.nilai = 'D' OR krs.nilai = 'E';