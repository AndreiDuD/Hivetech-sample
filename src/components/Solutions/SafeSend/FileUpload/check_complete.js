export const checkCompleteness = (workbook) => {
  let isComplete = true;
  const incompleteCells = new Set();

  workbook.SheetNames.forEach((sheetName) => {
    const worksheet = workbook.Sheets[sheetName];
    const columns = {};
    let lastRow = 0;

    for (const cellAddress in worksheet) {
      const column = cellAddress.charAt(0);
      const row = parseInt(cellAddress.substring(1));
      if (Number.isNaN(row) || !column) {
        continue;
      }

      if (row > lastRow) {
        // Check completeness of previous row before moving to the next one
        for (let i = 1; i <= lastRow; i++) {
          for (const col in columns) {
            const address = `${col}${i}`;
            const cell = worksheet[address];
            if (!cell || !cell.v) {
              if (!incompleteCells.has(address)) {
                incompleteCells.add(address);
                isComplete = false;
              }
            }
          }
        }

        // Reset column flags for the next row
        lastRow = row;
        for (const col in columns) {
          columns[col] = false;
        }
      }

      const cell = worksheet[cellAddress];
      if (cell && cell.v) {
        columns[column] = true;
      } else {
        // Record the first missing cell in a row and add all cells up to it
        const address = `${column}${row}`;
        if (!incompleteCells.has(address)) {
          incompleteCells.add(address);
          isComplete = false;
          for (let i = 1; i < row; i++) {
            for (const col in columns) {
              const prevAddress = `${col}${i}`;
              if (!incompleteCells.has(prevAddress)) {
                incompleteCells.add(prevAddress);
              }
            }
          }
        }
      }
    }

    // Check completeness of the last row in the worksheet
    for (let i = 1; i <= lastRow; i++) {
      for (const col in columns) {
        const address = `${col}${i}`;
        const cell = worksheet[address];
        if (!cell || !cell.v) {
          if (!incompleteCells.has(address)) {
            incompleteCells.add(address);
            isComplete = false;
          }
        }
      }
    }
  });

  return { isComplete, incompleteCells: Array.from(incompleteCells) };
};
