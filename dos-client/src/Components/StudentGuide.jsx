import React, { useState } from "react";
import {Card} from "primereact/card";
import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
export default function StudentGuide() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
    <Card>
      <h1>DOS Quick Guide</h1>
      <div style={{display:"flex",flexDirection:"row",justifyContent:"flex-end"}}>
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
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita
            hic laboriosam molestiae voluptatibus nam ipsam fugiat enim minima
            asperiores. Maxime fugiat quia qui voluptates earum suscipit
            dignissimos sequi, exercitationem aspernatur beatae sapiente hic
            nostrum voluptatum doloremque adipisci dolor molestias atque
            veritatis repellat ab aliquam illo iure corporis? Nostrum, quas
            fuga!
          </p>
        </TabPanel>
        <TabPanel header="View Request Status">
          <p className="m-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
            tempore non suscipit itaque quisquam soluta cumque dolore animi nemo
            quam, fugiat architecto ut praesentium reiciendis at ea velit
            perferendis aliquid enim perspiciatis inventore voluptate
            exercitationem. Voluptas, tempore. Aliquid numquam maiores fuga
            laborum earum quia, impedit enim quos. Culpa, temporibus enim!
          </p>
        </TabPanel>
        <TabPanel header="View QR">
          <p className="m-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
            asperiores, impedit reiciendis error provident repellendus iure
            quibusdam exercitationem nam ea quod totam magni enim numquam
            nostrum ipsum! Commodi repellendus placeat sapiente, dolorum sequi
            aliquid, impedit provident consectetur sit non quibusdam? Iusto quo
            similique esse voluptatem rem molestias hic, molestiae a?
          </p>
        </TabPanel>
      </TabView>
    </Card>
    </>
  );
}
