
# TRAVEL

It's a Sort of Place renting Website where a user can both host its own place or book any place that are being hosted by other peoples. It have features like liked property , your hostel property , your booked propety etc. 
It allow user to book a place and then calculate the rent as per the number of days selected by the respective user 


## Features

- It allow user to register and login 
- It allows user to either Book a place or host its own place.
- User can add a place to his Wishlist and can see it later.
- User can host his place and see it in his Property List.
- User can see the places he has booked in Trips List.
- Allow user to query places as per different categories.
- Implemented Redux-toolkit for storing various states that are needed globally.



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT` =  " "

`MONGO_URI` = " "

`JWT_SECRET` = " "


## Documentation

- It uses Express and mongoose for handling the backend.
- It uses many models like User model , Listing model and Booking model with ref to user and listing model.

#### CONTROLLERS
####  Auth Controller
- auth.js
- Register: Endpoint for user registration. It accepts user details such as firstName, lastName, email, password, and a profileImage.
- login: Endpoint for user login. It validates user credentials and returns a JWT token upon successful login.

#### Booking Controller
 booking.js
- createBooking: Endpoint for creating a new booking. It accepts details such as customerId, hostId, listingId, startDate, endDate, and totalPrice.


#### Listing Controller
listing.js
- createListing: Endpoint for creating a new property listing. It accepts details such as creator, category, type, streetAddress, city, province, country, guestCount, bedroomCount, bedCount, bathroomCount, amenities, title, description, highlight, highlightDesc, price, and listingPhotos.
- getListingData: Endpoint for fetching property listings. It supports an optional query parameter category to filter listings by category.
- getListingById: Endpoint for fetching a specific property listing by ID.

#### User Controller
user.js
- getUserTrips: Endpoint for fetching trips booked by a user.
- getLikedUserListing: Endpoint for managing a user's liked listings. It allows a user to add or remove a listing from their wishlist.
- getPropertyList: Endpoint for fetching properties owned by a user.
- getUserReservation: Endpoint for fetching reservations made by a user.


### Routes
#### Auth Routes
authRoutes.js
- /register: POST endpoint for user registration.
- /login: POST endpoint for user login.

#### Booking Routes
bookingRoutes.js
- /create: POST endpoint for creating a new booking.

#### Listing Routes
listingRoutes.js
- /create: POST endpoint for creating a new property listing.
- /: GET endpoint for fetching all property listings.
- /:listingId: GET endpoint for fetching a specific property listing by ID.

#### User Routes
userRoutes.js
- /:userId/trips: GET endpoint for fetching trips booked by a user.
- /:userId/:listingId: PATCH endpoint for managing a user's liked listings.
- /:userId/properties: GET endpoint for fetching properties owned by a user.
- /:userId/reservation: GET endpoint for fetching reservations made by a user.

## FRONTEND

It uses react Vite app and tailwind css with some custom css for various pages.
Implemented all above routes with their respective Pages.
