document.querySelector('.boton-clicker').addEventListener('click', (e) => {
    const clickImage = document.createElement('img');
    const randomNum = Math.floor(Math.random() * 4) + 1; // Assuming you have 4 images
    clickImage.src = `/src/assets/clicks/click${randomNum}.png`;
    clickImage.className = 'click-image';
    
    // Position the image at click coordinates
    clickImage.style.left = `${e.clientX}px`;
    clickImage.style.top = `${e.clientY}px`;
    
    document.body.appendChild(clickImage);
    
    // Remove the element after animation
    clickImage.addEventListener('animationend', () => {
        clickImage.remove();
    });
});
