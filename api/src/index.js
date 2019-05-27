require('dotenv').config();

const
    express         = require('express'),
    morgan          = require('morgan'),
    path            = require('path'),
    cors            = require('cors'),
    routes          = require('./routes'),
    errors          = require('./common/errors'),
    Server          = require('./server');

// file variables
const
    app             = express(),
    isDev           = process.env.NODE_ENV === 'development';


function setupMiddleware(app) {
    app.set('port', process.env.PORT || 3000);
    app.disable('x-powered-by');
    app.set('trust proxy', 1);  // express behind proxy doesn't receive X-Forwarded-* header, if false.

    app
        .use(morgan('dev'))        // http logger
        .use(cors({
            origin: [
                'http://localhost:3001'
            ]
        }))
        .use(express.json({limit: '1mb'})) // default application/json.
        .use(express.urlencoded({extended: true, limit: '1mb'}));   // doesn't handle multipart, use multer.



    // use api routes
    app.use(`/${process.env.API_VERSION || 1}`, routes);

    // catch all error. It doesn't handle errors sent by next(). But we don't need it.
    app.use((req, res, next) => {
        return errors.notFound(res);
    });


    return app;
}

// call the middleware start the app
setupMiddleware(app);
(new Server(app)).start();



/* EOF */
