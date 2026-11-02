import React, { Suspense } from 'react';
import EventDetails from '../../_components/EventDetails/EventDetailsCard';

const EventDetailsPage = ({params}:{params:Promise<{id:string}>}) => {
    return (
        <div>
            <Suspense fallback={<p>Loading....</p>}>
                <EventDetails params={params} />
            </Suspense>
        </div>
    );
};

export default EventDetailsPage;