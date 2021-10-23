import React, { FC } from "react";
import Typography from "@mui/material/Typography";
import Box, { BoxProps } from "@mui/material/Box";

//const useStyles = makeStyles()

const HeroTitle: FC = ({ children }) => {
  return (
    <div className={`absolute left-0 -top-5 w-full flex justify-center`}>
      <Box
        boxShadow={1}
        sx={{
          display: "flex-inline",
          p: "10px 20px",
          /* boxShadow: 1, */
          width: "80%",
          /* bgcolor: "background.paper", */
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        <Typography
          /*  variant="h5" */
          /* color="text.secondary" */
          sx={{
            /* color: "text.primary", */
            fontSize: 18,
          }}
        >
          {children}
        </Typography>
      </Box>
    </div>
  );
};

export default HeroTitle;