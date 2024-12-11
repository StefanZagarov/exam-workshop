SoftUni Angular Exam

# Distortion Pit

## Description

This web application allows users to add bands and songs, and compare them with the ones added by other users. In this app you can:
  - Add Bands and Songs: Add bands and songs, edit them later if you need to.
  - Like Bands and Songs: See something you like from others? Like it and show that it deserves to be at the top!
  - View Rankings: Access a ranking page where songs and bands are ranked based on the number of likes they receive from users.
  - Leave a comment: Share your thought about an added song or band by leaving a comment under the band/song's details page.


## How to install

- Requirements: This [back-end API](https://github.com/StefanZagarov/Exam-Rest-API) in order to store data

1. In the VSCode terminal write `npm i` to install dependencies
2. Then write `ng serve` to start the front-end server
3. In the VSCode terminal of the back-end API write `npm i` to install dependencies
4. Then write `npm start` to start the back-end server

## How to use

  - Guests can only browse the ranking lists and view details of the songs and bands

  - Users can add bands and songs
  - Users can like others' bands and songs
  - Users can leave a comment under a song or band's details page, the comments can be deleted by the user who created it
  - Users can edit and delete their created records
    - Note: Changing a band or song's name will reset its likes
   
## Technologies Used:
  - Frontend: Angular 18 (standalone components)
  - Backend: Node.js, Express, Bcrypt, Mongoose
  - Database: MongoDB
