
document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("#image-input");
  const dropZone = document.querySelector("#drop-zone");
  const preview = document.querySelector("#preview");
  const walletBtn = document.querySelector("#connect-wallet");

  // Wallet modal
  if (walletBtn) {
    walletBtn.addEventListener("click", () => {
      const modal = document.createElement("div");
      modal.style.position = "fixed";
      modal.style.top = 0;
      modal.style.left = 0;
      modal.style.width = "100%";
      modal.style.height = "100%";
      modal.style.background = "rgba(0, 0, 0, 0.8)";
      modal.style.display = "flex";
      modal.style.justifyContent = "center";
      modal.style.alignItems = "center";
      modal.innerHTML = `
        <div style="background:#111;padding:40px;border-radius:12px;text-align:center;">
          <h3 style="margin-bottom:20px;">Connect Wallet</h3>
          <button style="margin:8px;padding:10px 20px;border-radius:9999px;background:#fff;color:#000;">Phantom</button>
          <button style="margin:8px;padding:10px 20px;border-radius:9999px;background:#fff;color:#000;">Backpack</button>
          <div style="margin-top:20px;color:#aaa;cursor:pointer;" id="close-wallet">Cancel</div>
        </div>
      `;
      document.body.appendChild(modal);
      document.getElementById("close-wallet").onclick = () => modal.remove();
    });
  }

  // Drag-and-drop and preview
  if (dropZone && input && preview) {
    dropZone.addEventListener("click", () => input.click());

    dropZone.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropZone.style.borderColor = "#fff";
    });

    dropZone.addEventListener("dragleave", () => {
      dropZone.style.borderColor = "#444";
    });

    dropZone.addEventListener("drop", (e) => {
      e.preventDefault();
      dropZone.style.borderColor = "#444";
      const file = e.dataTransfer.files[0];
      input.files = e.dataTransfer.files;
      showPreview(file);
    });

    input.addEventListener("change", () => {
      const file = input.files[0];
      showPreview(file);
    });

    function showPreview(file) {
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          preview.src = reader.result;
          preview.style.display = "block";
        };
        reader.readAsDataURL(file);
      }
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".card-wrapper");
      const img = card.querySelector("img");
      const modal = document.createElement("div");
      modal.style.position = "fixed";
      modal.style.top = "0";
      modal.style.left = "0";
      modal.style.width = "100%";
      modal.style.height = "100%";
      modal.style.background = "rgba(0,0,0,0.85)";
      modal.style.display = "flex";
      modal.style.justifyContent = "center";
      modal.style.alignItems = "center";
      modal.style.zIndex = "1000";
      modal.innerHTML = `
        <div style="background:#111;padding:40px;border-radius:16px;text-align:center;max-width:400px;width:100%;">
          <h3 style="color:white;margin-bottom:16px;">Edit Image</h3>
          <input type="file" id="edit-image" accept="image/*" style="margin-bottom:20px;"/>
          <input type="text" id="caption-input" placeholder="New caption..." style="width:100%;padding:10px;margin-bottom:20px;background:#000;color:#fff;border:1px solid #333;border-radius:8px;" />
          <button id="save-edit" style="padding:10px 20px;border-radius:9999px;background:white;color:black;">Save</button>
          <div id="cancel-edit" style="margin-top:20px;color:#aaa;cursor:pointer;">Cancel</div>
        </div>
      `;
      document.body.appendChild(modal);

      // Handle file change
      document.getElementById("edit-image").addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = () => {
            img.src = reader.result;
          };
          reader.readAsDataURL(file);
        }
      });

      document.getElementById("cancel-edit").onclick = () => modal.remove();
      document.getElementById("save-edit").onclick = () => modal.remove();
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const cardSection = document.querySelector(".grid-board");

  function saveBoardToLocalStorage() {
    const images = [...document.querySelectorAll(".card-wrapper img")].map(img => img.src);
    localStorage.setItem("chainframe_board", JSON.stringify(images));
  }

  function loadBoardFromLocalStorage() {
    const saved = JSON.parse(localStorage.getItem("chainframe_board") || "[]");
    if (saved.length && cardSection) {
      cardSection.innerHTML = "";
      saved.forEach(src => {
        const wrapper = document.createElement("div");
        wrapper.className = "card-wrapper";
        wrapper.innerHTML = `
          <div class="card-controls">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
          </div>
          <img src="${src}" style="width:100%;height:100%;object-fit:cover;">
        `;
        cardSection.appendChild(wrapper);
      });
    }
  }

  loadBoardFromLocalStorage();

  // Deletion
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const card = e.target.closest(".card-wrapper");
      card.remove();
      saveBoardToLocalStorage();
    }
  });

  // Editing
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-btn")) {
      const card = e.target.closest(".card-wrapper");
      const img = card.querySelector("img");

      const modal = document.createElement("div");
      modal.style.position = "fixed";
      modal.style.top = "0";
      modal.style.left = "0";
      modal.style.width = "100%";
      modal.style.height = "100%";
      modal.style.background = "rgba(0,0,0,0.85)";
      modal.style.display = "flex";
      modal.style.justifyContent = "center";
      modal.style.alignItems = "center";
      modal.style.zIndex = "1000";
      modal.innerHTML = `
        <div style="background:#111;padding:40px;border-radius:16px;text-align:center;max-width:400px;width:100%;">
          <h3 style="color:white;margin-bottom:16px;">Edit Image</h3>
          <input type="file" id="edit-image" accept="image/*" style="margin-bottom:20px;" />
          <button id="save-edit" style="padding:10px 20px;border-radius:9999px;background:white;color:black;">Save</button>
          <div id="cancel-edit" style="margin-top:20px;color:#aaa;cursor:pointer;">Cancel</div>
        </div>
      `;
      document.body.appendChild(modal);

      document.getElementById("cancel-edit").onclick = () => modal.remove();
      document.getElementById("edit-image").addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = () => {
            img.src = reader.result;
            saveBoardToLocalStorage();
          };
          reader.readAsDataURL(file);
        }
      });
      document.getElementById("save-edit").onclick = () => modal.remove();
    }
  });
});

window.addEventListener("load", () => {
  const cards = document.querySelectorAll(".card-wrapper");
  cards.forEach((card, i) => {
    setTimeout(() => {
      card.classList.add("visible");
    }, i * 100);
  });
});
