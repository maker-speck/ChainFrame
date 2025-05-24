
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
