const excel = require("node-excel-export");

const KINDS_VALUES = {
  IN: "Entrada",
  OUT: "Saída",
};

const RECURRENT_VALUES = {
  true: "Sim",
  false: "Não",
};

const styles = {
  headerDark: {
    fill: {
      fgColor: {
        rgb: "FF000000",
      },
    },
    font: {
      color: {
        rgb: "FFFFFFFF",
      },
      sz: 14,
      bold: true,
    },
  },
  cellGreen: {
    fill: { fgColor: { rgb: "FFCFFFCC" } },
  },
  cellRed: {
    fill: { fgColor: { rgb: "FFFFCCCC" } },
  },
};

const specification = {
  date: {
    displayName: "Data",
    headerStyle: styles.headerDark,
    width: 80,
    cellStyle: (value, row) =>
      row.kind === KINDS_VALUES.IN ? styles.cellGreen : styles.cellRed,
  },
  value: {
    displayName: "Valor (R$)",
    headerStyle: styles.headerDark,
    width: 80,
    cellStyle: (value, row) =>
      row.kind === KINDS_VALUES.IN ? styles.cellGreen : styles.cellRed,
  },
  origin: {
    displayName: "Origem",
    headerStyle: styles.headerDark,
    width: 120,
    cellStyle: (value, row) =>
      row.kind === KINDS_VALUES.IN ? styles.cellGreen : styles.cellRed,
  },
  kind: {
    displayName: "Tipo",
    headerStyle: styles.headerDark,
    width: 80,
    cellStyle: (value, row) =>
      row.kind === KINDS_VALUES.IN ? styles.cellGreen : styles.cellRed,
  },
  recurrent: {
    displayName: "É recorrente (mensal)?",
    headerStyle: styles.headerDark,
    width: 170,
    cellStyle: (value, row) =>
      row.kind === KINDS_VALUES.IN ? styles.cellGreen : styles.cellRed,
  },
  canceledAt: {
    displayName: "Recorrência finalizada em",
    headerStyle: styles.headerDark,
    width: 180,
    cellStyle: (value, row) =>
      row.kind === KINDS_VALUES.IN ? styles.cellGreen : styles.cellRed,
  },
  description: {
    displayName: "Descrição",
    headerStyle: styles.headerDark,
    width: 300,
    cellStyle: (value, row) =>
      row.kind === KINDS_VALUES.IN ? styles.cellGreen : styles.cellRed,
  },
};

const dataset = (transactions) =>
  transactions.map((t) => ({
    ...t,
    kind: KINDS_VALUES[t.kind],
    recurrent: RECURRENT_VALUES[t.recurrent.toString()],
    canceledAt: t.canceledAt || "-",
  }));

exports.createSheet = (transactions) => {
  const report = excel.buildExport([
    {
      name: "Report",
      merges: [],
      specification,
      data: dataset(transactions),
    },
  ]);

  return report;
};
