import fs from 'fs';
const reqInfo = {
    deviceInfo: '',
    ip: '',
    port: '',
    host: '',
    method: '',
    url: '',
    date: '',
    time: '',
    status: '',
};

export const fsLogger = (req, res) => {
    reqInfo.deviceInfo = req.headers['user-agent'];
    reqInfo.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    reqInfo.port = req.connection.remotePort;
    reqInfo.host = req.headers.host;
    reqInfo.method = req.method;
    reqInfo.url = req.url;
    reqInfo.date = new Date();
    reqInfo.time = reqInfo.date.toLocaleTimeString();
    reqInfo.status = res.statusCode;

    const logFormat = `${reqInfo.date} ${reqInfo.time} ${reqInfo.deviceInfo} ${reqInfo.ip} ${reqInfo.port} ${reqInfo.host} ${reqInfo.method} ${reqInfo.url} ${reqInfo.status}`;

    fs.appendFile('log.txt', `\n${logFormat}`, (err) => {
        if (err) {
            console.log(err);
        }
        console.log('api log file updated successfully');
    });
};
