import React, { useEffect } from "react";
import { Container, Grid, Typography, useMediaQuery } from "@material-ui/core";

import Footer from "./Footer";

function Terms() {
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {" "}
      <Container>
        <Grid>
          <Typography
            variant={matches ? "h2" : "h4"}
            color="primary"
            style={{ fontWeight: "bold", textAlign: "center" }}
          >
            Privacy Policy
          </Typography>
        </Grid>
        <Grid
          style={{
            width: "100%",
            padding: "20px",
            textAlign: "justify",
          }}
          container
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid container>
            <Grid item>
              <ul>
                <li style={{ color: "#006ba6", marginLeft: -25 }}>
                  <Typography variant={matches ? "h5" : "h6"} color="primary">
                    While using Lightbox, you’re trusting us with your information. It is our responsibility to protect it and put you in control.
                  </Typography>
                </li>
              </ul>
            </Grid>

            {/* <Grid item>
            <Typography variant="body1" component="p" color="primary">
              
            </Typography>
          </Grid> */}
          </Grid>
          <Grid container>
            <Grid item>
              <ul>
                <li style={{ color: "#006ba6", marginLeft: -25 }}>
                  <Typography variant={matches ? "h5" : "h6"} color="primary">
                    Things you create or provide to us
                  </Typography>{" "}
                </li>
              </ul>
            </Grid>

            <Grid item>
              <Typography variant="body1" component="p">
                When you create an Account on Lightbox, you provide us with personal information that includes your email address and a password. You are also adding some academic information to your account. We also collect the content you create, upload, or receive from others when using our system. This includes things like posts you write and receive, photos and videos you share, documents and blogs you create, and comments you make on other Posts.
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <ul>
                <li style={{ color: "#006ba6", marginLeft: -25 }}>
                  <Typography variant={matches ? "h5" : "h6"} color="primary">
                    Information we collect as you use our services
                  </Typography>
                </li>
              </ul>
            </Grid>

            <Grid item>
              <Typography variant="body1" component="p">
                We collect information about the browsers, and devices you use to access our services. The information we collect includes unique identifiers, browser type, and settings, device type, and settings, operating system. We also collect information about the interaction of your apps, browsers, and devices with our services, including IP address, crash reports, system activity. We collect this information when a service on your device contacts our servers. This information includes things like your device type, carrier name, crash reports.
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <ul>
                <li style={{ color: "#006ba6", marginLeft: -25 }}>
                  <Typography variant={matches ? "h5" : "h6"} color="primary">
                    Your Activity
                  </Typography>
                </li>
              </ul>
            </Grid>

            <Grid item>
              <Typography variant="body1" component="p">
                We collect information about your activity in our services, which we use to do things like recommending a Post you might like. The activity information we collect may include: Terms you search for Posts, connections, and your interactions with content, People with whom you communicate or share content.
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <ul>
                <li style={{ color: "#006ba6", marginLeft: -25 }}>
                  <Typography variant={matches ? "h5" : "h6"} color="primary">
                    We use data to build better services
                  </Typography>
                </li>
              </ul>
            </Grid>

            <Grid item>
              <Typography variant="body1" component="p">
                We collect information to provide a better user experience to all our users. We use different technologies to process your information for analyzing your content to provide you with things like customized search results, personalized recommendations. And we analyze your content to help us detect abuse such as spam, malware, and illegal content. We also use algorithms to recognize patterns in data. We’ll ask for your consent before using your information for a purpose that isn’t covered in this Privacy Policy. We use the information we collect from all our services for the following purposes: Providing our services, Maintaining and improving the services, Developing new services, Providing personalized services, Measuring performances, communicating with you, and protecting Lightbox, our users, and the public.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
}

export default Terms;
