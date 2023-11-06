
# Change Log
All notable changes to this project will be documented in this file.
 
The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [0.3.0] - 2023-11-08
 
This release was centered on log-in/log-out functionality with
user authentication.
 
### Added
- ProtectedRoute component which handles all routes not accessible without login
- Parse Service for user authentication
- Login/Register component which utilizes authentication service
- Protected routes redirect to authentication component
- Logged in users cannot access authentication component
- Manually typed URLs redirected to authentication if user is unauthenticated
- Logout functionality for users, redirects users to login/sign-up

### Changed
 
### Fixed

## [0.2.0] - 2023-10-13
 
Here we write upgrading notes for brands. It's a team effort to make them as
straightforward as possible.
 
### Added
- Navigation bar with routing was added
- Connected the app to back4app to link it to the database
- Created forms and linked them to back4app
- Added CRUD functions for our services, including setting goals for users, tracking their fitness journey and allowing them to subscribe to a premium service.
- Created multiple components to allow for routing between pages.
- Created Parse models for each class that we have, we have 4 currently. 
- Added 3 different pointers to our 3 main services to connect the data to a specific user. 

### Changed
 
### Fixed
 
## [0.0.0] - 2023-09-25
  
Feature 3 in CodeSandbox
