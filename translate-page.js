// script.js

const apiKey = 'YOUR_GOOGLE_TRANSLATE_API_KEY'; // Replace with your Google Translate API key

document.getElementById('language-select').addEventListener('change', function() {
    const selectedLanguage = this.value;
    translatePage(selectedLanguage);
});

translatePage('en');

function translatePage(targetLanguage) {
    const elements = document.querySelectorAll('#content *');
    elements.forEach(element => {
        if (element.innerText.trim() !== '') {
            translateText(element, element.innerText, targetLanguage);
        }
    });
}

function translateText(element, text, targetLanguage) {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
    const data = {
        q: text,
        target: targetLanguage,
        format: 'text'
    };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        element.innerText = data.data.translations[0].translatedText;
    })
    .catch(error => console.error('Error:', error));
}