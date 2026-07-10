// HACH Blog — progress bar / auto TOC / share
(function () {
  var body = document.querySelector(".post-body");

  // Reading progress (post pages only)
  var bar = document.querySelector(".progress");
  if (bar && body) {
    var onScroll = function () {
      var total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Auto TOC from h2
  var tocBox = document.querySelector(".toc");
  if (tocBox && body) {
    var heads = body.querySelectorAll("h2");
    if (heads.length >= 2) {
      var ol = document.createElement("ol");
      heads.forEach(function (h, i) {
        if (!h.id) h.id = "sec-" + (i + 1);
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = "#" + h.id;
        a.textContent = h.textContent;
        li.appendChild(a);
        ol.appendChild(li);
      });
      tocBox.appendChild(ol);
    } else {
      tocBox.remove();
    }
  }

  // Copy link
  var copyBtn = document.querySelector("[data-copy-link]");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      navigator.clipboard.writeText(location.href).then(function () {
        var t = copyBtn.textContent;
        copyBtn.textContent = "コピーしました ✓";
        setTimeout(function () { copyBtn.textContent = t; }, 1800);
      });
    });
  }
})();
