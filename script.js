let extractedText = "";

function convertImageToText() {
  const imageInput = document.getElementById('imageInput');
  const outputText = document.getElementById('outputText');
  const downloadButton = document.getElementById('downloadButton');

  if (imageInput.files.length === 0) {
    alert("من فضلك اختر صورة أولاً!");
    return;
  }

  const image = imageInput.files[0];
  outputText.textContent = "جاري التحويل...";
  outputText.classList.add('loading');
  downloadButton.style.display = 'none';

  Tesseract.recognize(
    image,
    'ara+eng', // يمكن تعديلها حسب اللغة الأكثر احتمالًا في الصور
    {
      logger: m => console.log(m)
    }
  ).then(({ data: { text } }) => {
    extractedText = text;
    outputText.textContent = text;
    outputText.classList.remove('loading');
    downloadButton.style.display = 'block';
  }).catch(err => {
    console.error(err);
    outputText.textContent = "حدث خطأ أثناء التحويل.";
    outputText.classList.remove('loading');
  });
}

function downloadText() {
  const blob = new Blob([extractedText], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'extracted_text.txt';
  link.click();
}
