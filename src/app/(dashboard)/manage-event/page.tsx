import React, { Suspense } from 'react';
import ManageGrid from '../_components/Manage/ManageGrid';

const ManageEventPage = () => {
    return (
        <div>
            <Suspense fallback={<p>Loading.....</p>}>
                <ManageGrid/>
            </Suspense>
        </div>
    );
};

export default ManageEventPage;