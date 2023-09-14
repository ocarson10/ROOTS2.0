import React, {useEffect, useState} from "react";
import "../../libs/style/TableTab.css";
//import { DataGrid } from "@mui/x-data-grid";
import { useNavigate, Link } from "react-router-dom";
import { DataGridPro } from '@mui/x-data-grid-pro';
import { Box } from "@mui/material";
import Checkbox from "./Checkbox";
import Toolbar from "./Toolbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileCirclePlus,
  faFileCircleMinus,
  faFilePen,
  faFilePdf,
  faFileExport
} from "@fortawesome/free-solid-svg-icons";
import { removeTree } from "../services/api-client/treeService";
import { removeCone } from "../services/api-client/coneService";
import { removeSeed } from "../services/api-client/seedService";
import { removeInitiation } from "../services/api-client/initiationService";
import { removeMaintenance } from "../services/api-client/maintenanceService"; 
import { removeMaturation } from "../services/api-client/maturationService";
import { removeColdTreatment } from "../services/api-client/coldTreatmentService";
import { removeGermination } from "../services/api-client/germinationService";
import { removeAcclimation } from "../services/api-client/acclimationService";
import { removeGreenhouse } from "../services/api-client/greenhouseService";
import { removeFieldstation } from "../services/api-client/fieldstationService";

/**
 * editLink="/edit/tree-material" addLink="/add/tree-material"  status={"active"} material={"tree"} rows={rows} columns={columns} loading={loading1} error={error}
 * @param {*} props broken down into many different parts
 * @param editLink edit link for the table
 * @param addLink add link for the table
 * @param status whether the table is storing active or inactive data
 * @param material what material the table is storing
 * @param rows the array of rows with the data in it
 * @param columns the array of column objects that defines the columsn
 * @param loading the loading state
 * @param error the error state
 * @returns 
 */
