//our-domain.com/new-meetup
//import Layout from "../../components/layout/Layout";
import { Fragment } from "react";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from "next/head";

function NewMeetupPage() {
  const router = useRouter();

  async function addMeetupHandler(enteredMeetupData) {
    //here we need an internal API,
    //which will be hosted by the same server as is being used for serving this page.

    const response = await fetch("/api/new-meetup", {
      // --> '/api/new-meetup' - file name (from api file)
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json(); //--> now we don't need it so can just console.log() down here
    console.log(data);

    router.push("/");
  }

  return (
    <Fragment>
      <Head>
        <title>Add new meetups</title>
        <meta
          name="description"
          content="Add a new meetups for any event or anything else you like..."
        ></meta>
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}

export default NewMeetupPage;
