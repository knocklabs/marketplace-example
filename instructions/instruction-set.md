# GlobeWonder

Inside this folder, I've already got a basic application setup for a collaboration app called Collaboration Platform. I want to use this app as a starting point for a new app called GlobeWonder.
GlobeWonder is a marketplace where tour providers around the world can offer adventures to travelers on the GlobeWonder platform.

## Instructions

1. Create a new branch for your changes.
2. Follow each set of instructions below in the order they are presented. Make any changes you need to make to the code to implement the instructions and open any files you need to open to implement the instructions.
3. Commit your changes and push your branch to the repository.
4. If you have any questions, please ask me.

## Data Models

For this app, we'll need to create some new data models as well as modify and delete some existing ones. All of the data models are in the `prisma/schema.prisma` file.

### User data models

For the users, we'll need to update this model to include a new field called `role`. This field will be used to determine the role of the user in the app. The options should be 'admin', 'operator', 'traveler'.

### Tour data models

Here are some of the data models beyond the typical user model:

- Tour - id, name, description, cover image, difficulty level, climate, Tour Dates (foreign key), operator Id (foreign key)
- Tour Dates - id, start date, end date, price, available seats, Tour (foreign key)
- Tour Bookings - id, TourDate id, User id, booked seats

### Unused data models

You can delete these data models:

- Workspace
- Project
- Asset
- Comment
- Workspace_seat

### Seed Data

We'll need to add some seed data to the database. The seed data is in the `prisma/seed.ts` file. This file has some examples from the old app. You can delete these examples and add the new seed data for the new app. Just add a few basic examples for each data model so that we can test the app. Ignore any existing functions for Knock in this file.

### Destroy Data

Similarly, we'll need to delete any existing data in the database. The delete procedure is in the `prisma/destroy.ts` file. You can delete the existing data by running the `npx prisma db destroy` command. This file has some examples from the old app. You can delete these examples and add the new delete procedure for the new app.

## Public Routes

We'll need to adjust the public routes to include the new data models. All the routes are in the `app/(public)` folder. We should be able to browse the tours and tour dates on the home page.

There should also be a tours page that lists all the tours.
`/tours`

There should also be a tour details page that shows the details of a tour.
`/tours/:id`

There should also be a tour operators page that shows the operators of a tour.
`/tour-operators/:id`

To book a tour, the user should be able to select a tour date and the number of seats they want to book. They should be able to book a tour date and then be redirected to the tour details page. But this will require authentication.

## Authenticated Routes

We'll need to adjust the authenticated routes to include the new data models. All the routes are in the `app/(authenticated)` folder.

There should be a booking page that allows an authenticated user to book a tour date. This booking page should take a tour id and tour date id as parameters and then create a new tour booking record in the database.
`/book-tour`

There should also be a booking confirmation page that shows the user the details of their booking.
`/booking-confirmation`

There should also be a profile page that shows the user's profile information.
`/profile`

There should also be a dashboard page that shows the user's dashboard. This page should show the user's upcoming bookings and any past bookings.
`/dashboard`

### UI Generation

This project is already setup with ShadCN UI. You can use the components in the `components` folder to build the UI. But for now, you can render very basic UI just to confirm things are working.
