export default function saveUserData(userData:{ username: string, userEmail: string, userPassword: string, userToken: string}, filePath: string) {
    const fs = require('fs');
    const path = require('path');
    const dir =path.dirname(filePath);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify({userData}));
}