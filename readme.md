## SUMMARY
Image compression full stack website code. Contains both api service and frontend written in node, react and next.js framework.


### SCREENSHOTS
<img src="https://github.com/eashish93/imgsquash/blob/master/screenshots/screen-1.png"
     alt="screen-one" width="420"/>
<img src="https://github.com/eashish93/imgsquash/blob/master/screenshots/screen-2.png"
     alt="screen-two" width="420"/>
<img src="https://github.com/eashish93/imgsquash/blob/master/screenshots/screen-3.png"
     alt="screen-three" width="420"/>

&emsp;

### SETTING UP GOOGLE CLOUD STORAGE
1. Create a project on google cloud and add a free cloud storage bucket via this quickstart guide: 
    - <https://cloud.google.com/storage/docs/quickstart-console>
2. Authenticate using either `gcloud` command line tool ([download here](https://cloud.google.com/sdk/docs/downloads-interactive)) or set `GOOGLE_APPLICATION_CREDENTIALS` env variable with the service account file.
    - Guide here: <https://cloud.google.com/sdk/docs/authorizing>


### STARTING THE API SERVICE 
1. Create `.env` file in the root of the folder with the following variables.
    - __API_VERSION__ : 1 (default)
    - __GC_STORAGE__ : your-google-cloud-bucket-name
    - __DL_BASE_URL__ : [YOUR-API-URL]/1/dl
2. Do `npm install` to install all node modules.
3. Do `npm run dev` to start the dev server on `3000` port.
4. Do `npm start` for production


### STARTING THE FRONTEND 
1. Do `npm start` to install.
2. Do `npm run dev` will start the webpack server on `3001` port.
3. Do `npm build` and `npm start` to build and use the code in production.


### NOTES 

1. Following programs are used for optimization
    - mozjpeg (lossy jpeg compression)
    - jpegtran (lossless jpeg compression)
    - pngquant (lossy png compression)
    - optipng (lossless png compression)
3. Current file size upload limit is 10MB.
4. API Routes.
    [POST]
    - `/image`: upload image(s) via file, URL, base64 or Binary.
        - file: `file` or `base64` or `binary`.
        - lossy: `Boolean` (default: false)
    - `/url`: Compression direct image url.
        - url: valid image url.
    - `/zip`: Accepts list of files object as an array with (`id`, `size` and `name`) and send the zipped result.
        - files: list of files object as an array.

    [GET]
        - `/dl/:id`: Generate download url of compressed image. Accept optional query `name`.
        
        
 ### LICENSE 
 MIT
