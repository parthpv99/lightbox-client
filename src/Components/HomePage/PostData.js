import { CardContent, Typography } from "@material-ui/core";
import React from "react";

const formatHashtags = (string) => {
  return string
    .split(/((?:^|\s)(?:#[a-z\d-]+))/gi)
    .filter(Boolean)
    .map((v, i) => {
      if (v.includes("#")) {
        return (
          <Typography component="span" variant="body1" key={i} color="primary">
            {v}
          </Typography>
        );
      } else {
        return (
          <Typography component="span" key={i}>
            {v}
          </Typography>
        );
      }
    });
};

function PostData({ data }) {
  const [readMore, setReadMore] = React.useState(false);

  return (
    <CardContent style={{ textAlign: "justify" }}>
      {data.length >= 150
        ? formatHashtags(data.substring(0, 150))
        : formatHashtags(data)}
      {readMore && formatHashtags(data.substring(151, data.length))}
      {data.length > 150 && (
        <Typography
          variant="body2"
          component="span"
          style={{
            marginLeft: 5,
            color: "#5f5f5f",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={() => setReadMore(!readMore)}
        >
          {readMore ? "...See Less" : "...See More"}
        </Typography>
      )}
    </CardContent>
  );
}

export default PostData;
