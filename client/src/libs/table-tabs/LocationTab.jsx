import React, { useEffect, useState } from 'react';
import { getLocations } from '../services/api-client/locationService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import TableComponent from './TableComponent';
import '../style/TableTab.css';


function LocationTab(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadLocations() {
      let tempArray = [];
      await getLocations()
        .then(async (res) => {
          for (let location in res.data) {
            let obj = {
              location: res.data[location].location,
              shorthand: res.data[location].shorthand,
            }
            tempArray.push(obj);
          }
          setData(tempArray);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
    loadLocations();
  }, []);

  const rows = data.map((row) => ({
    id: row.location,
    location: row.location,
    shorthand: row.shorthand,
  }));

  const columns = [
    {
      field: 'location',
      headerName: 'Location',
      width: 200,
    },
    {
      field: 'shorthand',
      headerName: 'Shorthand',
      width: 200,
    },
  ];

  return (
    <div>
      {data ? <TableComponent editLink="/edit/location" addLink="/add/location" status={"active"} material={"location"} rows={rows} columns={columns} loading={loading} error={error} user={props.user}/> : <p></p>}
    </div>
  )
}

export default LocationTab