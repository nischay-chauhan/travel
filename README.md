# TRAVEL

## Overview

Travel is a Place renting Website where users can both host their own place or book any place hosted by others. It features functionalities such as liking properties, managing hostel properties, and viewing booked properties. Users can book a place and calculate rent based on the selected number of days.

## Features

- User registration and login.
- OTP verification on registeration of the User.
- Booking or hosting a place.
- Adding a place to the Wishlist.
- Hosting a place and managing it in the Property List.
- Viewing booked places in the Trips List.
- Querying places based on different categories.
- Implemented Redux-toolkit for global state management.
- Added RazorPay payment method.
  

## Environment Variables

To run this project, add the following environment variables to your .env file:

- `PORT`: Port number for the server.
- `MONGO_URI`: MongoDB connection URI.
- `JWT_SECRET`: Secret key for JWT token.
- `MAIL_USER` : your google gmail id,
- `MAIL_PASS` : the pass generated on cratimng an app in google console
- `RAZORPAY_API_KEY` : Your Razorpay api key
- `RAZORPAY_API_SECRET` : Your Razorpay api secret 

## Documentation

### Backend

- **Express and Mongoose**: Handling the backend.
- **Models**: User, Listing, and Booking models with references.
- **Controllers**:
  - **Auth Controller (auth.js)**:
    - Register: Endpoint for user registration.
    - Login: Endpoint for user login.
    - verifyOtp : Endpoint to verify the user OTP.
  - **Booking Controller (booking.js)**:
    - createBooking: Endpoint for creating a new booking.
    - verifyPayment : To verify your Razor Pay payment.
  - **Listing Controller (listing.js)**:
    - createListing: Endpoint for creating a new property listing.
    - getListingData: Endpoint for fetching property listings.
    - getListingById: Endpoint for fetching a specific property listing by ID.
  - **User Controller (user.js)**:
    - getUserTrips: Endpoint for fetching trips booked by a user.
    - getLikedUserListing: Endpoint for managing a user's liked listings.
    - getPropertyList: Endpoint for fetching properties owned by a user.
    - getUserReservation: Endpoint for fetching reservations made by a user.

### Routes

#### Auth Routes (authRoutes.js)

- `/register`: POST endpoint for user registration.
- `/login`: POST endpoint for user login.
- `/verify-otp` : To verify the User otp upon signing up.

#### Booking Routes (bookingRoutes.js)

- `/create`: POST endpoint for creating a new booking.
- `/verify-payment` : To verify the Payment made using the RazorPay

#### Listing Routes (listingRoutes.js)

- `/create`: POST endpoint for creating a new property listing.
- `/: GET endpoint for fetching all property listings.
- `/:listingId`: GET endpoint for fetching a specific property listing by ID.

#### User Routes (userRoutes.js)

- `/:userId/trips`: GET endpoint for fetching trips booked by a user.
- `/:userId/:listingId`: PATCH endpoint for managing a user's liked listings.
- `/:userId/properties`: GET endpoint for fetching properties owned by a user.
- `/:userId/reservation`: GET endpoint for fetching reservations made by a user.

## FRONTEND

The frontend is developed using a React Vite app and Tailwind CSS, with some custom CSS for various pages. It incorporates all the backend routes with their respective pages. Redux and Redux Toolkit are used for global state management.

### Pages

#### Home (path: `/`)

The home page of the application.

#### Login (path: `/login`)

Page for user login.

#### Register (path: `/register`)

Page for user registration.

#### Create Listing (path: `/create-listing`)

Page for creating a new property listing.

#### Listing Details (path: `/properties/:listingId`)

Page displaying details of a specific property listing.

#### Category Page (path: `/properties/category/:category`)

Page displaying properties filtered by category.

#### Trips Lists (path: `/:userId/trips`)

Page displaying trips booked by a user.

#### Wishlist (path: `/:userId/wishList`)

Page displaying a user's wishlist.

#### Property List (path: `/:userId/properties`)

Page displaying properties owned by a user.

#### Reservation List (path: `/:userId/reservation`)

Page displaying reservations made by a user.

### Additional Notes

- Tailwind CSS is used for styling, and breakpoints are defined for a responsive design.
- Animations and transitions are implemented for a smoother user experience.
- Redux is used for state management, allowing efficient data flow between components.

Feel free to explore the various pages to get a better understanding of the application's functionality.

