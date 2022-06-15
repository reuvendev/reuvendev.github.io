const input = document.getElementById('input_msg');
const button = document.getElementById('button');
const input_div = document.getElementById('input_div');
const output_div = document.getElementById('output_div');
const link_output = document.getElementById('link-output');

button.addEventListener('click', () => {
    encrytp();
})

input.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        encrytp();
    }
})

function encrytp() {

    if (input.value !== "") {
        link_output.value = btoa(input.value);
        output_div.style.display = "block";
        input_div.style.display = "none";
        link_output.value = `${window.location.href}#${btoa(input.value)}`;

        const copy_btn = document.getElementById('copy');
        copy_btn.addEventListener('click', () => {
            navigator.clipboard.writeText(link_output.value);
            copy_btn.style.backgroundColor = "#95b8f0";
            copy_btn.innerText = 'copied';
        })

    } else {
        output_div.style.display = "none";
    }
}

const output_msg = document.getElementById('output_msg');
const msg = document.getElementById('msg');
const { hash } = window.location;
console.log(atob(hash.replace('#', '')));
if (hash) {
    msg.innerHTML = '"' + atob(hash.replace('#', '')) + '"';
    output_div.style.display = "none";
    input_div.style.display = "none";
    output_msg.style.display = "block";
}
