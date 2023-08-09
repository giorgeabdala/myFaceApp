import React from 'react';
import dynamic from 'next/dynamic';

const ClientListChacra = dynamic(
    () => import('@/app/components/ClientListChacraUi/clientListChacra'),
    { ssr: false }
);

function TempPage() {
    return (
        <div>
            <React.StrictMode>
                <ClientListChacra />
            </React.StrictMode>
        </div>
    );
}

export default TempPage;
