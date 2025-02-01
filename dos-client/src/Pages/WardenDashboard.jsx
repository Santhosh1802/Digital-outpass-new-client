/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import NavBarWarden from "../Components/NavBarWarden";
import { useSelector } from "react-redux";
import {
  GetOutpassRequests,
  GetStudentInfo,
  UpdateRequestStatus,
} from "../Api";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";

export default function WardenDashboard() {
  const [data, setData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const token = useSelector((state) => state.user.token);
  async function getDetails(token) {
    const res = await GetOutpassRequests(token);
    const pendingStatus = res.data.filter(
      (item) => item.status === "Pending"
    );
    setData(pendingStatus);
  }
  useEffect(() => {
    async function getDetails(token) {
      const res = await GetOutpassRequests(token);
      const pendingStatus = res.data.filter(
        (item) => item.status === "Pending"
      );
      setData(pendingStatus);
    }
    getDetails(token);
  }, []);
  const handleViewStudent = async (login) => {
    setShowModal(true);
    try {
      const res = await GetStudentInfo(login);
      setSelectedStudent(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccept = (_id) => {
    UpdateRequestStatus(token, _id, "Accepted")
    .then(()=>{
      getDetails(token);
    })
    console.log("Accepted request with ID:", _id);
  };

  const handleReject = (_id) => {
    UpdateRequestStatus(token, _id, "Rejected")
    .then(()=>{
      getDetails(token);
    })
    console.log("Rejected request with ID:", _id);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
  };

  const actionTemplate = (rowData) => (
    <div className="d-flex">
      <Button
        label="View"
        icon="pi pi-eye"
        className="p-button-text p-button-primary p-mr-2"
        onClick={() => handleViewStudent(rowData.login)}
      />
      <Button
        label="Accept"
        icon="pi pi-check"
        className="p-button-text p-button-success p-mr-2"
        onClick={() => handleAccept(rowData._id)}
      />
      <Button
        label="Reject"
        icon="pi pi-times"
        className="p-button-text p-button-danger"
        onClick={() => handleReject(rowData._id)}
      />
    </div>
  );

  const modalFooter = (
    <Button
      label="Close"
      icon="pi pi-times"
      onClick={handleCloseModal}
      className="p-button-text"
    />
  );
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <NavBarWarden />
      <div style={{ marginTop: "4em" }}>
        <h1>Welcome Warden</h1>
        <div className="d-flex flex-column min-vh-100">
          <h2 className="mt-4" style={{ textAlign: "center" }}>
            Student Requests
          </h2>

          <div className="mt-4">
            <DataTable value={data} className="p-datatable-striped">
              <Column field="_id" header="ID" hidden></Column>
              <Column field="out_time" header="Out Time" sortable></Column>
              <Column field="in_time" header="In Time" sortable></Column>
              <Column field="status" header="Status" sortable></Column>
              <Column field="reason" header="Reason"></Column>
              <Column body={actionTemplate} header="Actions"></Column>
            </DataTable>
          </div>

          <Dialog
            visible={showModal}
            onHide={handleCloseModal}
            header="Student Details"
            footer={modalFooter}
            style={{ width: "400px" }}
          >
            {selectedStudent && (
              <div className="text-center">
                <img
                  src={`data:image/jpeg;base64,${selectedStudent.profile}`}
                  alt="Profile"
                  className="img-fluid mb-3"
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                  }}
                />
                <h1>Name: {selectedStudent.name}</h1>
                <p>Department: {selectedStudent.department}</p>
                <p>Mobile: {selectedStudent.mobile}</p>
              </div>
            )}
          </Dialog>
        </div>
      </div>
    </div>
  );
}
