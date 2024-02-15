

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">Threaded Calendar</h3>

  <p align="center">
    A web application for managing events, meetings, and day planning.
  </p>
    <p align="center">
	Project Link/Live Demo: <a href='https://portfolio.silkthreaddev.com/projects/threaded-calendar.html'>Threaded Calendar</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->
## About Threaded Calendar

Threaded Calendar is a web application built with Django RestFramework, providing a user-friendly interface for managing events, meetings, and day planning. The application utilizes an SQLite database and API calls for CRUD functionality, ensuring secure user authentication. Front-end development is implemented using Bootstrap and JavaScript.

* **Key Features:**
	- Calendar functionality for events and meetings
	- User authentication for secure access
	- API calls for CRUD functionality
	- Front-end implementation with Bootstrap and JavaScript
	- Single Page Application functionality for seamless user experience.

### Built With

* **Front-end:**
  - JavaScript
  - HTML
  - CSS
  - Bootstrap
* **Back-end:**
  - Python
  - Django 
  - MySQL
  - Docker

<!-- GETTING STARTED -->
## Getting Started

1. Install Python 3, Django and Django RESTFramework:
   ```sh
   # Install Python 3 (if not already installed)
   sudo apt-get update
   sudo apt-get install python3

   # Install pip (Python package manager)
   sudo apt-get install python3-pip

   # Create env 
   sudo python3 -m venv {env_name}

   # Activate env 
   sudo source {env_name}/bin/activate

   # Install Django
   pip3 install Django

   # Install requirements.txt
   pip3 install -r requirements.txt

### Project Setup

Threaded Calendar is set up across two servers: one hosting the frontend application and the other dedicated to the backend, including event and calendar data within the Django project. The frontend communicates with the backend through API calls, with Django RestFramework managing CRUD functionality and date generation. To start the project you will need to run the django application and then got to the static site and run it on a different port.

<!-- CONFIGURATION OVERVIEW -->
## Configuration Overview

The project follows a straightforward setup illustrated in a simple diagram. The first server serves static content, including the frontend application. An API call is initiated from the frontend on the first server, reaching out to the second server hosting the Django project. The second server manages the generation and retrieval of dynamic data, specifically event and calendar data. This architecture ensures a clear separation of responsibilities, with the first server handling static content delivery and the second server managing the dynamic aspects of the application.

<!-- CONTRIBUTING -->
## Contributing

Not at this time, but feed back is welcome.



<!-- CONTACT -->
## Contact


For any inquiries or assistance, feel free to contact Josh at Josh@silkthreaddev.com

Project Link: [https://github.com/your_username/threaded_calendar](https://github.com/your_username/threaded_calendar)

