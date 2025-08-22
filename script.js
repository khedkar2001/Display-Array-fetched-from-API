const op = document.getElementById("output");
const btn = document.getElementById("startBtn");

btn.addEventListener("click", () => {
  op.innerHTML = '<p class="loading">⏳ Fetching data...</p>'; 
  PromiseAPI1()
    .then(() => PromiseAPI2())
    .then(() => PromiseAPI3())
    .then(() => {
      document.querySelector(".loading")?.remove();
      op.innerHTML += `<p class="success">✅ All data loaded successfully!</p>`;
    })
    .catch((e) => {
      op.innerHTML = `<p class="error">❌ Error: ${e}</p>`;
    });
});

// Helper renderer
function renderSection(title, items, formatter) {
  op.innerHTML += `<h3>${title}</h3><div class="card-container"></div>`;
  const container = op.querySelector(".card-container:last-child");
  items.forEach((element) => {
    container.innerHTML += `
      <div class="card">
        ${formatter(element)}
      </div>
    `;
  });
}

function PromiseAPI1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("https://dummyjson.com/posts")
        .then((res) => res.json())
        .then((data) => {
          renderSection("📝 Posts", data.posts, (el) => `<p>${el.title}</p>`);
          resolve();
        })
        .catch((e) => reject("API 1 failed: " + e));
    }, 1000);
  });
}

function PromiseAPI2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("https://dummyjson.com/products")
        .then((res) => res.json())
        .then((data) => {
          renderSection("📦 Products", data.products, (el) => `
            <p><strong>${el.title}</strong></p>
            <p>💲 $${el.price}</p>
          `);
          resolve();
        })
        .catch((e) => reject("API 2 failed: " + e));
    }, 2000);
  });
}

function PromiseAPI3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("https://dummyjson.com/todos")
        .then((res) => res.json())
        .then((data) => {
          renderSection("✅ Todos", data.todos, (el) => `
            <p>${el.todo}</p>
            <p>Status: ${el.completed ? "✔️ Done" : "❌ Pending"}</p>
          `);
          resolve();
        })
        .catch((e) => reject("API 3 failed: " + e));
    }, 3000);
  });
}
