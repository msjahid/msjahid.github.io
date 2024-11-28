document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('.toggle-button');

    toggleButtons.forEach(button => {
        const codeBlock = button.parentElement.querySelector('pre'); // Find the <pre> element

        // Set the initial button text based on the visibility of the code block
        if (codeBlock.style.display === 'none' || window.getComputedStyle(codeBlock).display === 'none') {
            button.textContent = 'Show';
        } else {
            button.textContent = 'Hide';
        }

        // Add click event listener for toggling visibility
        button.addEventListener('click', () => {
            if (codeBlock.style.display === 'none') {
                codeBlock.style.display = 'block';
                button.textContent = 'Hide';
            } else {
                codeBlock.style.display = 'none';
                button.textContent = 'Show';
            }
        });
    });
});

function toggleCode(button) {
    const preElement = button.parentElement.querySelector('pre'); // Find the <pre> element

    if (preElement.style.display === 'none' || window.getComputedStyle(preElement).display === 'none') {
        // Show the code block
        preElement.style.display = 'block';
        button.textContent = 'Hide';
    } else {
        // Hide the code block
        preElement.style.display = 'none';
        button.textContent = 'Show';
    }
}

function copyToClipboard(button) {
    const codeBlock = button.parentElement.querySelector('pre code'); // Get the code inside the code block
    const text = codeBlock.textContent || codeBlock.innerText;

    // Copy the text to the clipboard
    navigator.clipboard.writeText(text).then(() => {
        // Temporary visual feedback
        button.textContent = 'Copied!';
        setTimeout(() => {
            button.textContent = 'Copy';
        }, 2000); // Reset button text after 2 seconds
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

