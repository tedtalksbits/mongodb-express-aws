import fs from 'fs';
import os from 'os';

export const fsLogger = (log) => {
    console.log(log);

    fs.appendFile('log.txt', `\n${log}`, (err) => {
        if (err) {
            console.log(err);
        }
        console.log('api log file updated successfully');
    });
};
