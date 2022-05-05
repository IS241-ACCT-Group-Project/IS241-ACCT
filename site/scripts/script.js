const labels = document.querySelectorAll('.form-control label')

labels.forEach(label => {
    label.innerHTML = label.innerText
        .split('')
        .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
        .join('')
})

const toggles = document.querySelectorAll('.faq-toggle')

toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        toggle.parentNode.classList.toggle('active')
    })
})

var open;
var close;

if (open = document.getElementById('open')) {
    open.addEventListener('click', () => container.classList.add('show-nav'));
}
if (close = document.getElementById('close')) {
    close.addEventListener('click', () => container.classList.remove('show-nav'));
}
const container = document.querySelector('.rotate-container')