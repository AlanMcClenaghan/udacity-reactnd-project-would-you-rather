# Would You Rather? Project

This is my final submission for Udacity's React & Redux Would You Rather? project.

The code does not include node modules. These can be included in the following way:

## Installation

* Clone or download the project files to your local machine.
* Install the project dependencies with `npm install`
* start the development server with `npm start`

## Usage

* User needs to log in on the Login screen to access the app
  * Currently one of three users can be selected from the dropdown menu

* Home screen displays lists for:
  * Unanswered questions
    * Users can click on the poll and answer the question
    * Results are displayed showing number and percentage of votes for each option
    * The users answer is marked with a tick
    * Users can then return to the homepage
  * Answered questions
    * Users can view the polls they have already answered
    * Results are displayed showing number and percentage of votes for each option
    * The users answer is marked with a tick
    * User can return to the homepage
* New Question screen allows the user to:
  * Create a new question by:
    * Entering text for Option One
    * Entering text for Option Two
    * Submitting the question and returning to the Home page where the new question is added to the Unanswered Questions list.
* Users can view who has asked and answered the most question on the Leader Board screen

* User can log out and log in again