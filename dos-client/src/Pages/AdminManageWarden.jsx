/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import NavBarAdmin from "../Components/NavBarAdmin";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import { DeleteWarden, GetAllWarden, AddWarden } from "../Api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";

export default function AdminManageWarden({ toast }) {
  const [warden, setWarden] = useState([]);
  const [filteredWarden, setFilteredWarden] = useState([]);
  const [searchName, setSearchName] = useState("");
  const token = useSelector((state) => state.user.token);
  const [modalVisible, setModalVisible] = useState(false);
  const [newWarden, setNewWarden] = useState({
    name: "",
    email: "",
    primary_number: "",
    password: "",
  });
  const getWarden = async () => {
    const res = await GetAllWarden(token);
    setWarden(res.data.result);
    setFilteredWarden(res.data.result);
  };
  useEffect(() => {
    const getWarden = async () => {
      const res = await GetAllWarden(token);
      setWarden(res.data.result);
      setFilteredWarden(res.data.result);
    };
    getWarden();
  }, []);

  useEffect(() => {
    let filtered = warden.filter((warden) =>
      warden.name.toLowerCase().includes(searchName.toLowerCase())
    );
    setFilteredWarden(filtered);
  }, [searchName]);
  const handleAddWarden = () => {
    setModalVisible(true);
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

  const handleSubmit = async () => {
    console.log(newWarden);
    const res = await AddWarden(newWarden);
    if (res.error === "") {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Warden added",
      });
    }
    if (res.message === "") {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Error adding waden",
      });
    }
    setModalVisible(false);
  };

  const handleDelete = (rowData) => {
    confirmDialog({
      message: `Are you sure you want to delete ${rowData.name}?`,
      header: "Confirm Delete",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      accept: async () => {
        await DeleteWarden(token, rowData._id).then(()=>{
          getWarden();
        })
       
        // setWarden(warden.filter((item) => item.id !== rowData.id));
        // setFilteredWarden(
        //   filteredWarden.filter((item) => item.id !== rowData.id)
        // );
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
      <div style={{ marginTop: "4em",width:"80%" }}>
        <h1>Manage Warden</h1>
        <Button
          label="Add Warden"
          onClick={handleAddWarden}
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
        <DataTable value={filteredWarden} paginator rows={5}>
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
        header="Add Warden"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent:"space-evenly",
            width: "100%",
            height: "70vh",
          }}
        >
          {/* <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} onSelect={handleFileUpload} auto chooseLabel="Upload Profile" />
              {previewImage && <img src={previewImage} alt="Preview" style={{ width: "100px", height: "100px", borderRadius: "50%", marginTop: "1em" }} />}
              <br /> */}
          <InputText
            placeholder="Name"
            value={newWarden.name}
            onChange={(e) =>
              setNewWarden({ ...newWarden, name: e.target.value })
            }
          />
          <InputText
            placeholder="Email"
            value={newWarden.email}
            onChange={(e) =>
              setNewWarden({ ...newWarden, email: e.target.value })
            }
          />
          <InputText
            placeholder="Phone"
            value={newWarden.primary_number}
            onChange={(e) =>
              setNewWarden({ ...newWarden, primary_number: e.target.value })
            }
          />
          <InputText
            placeholder="Password"
            type="password"
            value={newWarden.password}
            onChange={(e) =>
              setNewWarden({ ...newWarden, password: e.target.value })
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
