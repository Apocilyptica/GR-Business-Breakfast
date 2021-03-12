import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useDispatch } from "react-redux";

// Actions
import { setUserRole, startDeleteUser } from "../../redux/Admin/admin.actions";

// Material-ui
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// Material-ui Icons
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import WarningIcon from "@material-ui/icons/Warning";

// Material-ui Styles
import { lighten, makeStyles } from "@material-ui/core/styles";

// Data
import { userRoles } from "../../utils/userRoles";

function createData(uid, name, user, member, silver, gold, platinum, speaker, admin) {
  return { uid, name, user, member, silver, gold, platinum, speaker, admin };
}

const rows = (props) => {
  const userArray = [];

  Object.entries(props.users).map((user, index) => {
    const roleArray = [];
    const uid = user[0];
    const userData = user[1];
    userRoles.map((role) => {
      if (userData.userRoles.find((e) => e === role)) {
        return roleArray.push(true);
      }
      return roleArray.push(false);
    });
    return userArray.push(
      createData(uid, userData.displayName, roleArray[0], roleArray[1], roleArray[2], roleArray[3], roleArray[4], roleArray[5], roleArray[6])
    );
  });

  return userArray;
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc" ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "name", boolean: false, disablePadding: true, label: "User Name" },
  { id: "user", boolean: true, disablePadding: false, label: "User" },
  { id: "member", boolean: true, disablePadding: false, label: "Member" },
  { id: "silver", boolean: true, disablePadding: false, label: "Silver" },
  { id: "gold", boolean: true, disablePadding: false, label: "Gold" },
  { id: "platinum", boolean: true, disablePadding: false, label: "Platinum" },
  { id: "speaker", boolean: true, disablePadding: false, label: "Event Speaker" },
  { id: "admin", boolean: true, disablePadding: false, label: "Admin" },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.boolean ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>{order === "desc" ? "sorted descending" : "sorted ascending"}</span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
  deleteModal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalPaper: {
    outline: "none",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    width: theme.spacing(75),
    borderRadius: theme.spacing(2),
    overflow: "hidden",
  },
  warningBackground: {
    backgroundColor: lighten(theme.palette.secondary.light, 0.85),
  },
  warningPadding: {
    margin: theme.spacing(3, 3),
  },
  warningText: {
    margin: theme.spacing(0, 3, 3, 3),
    fontWeight: 600,
  },
  fontWeight: {
    fontWeight: 600,
  },
  detail: {
    margin: theme.spacing(2, 3, 0, 3),
  },
  user: {
    fontWeight: 900,
    margin: theme.spacing(1, 0, 0, 3),
    color: theme.palette.common.black,
  },
  userDelete: {
    fontWeight: 900,
    margin: theme.spacing(1, 0, 0, 0),
    color: theme.palette.common.black,
  },
  button: {
    margin: theme.spacing(0, 3, 3, 3),
  },
}));

