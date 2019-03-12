import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import Spinner from '../Shared/Spinner';

class FileUpload extends Component {
    constructor( props ) {
		super( props );
		this.state = {
            selectedFile: null,
             loading: false
		}
	}

	singleFileChangedHandler = ( event ) => {
		this.setState({
			selectedFile: event.target.files[0]
		});
	};

    singleFileUploadHandler = ( event ) => {
        const data = new FormData();
        this.setState({
			loading: true
		});
		if ( this.state.selectedFile ) {
			data.append( 'file', this.state.selectedFile, this.state.selectedFile.name );
                axios.post(`/api/media/${localStorage.getItem('selected_user') || 1}`, data, {
                    headers: {
                        'accept': 'application/json',
                        'Accept-Language': 'en-US,en;q=0.8',
                        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                    }
                }).then( ( response ) => {
                    this.setState({
                        loading: false
                    });
					if ( 200 === response.status ) {
						// If file size is larger than expected.
						if( response.data.error ) {
							if ( 'LIMIT_FILE_SIZE' === response.data.error.code ) {
								this.ocShowAlert( 'File size is too much large', 'danger' );
							} else {
								console.log( response.data );
								// If not the given file type
								this.ocShowAlert( response.data.error, 'danger' );
							}
						} else {
							// Success
							let fileName = response.data;
							console.log( 'filedata', fileName );
							this.ocShowAlert( 'File Uploaded', 'success' );
						}
					}
				}).catch( ( error ) => {
                // If another error
                this.setState({
                    loading: false
                });
				this.ocShowAlert( error, 'danger' );
			});
		} else {
			this.setState({
				loading: false
			});
			// if file not selected throw error
			this.ocShowAlert( 'Please upload file', 'danger' );
		}
    };
    
    	// ShowAlert Function
	ocShowAlert = ( message, background = 'primary' ) => {
		let alertContainer = document.querySelector( '#oc-alert-container' ),
			alertEl = document.createElement( 'div' ),
			textNode = document.createTextNode( message );
		alertEl.setAttribute( 'class', `alert alert-${background}` );
		alertEl.appendChild( textNode );
		alertContainer.appendChild( alertEl );
		setTimeout( function () {
			$( alertEl ).fadeOut( 'slow' );
			$( alertEl ).remove();
		}, 3000 );
    };
    
    render() { 
        return ( 
            <div className="container">
                <div id="oc-alert-container"></div>
				{/* Single File Upload*/}
				<div className="card border-light mb-3 mt-5" style={{ boxShadow: '0 5px 10px 2px rgba(195,192,192,.5)' }}>
					<div className="card-header">
						<h3 style={{ color: '#555', marginLeft: '12px' }}>File Upload</h3>
					</div>
                   
					<div className="card-body">
						<p className="card-text">
                        Please choose your file (image, audio, video, pdf).</p>
                        { this.state.loading ? <Spinner /> :
                            <>
                            <input type="file" onChange={this.singleFileChangedHandler}/>
                            <div className="mt-5">
                                <button className="btn btn-info" onClick={this.singleFileUploadHandler}>Upload!</button>
                            </div>
                            </>
                        }
					</div>
                    
				</div>
            </div>
         );
    }
}
 
export default FileUpload;