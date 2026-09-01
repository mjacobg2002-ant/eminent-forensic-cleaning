/* =========================================================
   EMINENT FORENSIC CLEANING — Homepage interactions
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky nav: transparent -> solid ---------- */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (window.scrollY > 60) nav.classList.add('solid');
    else nav.classList.remove('solid');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('mobileMenu');
  function closeMenu() {
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  function openMenu() {
    menu.classList.add('open');
    menu.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      if (menu.classList.contains('open')) closeMenu();
      else openMenu();
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reveals = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Services: sync visual panel with open category ---------- */
  var svcItems = document.querySelectorAll('.svc');
  var visuals = document.querySelectorAll('.services__visual-card');
  function showVisual(index) {
    visuals.forEach(function (v) {
      v.hidden = (parseInt(v.getAttribute('data-visual'), 10) !== index);
    });
  }
  svcItems.forEach(function (item, i) {
    item.addEventListener('toggle', function () {
      if (item.open) {
        // close the others (accordion behavior)
        svcItems.forEach(function (other) { if (other !== item) other.open = false; });
        showVisual(i);
      }
    });
    var summary = item.querySelector('summary');
    if (summary) {
      summary.addEventListener('mouseenter', function () { if (!reduce) showVisual(i); });
    }
  });

  /* ---------- Contact form (concept — no backend) ---------- */
  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('#name');
      var email = form.querySelector('#email');
      var phone = form.querySelector('#phone');
      if (!name.value.trim() || !email.value.trim() || !phone.value.trim()) {
        note.textContent = 'Please add your name, email, and phone so we can reach you.';
        return;
      }
      note.textContent = 'Thank you — your message is ready to send. For immediate help, please call (804) 840-2030.';
      form.querySelector('button[type="submit"]').textContent = 'Message Ready';
    });
  }

  /* ---------- Case work: real incidents Eminent responded to ---------- */
  var cases = [
    { loc: 'Portsmouth', title: 'Maple Avenue quadruple shooting', date: '2025', src: 'WRIC', url: 'https://www.wric.com/news/virginia-news/police-id-3-killed-in-quadruple-shooting-on-maple-avenue-in-portsmouth/' },
    { loc: 'Staunton', title: 'Betsy Bell Road death investigation', date: 'Jun 2026', src: 'WHSV', url: 'https://www.whsv.com/2026/06/23/staunton-police-investigating-death-betsy-bell-road/' },
    { loc: 'Fredericksburg', title: 'Car chase shooting, two dead', date: '2026', src: 'FOX 5', url: 'https://www.fox5dc.com/news/fredericksburg-car-chase-shooting-leaves-2-dead-2-children-injured' },
    { loc: 'Petersburg', title: 'Grant Avenue shooting', date: 'Mar 2025', src: 'WTVR', url: 'https://www.wtvr.com/news/local-news/man-dead-grant-avenue-shooting-petersburg-march-2-2025' },
    { loc: 'Richmond', title: 'Downtown stabbings', date: 'Jan 2025', src: 'WTVR', url: 'https://www.wtvr.com/news/local-news/richmond-stabbings-jan-17-2025' },
    { loc: 'Albemarle', title: 'Shooting investigation, two seniors', date: 'Sep 2025', src: '29News', url: 'https://www.29news.com/2025/09/25/shooting-death-two-albemarle-seniors-under-investigation-suspicious/' },
    { loc: 'Fredericksburg', title: 'Downtown early-morning shooting', date: 'Dec 2024', src: 'FXBG Free Press', url: 'https://www.fredericksburgfreepress.com/2024/12/14/fredericksburg-man-dies-after-early-morning-shooting-downtown/' },
    { loc: 'Charles City', title: 'Church Lane home invasion', date: 'Mar 2024', src: 'WTVR', url: 'https://www.wtvr.com/news/local-news/deadly-shooting-home-invasion-church-lane-charles-city-march-20-2024' },
    { loc: 'Prince George', title: 'Baymont Hotel stabbing', date: '2024', src: 'WTVR', url: 'https://www.wtvr.com/news/local-news/baymont-hotel-stabbing-prince-george-suspect-in-custody' },
    { loc: 'Ruther Glen', title: 'Residential incident', date: 'Jul 2023', src: 'WTVR', url: 'https://www.wtvr.com/news/local-news/ruther-glen-murder-suicide-july-15-2023' },
    { loc: 'Chesterfield', title: 'Neighborhood incident', date: '2023', src: 'WRIC', url: 'https://www.wric.com/news/local-news/chesterfield-county/murder-suicide-in-chesterfield-neighborhood-leaves-2-dead-1-injured/' },
    { loc: 'Richmond', title: 'Highland Springs residence', date: '2023', src: 'WRIC', url: 'https://www.wric.com/news/crime/person-killed-in-domestic-homicide-near-highland-springs-high-school/' },
    { loc: 'Albemarle', title: 'Stony Point Road residence', date: 'Dec 2023', src: 'NBC29', url: 'https://www.nbc29.com/2023/12/08/albemarle-county-police-department-investigating-stony-point-road-homicide/' },
    { loc: 'Albemarle', title: 'Cypress Pointe Drive residence', date: 'Aug 2023', src: 'NBC29', url: 'https://www.nbc29.com/2023/08/29/albemarle-police-investigating-homicide-along-cypress-pointe-drive/' },
    { loc: 'Petersburg', title: 'Ferndale Avenue residence', date: '2023', src: 'WRIC', url: 'https://www.wric.com/news/local-news/the-tri-cities/petersburg-suspect-arrested-victim-identified-in-ferndale-avenue-homicide/' },
    { loc: 'Fredericksburg', title: 'Officer-involved incident', date: 'Jul 2023', src: 'WTVR', url: 'https://www.wtvr.com/news/local-news/fredericksburg-police-shooting-july-21-2023' },
    { loc: 'Richmond', title: 'Residential incident', date: 'Sep 2023', src: 'NBC12', url: 'https://www.nbc12.com/2023/09/19/man-found-shot-death-inside-richmond-home/' },
    { loc: 'Henrico', title: 'Triple-shooting response', date: 'Mar 2023', src: 'NBC12', url: 'https://www.nbc12.com/2023/03/30/suspect-triple-shooting-henrico-dies-north-carolina/' },
    { loc: 'Richmond', title: 'Domestic incident', date: 'Feb 2023', src: 'NBC12', url: 'https://www.nbc12.com/2023/02/15/29-year-old-richmond-man-arrested-fatally-shooting-girlfriend/' },
    { loc: 'Richmond', title: 'Family residence', date: 'Jan 2023', src: 'NBC12', url: 'https://www.nbc12.com/2023/01/16/everybody-is-shocked-richmond-police-identify-mom-son-killed-murder-suicide/' },
    { loc: 'Chesterfield', title: 'Laurel Road residence', date: 'Nov 2022', src: 'WTVR', url: 'https://www.wtvr.com/news/local-news/chesterfield-laurel-road-november-18-2022' },
    { loc: 'Richmond', title: 'Chippendale Court residence', date: 'Jul 2022', src: 'WTVR', url: 'https://www.wtvr.com/news/local-news/chippendale-court-homicide-july-11-2022' },
    { loc: 'Richmond', title: 'Yellow House site (drug bust)', date: '2022', src: 'WRIC', url: 'https://www.wric.com/news/local-news/richmond/several-arrests-made-in-connection-to-the-yellow-house-drug-bust-from-2022/' },
    { loc: 'Richmond', title: 'Grace Street residence', date: '2022', src: 'WRIC', url: 'https://www.wric.com/news/crime/death-investigation-underway-on-grace-street-first-confirmed-homicide-of-2022-in-richmond/' },
    { loc: 'Richmond', title: 'Residence with gunshot wound', date: '2022', src: 'WRIC', url: 'https://www.wric.com/news/local-news/richmond/man-found-dead-in-residence-with-gunshot-wound-richmond-police-investigating/' },
    { loc: 'Richmond', title: 'Chamberlayne Avenue apartment', date: '2022', src: 'WRIC', url: 'https://www.wric.com/news/crime/58-year-old-richmond-man-found-shot-dead-in-chamberlayne-avenue-apartment/' },
    { loc: 'Richmond', title: 'Chapel Drive residence', date: '2022', src: 'WRIC', url: 'https://www.wric.com/news/crime/richmond-police-identify-victim-of-fatal-chapel-drive-shooting/' },
    { loc: 'Richmond', title: '26th Street residence', date: '2022', src: 'WRIC', url: 'https://www.wric.com/news/crime/man-shot-and-killed-on-26th-street-in-richmond/' },
    { loc: 'Richmond', title: 'Assisted-living facility', date: '2022', src: 'WTVR', url: 'https://www.wtvr.com/news/local-news/deadly-double-stabbing-at-richmond-assisted-living-was-second-since-june' },
    { loc: 'Richmond', title: 'Double-shooting response', date: '2022', src: 'WRIC', url: 'https://www.wric.com/news/crime/one-dead-in-richmond-double-shooting/' },
    { loc: 'Portsmouth', title: 'Victory Crossing response', date: '2022', src: 'WAVY', url: 'https://www.wavy.com/news/local-news/portsmouth/large-police-presence-at-at-victory-crossing-shopping-center-in-portsmouth/' },
    { loc: 'Portsmouth', title: 'Effingham Street business', date: '2022', src: 'WAVY', url: 'https://www.wavy.com/news/crime/person-shot-at-starbucks-on-effingham-st-in-portsmouth/' },
    { loc: 'Newport News', title: '44th Street apartment', date: '2022', src: '13NewsNow', url: 'https://www.13newsnow.com/article/news/crime/homicide-investigation-underway-after-shooting-inside-newport-news-apartment-44th-street/291-3df3448c-89d6-4401-8305-eb0338ffdccc' },
    { loc: 'Spotsylvania', title: 'Residence response', date: '2022', src: 'WUSA9', url: 'https://www.wusa9.com/article/news/local/virginia/6-year-old-found-dead-in-spotsylvania-home-virginia/65-5f76aba0-5712-4ad8-8378-3d224dbf9426' },
    { loc: 'Fairfax County', title: 'Hotel response', date: '2022', src: 'DC News Now', url: 'https://www.dcnewsnow.com/news/local-news/virginia/fairfax-county/man-wanted-for-fatal-shooting-at-hotel-in-fairfax-county/' },
    { loc: 'Petersburg', title: 'Community response', date: 'Nov 2023', src: 'NBC12', url: 'https://www.nbc12.com/2023/11/28/police-investigate-shooting-petersburg/' },
    { loc: 'Fredericksburg', title: 'Fourth of July response', date: 'Jul 2021', src: 'NBC12', url: 'https://www.nbc12.com/2021/07/09/police-fredricksburg-man-charged-shooting-woman-multiple-times-fourth-july/' },
    { loc: 'Highland Park', title: 'Incident response', date: 'Apr 2026', src: '12 On Your Side', url: 'https://www.12onyourside.com/2026/04/21/highland-park-shooter-custody/' }
  ];

  var list = document.getElementById('caseworkList');
  if (list) {
    var arrow = '<svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M9 7h8v8"/></svg>';
    var frag = document.createDocumentFragment();
    cases.forEach(function (c) {
      var a = document.createElement('a');
      a.className = 'case';
      a.href = c.url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.innerHTML =
        '<span class="case__top"><span class="case__loc">' + c.loc + ', VA</span><span class="case__date">' + c.date + '</span></span>' +
        '<span class="case__title">' + c.title + '</span>' +
        '<span class="case__src">' + c.src + ' coverage ' + arrow + '</span>';
      frag.appendChild(a);
    });
    list.appendChild(frag);
  }
})();
