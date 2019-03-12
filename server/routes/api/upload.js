const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const path = require( 'path' );
const Media = require('../../models/Media');


module.exports = (app)  => {
  
   app.get('/api/media/:id', (req, res, next) => {
    Media.find({uploaded_by: req.params.id})
      .exec()
      .then((Media) => res.json(Media))
      .catch((err) => next(err));
  });


/**
 *  STORING STARTS
 */
const s3 = new aws.S3({
	accessKeyId: 'accesss key here',
	secretAccessKey: 'f scret here',
	Bucket: 'aws bucket name here'
});

/**
 * Single Upload
 */
const fileUpload = multer({
	storage: multerS3({
		s3: s3,
		bucket: 'aws bukcet name here',
		acl: 'public-read',
		key: function (req, file, cb) {
			cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
		}
	}),
	limits:{ fileSize: 20*1024*1024 }, // In bytes:  20 MB
/*	fileFilter: function( req, file, cb ){
		checkFileType( file, cb );
    }*/
}).single('file');

/**
 * Check File Type
 * @param file
 * @param cb
 * @return {*}
 */
function checkFileType( file, cb ){
	// Allowed ext
	const filetypes = /jpeg|jpg|png|gif|mp3|pdf|mp4|3gp|mov/;
	// Check ext
	const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());
	// Check mime
//	const mimetype = filetypes.test( file.mimetype );
	if(  extname ){
		return cb( null, true );
	} else {
		cb( 'Error: Invalid File!'+extname );
	}
}

 function getFileType(ext) {
    let type = null;
    switch(ext) {
        case (ext.match(/jpeg|jpg|png|gif/) || {}).input:
        type = "image";
        break;
        case (ext.match(/mp4|3gp|mov|flv/) || {}).input:
        type = "video";
        break;
        case (ext.match(/mp3/) || {}).input:
        type = "audio";
        break;
        case (ext.match(/pdf/) || {}).input:
        type = "pdf";
        break;
      default:
        break;
      }
      return type
 }

/**
 * @access public
 */
app.post( '/api/media/:id', ( req, res ) => {
	fileUpload( req, res, ( error ) => {
		console.log( 'requestOkokok', req.file );
		console.log( 'error', error );
		if( error ){
			console.log( 'errors', error );
			res.json( { error: error } );
		} else {
			// If File not found
			if( req.file === undefined ){
				console.log( 'Error: No File Selected!' );
				res.json( 'Error: No File Selected' );
			} else {
				// If Success
				const uploadedFileName = req.file.key;
                // Save the file name into database into profile model
                const media = new Media({
                    file_name: uploadedFileName,
                    file_type: getFileType( path.extname( uploadedFileName ).toLowerCase()),
                    uploaded_by: req.params.id,
                });
                media.save()
                .then((media) => res.json(media))
                .catch((err) => next(err));
			
			}
		}
	});
});

};
