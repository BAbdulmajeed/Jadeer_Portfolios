import { useState, useEffect, useRef } from "react";
import { add_file, delete_file } from "../api/files";
import useFileUpload from "../hooks/useFilesUpload";
import useFileDelete from "../hooks/useFileDelete";

export default function Gallery({ initialFiles = [], canEdit, purposeLabel, acceptFiles, portfolioID, projectID = null, refresh }) {

    const [index, setIndex] = useState(0)
    const [files, setFiles] = useState([]);
    const FileInputRef = useRef(null);

    // Reset files and index whenever initialFiles changes
    useEffect(() => {
        setFiles(initialFiles);
        setIndex(0);
    }, [initialFiles]);


    // gallery right arrow button controller, moves to the next image
    const nextIndex = () => {
        setIndex(prev => (prev + 1) % files.length)
    }

    // gallery left arrow button controller, moves to the previous image
    const prevIndex = () => {
        setIndex(prev => prev === 0 ? files.length - 1 : prev - 1)
    }

    // set current file based on index
    const currentFile = files.length > 0 ? files[index] : null;

    const {
        handleFileChange
    } = useFileUpload(
        files,
        portfolioID,
        projectID,
        refresh
    );


    const {
        handleDelete
    } = useFileDelete(refresh);


    return (
        <div className="gallery">
            <input type="file" name={purposeLabel} accept={acceptFiles} ref={FileInputRef} style={{ display: 'none' }} onChange={handleFileChange} disabled={!canEdit} />
            <div>

                <div>
                    {canEdit && <>
                        <div>
                            <button onClick={() => FileInputRef.current.click()}>
                                Add
                            </button>

                            { (!files.length) ? null : <button onClick={() => handleDelete(currentFile.id)}>
                                Delete
                            </button> }
                            

                        </div>
                    </>}

                    {
                        (!files.length) ? <p>  </p> :
                            <>
                                {
                                    (currentFile?.mime_type?.startsWith("image/")) ?
                                        <img
                                            src={`http://localhost:8000/${currentFile.storage_path}`}
                                            alt={currentFile.file_name || "file"}
                                            className="gallery-media-img"
                                        /> : <iframe
                                            src={`http://localhost:8000/${currentFile.storage_path}`}
                                            className="gallery-media-iframe"
                                            title="PDF preview"
                                        />

                                }
                                <div>
                                    <button onClick={prevIndex}> ◀ </button>
                                    <button onClick={nextIndex}> ▶ </button>
                                </div>

                            </>
                    }

                </div>

            </div>

        </div>
    )

}