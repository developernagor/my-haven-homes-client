import React from 'react';
import Banner from './Banner';
import Advertisement from './Advertisement'
import LatestReview from './LatestReview'
import MeetOurAgent from './MeetOurAgent';
import ContactForm from './ContactForm';

function Home() {
    return (
        <div>
            <Banner></Banner>
            <Advertisement></Advertisement>
            <LatestReview></LatestReview>
            <MeetOurAgent></MeetOurAgent>
            <ContactForm></ContactForm>
        </div>
    );
}

export default Home;