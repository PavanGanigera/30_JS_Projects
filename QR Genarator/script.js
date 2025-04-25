const imgBox = document.getElementById("imgBox");
const QrText = document.getElementById("QrText");
const genQR = document.getElementById("genQR");

genQR.addEventListener("click", async () => {
    let text = QrText.value.trim();
    const maxLength = 200;

    if (!text) {
        alert("Please enter some text or a link.");
        return;
    }
    if (text.length > maxLength) {
        alert(`Text too long—please keep under ${maxLength} characters.`);
        return;
    }

    imgBox.textContent = "Loading…";

    try {
        const response = await fetch(
            `https://api.api-ninjas.com/v1/qrcode?data=${encodeURIComponent(text)}`,
            {
                headers: { "X-Api-Key": "B/CyRcg/N3HieMmYsnNO/Q==ixjLvyqVhR4C2OMz" }
            }
        );

        if (!response.ok) {
            const errMsg = await response.text();
            throw new Error(`API error ${response.status}: ${errMsg}`);
        }
        console.log(response);

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        console.log(url, blob);
        imgBox.innerHTML = `<img src="${url}" alt="QR Code" class="" />`;
        console.log(url);
    } catch (err) {
        console.error(err);
        imgBox.innerHTML = `<p class="text-red-500">${err.message}</p>`;
    }
});