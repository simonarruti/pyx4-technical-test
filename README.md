# Technical test for Pyx4

### Prerequisites
* Docker
* Docker Compose (already installed with last versions of Docker)
* CircleCI CLI if you want to test the jobs, but it could also be used online, using the CircleCI UI App. Doing so you will have to configure it for the project, on your own GitHub repo.

You can start the project with this command in your terminal (at the root of the project folder):
```bash
$ docker compose up -d --build
```

Then, you can navigate in your browser to the UI url:

http://localhost:8080

If you want to run the unit test, run this command at the root of the server folder:
```bash
$ npm run test
```

Thank you ! :)