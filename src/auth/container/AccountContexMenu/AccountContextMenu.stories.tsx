//AccountContextMenu
import Box from "@mui/material/Box";
import { Story } from "@storybook/react";
import React, { useState, useRef, useEffect } from "react";
//import { action } from "@storybook/addon-actions";
import AccountContextMenu, { AccountContextMenuProps } from ".";

export default {
  component: AccountContextMenu,
  title: "Auth/AccountContextMenu",
  /*  decorators: [
    (story: any) => (
      <Box
        style={{
          width: "300px",
          margin: "auto",
          paddingTop: "30px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {story()}
      </Box>
    ),
  ], */
  excludeStories: /.*Data$/,
};

const user = {
  name: "Sia Shniperson",
  email: "sia@mail.ru",
  uid: "13345uif",
};

const Template: Story<AccountContextMenuProps> = (props) => {
  const ref: any = useRef();

  const [anchorEl, setAnchorEl] = React.useState(null);
  /* const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };  */

  useEffect(() => {
    setAnchorEl(ref.current);
  }, [ref.current]);

  return (
    <Box
      sx={{
        width: "300px",
        margin: "auto",
        paddingTop: "30px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="w-8 m-auto" ref={ref}></div>
      <AccountContextMenu {...props} anchorEl={anchorEl} />
    </Box>
  );
};

export const Default = Template.bind({});

(Default as any).args = {
  userName: "MiracleMan",
};
