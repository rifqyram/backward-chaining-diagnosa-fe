import MedicineImage from '../../assets/images/medicine-vector.svg';
import SelectOne from '../../assets/images/select1.svg';
import SelectTwo from '../../assets/images/select2.svg';
import Result from '../../assets/images/result.svg';
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <>
            <div id="#" className="d-flex g-4 justify-content-between row mt-4" style={{minHeight: '800px'}}>
                <div className="col-lg-6 col-12-sm" style={{marginTop: 100}}>
                    <div className="title row">
                        <h1 className='fs-2'>
                            Selamat Datang di Aplikasi <span className='fw-bold'>Backward Chaining</span> Solusi Cerdas
                            untuk <span className='fw-bold'>Diagnosa</span> Penyakit Umum
                        </h1>
                        <h2 className='fs-5'>
                            Temukan Jawaban untuk Kesehatan Anda dengan Teknologi Backward Chaining
                        </h2>
                    </div>
                    <Link to={'/diagnoses'}>
                        <button className='btn btn-lg btn-primary mt-4'>Mulai Diagnosa</button>
                    </Link>
                </div>
                <div className="col-lg-5 col-12-sm align-self-center">
                    <img className='img-fluid object-fit-cover' src={MedicineImage} alt="image"/>
                </div>
            </div>

            <div className="mt-4" id="about">
                <h1 className='text-center fw-bold'>Tentang Aplikasi</h1>
                <p className='my-4'>
                    Aplikasi [Nama Aplikasi] dirancang untuk membuat proses diagnosa penyakit menjadi mudah dan dapat
                    diakses oleh semua orang. Dengan hanya beberapa langkah sederhana, Anda dapat mendapatkan insight
                    awal mengenai kondisi kesehatan Anda. Berikut adalah bagaimana aplikasi kami bekerja:
                </p>
                <div className="my-4 row g-4">
                    <div className="col-lg-4 col-sm-12">
                        <div className="card" style={{height: 600}}>
                            <img src={SelectOne} className="card-img-top p-4" style={{height: 400}} alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">Langkah 1: Pilih Kategori Penyakit</h5>
                                <p className="card-text">Mulailah dengan memilih kategori penyakit yang ingin Anda
                                    telusuri</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-12">
                        <div className="card" style={{height: 600}}>
                            <img src={SelectTwo} className="card-img-top p-4" style={{height: 400}} alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">Langkah 2: Memilih Gejala</h5>
                                <p className="card-text">Setelah memilih kategori penyakit, aplikasi akan menampilkan
                                    daftar gejala yang umumnya terkait dengan penyakit tersebut.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-12">
                        <div className="card" style={{height: 600}}>
                            <img src={Result} className="card-img-top p-4" style={{height: 400}} alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">Langkah 3: Mendapatkan Hasil Diagnosa</h5>
                                <p className="card-text">Berdasarkan pilihan penyakit dan gejala yang Anda masukkan, algoritma backward chaining kami akan menganalisis dan memberikan hasil diagnosa yang paling mungkin.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
