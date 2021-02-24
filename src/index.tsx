import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Modal } from './components/Modal/index';

function App() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <div className="page">
      <div className="page__content">
        <button
          onClick={() => setModalVisible((prevState) => !prevState)}
        >Upload</button>
        {modalVisible && <Modal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible} />}
      </div>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
