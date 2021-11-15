import moment from "moment";
import { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownButton,
  Form,
  Pagination,
  Table,
} from "react-bootstrap";
import { formartPhoneNumber, headerConfig, SortType, UserType } from "./config";
import "./Home.css";
import ALL_USERS from "./users.json";

const initPgaination = {
  pageSize: 10,
  currentPage: 1,
  totalPage: 1,
  startPage: 1,
  lastPage: 0,
};
export const Home: React.FC = () => {
  const [users, setUser] = useState<UserType[]>([]);
  const [data, setData] = useState<UserType[]>([]);
  const [pagination, setPagination] = useState(initPgaination);
  const [sortBy, setSortBy] = useState<SortType>("id");

  useEffect(() => {
    setData(ALL_USERS);
    reloadTable();
  }, []);

  useEffect(() => {
    reloadTable();
  }, [data]);

  const reloadTable = () => {
    const userList: UserType[] = [];
    for (let i = 0; i < 10; i++) {
      userList.push(data[i]);
    }
    setUser(userList);
    setPagination((prevState) => {
      return {
        ...prevState,
        currentPage: 1,
        startPage: 1,
        totalPage: Math.ceil(ALL_USERS.length / prevState.pageSize),
        lastPage:
          ALL_USERS.length > prevState.pageSize * 5
            ? 5
            : ALL_USERS.length / prevState.pageSize,
      };
    });
  };

  const choosePageSize = (size: number) => {
    setPagination((prevstate) => {
      return {
        ...prevstate,
        currentPage: 1,
        pageSize: size,
        totalPage: ALL_USERS.length / size,
        startPage: 1,
        lastPage:
          ALL_USERS.length > prevstate.pageSize * 5
            ? 5
            : ALL_USERS.length / prevstate.pageSize,
      };
    });
  };

  const choosePageNumber = (pageNumber: number) => {
    const _users = [];
    const lastItem =
      pageNumber * pagination.pageSize > ALL_USERS.length
        ? ALL_USERS.length
        : pageNumber * pagination.pageSize;
    for (let i = pagination.pageSize * (pageNumber - 1); i < lastItem; i++) {
      _users.push(ALL_USERS[i]);
    }
    setPagination((prevstate) => {
      return {
        ...prevstate,
        currentPage: pageNumber,
      };
    });
    setUser(_users);
  };

  const chooseNextPage = () => {
    setPagination((prevPagi) => {
      const { lastPage, totalPage } = prevPagi;
      choosePageNumber(lastPage + 1);
      return {
        ...prevPagi,
        startPage: lastPage + 1,
        lastPage: lastPage + 5 > totalPage ? totalPage : lastPage + 5,
      };
    });
  };

  const choosePrevPage = () => {
    setPagination((prevPagi) => {
      const { startPage } = prevPagi;
      choosePageNumber(startPage - 1);
      return {
        ...prevPagi,
        startPage: startPage - 5,
        lastPage: startPage - 1,
      };
    });
  };

  const handleSort = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const field: SortType = e.currentTarget.value as SortType;
    await setData((prevData) =>
      prevData.sort((user1: UserType, user2: UserType) => {
        if (field === "id" || field === "salary") {
          return user1[field] - user2[field];
        } else {
          return user1[field].localeCompare(user2[field]);
        }
      })
    );
    setSortBy(field);
    reloadTable();
  };

  return (
    <div className="container-fluid container">
      <h1>Simple React Table App</h1>
      <DropdownButton id="dropdown-basic-button" title="Page Size">
        <Dropdown.Item onClick={() => choosePageSize(5)}>5</Dropdown.Item>
        <Dropdown.Item onClick={() => choosePageSize(10)}>10</Dropdown.Item>
        <Dropdown.Item onClick={() => choosePageSize(20)}>20</Dropdown.Item>
      </DropdownButton>
      <div className="col-lg-3">
        <Form.Select
          aria-label="Default select example"
          className="filter mb-2 "
          onChange={handleSort}
          value={sortBy}
        >
          {headerConfig.map((field) => (
            <option value={field.value}>{field.label}</option>
          ))}
        </Form.Select>
      </div>
      <Table striped bordered hover className="tbl-user">
        <thead>
          <tr>
            {headerConfig.map((element) => (
              <td>{element.label}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user: UserType) => (
            <tr>
              <td>{user?.id}</td>
              <td>{user?.firstName}</td>
              <td>{user?.lastName}</td>
              <td>{user?.email}</td>
              <td>{user?.gender}</td>
              <td>{moment(user?.birthday).format("MM/DD/YYYY")}</td>
              <td>{user?.salary}</td>
              <td>{formartPhoneNumber(user?.phone)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {pagination.startPage > 1 && (
          <Pagination.Prev onClick={choosePrevPage} />
        )}
        {(() => {
          let items = [];
          for (
            let number = pagination.startPage;
            number <= pagination.lastPage;
            number++
          ) {
            items.push(
              <Pagination.Item
                key={number}
                active={number === pagination.currentPage}
                onClick={() => choosePageNumber(number)}
              >
                {number}
              </Pagination.Item>
            );
          }
          return items;
        })()}
        {pagination.lastPage < pagination.totalPage && (
          <Pagination.Next onClick={chooseNextPage} />
        )}
      </Pagination>
    </div>
  );
};
