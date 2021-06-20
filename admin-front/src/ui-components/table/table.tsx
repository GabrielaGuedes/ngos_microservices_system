import React from "react";
import { DataTable } from "grommet";
import EmptyState from "../empty-state/empty-state";
import { TableContainer, StyledTable } from "./table.style";
import { COLORS } from "../../ui-constants/colors";
import { isMobile } from "../../utils/is-mobile";

interface IHeader {
  header: string | React.ReactNode;
  property: string;
  align?: "start" | "center" | "end" | string;
  aggregate?: string;
  footer?: {};
  render?: (datum: any) => string | React.ReactNode;
  size?:
    | "none"
    | "xxsmall"
    | "xsmall"
    | "small"
    | "medium"
    | "large"
    | "xlarge"
    | string;
  search?: boolean;
  sortable?: boolean;
  units?: string;
}

interface ITable {
  data: any[];
  columnsRender?: IHeader[];
  dataKeys?: string[];
  mapper?: { [index: string]: string };
  columnsSize?:
    | "none"
    | "xxsmall"
    | "xsmall"
    | "small"
    | "medium"
    | "large"
    | "xlarge"
    | string;
  rowDetails?: (row: any) => React.ReactElement;
}

const Table: React.FC<ITable> = ({
  data,
  columnsRender,
  dataKeys,
  mapper,
  columnsSize,
  rowDetails,
}) => {
  const [sort, setSort] = React.useState({
    property: "name",
    direction: "desc",
  });

  const columns = () => {
    return dataKeys?.map((key) => ({
      property: key,
      header: <b>{mapper && mapper[key]}</b>,
      size: columnsSize,
      align: "center",
      search: true,
    }));
  };

  return (
    <StyledTable>
      <TableContainer>
        <DataTable
          columns={columnsRender || (columns() as any)}
          data={data}
          primaryKey={false}
          sort={sort as any}
          onSort={setSort}
          background={{
            body: [COLORS.background, COLORS.lightCoral],
          }}
          border={{
            header: "horizontal",
          }}
          pad={isMobile() ? "xxsmall" : "small"}
          size={isMobile() ? "" : "xlarge"}
          rowDetails={rowDetails || null}
        />
        {data.length > 0 || <EmptyState />}
      </TableContainer>
    </StyledTable>
  );
};

export default Table;
