/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import NavBarWarden from "../Components/NavBarWarden";
import ExcelToJson from "../Components/ExcelToJson";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import { GetAllStudent, DeleteStudent } from "../Api";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";

export default function WardenManageStudent() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchDepartment, setSearchDepartment] = useState("");
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const getStudent = async () => {
      const res = await GetAllStudent(token);
      setStudents(res.data.result);
      setFilteredStudents(res.data.result);
    };
    getStudent();
  }, []);

  useEffect(() => {
    let filtered = students.filter(
      (student) =>
        student.name.toLowerCase().includes(searchName.toLowerCase()) &&
        student.department
          .toLowerCase()
          .includes(searchDepartment.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchName, searchDepartment]);

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
    confirmDialog({
      message: `Are you sure you want to delete ${rowData.name}?`,
      header: "Confirm Delete",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      accept: async () => {
        await DeleteStudent(token, rowData._id);
        setStudents(students.filter((item) => item._id !== rowData._id));
        setFilteredStudents(
          filteredStudents.filter((item) => item._id !== rowData._id)
        );
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
      <div style={{ marginTop: "4em", width: "80%" }}>
        <h1>Manage Students</h1>
        <Button
          label="Download Bulk Upload Template"
          icon="pi pi-download"
          onClick={() => {
            const fileUrl =
              "https://docs.google.com/spreadsheets/d/15JBCATtfP2EKIt7qow2UVY_V5X4i3Uhc/export?format=xlsx";
            const a = document.createElement("a");
            a.href = fileUrl;
            a.download = "Bulk Upload Template.xlsx";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }}
          style={{ marginBottom: "1em" }}
        />

        <ExcelToJson />
        {/* <Button label="Add Student" style={{ marginTop: "1em", marginBottom: "1em" }} /> */}
        <ConfirmDialog />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <div style={{ margin: "1em" }}>
            <label htmlFor="name">Search By Name</label>
            <br />
            <InputText
              placeholder="Enter Name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>
          <div style={{ margin: "1em" }}>
            <label htmlFor="department">Search By Department</label>
            <br />
            <InputText
              placeholder="Enter Department"
              value={searchDepartment}
              onChange={(e) => setSearchDepartment(e.target.value)}
            />
          </div>
        </div>
        <DataTable value={filteredStudents} paginator rows={5}>
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
