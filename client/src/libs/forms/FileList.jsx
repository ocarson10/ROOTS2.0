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
                <div class="upload" key={file.fileId}>
                    <div class="file-upload">
                    <a className='file-list-text' href={`${file.fileData}`} download={`${file.fileName}`}>
                        {file.fileName}
                    </a>
                     </div>
                    <button className="file-list-btn" onClick={() => handleDelete(file)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default FileList;
