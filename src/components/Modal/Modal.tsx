import React, { useRef, useState } from 'react';
import './Modal.scss';

interface IModalProps {
    modalVisible: boolean,
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const Modal = ({ modalVisible, setModalVisible }: IModalProps) => {
    const inputRef = useRef<null | HTMLInputElement>(null);
    const [over, setOver] = useState<boolean>(false);
    const [file, setFile] = useState<null | File>(null);

    const onDropAreaClick = () => {
        return inputRef.current ? inputRef.current.click() : null;
    }
    const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        console.log(event)
        setFile(event.dataTransfer.files[0]);
        setOver(false);

    }
    const onDropOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setOver(true);
    }
    const onDropLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setOver(false);
    }

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {target} = event;
        if (target.files) setFile(target.files[0]);
    }

    return (
        <div
            onClick={onDropAreaClick}
            onDrop={onDrop}
            onDragOver={onDropOver}
            onDragLeave={onDropLeave}
            className={over ? "upload-container over" : "upload-container"}
        >
            <h2>Upload files here!</h2>
            <input
                style={{ display: "none" }}
                type="file"
                ref={inputRef}
                onChange={onInputChange}
            />
        </div>
    )
}
