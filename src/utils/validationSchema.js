import * as Yup from 'yup';

export const authSchema = () => Yup.object({
    username: Yup.string()
        .min(6, 'Username minimal 6 - 16 karakter')
        .max(16, 'Username minimal 6 - 16 karakter')
        .matches('^[a-zA-Z0-9.]*$', 'Username tidak valid')
        .required('Username wajib di isi'),
    password: Yup.string()
        .min(6, 'Password harus lebih dari 6 karakter')
        .required('Password wajib di isi'),
});

export const userSchema = () => Yup.object({
    username: Yup.string()
        .min(6, 'Username minimal 6 - 16 karakter')
        .max(16, 'Username minimal 6 - 16 karakter')
        .matches('^[a-zA-Z0-9.]*$', 'Username tidak valid')
        .required('Username wajib di isi'),
    password: Yup.string()
        .min(6, 'Password harus lebih dari 6 karakter'),
    role: Yup.object().required('Role wajib dipilih'),
});

export const diseaseSchema = () => Yup.object({
    name: Yup.string()
        .required('Nama Penyakit wajib di isi'),
    cause: Yup.string()
        .required('Penyebab wajib di isi'),
    solution: Yup.string()
        .required('Solusi wajib di isi')
});

export const symptomsSchema = () => Yup.object({
    description: Yup.string()
        .required('Deskripsi wajib di isi')
})

export const diagnoseSchema = (min) => Yup.object({
    disease: Yup.object().required('Penyakit wajib dipilih'),
    symptoms: Yup.array().min(min, 'Semua opsi harus dipilih'),
})

export const ruleSchema = () => Yup.object({
    disease: Yup.object().required('Penyakit wajib dipilih'),
    symptomsIdsAnd: Yup
        .array()
        .min(1, 'Pilih setidaknya satu gejala'),
})