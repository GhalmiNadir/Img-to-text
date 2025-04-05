let extractedText = ""; // تخزين النص المُستخرج

function convertImageToText() {
    const imageInput = document.getElementById('imageInput');
    const outputText = document.getElementById('outputText');
    const languageSelect = document.getElementById('languageSelect');
    const selectedLanguage = languageSelect.value;
    const downloadButton = document.getElementById('downloadButton');

    if (imageInput.files.length === 0) {
        alert("من فضلك اختر صورة أولاً!");
        return;
    }

    const image = imageInput.files[0];
    
    // تغيير النص إلى "جاري التحويل..."
    outputText.textContent = "جاري التحويل...";
    outputText.classList.add('loading');
    downloadButton.style.display = 'none'; // إخفاء زر التحميل مؤقتًا

    Tesseract.recognize(
        image,
        selectedLanguage, // استخدام اللغة المختارة
        {
            logger: (m) => console.log(m) // يمكنك مراقبة عملية التحويل عبر هذه السطور
        }
    ).then(({ data: { text } }) => {
        extractedText = text; // تخزين النص المُستخرج
        outputText.textContent = text;
        outputText.classList.remove('loading');
        downloadButton.style.display = 'block'; // إظهار زر التحميل
    }).catch(err => {
        console.error(err);
        alert("حدث خطأ أثناء التحويل.");
        outputText.classList.remove('loading');
    });
}

function downloadText() {
    const blob = new Blob([extractedText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'extracted_text.txt'; // اسم الملف النصي
    link.click();
}