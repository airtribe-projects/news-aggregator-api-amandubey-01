require('dotenv').config();
const app = require('./src/app');
const PORT = process.env.PORT || 3000;


const server = app.listen(PORT, (err)=> {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is runnin on http://localhost:${PORT}`);
})

// Optional -- graceful shutdown. Its a good practice.
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    server.close(() => {
        console.log('Process terminated');
    });
});

module.exports = server; 