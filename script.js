(function () {
  'use strict';
  var WA = '919463649049';

  /* Products. Put each photo in images/products/ using the file name below (4:3, about 1200 x 900). */
  var PRODUCTS = [
    { n: '2 Door Steel Almirah', c: 'Steel Furniture', d: 'A practical two door steel almirah for everyday storage.', i: '2-door-steel-almirah.png' },
    { n: '3 Door Steel Almirah', c: 'Steel Furniture', d: 'A three door steel almirah with more storage space.', i: '3-door-steel-almirah.png' },
    { n: 'Mirror Almirah', c: 'Steel Furniture', d: 'Steel almirah with a mirror, suitable for bedrooms.', i: 'mirror-almirah.png' },
    { n: 'Office Almirah', c: 'Steel Furniture', d: 'Steel almirah for files, records and office storage.', i: 'office-almirah.png' },
    { n: 'Locker Almirah', c: 'Steel Furniture', d: 'Steel almirah with locker storage for valuables and documents.', i: 'locker-almirah.png' },
    { n: 'Custom Steel Almirah', c: 'Steel Furniture', d: 'Made to your requirement. Tell us what you need.', i: 'custom-almirah.png', custom: true },
    { n: 'Desert Cooler', c: 'Air Coolers', d: 'Air cooler for larger rooms and hot, dry weather.', i: 'desert-cooler.png' },
    { n: 'Personal Cooler', c: 'Air Coolers', d: 'Compact air cooler for personal and small-room use.', i: 'personal-cooler.png' },
    { n: 'Tower Cooler', c: 'Air Coolers', d: 'Slim tower air cooler that saves floor space.', i: 'tower-cooler.png' },
  
  ];
  var PRODUCT_DIR = 'images/products/';

  /* Gallery. Add photos as images/gallery/photo-1.jpg to photo-8.jpg, or edit this list. Missing files are hidden. */
  var GAL = [];
  for (var g = 1; g <= 8; g++) GAL.push(['images/gallery/photo-' + g + '.jpg', 'Saggu Steel Furniture photo ' + g]);

  var $ = function (id) { return document.getElementById(id); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* Photo helper: if an image file is missing, show a plain "photo to be added" panel instead of a broken icon */
  function watch(img, onBad) {
    function bad() {
      var h = img.closest('.ph');
      if (h) h.classList.add('nophoto');
      if (onBad) onBad();
    }
    img.addEventListener('error', bad);
    if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) bad();
  }
  document.querySelectorAll('.ph img').forEach(function (i) { watch(i); });
  var logo = document.querySelector('.logo-mark img');
  if (logo) watch(logo, function () { logo.closest('.logo-mark').hidden = true; });

  $('yr').textContent = new Date().getFullYear();

  function waLink(t) { return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(t); }
  function enq(p) {
    return p.custom
      ? 'Hello Saggu Steel Furniture, I would like to enquire about a custom steel almirah. Please contact me to discuss the available options and quotation.'
      : 'Hello Saggu Steel Furniture, I am interested in your ' + p.n + '. Please share the available options, specifications, and price.';
  }

  /* Products */
  var st = { cat: 'all', q: '' };
  function render() {
    var q = st.q.trim().toLowerCase();
    var list = PRODUCTS.filter(function (p) { return (st.cat === 'all' || p.c === st.cat) && (!q || p.n.toLowerCase().indexOf(q) > -1); });
    $('grid').innerHTML = list.map(function (p, i) {
      return '<article class="pc" style="animation-delay:' + i * 40 + 'ms">' +
        '<div class="ph" data-label="' + esc(p.n) + '"><img src="' + PRODUCT_DIR + p.i + '" alt="' + esc(p.n) + '" loading="lazy" width="1200" height="900"></div>' +
        '<div class="bd"><span class="cat">' + esc(p.c) + '</span><h3>' + esc(p.n) + '</h3><p>' + esc(p.d) + '</p><span class="pr">Price on request</span>' +
        '<a class="btn btn-red" href="' + waLink(enq(p)) + '" target="_blank" rel="noopener noreferrer">Enquire Now</a></div></article>';
    }).join('');
    $('grid').querySelectorAll('.ph img').forEach(function (i) { watch(i); });
    $('count').textContent = 'Showing ' + list.length + ' of ' + PRODUCTS.length + ' products';
    $('empty').hidden = list.length > 0;
    $('clear2').hidden = !(q || st.cat !== 'all') || !list.length;
  }
  function setCat(c) {
    st.cat = c;
    document.querySelectorAll('.chip').forEach(function (b) { var on = b.dataset.cat === c; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
    render();
  }
  function clearAll() { st.q = ''; $('q').value = ''; setCat('all'); }
  $('q').addEventListener('input', function (e) { st.q = e.target.value; render(); });
  document.querySelectorAll('.chip').forEach(function (b) { b.addEventListener('click', function () { setCat(b.dataset.cat); }); });
  $('clear').onclick = clearAll; $('clear2').onclick = clearAll;
  document.querySelectorAll('[data-go]').forEach(function (a) { a.addEventListener('click', function () { setCat(a.dataset.go); }); });
  render();
  $('fpr').innerHTML = '<option value="">Select a product</option>' + PRODUCTS.map(function (p) { return '<option>' + esc(p.n) + '</option>'; }).join('') + '<option>Other / Not sure</option>';

  /* Menu */
  var menu = $('menu'), burger = $('burger');
  function tm(o) { menu.classList.toggle('open', o); burger.setAttribute('aria-expanded', o); burger.setAttribute('aria-label', o ? 'Close menu' : 'Open menu'); }
  burger.addEventListener('click', function () { tm(!menu.classList.contains('open')); });
  menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { tm(false); }); });

  /* Gallery + lightbox. Photos that are not there yet are hidden, not shown as empty boxes. */
  var gal = $('gal'), lb = $('lb'), cur = 0, shown = [];
  gal.innerHTML = GAL.map(function (x) {
    return '<button type="button" data-src="' + esc(x[0]) + '" data-alt="' + esc(x[1]) + '" aria-label="Enlarge photo: ' + esc(x[1]) + '"><img src="' + esc(x[0]) + '" alt="' + esc(x[1]) + '" loading="lazy"></button>';
  }).join('');
  function visible() { return Array.prototype.slice.call(gal.querySelectorAll('button:not([hidden])')); }
  function galCheck() { var n = visible().length; $('galnote').hidden = n > 0; $('galhint').hidden = n === 0; }
  gal.querySelectorAll('button').forEach(function (b) { watch(b.querySelector('img'), function () { b.hidden = true; galCheck(); }); });
  function show(i) {
    cur = (i + shown.length) % shown.length;
    var b = shown[cur];
    $('lbi').innerHTML = '<img src="' + esc(b.dataset.src) + '" alt="' + esc(b.dataset.alt) + '">';
    $('lbc').textContent = b.dataset.alt;
  }
  gal.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    shown = visible(); show(shown.indexOf(b));
    if (lb.showModal) lb.showModal(); else lb.setAttribute('open', '');
  });
  $('lbx').onclick = function () { lb.close(); }; $('lbp').onclick = function () { show(cur - 1); }; $('lbn').onclick = function () { show(cur + 1); };
  lb.addEventListener('keydown', function (e) { if (e.key === 'ArrowLeft') show(cur - 1); if (e.key === 'ArrowRight') show(cur + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });

  /* Open status, India time */
  try {
    var p = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date());
    var gp = function (t) { return p.filter(function (x) { return x.type === t; })[0].value; };
    var m = (+gp('hour') % 24) * 60 + +gp('minute');
    var isOpen = gp('weekday') !== 'Sun' && m >= 540 && m < 1140;
    $('open').textContent = isOpen ? 'Open now' : 'Closed now';
    $('open').className = 'badge ' + (isOpen ? 'on' : 'off');
    $('open').title = 'Based on India time';
  } catch (e) {}

  /* Enquiry form: send by WhatsApp or email */
  var form = $('form'), busy = false;
  function se(id, msg, f) { $('e-' + id).textContent = msg; f.setAttribute('aria-invalid', msg ? 'true' : 'false'); return !msg; }
  function validate() {
    var n = $('fn'), pp = $('fp'), e = $('fe'), pr = $('fpr'), m = $('fm');
    var ph = pp.value.replace(/[\s-]/g, '').replace(/^(\+91|91|0)(?=\d{10}$)/, ''), ok = true;
    ok = se('fn', n.value.trim().length < 2 ? 'Please enter your full name.' : '', n) && ok;
    ok = se('fp', /^[6-9]\d{9}$/.test(ph) ? '' : 'Please enter a valid 10-digit Indian mobile number.', pp) && ok;
    ok = se('fe', e.value && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e.value) ? 'Please enter a valid email or leave it blank.' : '', e) && ok;
    ok = se('fpr', pr.value ? '' : 'Please choose a product.', pr) && ok;
    ok = se('fm', m.value.trim().length < 5 ? 'Please write a short message.' : '', m) && ok;
    return ok ? ph : null;
  }
  form.addEventListener('submit', function (ev) {
    ev.preventDefault(); if (busy) return;
    var ph = validate();
    if (!ph) { $('status').className = 'status'; $('status').textContent = 'Please fix the highlighted fields.'; return; }
    var via = ev.submitter && ev.submitter.value === 'mail' ? 'mail' : 'wa';
    var msg = 'Hello Saggu Steel Furniture, I would like to make an enquiry.\nName: ' + $('fn').value.trim() + '\nPhone: ' + ph + ($('fe').value ? '\nEmail: ' + $('fe').value.trim() : '') + '\nProduct: ' + $('fpr').value + '\nMessage: ' + $('fm').value.trim();
    busy = true; form.querySelectorAll('.sendrow .btn').forEach(function (b) { b.disabled = true; });
    if (via === 'mail') { window.location.href = 'mailto:saggusteelfurniture@gmail.com?subject=' + encodeURIComponent('Enquiry: ' + $('fpr').value) + '&body=' + encodeURIComponent(msg); }
    else { window.open(waLink(msg), '_blank', 'noopener'); }
    $('status').className = 'status ok';
    $('status').textContent = (via === 'mail' ? 'Your email app has opened with your details. ' : 'WhatsApp has opened with your details. ') + 'Please press Send there to submit your enquiry. If nothing opened, use the Call Now or WhatsApp Us button above.';
    setTimeout(function () { busy = false; form.querySelectorAll('.sendrow .btn').forEach(function (b) { b.disabled = false; }); }, 4000);
  });
  form.addEventListener('input', function (e) { if (e.target.getAttribute('aria-invalid') === 'true') validate(); });

  /* Get a Quote: jump to the form, pre-fill the message */
  $('quoteBtn').addEventListener('click', function (e) {
    e.preventDefault();
    if (!$('fm').value) $('fm').value = 'I would like a quotation. Please share the available options and price.';
    form.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    setTimeout(function () { $('fpr').focus({ preventScroll: true }); }, reduce ? 0 : 600);
  });

  /* Copy buttons */
  document.querySelectorAll('[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () {
      var t = b.dataset.copy, orig = b.textContent;
      function done() { b.textContent = 'Copied'; b.classList.add('done'); setTimeout(function () { b.textContent = orig; b.classList.remove('done'); }, 1500); }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(done, function () { b.textContent = 'Copy failed'; });
      else { var ta = document.createElement('textarea'); ta.value = t; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); done(); } catch (x) { b.textContent = 'Copy failed'; } document.body.removeChild(ta); }
    });
  });

  /* Scroll: nav shadow, back-to-top, active link */
  var topBtn = $('top'), nav = $('nav');
  function onScroll() { var y = window.scrollY; nav.classList.toggle('sc', y > 10); topBtn.hidden = y < 700; }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  topBtn.addEventListener('click', function () { window.scrollTo({ top: 0 }); });
  if ('IntersectionObserver' in window) {
    var links = {}; menu.querySelectorAll('a[href^="#"]').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting && links[e.target.id]) {
          Object.keys(links).forEach(function (k) { links[k].classList.remove('on'); });
          links[e.target.id].classList.add('on');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(function (s) { so.observe(s); });
  }
})();
