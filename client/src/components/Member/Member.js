import React from "react";
import Toolbar from '../Navigation/Toolbar/Toolbar'

const Member = ({user}) => (
  <div>
    <Toolbar />
    <div>Hello {user.firstName} </div>
  </div>
);

export default Member;
