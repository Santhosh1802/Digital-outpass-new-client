import React, { useState } from "react";
import { Card } from "primereact/card";
import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
export default function StudentGuide() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div style={{maxWidth:"360px"}}>
      <Card>
        <h1>DOS Quick Guide</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Button
            onClick={() => setActiveIndex(0)}
            className="w-2rem h-2rem p-0"
            rounded
            outlined={activeIndex !== 0}
            label="1"
          />
          <Button
            onClick={() => setActiveIndex(1)}
            className="w-2rem h-2rem p-0"
            rounded
            outlined={activeIndex !== 1}
            label="2"
          />
          <Button
            onClick={() => setActiveIndex(2)}
            className="w-2rem h-2rem p-0"
            rounded
            outlined={activeIndex !== 2}
            label="3"
          />
        </div>
        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        >
          <TabPanel header="Request Outpass">
            <p className="m-0">
              Fill out the form to request an outpass for leaving the campus.
              <br />
              <br />
              Guidelines for filling the form:
              <br />
              <br />
              1. Single Request per Day: You can request only one outpass per
              day.
              <br />
              <br />
              2. Out Time: The selected out time must be later than the current
              time.
              <br />
              <br />
              3. In Time: The selected in time must be later than the out time.
              <br />
              <br />
              Review your details carefully before submitting the request.
              <br />
            </p>
          </TabPanel>
          <TabPanel header="View Request Status">
            <p className="m-0">
              This page displays the status of your most recent outpass request.
              <br />
              <br />
              Status Types:
              <br />
              <br />
              1. Pending: Your request is under review and waiting for approval.
              <br />
              <br />
              2. Accepted: Your request is approved, and you can now access the
              QR code in the View QR page.
              <br />
              <br />
              3. Rejected: Your request is denied. Check the reason, if any, and
              resubmit if necessary.
              <br />
              <br />
            </p>
          </TabPanel>
          <TabPanel header="View QR">
            <p className="m-0">
              This page provides the QR code required to verify your outpass at
              the campus gate.
              <br />
              <br />
              Guidelines for using the QR code:
              <br />
              <br />
              1. When your request status changes to Accepted, the QR code
              becomes visible.
              <br />
              <br />
              2. Leaving the Campus: Use the QR code at the campus gate to
              verify your outpass and exit.
              <br />
              <br />
              3. Re-entering the Campus: Use the same QR code to verify and
              enter the campus.
              <br />
              <br />
              4. QR Code Validity: The QR code has a time-bound validity.
              <br />
              <br />
              5. Use the Refresh QR button to refresh the code if it is not
              valid anymore.
              <br />
              <br />
              6. If you have already left the campus, refreshing the QR code
              will not
              <br />
              generate a new one for exiting—it will only verify re-entry.
            </p>
          </TabPanel>
        </TabView>
      </Card>
    </div>
  );
}
