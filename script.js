const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", () => {
  const searchInput = document.getElementById("search-input").value;
  ///// api.example has to be replaced with rapid api
  fetch("https://rapidapi.com/3b-data-3b-data-default/api/airbnb13")
    .then((response) => response.json())
    .then((data) => {
      // Your code to display the listings goes here
    })
    .catch((error) => console.error("Error:", error));
});

function createListingCard(listing) {
  const listingCard = document.createElement("div");
  listingCard.classList.add("listing-card");

  listingCard.innerHTML = `
        <img src="${listing.image}" alt="${listing.title}">
        <div class="listing-info">
            <h2>${listing.title}</h2>
            <p>${listing.propertyType} · ${listing.beds} beds · ${
    listing.bathrooms
  } bathrooms</p>
            <p>${listing.price} per night</p>
            <p>${listing.location}</p>
            <p>Amenities: ${listing.amenities.join(", ")}</p>
        </div>
    `;

  return listingCard;
}

// Inside the fetch function in the search button event listener
then((data) => {
  const listingsContainer = document.getElementById("listings-container");

  // Clear previous listings
  listingsContainer.innerHTML = "";

  // Append new listings
  data.listings.forEach((listing) => {
    const listingCard = createListingCard(listing);
    listingsContainer.appendChild(listingCard);
  });
});

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 }, // Centered at some default location
    zoom: 8,
  });
}

function createListingCard(listing) {
  // After creating the listingCard

  // Create a marker for this listing on the map
  new google.maps.Marker({
    position: { lat: listing.latitude, lng: listing.longitude },
    map,
    title: listing.title,
  });

  return listingCard;
}

let userLocation;

window.onload = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }
};
function createListingCard(listing) {
  // Before creating the listingCard
  const listingLocation = `${listing.latitude},${listing.longitude}`;

  fetch(
    `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${userLocation.lat},${userLocation.lng}&destinations=${listingLocation}&key=YOUR_API_KEY`
  )
    .then((response) => response.json())
    .then((data) => {
      const distance = data.rows[0].elements[0].distance.text;

      // Now create the listingCard and include the distance in the information
      const listingCard = document.createElement("div");

      listingCard.innerHTML = `
                
                <p>Distance from you: ${distance}</p>
            
            `;
    });
}

function createListingCard(listing) {
  // After creating the listingCard

  // Add a button for booking cost breakdown
  const costButton = document.createElement("button");
  costButton.innerText = "Show Booking Cost Breakdown";
  costButton.addEventListener("click", () => showBookingCostBreakdown(listing));
  listingCard.appendChild(costButton);

  return listingCard;
}

function showBookingCostBreakdown(listing) {
  // Calculate additional fees and total cost
  const additionalFees = listing.price * 0.1; // Assuming additional fees are 10% of base price
  const totalCost = listing.price + additionalFees;

  // Create a modal dialog box
  const modal = document.createElement("div");
  modal.style.display = "block";
  modal.style.width = "300px";
  modal.style.height = "200px";
  modal.style.backgroundColor = "#fff";
  modal.style.position = "fixed";
  modal.style.top = "50%";
  modal.style.left = "50%";
  modal.style.transform = "translate(-50%, -50%)";
  modal.style.padding = "20px";
  modal.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";

  // Add booking cost breakdown to the modal
  modal.innerHTML = `
        <h2>Booking Cost Breakdown</h2>
        <p>Base Rate: $${listing.price.toFixed(2)}</p>
        <p>Additional Fees: $${additionalFees.toFixed(2)}</p>
        <p>Total Cost: $${totalCost.toFixed(2)}</p>
    `;

  // Add a close button to the modal
  const closeButton = document.createElement("button");
  closeButton.innerText = "Close";
  closeButton.addEventListener("click", () => (modal.style.display = "none"));
  modal.appendChild(closeButton);

  // Add the modal to the body
  document.body.appendChild(modal);
}

function createListingCard(listing) {
  // After creating the listingCard

  // Add a paragraph for the reviews count and average rating
  const reviewsP = document.createElement("p");
  reviewsP.innerHTML = `Reviews: ${
    listing.reviews_count
  } | Average Rating: ${calculateAverageRating(listing.reviews)}`;
  listingCard.appendChild(reviewsP);

  return listingCard;
}

function calculateAverageRating(reviews) {
  if (reviews.length === 0) {
    return "No reviews yet";
  }

  let sum = 0;
  for (let review of reviews) {
    sum += review.rating;
  }

  return (sum / reviews.length).toFixed(1);
}

function createListingCard(listing) {
  // After creating the listingCard

  // Add a superhost indicator if the host is a superhost
  if (listing.host.is_superhost) {
    const superhostIndicator = document.createElement("p");
    superhostIndicator.innerText = "Superhost";
    superhostIndicator.style.color = "red";
    listingCard.appendChild(superhostIndicator);
  }

  return listingCard;
}

function createListingCard(listing) {
  // After creating the listingCard

  // Add a 'rare find' indicator if the listing is a 'rare find'
  if (listing.is_rare_find) {
    const rareFindIndicator = document.createElement("p");
    rareFindIndicator.innerText = "Rare Find";
    rareFindIndicator.style.color = "green";
    listingCard.appendChild(rareFindIndicator);
  }

  return listingCard;
}

function createListingCard(listing) {
  // After creating the listingCard

  // Add host details
  const hostDetails = document.createElement("p");
  hostDetails.innerText = `Hosted by ${createHostDetails(listing.host)}`;
  listingCard.appendChild(hostDetails);

  return listingCard;
}

function createHostDetails(host) {
  // Include the host's name and 'Superhost' status
  let hostText = host.name;

  if (host.is_superhost) {
    hostText += " (Superhost)";
  }

  return hostText;
}

function createListingCard(listing) {
  // After creating the listingCard

  // Add a directions button
  const directionsButton = document.createElement("button");
  directionsButton.innerText = "Get Directions";
  directionsButton.addEventListener("click", function () {
    openDirections(listing.location);
  });
  listingCard.appendChild(directionsButton);

  return listingCard;
}

function openDirections(location) {
  // Open Google Maps directions in a new tab
  const url = `https://www.google.com/maps/dir//${location.latitude},${location.longitude}`;
  window.open(url, "_blank");
}
