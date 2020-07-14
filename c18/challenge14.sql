CREATE TABLE jurusan(
    jurusan_id CHARACTER(5) PRIMARY KEY NOT NULL,
    nama_jurusan VARCHAR(20) NOT NULL
);

INSERT INTO jurusan(jurusan_id, nama_jurusan) VALUES('TI', 'Teknik Informatika');
INSERT INTO jurusan(jurusan_id, nama_jurusan) VALUES('TM', 'Teknik Mesin');
INSERT INTO jurusan(jurusan_id, nama_jurusan) VALUES('TS', 'Teknik Sipil');

CREATE TABLE mahasiswa(
    nim CHAR(7) PRIMARY KEY NOT NULL,
    nama VARCHAR(30) NOT NULL,
    umur INTEGER,
    alamat TEXT NOT NULL,
    jurusan_id CHARACTER(5),
    FOREIGN KEY(jurusan_id) REFERENCES jurusan(jurusan_id)
);
INSERT INTO mahasiswa(nim, nama, umur, alamat, jurusan_id) VALUES('0720001', 'Dwiko Adya Maulana', 17, 'Bandung', 'TM');
INSERT INTO mahasiswa(nim, nama, umur, alamat, jurusan_id) VALUES('0720002', 'Fikri Fadillah', 21, 'Bekasi', 'TI');
INSERT INTO mahasiswa(nim, nama, umur, alamat, jurusan_id) VALUES('0720003', 'Rafli Indra', 19, 'Lampung', 'TS');
INSERT INTO mahasiswa(nim, nama, umur, alamat, jurusan_id) VALUES('0720004', 'Alwy Rahman', 20, 'Jakarta', 'TI');
INSERT INTO mahasiswa(nim, nama, umur, alamat, jurusan_id) VALUES('0720005', 'Agung Nugroho', 18, 'Bandung', 'TI');


CREATE TABLE mata_kuliah(
    matkul_id CHARACTER(5) PRIMARY KEY NOT NULL,
    nama TEXT NOT NULL,
    sks INTEGER NOT NULL
);
INSERT INTO mata_kuliah(matkul_id, nama, sks) VALUES('TM002', 'Sistem Ventilasi dan Tata Udara', 3);
INSERT INTO mata_kuliah(matkul_id, nama, sks) VALUES('TS001', 'Perancangan Geometrik Jalan', 5);
INSERT INTO mata_kuliah(matkul_id, nama, sks) VALUES('TS002', 'Perancangan Bangunan', 3);
INSERT INTO mata_kuliah(matkul_id, nama, sks) VALUES('TM001', 'Teknik Aerodinamika', 4);
INSERT INTO mata_kuliah(matkul_id, nama, sks) VALUES('TI002', 'Mobile Programming', 3);
INSERT INTO mata_kuliah(matkul_id, nama, sks) VALUES('TI001', 'Data Mining', 5);


CREATE TABLE dosen(
    dosen_id CHARACTER(6) PRIMARY KEY NOT NULL,
    nama VARCHAR(30) NOT NULL
);

INSERT INTO dosen(dosen_id, nama) VALUES ('DOS002', 'Dedi Supriyadi');
INSERT INTO dosen(dosen_id, nama) VALUES ('DOS001', 'Ahmad Syauqi');
INSERT INTO dosen(dosen_id, nama) VALUES ('DOS003', 'Idah Rifdah');

CREATE TABLE krs(
    krs_id VARCHAR(6) PRIMARY KEY NOT NULL,
    nilai VARCHAR(5) NOT NULL,
    nim CHARACTER(7) NOT NULL,
    matkul_id CHARACTER(5) NOT NULL,
    dosen_id CHARACTER(6) NOT NULL,
    FOREIGN KEY(nim) REFERENCES mahasiswa(nim),
    FOREIGN KEY(matkul_id) REFERENCES matakuliah(matkul_id),
    FOREIGN KEY(dosen_id) REFERENCES dosen(dosen_id)
);

INSERT INTO krs(krs_id, nilai, nim, matkul_id, dosen_id) VALUES ('KRS001', 'A', '0720001', 'TM001', 'DOS001');
INSERT INTO krs(krs_id, nilai, nim, matkul_id, dosen_id) VALUES ('KRS002', 'E', '0720002', 'TI001', 'DOS002');
INSERT INTO krs(krs_id, nilai, nim, matkul_id, dosen_id) VALUES ('KRS003', 'D', '0720003', 'TS001', 'DOS003');
INSERT INTO krs(krs_id, nilai, nim, matkul_id, dosen_id) VALUES ('KRS004', 'A', '0720004', 'TI001', 'DOS002');
INSERT INTO krs(krs_id, nilai, nim, matkul_id, dosen_id) VALUES ('KRS005', 'B', '0720005', 'TI001', 'DOS002');
INSERT INTO krs(krs_id, nilai, nim, matkul_id, dosen_id) VALUES ('KRS011', 'C', '0720001', 'TI001', 'DOS002');
INSERT INTO krs(krs_id, nilai, nim, matkul_id, dosen_id) VALUES ('KRS012', 'A', '0720002', 'TI002', 'DOS002');
INSERT INTO krs(krs_id, nilai, nim, matkul_id, dosen_id) VALUES ('KRS013', 'D', '0720003', 'TS002', 'DOS003');
INSERT INTO krs(krs_id, nilai, nim, matkul_id, dosen_id) VALUES ('KRS014', 'E', '0720004', 'TI002', 'DOS002');
INSERT INTO krs(krs_id, nilai, nim, matkul_id, dosen_id) VALUES ('KRS015', 'C', '0720005', 'TI002', 'DOS002');
INSERT INTO krs(krs_id, nilai, nim, matkul_id, dosen_id) VALUES ('KRS016', 'B', '0720001', 'TM002', 'DOS001');



CREATE TABLE login (
    username VARCHAR(20) PRIMARY KEY NOT NULL,
    pass VARCHAR(20) NOT NULL,
    acclevel VARCHAR(5)

);

INSERT INTO login (username, pass, acclevel) VALUES ('dwiko', '12345', 'ADMIN');

