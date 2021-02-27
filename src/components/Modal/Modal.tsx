import React, { useRef, useState } from 'react';
import './Modal.scss';
import rainSVG from '../../assets/images/rain.svg';
import cloudsSVG from '../../assets/images/clouds.svg';

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
        const { target } = event;
        if (target.files) setFile(target.files[0]);
    }
    const handleModalGeneralClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => event.stopPropagation()
    const hideModal = () => setModalVisible(false);

    console.log(file)
    return (
        <div className={`page-wrapper ${!modalVisible ? 'hide' : ''}`} onClick={hideModal}>
            <div className="modal" onClick={handleModalGeneralClick}>
                <div className="modal__topbar">
                    <button className="close-button" onClick={hideModal}>&#10006;</button>
                </div>
                <div className="divider" />
                <div className="upload-container__wrapper">
                    <div
                        className={`upload-container ${over ? "over" : ""}`}
                    >
                        <img className="upload-container__image" src={`${over ? rainSVG : cloudsSVG}`} alt="" />
                        <p className='title'>Drop your file here!</p>
                        <p className='sub-title text--grey'>Note, that only 1 at a time is allowed</p>
                        <p className='sub-title text--grey'>
                            and with extensions <span className='text text--blue'>.txt</span> or <span className='text text--blue'>.doc</span>
                        </p>
                        <input
                            style={{ display: "none" }}
                            type="file"
                            ref={inputRef}
                            onChange={onInputChange}
                        />
                        <div
                            onClick={onDropAreaClick}
                            onDrop={onDrop}
                            onDragOver={onDropOver}
                            onDragLeave={onDropLeave}
                            className="upload-container__mask"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
