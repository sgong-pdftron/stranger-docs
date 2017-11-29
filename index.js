import React from 'react';
import { withPrefix } from 'gatsby-link';

import Link from '../components/Link';

import './index.scss';

export default () => (
  <div className='pages-index'>
    <div className='row'>
      <div className='col'>
        <h1><Link to='/webviewer'>WebViewer</Link></h1>
        <p><Link to='/webviewer/guides'>Guides</Link></p>
        <p><Link to='https://www.pdftron.com/webviewer/demo/doc/PDFTron.WebViewer.html'>API</Link></p>
        <p><Link to='/webviewer/changelog'>Changelog</Link></p>
      </div>
      <div className='col'>
        <h1><Link to='/android'>Android</Link></h1>
        <p><Link to='/android/guides'>Guides</Link></p>
        <p><Link to='https://www.pdftron.com/pdfnet/mobile/docs/Android/index.html'>API</Link></p>
      </div>
      <div className='col'>
        <h1><Link to='/ios'>iOS</Link></h1>
        <p><Link to='/ios/guides'>Guides</Link></p>
        <p><Link to='https://www.pdftron.com/pdfnet/mobile/docs/iOS/src/index.html'>API</Link></p>
      </div>
    </div>
  </div>
);