import React from "react";
import { MDBIcon, MDBContainer, MDBFooter } from "mdbreact";

const FooterPage = () => {
  return (
    <MDBContainer>
      <MDBFooter className="font-small">
        <div className="text-center gray-text">
          &copy; {new Date().getFullYear()} Copyright:
            <a href="https://www.linkedin.com/in/phbritoo/" >
            <></>
            <MDBIcon fab icon="linkedin-in" className="p-3" />
              Paulo Brito 
            </a>
        </div>
      </MDBFooter>
    </MDBContainer>
  );
}

export default FooterPage;