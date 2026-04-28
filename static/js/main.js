function copyCode(btn) {
  var code = btn.closest('pre').querySelector('code').innerText;
  navigator.clipboard.writeText(code).then(function () {
    btn.classList.add('copied');
    setTimeout(function () { btn.classList.remove('copied'); }, 2000);
  });
}
