import React, { Fragment } from 'react'
import spinnerGif from './spinner.gif'

const Spinner = () => (
    <Fragment>
        <img
            src={spinnerGif}
            style={{ width: '200px', margin: 'auto', display: 'block' }}
            alt='Loading...'
        />
    </Fragment>
)

export default Spinner