import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Banner2 from "../../layout/Banner2";
import Pagination from "../../layout/Pagination";
import Footer2 from "../../layout/Footer2";
import Sender from "./sender/Sender";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchSenders,
  deleteSender,
} from "../../../redux/sender/sendersActions";

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

  const nextPagination = (senderNumber, currentIndex) => {
    setData(
      senders.slice(
        senderNumber * (currentIndex - 1),
        senderNumber * currentIndex
      )
    );
  };

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [id, setId] = useState();

  const deleteSenderFunction = (id) => {
    dispatch(deleteSender(id));
    setConfirmDelete(false);
  };

  const searchRights = (value) => {
    const dataSearch = senders.filter(
      (right) => right.name.toLowerCase().indexOf(value) !== -1
    );
    setData(dataSearch.slice(0, 10));
  };

  return (
    <>
      <Banner2 title={["Quản lý nơi đến"]} />
      <section className="management-page padding">
        <h1>Danh sách nơi đến :</h1>

        <div className="search-box">
          <button>
            <input
              type="text"
              name="search"
              id="search"
              onChange={(e) => searchRights(e.target.value)}
            />
            <i className="fas fa-search"></i>
          </button>
        </div>

        <div className="add-button">
          <button>
            <Link to="/add-sender">
              Thêm nơi đến <i className="fas fa-user-plus"></i>
            </Link>
          </button>
        </div>

        <div className="filter-container">
          <div className="filter-result">
            <p>
              Hiển thị{" "}
              {data && data.length > 0 && senders && senders.length > 0 ? (
                <span>
                  {data.length}/{senders.length}
                </span>
              ) : (
                <span>0 </span>
              )}{" "}
              nơi đến
            </p>
          </div>
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
            nextPagination={nextPagination}
          />
        )}

        {confirmDelete && <span className="bg"></span>}
        {confirmDelete && (
          <div className="delete-employee">
            <p>Bạn có muốn xóa noi đến này không?</p>
            <div className="confirm">
              <button onClick={() => deleteSenderFunction(id)}>Có</button>
              <button onClick={() => setConfirmDelete(false)}>Không</button>
            </div>
          </div>
        )}
      </section>
      <Footer2 />
    </>
  );
};

export default Senders;
