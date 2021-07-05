import React, { useState, useEffect } from "react";
import Banner2 from "../../layouts/Banner2";
import Footer2 from "../../layouts/Footer2";
import Pagination from "../../components/componentDashs/Pagination";
import DocType from "./doc-type/DocType";
import DeleteBox from "../../components/componentDashs/DeleteBox";
import FilterResult from "../../components/componentDashs/FilterResult";
import SearchBox from "../../components/componentDashs/SearchBox";
import AddButton from "../../components/componentDashs/AddButton";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchDocTypes,
  deleteDocType,
} from "../../redux/docType/docTypesActions";

const Rights = () => {
  document.title = "TLU | Quản lý loại văn bản";
  const [currentIndex, setCurrentIndex] = useState(1);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDocTypes());
  }, []);
  const docTypes = useSelector((state) => state.docTypes);
  const [data, setData] = useState();

  useEffect(() => {
    if (docTypes.length > 10) {
      setData(docTypes.slice((currentIndex - 1) * 10, currentIndex * 10));
    } else {
      setData(docTypes);
    }
  }, [docTypes]);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [id, setId] = useState();

  return (
    <>
      <Banner2 title={["Quản lý loại văn bản"]} />
      <section className="management-page padding">
        <h1>Danh sách loại văn bản :</h1>

        <SearchBox data={docTypes} setData={setData} />

        <AddButton link={"add-doc-type"} text={"Thêm loại văn bản"} />

        <div className="filter-container">
          <FilterResult text={"loại văn bản"} data={data} dataAll={docTypes} />
        </div>

        <DocType
          docTypes={data}
          setConfirmDelete={setConfirmDelete}
          setId={setId}
        />
        {data && data.length > 0 && docTypes && docTypes.length > 0 && (
          <Pagination
            recordsTotal={docTypes.length}
            recordsNumber={10}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            setData={setData}
            data={docTypes}
          />
        )}

        <DeleteBox
          text="loại văn bản"
          deleteFunction={deleteDocType}
          id={id}
          confirmDelete={confirmDelete}
          setConfirm={setConfirmDelete}
        />
      </section>
      <Footer2 />
    </>
  );
};

export default Rights;
