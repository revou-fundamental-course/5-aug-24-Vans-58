const header = document.getElementById('header');
function toggleHeaderShadow() {
    if (window.scrollY > 0) {
        header.classList.add('header-shadow');
    } else {
        header.classList.remove('header-shadow');
    }
}
window.addEventListener('scroll', toggleHeaderShadow);

// Kalkulator BMI

function hitungBMI(event){
    if (event) {
        event.preventDefault();
    }

    const age = document.getElementById('umur').value;
    const height = document.getElementById('tinggi').value / 100;
    const weight = document.getElementById('beratBadan').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;

    if (height <= 0 || isNaN(height)) {
        alert("Please enter a valid height.");
            return;
        }
    if (weight <= 0 || isNaN(weight)) {
        alert("Please enter a valid weight.");
        return;
        }

             
    const bmi = (weight / (height * height)).toFixed(1);
    document.getElementById('bmi-result').textContent = bmi;
    
    let status = '';
    if (bmi < 18.5) {
        status = 'Berat Badan kurang';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        status = 'Berat Badan Normal';
    } else if (bmi >= 25 && bmi < 29.9) {
        status = 'Berat Badan Lebih';
    } else {
        status = 'Obesitas';
    }

   
    const bmiStatusElement = document.getElementById('status');
    bmiStatusElement.textContent = `${status}`;

    if (bmi < 18.5) {
        bmiStatusElement.style.color = 'orange';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        bmiStatusElement.style.color = 'green';
    } else if (bmi >= 25 && bmi < 29.9) {
        bmiStatusElement.style.color = 'orange';
    } else {
        bmiStatusElement.style.color = 'red';
    }

    let massage = '';
    if (bmi < 18.5) {
        massage = 'Anda kekurangan berat badan';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        massage = 'Anda memiliki berat badan normal. Pertahankan!';
    } else if (bmi >= 25 && bmi < 29.9) {
        massage = 'Anda memiliki berat badan berlebih';
    } else {
        massage = 'Anda berada dalam kategori obesitas';
    }
    const Massage = document.getElementById('massage');
    Massage.textContent = `${massage}`
    
    let saran = '';
    if (bmi < 18.5) {
        saran = ['Hasil BMI < 18.5', 
                'Anda berada dalam kategori kekurangan berat badan. Hubungi dokter lebih lanjut mengenai pola makan dan gizi yang baik untuk meningkatkan kesehatan.'];
    } else if (bmi >= 18.5 && bmi < 24.9) {
        saran = 'Hasil BMI diantara 18.5 dan 22.9, Anda berada dalam kategori berat badan yang normal. Tetap pertahankan berat badan Anda dan jaga berat badan Anda dengan mengatur keseimbangan antara pola makan dan aktivitas fisik Anda.';
    } else if (bmi >= 25 && bmi < 29.9) {
        saran = 'Hasil BMI diantara 23 dan 25, Anda berada dalam kategori overweight atau berat badan berlebih. Cara terbaik untuk menurunkan berat badan adalah dengan mengatur kalor makanan yang dikonsumsi dan berolahraga. Jika BMI Anda berada dalam kategori ini maka Anda dianjurkan untuk menurunkan berat badan hingga batas normal.';
    } else {
        saran = 'Hasil BMI lebih dari 25, Anda berada dalam kategori obesitas. Usahakan untuk menurunkan berat badan dan menerapkan pola hidup sehat dengan menjaga makan dan aktivitas fisik. Segera kunjungi dokter untuk dilakukan pemeriksaan kesehatan lanjutan untuk mengetahui risiko yang Anda miliki terkait berat badan Anda.';
    }
    const Saran = document.getElementById('saran');
    Saran.textContent = `${saran}`

    const adviceList = document.getElementById('penyakit');
            adviceList.innerHTML = ''; 
            
            let adviceItems = [];
            
            if (bmi < 18.5) {
                adviceItems = [
                    'Konsultasikan dengan dokter atau ahli gizi untuk menambah berat badan.',
                    'Pertimbangkan untuk meningkatkan asupan kalori dan nutrisi.'
                ];
            } else if (bmi >= 18.5 && bmi < 24.9) {
                adviceItems = [
                    'Anda berada dalam rentang berat badan normal.',
                    'Teruskan pola makan sehat dan olahraga teratur.'
                ];
            } else if (bmi >= 25 && bmi < 29.9) {
                adviceItems = [
                    'Anda memiliki berat badan berlebih.',
                    'Pertimbangkan untuk melakukan perubahan diet dan meningkatkan aktivitas fisik.',
                    'Konsultasikan dengan ahli gizi untuk saran lebih lanjut.'
                ];
            } else {
                adviceItems = [
                    'Anda mengalami obesitas.',
                    'Segera konsultasikan dengan dokter atau ahli gizi.',
                    'Pertimbangkan program penurunan berat badan yang sehat dan terencana.'
                ];
            }
            adviceItems.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = item;
                adviceList.appendChild(listItem);
            });

// ini format pdf
    
    function reset() {

    document.getElementById('gender').value = 'male';
    document.getElementById('height').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('bmi-result').textContent = '0';
    document.getElementById('status').textContent = '';}

    document.getElementById('tombolregis').style.display = 'inline-block';
    document.getElementById('tombolkonsultasi').style.display = 'inline-block';
    document.getElementById('tomboldokter').style.display = 'inline-block';
    document.getElementById('buttononline').style.display = 'inline-block';
    document.getElementById('penyakit').style.display = 'inline-block';
    document.getElementById('downloadBtn').style.display = 'block';
    document.getElementById('downloadBtn').addEventListener('click', downloadPDF);

    const messageElement = document.getElementById('message');
    messageElement.textContent = `BMI tidak sepenuhnya mewakili diagnosis menyeluruh dari kesehatan tubuh dan resiko penyakit seseorang. Anda perlu konsultasi lebih lanjut mengenai resiko dan kekhawatiran Anda terkait dengan berat badan Anda.`;
    messageElement.style.display = 'block';


function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

  
    doc.setFontSize(18);
    doc.text("Kalkulator BMI", 105, 20, null, null, "center");

    doc.setFontSize(14);
    doc.text("Data Pengguna", 20, 40);

    const age = document.getElementById('umur').value;
    const weight = document.getElementById('beratBadan').value;
    const height = document.getElementById('tinggi').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;

    doc.setFontSize(12);
    doc.text(`Umur: ${age} tahun`, 20, 50);
    doc.text(`Jenis Kelamin: ${gender}`, 20, 60);
    doc.text(`Berat Badan: ${weight} kg`, 20, 70);
    doc.text(`Tinggi Badan: ${height} cm`, 20, 80);


    doc.setFontSize(14);
    doc.text("Hasil", 20, 100);


    const bmi = (weight / ((height / 100) * (height / 100)));
    let category = '';

    if (bmi < 18.5) {
        category = 'Kurus';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        category = 'Normal';
    } else if (bmi >= 25 && bmi < 29.9) {
        category = 'Berat badan lebih';
    } else {
        category = 'Obesitas';
    }

    doc.setFontSize(12);
    doc.text(`BMI: ${bmi}`, 20, 110);
    doc.text(`Kategori: ${category}`, 20, 120);


    doc.save('BMI_Result.pdf');
}
}




