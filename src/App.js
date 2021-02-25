import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "./App.css";
import { getData } from "./utils/api";
import TableRow from "./components/TableRow";
import PreLoader from "./components/PreLoader/PreLoader";
import Header from "./components/Header";
import { tableName, itemInPage } from "./utils/constants";

function App() {
  const [serverData, setserverData] = useState([]); //Данные полученные с сервера
  const [showData, setShowData] = useState([]); //Данные полученные с сервера
  const [isLoading, setIsLoading] = useState(false); //состояние загрузки
  const [currentPage, setCurrentPage] = useState(0);
  const { id, firstName, lastName, email, phone } = tableName;

  //получение данных с сервера, size - количество строк
  const handleData = (size) => {
    setIsLoading(true);
    getData(size)
      .then((data) => {
        setserverData(data);
        setShowData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Ошибка: " + err);
        setIsLoading(false);
      });
  };

  //фильтрация по введенному значению
  const searchInTable = (value) => {
    if (!value) {
      return setShowData(serverData);
    }
    return setShowData(
      serverData.filter((row) => {
        return (
          row[id].toString().includes(value.toString()) ||
          row[firstName].toLowerCase().includes(value.toLowerCase()) ||
          row[lastName].toLowerCase().includes(value.toLowerCase()) ||
          row[email].toLowerCase().includes(value.toLowerCase()) ||
          row[phone].toLowerCase().includes(value.toLowerCase())
        );
      })
    );
  };

  //фильтрация по выбранному столбцу
  const useSortableData = (items) => {
    const [sortConfig, setSortConfig] = React.useState(null);

    //сортируем массив
    const sortedItems = React.useMemo(() => {
      let sortableItems = [...items];
      if (sortConfig !== null) {
        sortableItems.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "arrow-down" ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "arrow-down" ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableItems;
    }, [items, sortConfig]);

    //Добавляем класс индикации сортировки
    const requestSort = (key) => {
      let direction = "arrow-down";
      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === "arrow-down"
      ) {
        direction = "arrow-up";
      }
      setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
  };

  const { items, requestSort, sortConfig } = useSortableData(showData);

  //Устанавливаем сортированный массив для отображения
  React.useEffect(() => {
    setShowData(items);
  }, [sortConfig]);

  //Убираем класс индикации сортировки
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : "arrow-hidden";
  };

  //Пагинация
  //Выбор страницы
  function pageChangeHandler({ selected }) {
    setCurrentPage(selected);
  }

  //Дробим основной массив на подмассивы заданной длины
  const viewData = showData.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / itemInPage);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    console.log(resultArray);
    return resultArray;
  }, []);

  return (
    <div className="App">
      <Header handleData={handleData} searchInTable={searchInTable} />
      <section>
        {isLoading ? (
          <PreLoader />
        ) : (
          <TableRow
            getClassNamesFor={getClassNamesFor}
            items={viewData}
            requestSort={requestSort}
            page={currentPage}
          />
        )}

        {serverData.length > itemInPage ? (
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={serverData.length / itemInPage}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={pageChangeHandler}
            containerClassName={"pagination justify-content-center"}
            activeClassName={"active"}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            nextClassName="page-item"
            previousLinkClassName="page-link"
            nextLinkClassName="page-link"
          />
        ) : null}
      </section>
    </div>
  );
}

export default App;
