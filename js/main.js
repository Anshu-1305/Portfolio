// Loader
window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

// Scroll reveal
const sections = document.querySelectorAll("section");
const revealOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
sections.forEach(section => {
  revealOnScroll.observe(section);
});

// GitHub Projects
async function fetchGitHubRepos() {
  const username = "Anshu-1305";
  const container = document.getElementById("github-projects");

  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos`);
    const repos = await res.json();

    repos.forEach(repo => {
      const card = document.createElement("div");
      card.className = "project-card";
      card.innerHTML = `
        <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
        <p>${repo.description || "No description available."}</p>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = "<p>Couldn't load projects. Try again later.</p>";
  }
}
document.addEventListener("DOMContentLoaded", fetchGitHubRepos);

// Dark Mode
const toggle = document.getElementById("darkToggle");
toggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
});
