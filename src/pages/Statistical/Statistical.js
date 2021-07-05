import React, { useState, useEffect } from "react";
import { Pie, Doughnut, PolarArea, Line, Bar } from "react-chartjs-2";
import jsPDF from "jspdf";

import Banner2 from "../../layouts/Banner2";
import Footer2 from "../../layouts/Footer2";

import { useSelector, useDispatch } from "react-redux";
import {
  countByType,
  countBySender,
  countByDep,
  countByStatus,
} from "../../redux/documents/documentsActions";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import "antd/dist/antd.css";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;
const Statistical = () => {
  document.title = "TLU | Thống kê văn bản";
  const dispatch = useDispatch();
  const [dateNow, setDateNow] = useState("");
  const [datePrevious, setDatePrevious] = useState("");
  const [totalDocument, setTotalDocument] = useState(0);
  useEffect(() => {
    const date = new Date();
    setDateNow(
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`
    );
    setDatePrevious(
      `${date.getFullYear()}-${
        date.getDate() - 7 < 0 ? date.getMonth() : date.getMonth() + 1
      }-${date.getDate() - 7}`
    );
    dispatch(
      countByType({
        startDate: `${date.getFullYear()}-${
          date.getDate() - 7 < 0 ? date.getMonth() : date.getMonth() + 1
        }-${date.getDate() - 7}`,
        finishDate: `${date.getFullYear()}-${date.getMonth() + 1}-${
          date.getDate() + 1
        }`,
      })
    );
  }, []);
  const documents = useSelector((state) => state.documents);

  const [dataDoc, setDataDoc] = useState({});

  useEffect(() => {
    setDataDoc(documents);
    totalDoc();
  }, [documents]);

  const totalDoc = () => {
    var total = 0;
    documents &&
      documents.forEach((doc) => {
        total += doc.Number;
      });
    setTotalDocument(total);
  };

  const onChange = (date, dateString) => {
    const dateSelect = {
      startDate: dateString[0],
      finishDate: dateString[1],
    };
    setDatePrevious(dateString[0]);
    setDateNow(dateString[1]);
    typeDoc === "Thống kê văn bản theo loại văn bản"
      ? dispatch(countByType(dateSelect))
      : typeDoc === "Thông kê văn bản theo nơi đến"
      ? dispatch(countBySender(dateSelect))
      : typeDoc === "Thống kê văn bảo theo bộ phận"
      ? dispatch(countByDep(dateSelect))
      : dispatch(countByStatus(dateSelect));
  };

  const [typeDoc, setTypeDoc] = useState("Thống kê văn bản theo loại văn bản");
  const [type, setType] = useState("pie");
  var chartColors = {
    red: "rgb(255, 99, 132)",
    orange: "rgb(255, 159, 64)",
    yellow: "rgb(255, 205, 86)",
    green: "rgb(75, 192, 192)",
    blue: "rgb(54, 162, 235)",
    purple: "rgb(153, 102, 255)",
    grey: "rgb(231,233,237)",
    pink: "rgb(127,39,56)",
  };
  const data = {
    labels:
      documents && documents.length > 0 && documents.map((data) => data.Name),
    datasets: [
      {
        label: "Đại học Thăng Long 2021 (M)",
        data:
          dataDoc && dataDoc.length > 0 && dataDoc.map((data) => data.Number),
        borderColor: [chartColors.orange],
        backgroundColor: [
          chartColors.red,
          chartColors.orange,
          chartColors.green,
          chartColors.blue,
          chartColors.purple,
          chartColors.grey,
          chartColors.yellow,
          chartColors.pink,
        ],
        pointBackgroundColor: [chartColors.orange],
        pointBorderColor: [chartColors.orange],
        hoverOffset: 10,
      },
    ],
  };

  const options =
    type === "line" || type === "bar"
      ? {
          plugins: {
            title: {
              display: true,
              text: typeDoc || "Thống kê văn bản",
            },
          },
          scales: {
            y: {
              min: 0,
              max: 10,
            },
          },
        }
      : {
          plugins: {
            title: {
              display: true,
              text: typeDoc || "Thống kê văn bản",
            },
          },
        };

  const exportChart = () => {
    // export canvas to pdf
    var imgData = document.getElementById("chart").toDataURL("image/png");
    // var pdf = new jsPDF();
    const pdf = new jsPDF("p", "mm", "a4");

    imgData && pdf.addImage(imgData, "JPEG", 0, 0);
    // pdf.output("dataurlnewwindow");
    pdf.save("chart.pdf");

    // export html to pdf
    // var input = document.getElementById("doughnut-chart");
    // html2canvas(input).then((canvas) => {
    //   const imgData = canvas.toDataURL("image/png");
    //   const pdf = new jsPDF("p", "mm", "a4");
    //   // var pdf = new jsPDF();
    //   pdf.addImage(imgData, "JPEG", 0, 0);
    //   pdf.output("dataurlnewwindow");
    //   // pdf.save("download.pdf");
    // });
  };

  return (
    <>
      <Banner2 title={["Thống kê văn bản"]} />
      <section className="management-page chart-page padding">
        <h1>Thống kê văn bản: </h1>

        <Space direction="vertical" style={{ marginBottom: 30 }}>
          <RangePicker onChange={onChange} />
        </Space>

        <div className="chart-type">
          <span>Thống kế văn bản theo: </span>
          <button
            onClick={() => {
              dispatch(
                countByType({ startDate: datePrevious, finishDate: dateNow })
              );
              setTypeDoc("Thống kê văn bản theo loại văn bản");
            }}
          >
            Loại văn bản
          </button>
          <button
            onClick={() => {
              dispatch(
                countBySender({ startDate: datePrevious, finishDate: dateNow })
              );
              setTypeDoc("Thông kê văn bản theo nơi đến");
            }}
          >
            Nơi đến
          </button>
          <button
            onClick={() => {
              dispatch(
                countByDep({ startDate: datePrevious, finishDate: dateNow })
              );
              setTypeDoc("Thống kê văn bảo theo bộ phận");
            }}
          >
            Bộ phận
          </button>
          <button
            onClick={() => {
              dispatch(
                countByStatus({ startDate: datePrevious, finishDate: dateNow })
              );
              setTypeDoc("Thống kê văn bản theo trạng thái");
            }}
          >
            Trạng thái
          </button>
        </div>
        <div
          className="table-container"
          style={{ marginBottom: 30, marginTop: 30 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>Bảng thống kê chi tiết: </span>
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="download-table-xls-button"
              table="table-to-xls"
              filename="tablexls"
              sheet="tablexls"
              buttonText="Export to Excel"
            />
          </div>
          <table style={{ marginTop: 10 }} id="table-to-xls">
            <thead>
              <tr>
                <th>STT</th>
                <th>{typeDoc}</th>
                <th>Số lượng</th>
              </tr>
            </thead>
            <tbody>
              {dataDoc &&
                dataDoc.length > 0 &&
                dataDoc.map((document, index) => (
                  <tr key={document.Name}>
                    <td>{index + 1}</td>
                    <td>{document.Name}</td>
                    <td>{document.Number}</td>
                  </tr>
                ))}
              <tr>
                <td>{dataDoc.length + 1}</td>
                <td>{typeDoc}</td>
                <td>{totalDocument}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="button-box">
          <span>Loại biểu đồ thống kê: </span>
          <button onClick={() => setType("line")}>Line Chart</button>
          <button onClick={() => setType("bar")}>Bar Chart</button>
          <button onClick={() => setType("pie")}>Pie Chart</button>
          <button onClick={() => setType("doughnut")}>Doughnut Chart</button>
          <button onClick={() => setType("polar")}>Polar Chart</button>
        </div>
        <button id="download" onClick={() => exportChart()}>
          Export to PDF
        </button>
        {data && (
          <div className="chart-container" style={{ marginBottom: 300 }}>
            {type === "line" ? (
              <Line data={data} options={options} id="chart" />
            ) : type === "bar" ? (
              <Bar data={data} options={options} id="chart" />
            ) : type === "pie" ? (
              <Pie data={data} options={options} id="chart" />
            ) : type === "doughnut" ? (
              <Doughnut data={data} options={options} id="chart" />
            ) : (
              <PolarArea data={data} options={options} id="chart" />
            )}
          </div>
        )}
      </section>
      <Footer2 />
    </>
  );
};

export default Statistical;
