document.addEventListener("DOMContentLoaded", function() {
    const toggleModeBtn = document.getElementById('toggleModeBtn');
    toggleModeBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');
        if (document.body.classList.contains('dark-mode')) {
            toggleModeBtn.textContent = 'Toggle Light Mode';
        } else {
            toggleModeBtn.textContent = 'Toggle Dark Mode';
        }
    });
});
