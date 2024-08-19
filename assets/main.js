function vibrateDevice() {
    if (navigator.vibrate) {
        navigator.vibrate(500);
    }
}

function showToast(button, toastId, message) {
    const toast = document.getElementById(toastId);
    const rect = button.getBoundingClientRect();
    toast.style.top = `${rect.bottom + window.scrollY}px`;
    toast.style.left = `${rect.left + rect.width / 2}px`;
    toast.textContent = message;
    toast.className = "show";
    setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 5000); // Aumentado a 5000ms
}

function formatNumber(number) {
    // Reemplazar el punto por coma como separador decimal
    // y agregar punto como separador de miles
    const parts = number.toString().split('.');
    let integerPart = parts[0];
    const decimalPart = parts[1] || '00';

    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return `${integerPart},${decimalPart.padEnd(2, '0')}`;
}

document.getElementById("button1").addEventListener("click", function() {
    vibrateDevice();
    
    // Animación de movimiento de la pantalla
    document.body.style.transform = "translateX(-20%)";
    setTimeout(() => {
        document.body.style.transform = "translateX(20%)";
    }, 500);
    setTimeout(() => {
        document.body.style.transform = "translateX(0)";
    }, 1000);
    
    // Frases aleatorias
    const phrases = [
        "🎵 Yemba yemba, numa numa nei, numa numa numa nei 🎵",
        "🎵 Alvarín alvarín, alvarín te quiero, lo lo lo loroloró lo lo lo loroloró 🎵",
        "🎵 He visto una luz, hace tiempo Venús se apagooooó... 🎵"
    ];
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    showToast(this, "toast", randomPhrase);
});

// Botón 2: Vibrar y mostrar popup
document.getElementById("button2").addEventListener("click", function() {
    vibrateDevice();

    this.style.transition = "transform 1s";
    this.style.transform = "translateX(-50%) translateY(0) rotate(360deg)";
    setTimeout(() => {
        this.style.transform = "translateX(-50%) translateY(0) rotate(0deg)";
    }, 1000);

    // Mostrar popup
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('popup-overlay');
    const popupImage = document.getElementById('popup-image');
    
    // Seleccionar una imagen aleatoria
    const folder = 'assets/images/gifts/';
    const images = [
        folder + "pikachu.jpeg",
        folder + "blastoise.jpeg",
        folder + "charizard.jpg"
    ];
    popupImage.src = images[Math.floor(Math.random() * images.length)];

    popup.style.display = 'block';
    overlay.style.display = 'block';
});

// Cerrar popup
document.getElementById("popup-close").addEventListener("click", function() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('popup-overlay').style.display = 'none';
});

document.getElementById("popup-close-btn").addEventListener("click", function() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('popup-overlay').style.display = 'none';
});

// Cerrar popup al hacer clic fuera de él
document.getElementById("popup-overlay").addEventListener("click", function() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('popup-overlay').style.display = 'none';
});

// Botón 3: Vibrar, aumentar tamaño y lluvia de arroz
document.getElementById("button3").addEventListener("click", function() {
    vibrateDevice();
    this.style.transition = "transform 0.5s";
    this.style.transform = "translateX(0) translateY(-50%) scale(1.2)";
    setTimeout(() => {
        this.style.transform = "translateX(0) translateY(-50%) scale(1)";
    }, 500);
    showToast(this, "toast3", "Rice for Lowis 🍲");

    // Crear lluvia de arroz
    const rainContainer = document.getElementById('rain');
    rainContainer.innerHTML = ''; // Limpiar lluvia anterior

    for (let i = 0; i < 200; i++) { // Número de gotas
        const drop = document.createElement('div');
        drop.className = 'drop';
        drop.style.left = `${Math.random() * 100}dvw`; // Posición horizontal aleatoria
        drop.style.top = `${(Math.random() * 100) - 50}dvh`; // Posición vertical inicial
        rainContainer.appendChild(drop);

        // Animación de caída
        setTimeout(() => {
            drop.style.transition = 'top 2s linear';
            drop.style.top = '150dvh'; // Caer hasta la parte inferior
        }, 30);

        // Eliminar gotas después de la animación
        setTimeout(() => {
            drop.remove();
        }, 2000);
    }
});

// Botón 4: Animación de tres monedas y toast con timestamp
document.getElementById("button4").addEventListener("click", function() {
    vibrateDevice();

    for (let i = 0; i < 3; i++) {
        const coin = document.createElement("div");
        coin.className = "coin";
        coin.innerHTML = "&#x1F4B0;"; // Emoji de moneda
        this.appendChild(coin);

        // Animación ligeramente escalonada para cada moneda
        setTimeout(() => {
            coin.style.transition = "transform 1s ease, opacity 0.5s ease";
            coin.style.opacity = 1;
            coin.style.transform = `translate(-50%, -${380 + i * 20}%)`; // Subir un 380% más cada vez
            setTimeout(() => {
                coin.style.transform = "translate(-50%, -50%)"; // Bajar de vuelta al botón
                setTimeout(() => {
                    coin.style.opacity = 0;
                    coin.remove();
                }, 500);
            }, 500);
        }, i * 150); // Retraso de 150ms entre cada moneda
    }

    // Obtener timestamp en formato reducido (número de segundos desde el epoch dividido por 100 y ajustado por el valor 17239067)
    const timestamp = ((Math.floor(Date.now() / 1000) / 100) - 17239067).toFixed(2);
    // Aplicar formato numérico con comas como separador decimal y punto como separador de miles
    showToast(this, "toast4", `Gracias por tu aportación, ya tenemos ${formatNumber(timestamp)}€`);
});
