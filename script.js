
let photosArray = [];
const imageWrapper = document.getElementById('image__wrapper');

// Unsplash API 
const count = 10;
const API_KEY = 'lX6Z-p1If0O2H1AuRXrApLGS9114u-cBQB7k9NTn6Ls';
const apiUrl = `https://api.unsplash.com/photos/?client_id=${API_KEY}&count=${count}`;

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (let key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements for links and photos, adding them to the DOM
function displayPhotos() {
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

        item.appendChild(img);
        imageWrapper.appendChild(item);
    });
}

// Getting  photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();

    } catch (error) {
    }

}

// Loading the function
getPhotos();