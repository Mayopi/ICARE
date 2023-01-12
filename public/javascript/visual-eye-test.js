const previousButton = document.querySelector("#previous-btn");
const nextButton = document.querySelector("#next-btn");
const nodelistGuidelinesItems = document.querySelectorAll(".guidelines-item");
const guidelinesItems = [];

for (item of nodelistGuidelinesItems) {
  guidelinesItems.push(item);
}

previousButton.addEventListener("click", () => {
  guidelinesItems.forEach((item) => {
    if (item.hidden == false) {
      const index = guidelinesItems.indexOf(item);
      item.hidden = true;
      const previousItem = guidelinesItems[index - 1 < 0 ? guidelinesItems.length - 1 : guidelinesItems - 1];
      previousItem.removeAttribute("hidden");
      console.log(previousItem);
    }
  });
});

nextButton.addEventListener("click", () => {
  guidelinesItems.forEach((item) => {
    if (item.hidden == false) {
      const index = guidelinesItems.indexOf(item);
      item.hidden = true;
      guidelinesItems[index + 1].hidden = false;
    }
  });
});
