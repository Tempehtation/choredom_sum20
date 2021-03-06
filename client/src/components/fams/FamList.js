import React from 'react';
import { Link } from 'react-router-dom';

const FamList = ({ fams }) => (
  <>
    <h1>Families:</h1>
    {
      fams.map( f => 
        <>
          <Link to={{
            pathname: `/fams/${f.id}`,
            state: {...f}
          }}>
            { f.name }
          </Link>
          <br />
        </>
      )
    }
  </>
)

export default FamList;