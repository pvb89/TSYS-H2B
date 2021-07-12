import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './src/images');
    },
    filename: (req, file, callback) => {
        callback(null, 'test-img.jpg');
    },
});

const imageFileFilter = (req: any, file: any, callback: any) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return callback(new Error('You can upload only image files'), false);
    }
    callback(null, true);
};

export const upload = multer({ storage, fileFilter: imageFileFilter });
