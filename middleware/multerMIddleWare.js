const multer = require('multer');
const fs = require('fs');

// Ensure the upload directory exists
const uploadDir = './upload';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Disk storage engine
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, uploadDir);
    },
    filename: (req, file, callBack) => {
        const filename = `image-${Date.now()}-${file.originalname}`;
        callBack(null, filename);
    }
});

// File filter
const fileFilter = (req, file, callBack) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        callBack(null, true);
    } else {
        callBack(null, false);
        return callBack(new Error('Only PNG, JPG, and JPEG files are allowed.'));
    }
};

// Multer configuration
const multerConfig = multer({
    storage,
    fileFilter
});

module.exports = multerConfig;
