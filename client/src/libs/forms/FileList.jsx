import { useState, useEffect } from 'react';
import { deleteFile } from "../services/api-client/fileService";

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
} 

const FileList = ({ files }) => {
    const [fileDeleteSuccess, setFileDeleteSuccess] = useState(false);

    useEffect(() => {
        async function clearDeleteMessage() {
            delay(4000);
            setFileDeleteSuccess(false);
        };

        clearDeleteMessage();
    }, [fileDeleteSuccess]);

    const handleDelete = async (fileId) => {
        const response = await deleteFile(fileId);
    
        if(response.status !== 200) {
            console.log(`Error deleting file with id: ${fileId}`);
        } else {
            setFileDeleteSuccess(true);
        }
    }

    return (
        <>
            <h1>Files</h1>
            {files.map(x => {
                return (
                    <>
                        <a href={x.fileData}> </a>
                        <button onClick={handleDelete}>Delete</button>
                    </>  
                )
            })}
        </>
    );

}

export default FileList;