import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";

import { Fragment } from "react";
import Head from "next/head";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="This text will be shown as a text under our page URL when it will be searched. in google for example"
        ></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

//export async function getServerSideProps(context){
//  const req = context.req;
//  const res = context.res;

//  //fetch data from API
//  //thats server side code
//  return {
//    props: {
//      meetups: DUMMY_MEETUPS
//    }
//  }
//}

export async function getStaticProps() {
  //fetch data from API
  //always need to return object

  const client = await MongoClient.connect(
    "mongodb+srv://mikheilgibradze1:ZxndoWeEUNme78RH@cluster0.efoludq.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetupsCol");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    //it has to be named props
    props: {
      //this props object, hold another object
      //which will be the props object we recieve in our component function (HomePage())

      //meetups --> which we are fetching from MongoDb
      meetups: meetups.map((meetups) => ({
        title: meetups.title,
        address: meetups.address,
        image: meetups.image,
        id: meetups._id.toString(),
      })),
    },
    revalidate: 1, // number of seconds
  };
}

export default HomePage;
