import { deleteFile } from "../services/api-client/fileService";

const FileList = ({ files }) => {
    const handleDelete = async (file) => {
        const response = await deleteFile(file.fileId);
    
        if(response.status !== 200) {
            console.log(`Error deleting file with id: ${file.fileId}`);
        }
    }

    return (
        <div>
            <h1>File List</h1>
            {files.map((file) => (
                <div key={file.fileId}>
                    <a href={`${file.fileData}`} download={`${file.fileName}`}>
                        {file.fileName}
                    </a>
                    <button onClick={() => handleDelete(file)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default FileList;