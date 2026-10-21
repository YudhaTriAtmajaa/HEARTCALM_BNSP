// menu burger untuk layar kecil
const menu = document.getElementById('menu');
document.getElementById('burger').onclick = () => menu.classList.toggle('buka');

// scroll halus ke section, dikurangi tinggi navbar
const nav = document.getElementById('nav');
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.onclick = e => {
    const tujuan = document.querySelector(a.getAttribute('href'));
    if (!tujuan) return;
    e.preventDefault();
    const y = tujuan.getBoundingClientRect().top + window.scrollY - nav.offsetHeight;
    window.scrollTo({ top: y, behavior: 'smooth' });
    menu.classList.remove('buka');
  };
});

// accordion bahan lain untuk membuka/tutup konten
const accBtn = document.getElementById('accBtn');
const accIsi = document.getElementById('accIsi');
accBtn.onclick = () => {
  const buka = accIsi.hidden;
  accIsi.hidden = !buka;
  accBtn.setAttribute('aria-expanded', buka);
  accBtn.querySelector('span').textContent = buka ? '−' : '+';
};

// slider permasalahan kulit
const track = document.getElementById('track');
const total = track.children.length;
let posisi = 0;
let timer;

function geser(n) {
  posisi = (n + total) % total;
  track.style.transform = 'translateX(-' + posisi * 100 + '%)';
}
function jalankanOtomatis() {
  clearInterval(timer);
  timer = setInterval(() => geser(posisi + 1), 4000);
}
document.getElementById('kiri').onclick = () => { geser(posisi - 1); jalankanOtomatis(); };
document.getElementById('kanan').onclick = () => { geser(posisi + 1); jalankanOtomatis(); };
jalankanOtomatis();

// newsletter: cek format email, kalau benar munculkan modal
const form = document.getElementById('form');
const email = document.getElementById('email');
const salah = document.getElementById('salah');
const modal = document.getElementById('modal');

form.onsubmit = e => {
  e.preventDefault();
  const benar = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim());
  email.classList.toggle('salah', !benar);
  salah.hidden = benar;
  if (benar) {
    modal.hidden = false;
    form.reset();
  }
};
document.getElementById('tutup').onclick = () => modal.hidden = true;
modal.onclick = e => { if (e.target === modal) modal.hidden = true; };