const EnhancedTableToolbar = (props) => {
  const dispatch = useDispatch();
  const classes = useToolbarStyles();
  const { numSelected, selectedUID, selectedName } = props;
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState("");

  const handleDelete = (event) => {
    event.preventDefault();
    setValue(event.target.value);
    if (event.target.value === "DELETE") setDisabled(false);
    if (event.target.value !== "DELETE") setDisabled(true);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setDisabled(true);
    setValue("");
    setOpen(false);
  };

  const handleUserDelete = () => {
    dispatch(startDeleteUser(selectedUID));
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          User Roles
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={handleOpen}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.deleteModal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <div className={classes.modalPaper}>
            <Grid container>
              <Grid className={classes.warningBackground} item xs={12} container justify="flex-start" alignItems="center">
                <WarningIcon className={classes.warningPadding} color="error" />
                <Typography className={classes.fontWeight} variant="h5" color="error">
                  Delete this User?
                </Typography>
              </Grid>
              <Grid className={classes.warningBackground} item xs={12} container justify="flex-start" alignItems="center">
                <Typography className={classes.warningText} variant="subtitle1" color="error">
                  Doing so will permanently delete the data of this current User, including all nested documents and collections.
                </Typography>
              </Grid>
              <Grid item xs={12} container justify="flex-start" alignItems="center">
                <Typography className={classes.detail}>User</Typography>
              </Grid>
              <Grid item xs={12} container justify="center" alignItems="flex-start" direction="column">
                {selectedName.map((name, index) => {
                  return (
                    <Typography key={index} className={classes.user}>
                      {name}
                    </Typography>
                  );
                })}
              </Grid>
              <Grid item xs={12} container justify="flex-start" alignItems="center">
                <Typography className={classes.detail}>Confirm you want to delete this user by typing:</Typography>
                <Typography className={classes.userDelete}>DELETE</Typography>
              </Grid>
              <Grid item xs={12} container justify="flex-start" alignItems="center">
                <form className={classes.detail} noValidate autoComplete="off">
                  <TextField value={value} id="outlined-basic" label="DELETE" variant="outlined" onChange={handleDelete} />
                </form>
              </Grid>
              <Grid className={classes.button} item xs={12} container justify="flex-end" alignItems="center" spacing={1}>
                <Grid item>
                  <Button variant="contained" onClick={handleClose}>
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" disabled={disabled} onClick={handleUserDelete}>
                    Delete
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function UserRoles(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [selectedUID, setSelectedUID] = useState([]);
  const [selectedName, setSelectedName] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event, uid, name) => {
    if (event.target.id) return;
    const selectedIndexUID = selectedUID.indexOf(uid);
    let newSelectedUID = [];

    if (selectedIndexUID === -1) {
      newSelectedUID = newSelectedUID.concat(selectedUID, uid);
    } else if (selectedIndexUID === 0) {
      newSelectedUID = newSelectedUID.concat(selectedUID.slice(1));
    } else if (selectedIndexUID === selectedUID.length - 1) {
      newSelectedUID = newSelectedUID.concat(selectedUID.slice(0, -1));
    } else if (selectedIndexUID > 0) {
      newSelectedUID = newSelectedUID.concat(selectedUID.slice(0, selectedIndexUID), selectedUID.slice(selectedIndexUID + 1));
    }

    setSelectedUID(newSelectedUID);

    const selectedIndexName = selectedName.indexOf(name);
    let newSelectedName = [];

    if (selectedIndexName === -1) {
      newSelectedName = newSelectedName.concat(selectedName, name);
    } else if (selectedIndexName === 0) {
      newSelectedName = newSelectedName.concat(selectedName.slice(1));
    } else if (selectedIndexName === selectedName.length - 1) {
      newSelectedName = newSelectedName.concat(selectedName.slice(0, -1));
    } else if (selectedIndexName > 0) {
      newSelectedName = newSelectedName.concat(selectedName.slice(0, selectedIndexName), selectedName.slice(selectedIndexName + 1));
    }

    setSelectedName(newSelectedName);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleRole = (event) => {
    event.preventDefault();
    const uid = event.target.value;
    const role = event.target.id;
    const checked = event.target.checked;

    dispatch(setUserRole(uid, role, checked));
  };

  const isSelected = (uid) => selectedUID.indexOf(uid) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selectedUID.length} selectedUID={selectedUID} selectedName={selectedName} />
        <TableContainer>
          <Table className={classes.table} aria-labelledby="tableTitle" size={dense ? "small" : "medium"} aria-label="enhanced table">
            <EnhancedTableHead classes={classes} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
            <TableBody>
              {stableSort(rows(props), getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.uid);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.uid, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.uid}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isItemSelected} inputProps={{ "aria-labelledby": labelId }} />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">
                        <Checkbox onClick={handleRole} id="user" value={row.uid} checked={row.user} inputProps={{ "aria-labelledby": labelId }} />
                      </TableCell>
                      <TableCell align="right">
                        <Checkbox onClick={handleRole} id="member" value={row.uid} checked={row.member} inputProps={{ "aria-labelledby": labelId }} />
                      </TableCell>
                      <TableCell align="right">
                        <Checkbox onClick={handleRole} id="silver" value={row.uid} checked={row.silver} inputProps={{ "aria-labelledby": labelId }} />
                      </TableCell>
                      <TableCell align="right">
                        <Checkbox onClick={handleRole} id="gold" value={row.uid} checked={row.gold} inputProps={{ "aria-labelledby": labelId }} />
                      </TableCell>
                      <TableCell align="right">
                        <Checkbox
                          onClick={handleRole}
                          id="platinum"
                          value={row.uid}
                          checked={row.platinum}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Checkbox
                          onClick={handleRole}
                          id="speaker"
                          value={row.uid}
                          checked={row.speaker}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Checkbox onClick={handleRole} id="admin" value={row.uid} checked={row.admin} inputProps={{ "aria-labelledby": labelId }} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" />
    </div>
  );
}
