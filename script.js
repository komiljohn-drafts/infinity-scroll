const imageWrapper = document.getElementById('image__wrapper');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API 
const count = 5;
const API_KEY = 'lX6Z-p1If0O2H1AuRXrApLGS9114u-cBQB7k9NTn6Ls';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${API_KEY}&count=${count}&orientation=landscape`;

// Getting  photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
    }
}

// Function to check if all images loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (let key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements for links and photos, adding them to the DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;

    photosArray.forEach(photo => {
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });

        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        //Event Listener, check when each img is finished loading
        img.addEventListener('load', imageLoaded);

        item.appendChild(img);
        imageWrapper.appendChild(item);
    });
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// Loading the function
getPhotos();