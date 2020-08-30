window.onload = function() {
    const messages = document.querySelector('.messages-container');
    const snap = document.querySelector('.snap');
    if (snap)
        messages.scrollTop = snap.scrollHeight;
    else
        messages.scrollTop = messages.scrollHeight;
}