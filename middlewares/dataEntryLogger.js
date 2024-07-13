const dataEntryLogger = (request, response, next) => {
    console.log('New data added!');
    console.log(request.method);
    console.log(Date.now());
    console.log(request.originalUrl);
    next();
};

module.exports = dataEntryLogger;