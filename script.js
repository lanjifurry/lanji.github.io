// 暗/亮主题切换
const themeBtn = document.getElementById('themeToggle');
themeBtn.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  document.documentElement.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
});

// 响应式导航
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');
menuToggle.addEventListener('click', () => navList.classList.toggle('show'));

// 本地留言板
const form = document.getElementById('guestbookForm');
const gbList = document.getElementById('guestbookList');
const messages = JSON.parse(localStorage.getItem('messages') || '[]');

function renderMessages() {
  gbList.innerHTML = '';
  messages.forEach(m => {
    const li = document.createElement('li');
    li.textContent = `${m.name}: ${m.msg}`;
    gbList.appendChild(li);
  });
}
renderMessages();

form.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('gbName').value.trim();
  const msg = document.getElementById('gbMsg').value.trim();
  if(name && msg){
    messages.push({name,msg});
    localStorage.setItem('messages', JSON.stringify(messages));
    renderMessages();
    form.reset();
  }
});

// 回到顶部按钮
const backBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backBtn.style.display = window.scrollY > 200 ? 'block' : 'none';
});
backBtn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
