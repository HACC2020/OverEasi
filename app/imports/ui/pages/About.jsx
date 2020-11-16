import React from 'react';
import { Grid, Icon, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class About extends React.Component {
  render() {
    return (
          <Grid container centered>
            <Grid.Row>
              <Grid.Column textAlign='center'>
                <Icon name='check circle' size='huge' inverted />
                <Header as='h1' inverted>Goal</Header>
                <Header as='h3' inverted>The goal of this application is to provide the community a one-stop-shop for COVID-19 information related to Hawaii.
                  While there are great sources on the Internet such as the
                  <a color='white' href=' https://hawaiicovid19.com/'> COVID-19 State of Hawaii Portal </a>
                  and the
                  <a href='https://health.hawaii.gov/coronavirusdisease2019/'> State of Hawaii Department of Health Disease Outbreak Control Division </a>
                  that provide users with updated information and statistics on the current COVID-19 situation here in Hawaii, the data is often spread across several sub pages.
                  Our Chatbox consolidates the information for the user and answers their specific questions.
                </Header>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column textAlign='center'>
                <Icon name='talk' size='huge' inverted/>
                <Header as='h1' inverted>Feedback</Header>
                <Header as='h3' inverted>Team OverEasi is always looking for ways to grow and improve or Chatbox.
                  If you have any thoughts or recommendations, we would appreciate it if you took the time to fill out
                  <a href='https://docs.google.com/forms/d/e/1FAIpQLSfKiap-pzjMusGuSkQ-0-TxT3dWRsufpFz8Dt9r2gEDj4eLyA/viewform'>our Google Forms survey</a>
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
    );
  }
}

export default About;
