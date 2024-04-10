// Get modal element
const modal = document.getElementsByClassName('modal')[0];

// Get open modal element
const imgDiv = document.querySelector('.weather_icon');

// Get close modal element
const closeModal = document.getElementsByClassName('close_button')[0];

// Listen for open
imgDiv.addEventListener('click', openForecast);

// Listen for close
closeModal.addEventListener('click', closeForecast);
window.addEventListener('click', outsideClick);
window.addEventListener('resize', function() {
    if (this.window.innerWidth >= 700) {
        modal.style.display = "none";
    }
})
export function openForecast() {
    if (window.innerWidth <= 699)
    modal.style.display = "block";
}
export function closeForecast() {
    modal.style.display = "none";
}
export function outsideClick(e) {
    if (e.target == modal) modal.style.display = "none";
}