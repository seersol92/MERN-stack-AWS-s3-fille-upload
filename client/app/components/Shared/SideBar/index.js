
import React from 'react';

import { Link } from 'react-router-dom';

const SideBar = (props) => (
<ul className="list-group">
  <li className="list-group-item d-flex justify-content-between align-items-center">
    Audios
    <span className="badge badge-primary badge-pill">{props.audios.length}</span>
  </li>
  <li className="list-group-item d-flex justify-content-between align-items-center">
    Videos
    <span className="badge badge-primary badge-pill">{props.videos.length}</span>
  </li>
  <li className="list-group-item d-flex justify-content-between align-items-center">
    Images
    <span className="badge badge-primary badge-pill">{props.images.length}</span>
  </li>
  <li className="list-group-item d-flex justify-content-between align-items-center">
    Pdf
    <span className="badge badge-primary badge-pill">{props.pdf.length}</span>
  </li>
</ul>
);

export default SideBar;