const copyToClipboardDefaultText = {
  innerText: "Copy",
  ariaLabel: "Copy to clipboard",
};
const copyToClipboardSuccessText = {
  innerText: "Copied!",
  ariaLabel: "Copied to clipboard",
};

// Get all pre. But ignore line numbers section
document.querySelectorAll("div.highlight pre").forEach((snippet) => {
  // create div.codecopy
  const wrapper = document.createElement("div");
  wrapper.classList.add("codecopy");

  // Wrap code inside div.codecopy
  const parent = snippet.parentNode;
  parent.replaceChild(wrapper, snippet);
  wrapper.appendChild(snippet);

  // Create button
  const button = `
            <button
                class="codecopy-btn"
                title=${copyToClipboardDefaultText.ariaLabel}
                aria-label=${copyToClipboardDefaultText.ariaLabel}
            >${copyToClipboardDefaultText.innerText}
            </button>`;

  // Add button to div.codecopy
  wrapper.insertAdjacentHTML("afterbegin", button);
});

// Add copy to clipboard functionality
const clipboard = new ClipboardJS(".codecopy-btn", {
  target: (trigger) => {
    return trigger.parentNode;
  },
});

// Show message on success
clipboard.on("success", (e) => {
  e.trigger.innerText = copyToClipboardSuccessText.innerText;
  e.trigger.setAttribute("aria-label", copyToClipboardSuccessText.ariaLabel);
  e.clearSelection();

  // Reset button text
  setTimeout(() => {
    e.trigger.innerText = copyToClipboardDefaultText.innerText;
    e.trigger.setAttribute("aria-label", copyToClipboardDefaultText.ariaLabel);
  }, 400);
});
