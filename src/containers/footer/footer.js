import React from "react";
import { MDBIcon, MDBFooter, MDBRow } from "mdbreact";

const FooterPage = () => {
  return (
    <MDBRow>
      <MDBFooter className="font-small">
        <div className="text-center gray-text">
          &copy; {new Date().getFullYear()} Copyright:
            <a href="https://www.linkedin.com/in/phbritoo/" >
            <></>
            <MDBIcon fab icon="linkedin-in" className="p-3" />
              Desenvolvido por Paulo Brito
            </a>
        </div>
      </MDBFooter>
    </MDBRow>
  );
}

export default FooterPage;