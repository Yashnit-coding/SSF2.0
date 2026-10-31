# Saggu Steel Furniture website

Plain HTML, CSS and JavaScript. No build step. Fonts (Bebas Neue, Hind, Noto Sans Gurmukhi) load from Google Fonts and fall back to system fonts offline.

## Run
Open `index.html`, or run `python3 -m http.server` in this folder and visit http://localhost:8000

## Edit
- **Contact details, address, hours:** change them in `index.html` and in the JSON-LD block in `<head>`.
- **WhatsApp number:** `WA` at the top of `script.js`, plus the `wa.me` links in `index.html`.
- **Products:** the `PRODUCTS` list at the top of `script.js` (name, category, description, picture, optional `true` for custom).
- **Photos:** pictures are placeholder steel illustrations. Put real photos in `assets/` and replace the `art(...)` calls in `script.js` with `<img src="assets/photo.jpg" alt="..." loading="lazy">`. The hero almirah is CSS in `style.css` (`.alm`); replace the `.stage` block in `index.html` with a photo if you prefer.
- **Logo:** replace `assets/logo.svg` and `assets/favicon.svg`.
- **Testimonials:** add only approved reviews inside `<div id="testi">`.
- **Colours:** CSS variables at the top of `style.css`.

## Enquiry form
Checks the fields, then opens WhatsApp with the details filled in. The customer must press Send. No EmailJS settings were supplied, so none are included.

## Before publishing
Confirm business hours, add real photos and the logo, add a canonical URL and og:image once the web address is known.
