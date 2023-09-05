import React, { useEffect, useState } from 'react';
import { getPopulations } from '../services/api-client/populationService';
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
      await getPopulations()
        .then(async (res) => {
          for (let location in res.data) {
            let obj = {
              populationId: res.data[location].id,
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
    id: row.populationId,
    populationId: row.populationId,
  }));

  const columns = [
    {
      field: 'populationId',
      headerName: 'Population',
      width: 200,
    },
  ];

  return (
    <div>
      {data ? <TableComponent editLink="/edit/population" addLink="/add/population" rows={rows} columns={columns} user={props.user}/> : <p></p>}
    </div>
  )
}

export default LocationTab