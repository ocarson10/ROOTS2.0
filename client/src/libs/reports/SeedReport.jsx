import React, { useState, useEffect } from "react";
import { getSeed } from "../services/api-client/seedService"; // TODO: find seed function
import { getId } from "../services/api-client/idService";
import QRCodeGenerator from "../qr/QRGenerator";

function SeedReport(props) {
  //get a seed from the database
  const [seed, setSeed] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadSeed() {

    //get seed
    await getSeed(props.id)
      .then(async (res) => {
        let obj = {
          id: res.data.seedId,
          motherId: res.data.motherId,
          coneId: res.data.coneId,
          fatherTreeId: res.data.fatherTreeId,
          progenyId: res.data.progenyId,
          seedGeneticId: res.data.geneticId,
          origin: res.data.origin,
          quantity: res.data.quantity,
          dateMade: res.data.dateMade,
          location: res.data.locationId,
          active: res.data.active
        };
        await getId(res.data.seedGeneticId) 
            .then((res2) => {
                obj.geneticId =
                    "P" +
                    res2.data.populationId +
                    "_" +
                    res2.data.familyId +
                    "_" +
                    res2.data.geneticId +
                    "_" +
                    res2.data.progenyId;
                obj.species = res2.data.species;
                })
            .catch((error) => {
                setError(error);
            });

        setSeed(obj);

      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });

    }

    loadSeed();
  }, [props.id]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div id="pdf-element" className="pdf-div">
        <div className="info-box">
          <h2>Seed Report</h2>
          <div className="param">
            <h3 className="h3-report">Seed Genetic ID</h3>
            <p>{seed.geneticId}</p>
          </div>
          <div className="param">
            <h3 className="h3-report">Seed ID</h3>
            <p>{props.id}</p>
          </div>
          <div className="param">
            <h3 className="h3-report">Parent IDs</h3>
            <p>Mother ID: {seed.motherId || "--"}</p>        
            <p>Father ID: {seed.fatherTreeId || "--"}</p>        
          </div>
          {/* <div className="param">
            <h3 className="h3-report">Seed Progeny ID</h3>
            <p>{seed.progenyId || "--"}</p>        
          </div> */}
          <div className="param">
            <h3 className="h3-report">Seed Cone ID</h3>
            <p>{seed.coneId || "--"}</p>        
          </div>
          <div className="param">
            <h3 className="h3-report">Location</h3>
            <p>From: {seed.origin || "--"}</p>
            <p>Location: {seed.location}</p>
          </div>
          <div className="param">
            <h3 className="h3-report">Quantity</h3>
            <p>{seed.quantity || "--"}</p>
          </div>
          <div className="param">
            <h3 className="h3-report">Date Made</h3>
            <p>{seed.dateMade || "--"}</p>
          </div>
          <div className="param">
            <h3 className="h3-report">Active: {seed.active ? '✔' : '✖'}</h3>
          </div>
        </div>
        <div className="info-box qr-box">
          <QRCodeGenerator className="qrcode" id={props.id} type={props.type}/>
        </div>
      </div>
    </div>
  );
}

export default SeedReport;
