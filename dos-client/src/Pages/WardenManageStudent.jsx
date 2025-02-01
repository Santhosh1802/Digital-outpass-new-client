/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import ExcelToJson from "../Components/ExcelToJson";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import { GetAllStudent, DeleteStudent } from "../Api";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import NavBarWarden from "../Components/NavBarWarden";
export default function WardenManageStudent() {
  const [student, setStudent] = useState([]);
  const token = useSelector((state) => state.user.token);
  useEffect(() => {
    const getStudent = async () => {
      const res = await GetAllStudent(token);
      setStudent(res.data.result);
    };
    getStudent();
  }, []);
  const handleAddStudent = async () => {};
  const profileTemplate = (rowData) => {
    return (
      <img
        src={`data:image/png;base64,${rowData.profile}`}
        alt="Profile"
        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
      />
    );
  };
  const serialNumberTemplate = (rowData, { rowIndex }) => {
    return <span>{rowIndex + 1}</span>;
  };
  const handleDelete = (rowData) => {
    console.log(rowData._id);

    confirmDialog({
      message: `Are you sure you want to delete ${rowData.name}?`,
      header: "Confirm Delete",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      accept: async () => {
        await DeleteStudent(token, rowData._id).then(() => {
          setStudent(student.filter((item) => item.id !== rowData.id));
        });
      },
    });
  };
  const deleteTemplate = (rowData) => {
    return (
      <Button
        label="Delete"
        icon="pi pi-trash"
        className="p-button-danger p-button-sm"
        onClick={() => handleDelete(rowData)}
      />
    );
  };
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
        <h1>Manage Student</h1>
        <ExcelToJson />
        <Button
          label="Add Student"
          onClick={handleAddStudent}
          style={{ marginTop:"1em",marginBottom:"1em"}}
        />
        <ConfirmDialog />
        <DataTable value={student} paginator rows={5}>
          <Column header="S.No" body={serialNumberTemplate}></Column>
          <Column header="Profile Photo" body={profileTemplate}></Column>
          <Column field="name" header="Name" sortable></Column>
          <Column field="department" header="Department" sortable></Column>
          <Column
            header="Actions"
            body={deleteTemplate}
            style={{ width: "10%" }}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}
