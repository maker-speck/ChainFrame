
document.addEventListener("DOMContentLoaded", () => {
  const walletBtn = document.querySelector("button");
  const body = document.body;

  // Wallet Modal
  if (walletBtn) {
    walletBtn.addEventListener("click", () => {
      const modal = document.createElement("div");
      modal.innerHTML = `
        <div style="position:fixed;top:0;left:0;width:100%;height:100%;
          background:rgba(0,0,0,0.8);display:flex;justify-content:center;
          align-items:center;z-index:1000;">
          <div style="background:#111;padding:40px;border-radius:12px;
            text-align:center;max-width:300px;">
            <h3 style="margin-bottom:20px;">Connect Wallet</h3>
            <button style="margin:8px;padding:10px 20px;border-radius:9999px;
              border:none;background:#fff;color:#000;">Phantom</button>
            <button style="margin:8px;padding:10px 20px;border-radius:9999px;
              border:none;background:#fff;color:#000;">Backpack</button>
            <div style="margin-top:20px;color:#aaa;cursor:pointer;" id="close-wallet">Cancel</div>
          </div>
        </div>
      `;
      body.appendChild(modal);
      document.getElementById("close-wallet").addEventListener("click", () => modal.remove());
    });
  }

  // Upload drag & preview
  const dropZone = document.querySelector("#drop-zone");
  const input = document.querySelector("#image-input");
  const preview = document.querySelector("#preview");

  if (dropZone && input && preview) {
    dropZone.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropZone.classList.add("dragging");
    });

    dropZone.addEventListener("dragleave", () => {
      dropZone.classList.remove("dragging");
    });

    dropZone.addEventListener("drop", (e) => {
      e.preventDefault();
      dropZone.classList.remove("dragging");
      const files = e.dataTransfer.files;
      input.files = files;
      showPreview(files[0]);
    });

    input.addEventListener("change", () => {
      showPreview(input.files[0]);
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

  // Fake image interactions
  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("mouseover", () => {
      card.style.outline = "2px solid white";
    });
    card.addEventListener("mouseout", () => {
      card.style.outline = "none";
    });
  });
});
