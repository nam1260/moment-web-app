import { uploadFile } from 'react-s3';
import S3 from 'react-aws-s3';


const S3_BUCKET ='moment-test-1';
const REGION ='ap-northeast-2';
const ACCESS_KEY ='AKIAWCEMPWEPTDNDYY4B';
const SECRET_ACCESS_KEY ='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';
const CONTENT_TYPE_IMG ='image/jpeg, image/png';

const AWSS3Manager = (function() {

    const uploadImage = async (file, userId, fileName) => {
        const config = {
            bucketName: S3_BUCKET,
            region: REGION,
            accessKeyId: ACCESS_KEY,
            secretAccessKey: SECRET_ACCESS_KEY,
            ACL : 'public-read',
            dirName: userId,
        }

        const React3 = new S3(config);
        React3.uploadFile(file, fileName)
            .then(data => console.log(data))
            .catch(err => console.error(err));
        // uploadFile(file, config)
        //     .then(data => console.log(data))
        //     .catch(err => console.error(err))
    }
    return {
        uploadImage,
    }

}());

export default AWSS3Manager;