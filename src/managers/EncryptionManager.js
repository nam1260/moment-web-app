/**
 * EncryptionManager
 * @author hs.kim
 * @since 2021/12/12
 * description
 * pw encryption 관리 
 */

import crypto from "crypto";

const EncryptionManager = (function() {

    const createSalt = () =>
        new Promise((resolve, reject) => {
            crypto.randomBytes(64, (err, buf) => {
                if (err) reject(err);
                resolve(buf.toString('base64'));
            });
        });

    const createHashedPassword = (plainPassword) =>
        new Promise(async (resolve, reject) => {
            const salt = await createSalt();
            crypto.pbkdf2(plainPassword, salt, 9999, 64, 'sha512', (err, key) => {
                if (err) reject(err);
                resolve({ password: key.toString('base64'), salt });
            });
        });

    const makePasswordHashed = (plainPassword, salt) => 
        new Promise(async (resolve, reject) => {
            crypto.pbkdf2(plainPassword, salt, 9999, 64, 'sha512', (err, key) => {
                if (err) reject(err);
                resolve(key.toString('base64'));
            });
        });

    return {
        createPassword : async (plainPassword)=>{
            return await createHashedPassword(plainPassword);
        },
        makePassword : async (plainPassword, salt)=>{
            return await makePasswordHashed(plainPassword, salt);
        },
        
    };
 }());
 
 export default EncryptionManager;