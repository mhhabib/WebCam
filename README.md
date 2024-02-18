# WebCam
**Webcam** is a camera-based authentication app. This application aims to capture images intermittently running between an online exam/test/evaluation. You may notice this application's importance while you're taking the Hackerrank online competency test.

This is a basic webcam image capture application. This is how the application works
- The camera will open when the application loading done
- After 5 seconds of camera initialization, an image will be captured and sent to the DB
- Successful image capture, you can redirect your preferred page.

## Technology used for this application

- NodeJs
- ExpressJs
- ReactJs
- MongoDB

## Implemented API
Api | Description
---|----
`/new-upload` |  Upload capture image to the remote server
`/getfiles `| Fetch all the captured images

## Installation and Usages
Clone this repository and there you will find API directory too

**_API installation and usages_**

- Go to API directory
- Install dependacy package `npm install`
- Provide `MongoDB URI` and `PORT`
- Run API `npm start`

**_Frontend installation and usages_**

- Install dependacy package `npm install`
- Run API `npm start`

## Demo
![Screenshot 2024-02-18 at 12 28 08 PM](https://github.com/mhhabib/WebCam/assets/17263976/a0f5cfad-66c4-40e2-bb69-c867129d294b)


## Contribution
Feel free to create issue and PR
