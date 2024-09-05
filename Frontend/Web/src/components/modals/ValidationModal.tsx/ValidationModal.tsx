import React from 'react';

interface ValidationModalProps {
  setShowValidationModal: Function;
  onConfirm: () => void;
  onCancel: () => void;
}

const ValidationModal: React.FC<ValidationModalProps> = ({ setShowValidationModal, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80">
        <h2 className="text-lg font-semibold mb-4">Confirmer l'ajout</h2>
        <p className="mb-4">Êtes-vous sûr de vouloir ajouter cet article ?</p>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded"
            onClick={() => {
              onCancel();
              setShowValidationModal(false);
            }}
          >
            Annuler
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={() => {
              onConfirm();
              setShowValidationModal(false);
            }}
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ValidationModal;
