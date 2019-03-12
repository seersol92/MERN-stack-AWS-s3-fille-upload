import React, { Component } from 'react';
import 'whatwg-fetch';
import SideBar from '../Shared/SideBar';

import { Document, Page } from 'react-pdf';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counters: [],
      images:[],
      videos:[],
      audios:[],
      pdf:[],
      numPages: null,
      pageNumber: 1,
    };
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  componentDidMount() {
    fetch(`/api/media/${localStorage.getItem('selected_user') || 1}`)
      .then(res => res.json())
      .then(json => {
        const images = json.filter(files => files.file_type == 'image');
        const videos = json.filter(files => files.file_type == 'video');
        const audios = json.filter(files => files.file_type == 'audio');
        const pdf = json.filter(files => files.file_type == 'pdf');
        console.log(images); 
        this.setState({
         images,
         videos,
         audios,
         pdf
        });
      });
  }

  render() {
    const { pageNumber, numPages } = this.state;
    return (
      <>
    
       <div className="col-2">
          <SideBar 
          images={this.state.images} videos={this.state.videos} audios={this.state.audios} pdf={this.state.pdf}
          />
        </div>
        <div className="col-10">
          <div className="card border-primary mb-3">
            <div className="card-header">Images[{this.state.images.length}]</div>
            <div className="card-body">
              <ul>
            { this.state.images.map((image, i) => (
              <li key={i}>
                <span className="float-left"> 
                <img src={`https://s3.ap-south-1.amazonaws.com/seersol/${image.file_name}`} width={500} height={300} />
                </span>
                <span className="float-right"> {image.uploaded_on}</span>
              </li>
            )) }
          </ul>
            </div>
          </div>
     
       
          <div className="card border-primary mb-3">
            <div className="card-header">Videos[{this.state.videos.length}]</div>
            <div className="card-body">
              <ul>
            { this.state.videos.map((video, i) => (
              <li key={i}>
              <video 
              width={320} height={240}
              controls>
                <source type="video/mp4" data-reactid=".0.1.0.0.0" src={`https://s3.ap-south-1.amazonaws.com/seersol/${video.file_name}`} />
              </video>
                <span className="float-right"> {video.uploaded_on}</span>
              </li>
            )) }
          </ul>
            </div>
          </div>
       

      
          <div className="card border-primary mb-3">
            <div className="card-header">Audio[{this.state.audios.length}]</div>
            <div className="card-body">
              <ul>
            { this.state.audios.map((audio, i) => (
              <li key={i}>
              <audio controls>
                <source  src={`https://s3.ap-south-1.amazonaws.com/seersol/${audio.file_name}`} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
                <span className="float-right"> {audio.uploaded_on}</span>
              </li>
            )) }
          </ul>
            </div>
          </div>
       
          <div className="card border-primary mb-3">
            <div className="card-header">PDF[{this.state.pdf.length}]</div>
            <div className="card-body">
              <ul>
            { this.state.pdf.map((pd, i) => (
              <li key={i}>
              <span className="float-left">
              <Document
              scale="0.5"
              height='10'
              width='10'
                file={`https://s3.ap-south-1.amazonaws.com/seersol/${pd.file_name}`}
                onLoadSuccess={this.onDocumentLoadSuccess}
              >
                <Page pageNumber={pageNumber} />
              </Document>
        
               </span>
                <span className="float-right"> {pd.uploaded_on}</span>
              </li>
            )) }
          </ul>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
