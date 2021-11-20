import { useState } from "react";
import { Tab, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { parseISO, formatDistance } from "date-fns";
import User from "../user/User";
import classNames from "classnames";
import styles from "./ProductTabs.module.scss";

export default function ProductTabs({ text, bids = [] }) {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classNames(styles["product-tabs"])}>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          area-label={"product tabs"}
          sx={{ marginBottom: "-3px" }}
        >
          <Tab
            className={classNames(styles["tab-details"])}
            label="DETAILS"
            value="1"
          />
          <Tab
            className={classNames(styles["tab-bids"])}
            label="BIDS"
            value="2"
          />
        </TabList>
        <TabPanel
          className={styles["text-details"]}
          sx={{ paddingLeft: 0 }}
          value="1"
        >
          {text}
        </TabPanel>
        <TabPanel value="2" sx={{ paddingX: 0 }}>
          <Table>
            <TableBody>
              {bids.map((bid, idx) => {
                return (
                  <TableRow
                    className={`table-row-${idx} ${styles["table-row"]}`}
                    key={idx}
                  >
                    <TableCell className={classNames(styles.cell)}>
                      <User
                        name={bid.user.name}
                        verified={bid.user.verified}
                        avatar={bid.user.avatar}
                        size={45}
                      />
                    </TableCell>
                    <TableCell
                      className={classNames(styles["bid-cell"])}
                      align="center"
                    >
                      {bid.amount}
                    </TableCell>
                    <TableCell
                      className={classNames(styles.cell)}
                      align="center"
                    >
                      {formatDistance(parseISO(bids[0].date), Date.now())} ago
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TabPanel>
      </TabContext>
    </div>
  );
}
