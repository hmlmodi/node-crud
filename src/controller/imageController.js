// // const aws = require('../config/aws');
// // const multer = require('multer');
// // const multerS3 = require('multer-s3');

// // console.log("🚀 ~ file: imageController.js:9 ~ process.env.AWS_BUCKET_NAME:", process.env.AWS_BUCKET_NAME)
// // const upload = multer({
// //     storage: multerS3({
// //         s3: aws,
// //         bucket: process.env.AWS_BUCKET_NAME,
// //         acl: 'public-read',
// //         metadata: function (req, file, cb) {
// //             cb(null, { fieldName: file.fieldname });
// //         },
// //         key: function (req, file, cb) {
// //             cb(null, Date.now().toString() + '-' + file.originalname);
// //         },
// //     }),
// // });
// // console.log("🚀 ~ file: imageController.js:19 ~ upload:", upload)

// // const uploadImage = upload.single('image');

// // const getImageUrl = (req, res) => {
// //     // Return the image URL after upload
// //     res.json({ imageUrl: req.file.location });
// // };

// // module.exports = { uploadImage, getImageUrl };




// const { Upload } = require("@aws-sdk/lib-storage");
// const { S3Client } = require("@aws-sdk/client-s3");
// const Transform = require('stream').Transform;
// const formidable = require("formidable");
// const AWS = require('aws-sdk');
// console.log("🚀 ~ file: imageController.js:38 ~ AWS:", AWS)

// const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
// const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
// const region = process.env.AWS_REGION;
// const Bucket = process.env.AWS_BUCKET_NAME;
// console.log("🚀 ~ file: imageController.js:42 ~ Bucket:", Bucket)

// const uploadImage = async (req,res) => {
//     return new Promise((resolve, reject) => {
//         let options = {
//             maxFileSize: 10 * 1024 * 1024, //100 MBs converted to bytes,
//             allowEmptyFiles: false
//         }

//         const form = formidable(options);

//         form.parse(req, (err, fields, files) => { });

//         form.on('error', error => {
//             reject(error.message)
//         })

//         form.on('data', data => {
//             if (data.name === "successUpload") {
//                 resolve(data.value);
//             }
//         })

//         form.on('fileBegin', (formName, file) => {

//             file.open = async function () {
//                 this._writeStream = new Transform({
//                     transform(chunk, encoding, callback) {
//                         callback(null, chunk)
//                     }
//                 })

//                 this._writeStream.on('error', e => {
//                     form.emit('error', e)
//                 });

//                 // upload to S3
//                 new Upload({
//                     client: new S3Client({
//                         credentials: {
//                             accessKeyId,
//                             secretAccessKey
//                         },
//                         region
//                     }),
//                     params: {
//                         ACL: 'private',
//                         Bucket,
//                         Key: `${Date.now().toString()}-${this.originalFilename}`,
//                         Body: this._writeStream
//                     },
//                     tags: [], // optional tags
//                     queueSize: 4, // optional concurrency configuration
//                     partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
//                     leavePartsOnError: false, // optional manually handle dropped parts
//                 })
//                     .done()
//                     .then(data => {
//                         form.emit('data', { name: "complete", value: data });
//                     }).catch((err) => {
//                         form.emit('error', err);
//                     })
//             }
//         })
//     })
// }

// // module.exports = uploadImage;

// module.exports = { uploadImage };


const { Upload } = require("@aws-sdk/lib-storage");
const { S3Client } = require("@aws-sdk/client-s3");
const Transform = require('stream').Transform;
const formidable = require("formidable");
const AWS = require('aws-sdk');
console.log("🚀 ~ file: imageController.js:38 ~ AWS:", AWS)

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.AWS_REGION;
const Bucket = process.env.AWS_BUCKET_NAME;
console.log("🚀 ~ file: imageController.js:42 ~ Bucket:", Bucket)

const uploadImage = async (req, res) => {
    return new Promise((resolve, reject) => {
        let options = {
            maxFileSize: 10 * 1024 * 1024, // 100 MBs converted to bytes,
            allowEmptyFiles: false
        }

        const form = formidable(options);

        form.parse(req, (err, fields, files) => { });

        form.on('error', error => {
            reject(error.message)
        })

        form.on('data', data => {
            if (data.name === "successUpload") {
                resolve(data.value);
            } else if (data.name === "complete") {
                // Set a response on successful image upload
                res.status(200).json({ success: true, message: "Image uploaded successfully", data: data.value });
            }
        })

        form.on('fileBegin', (formName, file) => {

            file.open = async function () {
                this._writeStream = new Transform({
                    transform(chunk, encoding, callback) {
                        callback(null, chunk)
                    }
                })

                this._writeStream.on('error', e => {
                    form.emit('error', e)
                });

                // upload to S3
                new Upload({
                    client: new S3Client({
                        credentials: {
                            accessKeyId,
                            secretAccessKey
                        },
                        region
                    }),
                    params: {
                        ACL: 'private',
                        Bucket,
                        Key: `${Date.now().toString()}-${this.originalFilename}`,
                        Body: this._writeStream
                    },
                    tags: [], // optional tags
                    queueSize: 4, // optional concurrency configuration
                    partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
                    leavePartsOnError: false, // optional manually handle dropped parts
                })
                    .done()
                    .then(data => {
                        form.emit('data', {
                            name: "complete",
                            value: data
                        });
                    }).catch((err) => {
                        form.emit('error', err);
                    })
            }
        })
    })
}

module.exports = {
    uploadImage
};
