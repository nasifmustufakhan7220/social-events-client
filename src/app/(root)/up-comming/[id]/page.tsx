import React, { Suspense } from 'react';
import EventDetails from '../../_components/EventDetails/EventDetailsCard';
import EventDetailsSkeleton from '../../_components/EventDetails/EventDetailsSkeleton';

const EventDetailsPage = ({params}:{params:Promise<{id:string}>}) => {
    return (
        <div>
            <Suspense fallback={<EventDetailsSkeleton/>}>
                <EventDetails params={params} />
            </Suspense>
        </div>
    );
};

export default EventDetailsPage;