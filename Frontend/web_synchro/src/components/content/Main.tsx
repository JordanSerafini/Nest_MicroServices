import { useEffect, useState } from "react";
import { checkAll, syncAll } from "../../utils/function";

interface VerificationData {
    itemResponse: {
        mssqlCount: number;
        pgCount: number;
    };
    customerResponse: {
        mssqlCount: number;
        pgCount: number;
    };
}

function Main() {
    const [syncStatus, setSyncStatus] = useState(false);
    const [verificationData, setVerificationData] = useState<VerificationData | null>(null);
    const [syncNeeded, setSyncNeeded] = useState(false);

    useEffect(() => {
        check();
    }, []);

    const check = async () => {
        try {
            const response = await checkAll();
            console.log(response);
            setVerificationData(response);

            const itemDiff = response.itemResponse.mssqlCount !== response.itemResponse.pgCount;
            const customerDiff = response.customerResponse.mssqlCount !== response.customerResponse.pgCount;

            if (itemDiff || customerDiff) {
                setSyncNeeded(true);
            } else {
                setSyncNeeded(false);
            }

            setSyncStatus(true); 
        } catch (error) {
            console.error('Error verifying synchronization', error);
            setSyncStatus(false);
        }
    };

    const sync = async () => {
        try {
            await syncAll();
            alert("Synchronisation terminée avec succès !");
            setSyncNeeded(false);
        } catch (error) {
            console.error('Error during synchronization', error);
        }
    };

    return (
        <div className="w-screen h-full flex items-start justify-center p-4">
            <div className="p-4 bg-gray-100 shadow-md rounded">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    onClick={check}
                >
                    Vérification
                </button>

                <p className="mt-4 text-lg">
                    {syncStatus ? 'Vérification terminée' : 'Vérification en cours...'}
                </p>

                {verificationData && (
                    <div className="mt-4 p-4 bg-white rounded shadow">
                        <h2 className="font-bold text-xl mb-2">Résultats de la vérification :</h2>
                        <div className="mb-4">
                            <h3 className="font-bold">Item Counts</h3>
                            <p>Ebp: {verificationData.itemResponse.mssqlCount}</p>
                            <p>PostgreSQL: {verificationData.itemResponse.pgCount}</p>
                        </div>
                        <div className="mb-4">
                            <h3 className="font-bold">Customer Counts</h3>
                            <p>Logiciel Ebp: {verificationData.customerResponse.mssqlCount}</p>
                            <p>PostgreSQL: {verificationData.customerResponse.pgCount}</p>
                        </div>

                        {syncNeeded && (
                            <div className="mt-4">
                                <p className="text-red-600">Différence détectée entre Ebp et PostgreSQL !</p>
                                <button
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 mt-2"
                                    onClick={sync}
                                >
                                    Synchroniser maintenant
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Main;
