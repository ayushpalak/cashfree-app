/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import ReactTable from "react-table";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import Button from "../components/Button";

// material-ui imports
import InfoIcon from "@material-ui/icons/Info";
import Tooltip from "@material-ui/core/Tooltip";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import DeleteIcon from "@material-ui/icons/Delete";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { FETCH_USERS } from "../config/Urls";
import { UPDATE_TABLE } from "../actions/actionCreater";
import "./DashboardView.scss";

const TABLE_HEADERS = [
  {
    Header: "#",
    accessor: "id",
    sortable: true
  },
  {
    Header: "Name",
    accessor: "name",
    sortable: true
  },
  {
    Header: "Email",
    accessor: "email",
    sortable: true
  },
  {
    Header: "Company",
    accessor: "company",
    sortable: false
  },
  {
    Header: "Website",
    accessor: "website",
    sortable: false
  },
  {
    Header: "Phone",
    accessor: "phone",
    sortable: false
  },
  {
    Header: "Address",
    accessor: "address",
    sortable: false
  },
  {
    Header: "Actions",
    accessor: "actions",
    sortable: false
  }
];
const OPENBTN = "openBtn";
const DELETEBTN = "deleteBtn";
const useStyles = makeStyles(() => ({
  userFieldName: {
    marginBottom: "5px"
  },
  userFieldusername: {
    fontSize: "small",
    color: "rgb(0, 0, 0, 0.6)"
  },
  companyFieldContainer: { display: "flex" },
  name: { cursor: "pointer", paddingRight: "5px" },
  icon: { float: "right", paddingRight: "5px" },
  phone: { fontSize: "small" }
}));
const UserField = ({ name, username }) => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.userFieldName}>{name}</div>
      <div className={classes.userFieldusername}>@{username}</div>
    </div>
  );
};

const CompanyField = ({ name, catchPhrase, bs }) => {
  const classes = useStyles();
  const details = `${name},
  ${catchPhrase},
  ${bs}`;
  return (
    <Tooltip title={details} arrow>
      <div className={classes.companyFieldContainer}>
        <div className={classes.name}>{name} </div>
        <div className={classes.icon}>
          <InfoIcon fontSize="small" />
        </div>
      </div>
    </Tooltip>
  );
};

const PhoneField = ({ data }) => {
  const classes = useStyles();
  return <div className={classes.phone}>{data}</div>;
};

const AddressField = props => {
  const classes = useStyles();
  const { street, suite, city, zipcode, geo } = props;
  const details = `${suite},
  ${street},
  ${zipcode}
  ${geo?.lat} ${geo?.lng}`;

  return (
    <div style={{ cursor: "pointer" }}>
      <Tooltip title={details} arrow>
        <div className={classes.companyFieldContainer}>
          <div className={classes.name}>{city}</div>
          <div className={classes.icon}>
            <InfoIcon fontSize="small" />
          </div>
        </div>
      </Tooltip>
    </div>
  );
};

const build2DArray = data => {
  return data.reduce((accum, val) => {
    let _1Darr = [];
    _1Darr[0] = val.name;
    _1Darr[1] = val.email;
    _1Darr[2] = val.company;
    _1Darr[3] = val.website;
    _1Darr[4] = val.phone;
    _1Darr[5] = val.address;
    _1Darr[6] = val.username;
    _1Darr[7] = val.id;
    accum.push(_1Darr);

    return accum;
  }, []);
};

const handleDelete = (dataTable, userId) => {
  const dataTable_copy = [...dataTable];
  const temp = dataTable_copy.reduce((accum, item) => {
    if (item[7] === userId) {
      return accum;
    } else {
      return accum.concat([item]);
    }
  }, []);
  return temp;
};

const buildTable = ({ apiData, handleBtn }) => {
  return apiData.map(prop => {
    return {
      id: prop[7],
      name: <UserField name={prop[0]} username={prop[6]} />,
      email: prop[1],
      company: <CompanyField {...prop[2]} />,
      website: (
        <a href={`http://www.${prop[3]}`} target="_blank">
          {prop[3]}
        </a>
      ),
      phone: <PhoneField data={prop[4]} />,
      address: <AddressField {...prop[5]} />,
      actions: (
        // use this button to remove the data row
        <Grid container direction="row" justify="flex-end">
          <Button
            onClick={() => {
              handleBtn(prop[7], OPENBTN, apiData);
            }}
            type="primary"
            startIcon={<OpenInNewIcon />}
          ></Button>
          <Button
            onClick={() => {
              handleBtn(prop[7], DELETEBTN, apiData);
            }}
            type="danger"
            startIcon={<DeleteIcon />}
          ></Button>
        </Grid>
      )
    };
  });
};
const DashboardView = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { dataTable } = useSelector(state => state.dashboard);
  const dipatchUpdateTable = updatedTable => {
    const payload = {
      dataTable: updatedTable
    };
    dispatch(UPDATE_TABLE({ payload }));
  };
  const handleBtn = (id, type, dataTable) => {
    if (type === OPENBTN) {
      history.push(`/user/${id}`);
    } else if (type === DELETEBTN) {
      const updatedDataTable = handleDelete(dataTable, id);
      const finaltable = buildTable({
        apiData: updatedDataTable,
        handleBtn: handleBtn
      });

      dipatchUpdateTable(finaltable);
    }
  };
  const fetchTableData = () => {
    Axios.get(FETCH_USERS)
      .then(res => {
        const finaltable = buildTable({
          apiData: build2DArray(res.data),
          handleBtn: handleBtn
        });
        dipatchUpdateTable(finaltable);
      })
      .catch(err => {
        console.log(err);
        alert("unable to load data");
      });
  };

  useEffect(() => {
    if (dataTable.length === 0) {
      fetchTableData();
    }
  }, []);

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={12} sm={10}>
        <h1> User Data Table</h1>
      </Grid>
      <Grid item xs={12} sm={10}>
        <ReactTable
          data={dataTable}
          columns={TABLE_HEADERS}
          defaultPageSize={5}
          showPaginationTop
          showPaginationBottom={false}
          className="-striped -highlight"
        />
      </Grid>
    </Grid>
  );
};

export default DashboardView;
