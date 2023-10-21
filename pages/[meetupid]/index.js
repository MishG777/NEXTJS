import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description}></meta>
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        alt="A First meetup"
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
        id={props.meetupData.id}
      />
    </Fragment>
  );
}

export async function getStaticPaths(a) {
  //console.log(a);
  const client = await MongoClient.connect(
    "mongodb+srv://mikheilgibradze1:ZxndoWeEUNme78RH@cluster0.efoludq.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetupsCol");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: "blocking", //true or false
    //difference between true and blocking
    //with true it will imeddiatelly return an empty page, and then pull down dunamically generated content
    // once thats done, so we need to handle thats case, that the page doesn't have the data yet.

    //with "blocking" --> the user won't see anything (any error) untill the page was pre-generated and the finished page will be served
    paths: meetups.map((meetup) => ({
      params: { meetupid: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  //fetch data for a single meetup

  const meetupId = context.params.meetupid;
  //console.log(meetupId);

  const client = await MongoClient.connect(
    "mongodb+srv://mikheilgibradze1:ZxndoWeEUNme78RH@cluster0.efoludq.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetupsCol");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