function TableComponent(props) {
  const [rows, setRows] = useState(props.rows);
  useEffect(() => {
    setRows(props.rows);
  }, [props.rows]);
  const navigate = useNavigate();
  const archiveData = async () => {
    console.log("Rows: " + selectedRows);
    for (let i = 0; i < selectedRows.length; i++) {
      console.log("Row: " + selectedRows[i]);
      console.log("Material: " + props.material);
      if (props.status === "active") {
        if (props.material === "tree") {
          console.log("tree");
          await removeTree(selectedRows[i])
            .then(() => {
              console.log("removed");
              rows.map((row) => row !== selectedRows[i]);
              setRows([...rows]);
              window.location.href = "/";
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (props.material === "cone") {
          await removeCone(selectedRows[i]).then(() => {
            console.log("removed");
            rows.map((row) => row !== selectedRows[i]);
            setRows([...rows]);
            window.location.href = "/";
          })
          .catch((error) => {
            console.log(error);
          });
        } else if (props.material === "seed") {
          await removeSeed(selectedRows[i]).then(() => {
            console.log("removed");
            rows.map((row) => row !== selectedRows[i]);
            setRows([...rows]);
            window.location.href = "/";
          })
          .catch((error) => {
            console.log(error);
          });
        } else if (props.material === "initiation") {
          await removeInitiation(selectedRows[i]).then(() => {
            console.log("removed");
            rows.map((row) => row !== selectedRows[i]);
            setRows([...rows]);
            window.location.href = "/";
          })
          .catch((error) => {
            console.log(error);
          });
        } else if (props.material === "maintenance") {
          await removeMaintenance(selectedRows[i]).then(() => {
            console.log("removed");
            rows.map((row) => row !== selectedRows[i]);
            setRows([...rows]);
            window.location.href = "/";
          })
          .catch((error) => {
            console.log(error);
          });
        } else if (props.material === "maturation") {
          await removeMaturation(selectedRows[i]).then(() => {
            console.log("removed");
            rows.map((row) => row !== selectedRows[i]);
            setRows([...rows]);
            window.location.href = "/";
          })
          .catch((error) => {
            console.log(error);
          });
        } else if (props.material === "treatment") {
          await removeColdTreatment(selectedRows[i]).then(() => {
            console.log("removed");
            rows.map((row) => row !== selectedRows[i]);
            setRows([...rows]);
            window.location.href = "/";
          })
          .catch((error) => {
            console.log(error);
          });
        } else if (props.material === "germination") {
          await removeGermination(selectedRows[i]).then(() => {
            console.log("removed");
            rows.map((row) => row !== selectedRows[i]);
            setRows([...rows]);
            window.location.href = "/";
          })
          .catch((error) => {
            console.log(error);
          });
        } else if (props.material === "acclimation") {
          await removeAcclimation(selectedRows[i]).then(() => {
            console.log("removed");
            rows.map((row) => row !== selectedRows[i]);
            setRows([...rows]);
            window.location.href = "/";
          })
          .catch((error) => {
            console.log(error);
          });
        } else if (props.material === "greenhouse") {
          await removeGreenhouse(selectedRows[i]).then(() => {
            console.log("removed");
            rows.map((row) => row !== selectedRows[i]);
            setRows([...rows]);
            window.location.href = "/";
          })
          .catch((error) => {
            console.log(error);
          });
        } else if (props.material === "fieldstation") {
          await removeFieldstation(selectedRows[i]).then(() => {
            console.log("removed");
            rows.map((row) => row !== selectedRows[i]);
            setRows([...rows]);
            window.location.href = "/";
          })
          .catch((error) => {
            console.log(error);
          });
        } 
      }
    }
  };

  const propagateData = async () => {
    console.log("Rows: " + selectedRows);
    for (let i = 0; i < selectedRows.length; i++) {
      console.log("Row: " + selectedRows[i]);
      console.log("Material: " + props.material);
      if (props.status === "active") {
        if (props.material === "tree") {
          console.log("tree");
          await removeTree(selectedRows[i])
            .then(() => {
              
              console.log("removed");
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (props.material === "cone") {
          await removeCone(selectedRows[i]).then(() => {
            
            console.log("removed");
          })
          .catch((error) => {
            console.log(error);
          });
        } else if (props.material === "seed") {
          await removeSeed(selectedRows[i]).then(() => {
            console.log("removed");
          })
          .catch((error) => {
            console.log(error);
          });
        } else if (props.material === "initiation") {
          await removeInitiation(selectedRows[i]).then(() => {
            console.log("removed");
          })
          .catch((error) => {
            console.log(error);
          });
        } else if (props.material === "maintenance") {
          await removeMaintenance(selectedRows[i]).then(() => {
            console.log("removed");
          })
          .catch((error) => {
            console.log(error);
          });
        } else if (props.material === "maturation") {
          await removeMaturation(selectedRows[i]).then(() => {
            console.log("removed");
          })
          .catch((error) => {
            console.log(error);
          });
        } else if (props.material === "treatment") {
          await removeColdTreatment(selectedRows[i]).then(() => {
            console.log("removed");
          })
          .catch((error) => {
            console.log(error);
          });
        } else if (props.material === "germination") {
          await removeGermination(selectedRows[i]).then(() => {
            console.log("removed");
          })
          .catch((error) => {
            console.log(error);
          });
        } else if (props.material === "acclimation") {
          await removeAcclimation(selectedRows[i]).then(() => {
            console.log("removed");
          })
          .catch((error) => {
            console.log(error);
          });
        } else if (props.material === "greenhouse") {
          await removeGreenhouse(selectedRows[i]).then(() => {
            console.log("removed");
          })
          .catch((error) => {
            console.log(error);
          });
        } else if (props.material === "fieldstation") {
          await removeFieldstation(selectedRows[i]).then(() => {
            console.log("removed");
          })
          .catch((error) => {
            console.log(error);
          });
        } 
      }
    }

    navigate(props.propagateLink + "/" + selectedRows[0]);
  }

  const [selectedRows, setSelectedRows] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  const handleSelection = (selection, other) => {
    console.log(selection, other);
    setSelectedRows(selection);
    // setNumSelected(selection.length);
  };

  const validUser = (
    <div className="operations-div">
      {selectedRows.length === 0 && props.status !== "archive" ? (
          <Link to={props.addLink}>
            <FontAwesomeIcon title="Add" className="icon" icon={faFileCirclePlus} />
          </Link>
        ) : (<div></div>)}
      {selectedRows.length >= 1 && props.status !== "archive" && props.material !== "location" && props.material !== "species" && props.material !== "geneticId" && props.material !== "population" ? (
          <a onClick={archiveData}>
            <FontAwesomeIcon title="Delete" className="icon" icon={faFileCircleMinus} />
          </a>
        ) : ( <div></div> )}
      {selectedRows.length === 1 && props.status !== "archive" ? (
          <Link to={props.editLink + "/" + selectedRows[0]}>
            <FontAwesomeIcon title="Edit" className="icon" icon={faFilePen} />
          </Link>
        ) : ( <div></div> )}
      {selectedRows.length === 1 && props.material !== "location" && props.material !== "species" && props.material !== "geneticId" && props.material !== "population" & (props.material === "tree" || props.material === "cone" || props.material === "seed") ? (
          <Link to={"/report/" + props.material + "/" + selectedRows[0]}>
            <FontAwesomeIcon title="View Report" className="icon" icon={faFilePdf} />
          </Link>
        ) : <div></div>}
      {selectedRows.length === 1 && props.status !== "archive" && (props.material === "seed" || props.material === "initiation" || props.material === "maintenance" || props.material === "maturation" || props.material === "treatment" || props.material === "germination" || props.material === "acclimation" || props.material === "greenhouse" || props.material === "acclimation" || props.material === "fieldstation")  ? ( //TODO: add other materials
          <a onClick={propagateData}>
            <FontAwesomeIcon title="Propagate" className="icon" icon={faFileExport} />
          </a>
        ) : <div></div>}
      
    </div>
  )

  const StripedDataGrid = DataGridPro;

  return (
    <Box
      sx={{
        backgroundColor: "#aaaaaa",
        height: "fit-content",
        width: "100%",
        marginTop: "10px",
        "& .headerStyle": {
          backgroundColor: "#dddddd",
        },
      }}
    >
      <StripedDataGrid
        sx={{
          height: "405px",
        }}
        rows={rows}
        columns={props.columns}
        checkboxSelection
        pagination
        onRowSelectionModelChange={handleSelection}
        // pageSize={5}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        slots={{
          toolbar: Toolbar,
          baseCheckbox: Checkbox,
        }}
        //New code
        initialState={{
          sorting: {
            sortModel: [{ field: "active", sort: "desc" }],
          },
          pagination: { 
            paginationModel: { pageSize: 5 } 
          },        
        }}
        pageSizeOptions={[5, 10, 25]}
      />

      <div className="operations-div">
        { user.role !== "user" ? validUser : (
          selectedRows.length === 1 ? (
            <a href={"/report/" + props.material + "/" + selectedRows[0]}>
              <FontAwesomeIcon title="View Report" className="icon" icon={faFilePdf} />
            </a>
          ) : <div></div>
        )}
        {/*Error message*/}
        {props.loading ? (
          <div className="message-div"></div>
        ) : props.error ? (
          <div className="message-div">Error: {props.error.message}</div>
        ) : (
          <div></div>
        )}
      </div>
    </Box>
  );
}

export default TableComponent;