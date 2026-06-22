import { useState, useEffect, useRef } from "react";
import { add_file, delete_file } from "../api/files";
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

    // handle add file API endpoint
    const handleAdd = async (e) => {
        //Retrieve the file from the input event object
        const newFile = e.target.files[0]

       // Check if there is a file, if false exit function
        if (!newFile) return;

        // Store file data and paramaters
        const file_data = {
            portfolio_id: portfolioID,
            file_purpose: purposeLabel
        };

        // check if a project id is provided, if true add it to the request parameters
        if (projectID != null) {
            file_data.project_id = projectID
        }

        try {
            // call add file API endpoint and add file
            await add_file(file_data, newFile)
            refresh();
        } catch (error) {
            //alert user in case of an error
            alert("something went wrong")
            console.log(error)
        }
    }

    // handle calling the delete API endpoint
    const handleDelete = async (file_id) => {
        try {
            // call delete file API endpoint and pass the file id
            await delete_file(file_id)
            refresh()
        } catch (error) {
            //alert user in case of an error
            alert("something went wrong")
            console.log(error)
        }
    }


    return (
        <div className="gallery">
            <input type="file" name={purposeLabel} accept={acceptFiles} ref={FileInputRef} style={{ display: 'none' }} onChange={handleAdd} disabled={!canEdit} />
            <div>

                <div>
                    {canEdit && <>
                        <button onClick={() => FileInputRef.current.click()}>
                            Add
                        </button>

                        <button onClick={() => handleDelete(currentFile.id)}>
                            Delete
                        </button>
                    </>}

                    {
                        (!files.length) ? <p> No files found </p> :
                            <> <button onClick={prevIndex}> ◀ </button>
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

                                <button onClick={nextIndex}> ▶ </button> </>
                    }

                </div>

            </div>

        </div>
    )

}