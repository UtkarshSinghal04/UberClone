# Uber Clone

This project is a clone of the Uber application, built as a part of a web development practice project. It aims to replicate the core functionalities of the Uber app, including user authentication, ride booking, and real-time tracking.

## Features

- User authentication (Sign up, Login, Logout)
- Booking rides with pickup and drop-off locations
- Real-time location tracking
- Integration with map services (e.g., Google Maps API)
- Secure payment system integration (Credit/Debit cards, UPI, and Wallets)
- QR code-based payment confirmation

## Technologies Used

- Frontend: HTML, CSS, JavaScript, React
- Backend: Node.js, Express.js
- Database: MongoDB
- APIs: Google Maps API, Geolocation API

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/uber-clone.git
    ```
2. Navigate to the project directory:
    ```bash
    cd uber-clone
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the development server:
    ```bash
    npm start
    ```

## Usage

- Open the application in your browser at `http://localhost:3000`.
- Sign up or log in to your account.

- This project provides two main user roles: **Rider** and **User**. The application integrates Google Maps API for seamless location selection and tracking.

    ### Rider
    - Riders can view all ride requests within a 4 km radius.
    - Each ride request includes a detailed description of the user and the ride.
    - Riders can choose to accept or reject a ride request.
    - At the end of the ride, a QR code will be displayed, which can be scanned to accept payment. Alternatively, the rider can confirm that cash has been received.

    ### User
    - Users can select pickup and drop-off locations using the integrated Google Maps API.
    - After selecting locations, users can choose a vehicle type for their ride.
    - Once a ride request is made, users wait for a rider to accept the request.
    - Once accepted, the ride begins, and users can enjoy the journey to their destination.



    ---
    
    Thank you for checking out this project! I hope you find it helpful and inspiring.
    If you encounter any issues or have suggestions to improve this project, feel free to reach out. Enjoy exploring and building with this Uber Clone! Happy coding!
