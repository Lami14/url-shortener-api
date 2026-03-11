const form = document.getElementById("urlForm");
const result = document.getElementById("result");

form.addEventListener("submit", async (e) => {
e.preventDefault();

const longUrl = document.getElementById("longUrl").value;

const res = await fetch("/api/url/shorten", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({ longUrl })
});

const data = await res.json();

result.innerHTML = `Short URL: <a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a>`;
});
