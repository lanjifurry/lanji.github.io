// === 主题切换 ===
const themeToggle = document.getElementById("themeToggle");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const savedTheme = localStorage.getItem("theme");
document.documentElement.dataset.theme = savedTheme || (prefersDark ? "dark" : "light");

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.dataset.theme;
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("theme", next);
  themeToggle.textContent = next === "dark" ? "🌙" : "☀️";
});

// === 移动端导航 ===
const menuToggle = document.querySelector(".menu-toggle");
const navList = document.querySelector(".nav-list");
menuToggle.addEventListener("click", () => {
  navList.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", navList.classList.contains("open"));
});

// === 本地留言板 ===
const form = document.getElementById("guestbookForm");
const list = document.getElementById("guestbookList");
const STORAGE_KEY = "guestbookEntries";

function renderMessages() {
  const entries = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  list.innerHTML = "";
  entries.forEach(({ name, msg, time }) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${name}</strong> <small>${time}</small><br>${msg}`;
    list.appendChild(li);
  });
}
renderMessages();

form.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("gbName").value.trim();
  const msg = document.getElementById("gbMsg").value.trim();
  if (!name || !msg) return;

  const newMsg = { name, msg, time: new Date().toLocaleString() };
  const entries = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  entries.unshift(newMsg);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  form.reset();
  renderMessages();
});

// === 回到顶部按钮 ===
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) backToTop.classList.add("show");
  else backToTop.classList.remove("show");
});
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
