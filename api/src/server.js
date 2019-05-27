const
    chalk = require('chalk'),
    http = require('http');


class Server {
    constructor(app) {
        this.app = app;
        this.httpServer = null;
    }

    start() {
        let app = this.app;
        return new Promise(resolve => {
            const port = app.get('port');
            // don't use app.listen(), because socketio doesn't work with existing express server
            this.httpServer = http.createServer(app).listen(port);

            // On Error
            this.httpServer.on('error', error => {
                if(error.syscall !== 'listen') {
                    throw error;
                }

                const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

                switch(error.code) {
                    case 'EACCESS':
                        console.error(chalk.red(`${bind} requires elevated privileges`));
                        process.exit(1);
                        break;
                    case 'EADDRINUSE':
                        console.error(chalk.red(`${bind} is already in use`));
                        process.exit(1);
                        break;
                    default: throw error;
                }
                process.exit(-1);
            });

            this.httpServer.on('listening', () => {
                this.logStartMessages();
                resolve(this);
            });

        });
    }

    stop() {
        return new Promise(resolve => {
            if(this.httpServer === null)
                resolve(this);
            else {
                this.httpServer.close(() => {
                    this.httpServer = null;
                    console.error(chalk.red('Site is closing connections'));
                    resolve(this);
                });
                this.closeConnections();
            }
        });
    }

    restart() {
        return this.stop().then(this.start().bind(this));
    }

    logStartMessages() {
        console.log(
            chalk.green.bold(`Listening on localhost:${this.app.get('port')}. Running in ${process.env.NODE_ENV}`),
            chalk.gray("\nCtrl-C to Shutdown"));

            function shutdown() {
                console.log(chalk.red("\nSite has shutdown"));
                process.exit(0);
            }
            // ensure that site exits correctly on Ctrl+C and SIGTERM
            process.
                removeAllListeners('SIGINT').on('SIGINT', shutdown).
                removeAllListeners('SIGTERM').on('SIGTERM', shutdown);
    }

}


module.exports = Server;
