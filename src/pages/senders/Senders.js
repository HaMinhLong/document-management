import React, { useState, useEffect } from "react";
import Banner2 from "../../layouts/Banner2";
import Footer2 from "../../layouts/Footer2";
import Pagination from "../../components/componentDashs/Pagination";
import Sender from "./sender/Sender";
import DeleteBox from "../../components/componentDashs/DeleteBox";
import FilterResult from "../../components/componentDashs/FilterResult";
import AddButton from "../../components/componentDashs/AddButton";

import { useSelector, useDispatch } from "react-redux";
import { fetchSenders, deleteSender } from "../../redux/sender/sendersActions";
import SearchBox from "../../components/componentDashs/SearchBox";

const Senders = () => {
  document.title = "TLU | Quản lý nơi đến";
  const [currentIndex, setCurrentIndex] = useState(1);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSenders());
  }, []);
  const senders = useSelector((state) => state.senders);
  const [data, setData] = useState();

  useEffect(() => {
    if (senders.length > 10) {
      setData(senders.slice((currentIndex - 1) * 10, currentIndex * 10));
    } else {
      setData(senders);
    }
  }, [senders]);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [id, setId] = useState();

  return (
    <>
      <Banner2 title={["Quản lý nơi đến"]} />
      <section className="management-page padding">
        <h1>Danh sách nơi đến :</h1>

        <SearchBox data={senders} setData={setData} />

        <AddButton link={"add-sender"} text={"Thêm nơi đến"} />

        <div className="filter-container">
          <FilterResult text={"nơi đến"} data={data} dataAll={senders} />
        </div>

        <Sender
          senders={data}
          setConfirmDelete={setConfirmDelete}
          setId={setId}
        />
        {data && data.length > 0 && senders && senders.length > 0 && (
          <Pagination
            recordsTotal={senders.length}
            recordsNumber={10}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            setData={setData}
            data={senders}
          />
        )}

        <DeleteBox
          text="nơi đến"
          setConfirm={setConfirmDelete}
          confirmDelete={confirmDelete}
          deleteFunction={deleteSender}
          id={id}
        />
      </section>
      <Footer2 />
    </>
  );
};

export default Senders;
