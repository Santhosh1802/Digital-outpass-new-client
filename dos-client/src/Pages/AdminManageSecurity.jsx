/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import NavBarAdmin from "../Components/NavBarAdmin";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import { AddSecurity, DeleteSecurity, GetAllSecurity } from "../Api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
//import { FileUpload } from "primereact/fileupload";

export default function AdminManageSecurity({ toast }) {
  const [security, setSecurity] = useState([]);
  const [filteredSecurity, setFilteredSecurity] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [newSecurity, setNewSecurity] = useState({
    name: "",
    email: "",
    primary_number: "",
    password: "",
  });
  //const [previewImage, setPreviewImage] = useState(null);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const getSecurity = async () => {
      const res = await GetAllSecurity(token);
      setSecurity(res.data.result);
      setFilteredSecurity(res.data.result);
    };
    getSecurity();
  }, []);

  useEffect(() => {
    let filtered = security.filter((security) =>
      security.name.toLowerCase().includes(searchName.toLowerCase())
    );
    setFilteredSecurity(filtered);
  }, [searchName]);

  const handleAddSecurity = () => {
    setModalVisible(true);
  };

  // const handleFileUpload = (event) => {
  //   const file = event.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     setNewSecurity({ ...newSecurity, profile: reader.result.split(",")[1] });
  //     setPreviewImage(reader.result);
  //   };
  // };

  const handleSubmit = async () => {
    //console.log(newSecurity);
    const res = await AddSecurity(newSecurity);
    if (res.error === "") {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Security added",
      });
    }
    if (res.message === "") {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Error adding security",
      });
    }
    setModalVisible(false);
  };

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
        await DeleteSecurity(token, rowData.login);
        setSecurity(security.filter((item) => item.id !== rowData.id));
        setFilteredSecurity(
          filteredSecurity.filter((item) => item.id !== rowData.id)
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
      <NavBarAdmin />
      <ConfirmDialog />
      <div style={{ marginTop: "4em", width: "80%" }}>
        <h1>Manage Security</h1>
        <Button
          label="Add Security"
          onClick={handleAddSecurity}
          style={{ margin: "1em" }}
        />
        <div className="p-grid" style={{ marginBottom: "1em" }}>
          <div className="p-col">
            <InputText
              placeholder="Search Name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>
        </div>
        <DataTable value={filteredSecurity} paginator rows={5}>
          <Column header="S.No" body={serialNumberTemplate}></Column>
          <Column header="Profile Photo" body={profileTemplate}></Column>
          <Column field="name" header="Name" sortable></Column>
          <Column field="primary_number" header="Contact" sortable></Column>
          <Column
            header="Actions"
            body={deleteTemplate}
            style={{ width: "10%" }}
          ></Column>
        </DataTable>
      </div>
      <Dialog
        visible={modalVisible}
        onHide={() => setModalVisible(false)}
        header="Add Security"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            width: "100%",
            height: "70vh",
          }}
        >
          {/* <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} onSelect={handleFileUpload} auto chooseLabel="Upload Profile" />
        {previewImage && <img src={previewImage} alt="Preview" style={{ width: "100px", height: "100px", borderRadius: "50%", marginTop: "1em" }} />}
        <br /> */}
          <label htmlFor="name">Name</label>
          <InputText
            placeholder="Name"
            value={newSecurity.name}
            onChange={(e) =>
              setNewSecurity({ ...newSecurity, name: e.target.value })
            }
          />
          <InputText
            placeholder="Email"
            value={newSecurity.email}
            onChange={(e) =>
              setNewSecurity({ ...newSecurity, email: e.target.value })
            }
          />
          <InputText
            placeholder="Phone"
            value={newSecurity.primary_number}
            onChange={(e) =>
              setNewSecurity({ ...newSecurity, primary_number: e.target.value })
            }
          />
          <InputText
            placeholder="Password"
            type="password"
            value={newSecurity.password}
            onChange={(e) =>
              setNewSecurity({ ...newSecurity, password: e.target.value })
            }
          />
          <Button
            label="Submit"
            onClick={handleSubmit}
            style={{ marginTop: "1em" }}
          />
        </div>
      </Dialog>
    </div>
  );
}
