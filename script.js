function generateMeme(img, topText, bottomText, topTextSize, bottomTextSize) {
    const canvas = document.getElementById('meme-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.textAlign = 'center';

    let fontSize = canvas.width * topTextSize;
    ctx.font = `${fontSize}px Impact`;
    ctx.lineWidth = fontSize / 20;

    ctx.textBaseline = 'top';
    topText.split('\n').forEach((t, i) => {
        ctx.fillText(t, canvas.width / 2, i * fontSize, canvas.width);
        ctx.strokeText(t, canvas.width / 2, i * fontSize, canvas.width);
    });

    fontSize = canvas.width * bottomTextSize;
    ctx.font = `${fontSize}px Impact`;
    ctx.lineWidth = fontSize / 20;

    ctx.textBaseline = 'bottom';
    bottomText.split('\n').reverse().forEach((t, i) => { // .reverse() because it's drawing the bottom text from the bottom up
        ctx.fillText(t, canvas.width / 2, canvas.height - i * fontSize, canvas.width);
        ctx.strokeText(t, canvas.width / 2, canvas.height - i * fontSize, canvas.width);
    });
}

window.addEventListener('DOMContentLoaded', (event) => {
    const topTextInput = document.getElementById('top-text');
    const bottomTextInput = document.getElementById('bottom-text');
    const topTextSizeInput = document.getElementById('top-text-size-input');
    const bottomTextSizeInput = document.getElementById('bottom-text-size-input');
    const imageInput = document.getElementById('image-input');
    const generateBtn = document.getElementById('generate-btn');

    generateBtn.addEventListener('click', () => {
        // Read image as DataURL using the FileReader API
        const reader = new FileReader();
        reader.onload = () => {
            const img = new Image;
            img.src = reader.result;
            img.onload = () => {
                generateMeme(img, topTextInput.value, bottomTextInput.value,topTextSizeInput.value, bottomTextSizeInput.value);
            };
        };
        reader.readAsDataURL(imageInput.files[0]);
    });
});

const links = {
  "/schedule": 'https://www.notion.so/440f7327a62a48ceb15c22fc1c445483?v=63d1c6fb62004b3d904654f4b9991287',
  "/guide": "https://www.notion.so/TuffyHacks-Camper-Guide-b6d48f4c0ccb40d0b3a32aef02cc51eb",
  "/activities": "https://www.notion.so/Activities-4eefbfa9c8d442e489ad5ab6830abcdd",
  "/trails": "https://www.notion.so/Trails-5aead207c2f84387969b8b2ff5049d90",
  "/submissions": "https://www.notion.so/Project-Submission-Judging-6dadfbbc335c468ea08bbf4f8200ad8f",
  "/mentors": "https://www.notion.so/Mentors-72e2a7e1685e4e83bac43f6f579f5cce",
  "/classroom-a": "https://fullerton.zoom.us/j/85266867630",
  "/classroom-b": "https://fullerton.zoom.us/j/84576634429"
};

module.exports = {
  redirects: async () => Object.entries(links).map(([source, destination]) => ({ source, destination, permanent: true }))
};