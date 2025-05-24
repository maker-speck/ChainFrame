
document.addEventListener("DOMContentLoaded", () => {
  const dropZone = document.querySelector("#drop-zone");
  const input = document.querySelector("#image-input");

  if (dropZone && input) {
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
      dropZone.querySelector("p").innerText = files[0].name;
    });

    input.addEventListener("change", () => {
      dropZone.querySelector("p").innerText = input.files[0].name;
    });
  }
});
