const allowedCors = [
    'https://mesto-front.u.nomoredomains.xyz/',
    'http://mesto-front.u.nomoredomains.xyz/'
];

module.exports.cors = (req, res, next) => {
    const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
    // проверяем, что источник запроса есть среди разрешённых 
    if (allowedCors.includes(origin)); {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Credentials', true)
    }

    const { method } = req; 
    const requestHeaders = req.headers['access-control-request-headers'];
    const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE"; 
    if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
} 
    next();
}; 


