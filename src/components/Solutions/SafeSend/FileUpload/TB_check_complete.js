import { parse, isValid } from "date-fns";

export const check_TB_Completeness = (workbook) => {
  let isComplete = true;
  let errorMessages = [];
  let errorCount = 0

    // Add a function to handle adding errors and checking the error count
    const addError = (errorMessage) => {
      if (errorCount < 20) {
        errorMessages.push(errorMessage);
        errorCount++;
      } else {
        isComplete = false; // Set isComplete to false if the error limit is reached
      }
    };

  // Check resulting SFD and SFC values
  const checkingAccountBalance = (row, worksheet, contNumber) => {
    const column3Cell = worksheet[`C${row}`];
    const column4Cell = worksheet[`D${row}`];
    const column5Cell = worksheet[`E${row}`];
    const column6Cell = worksheet[`F${row}`];
    const column7Cell = worksheet[`G${row}`];
    // const column8Cell = worksheet[`H${row}`];

    const SID = column3Cell ? parseFloat(column3Cell.v) : 0;
    const SIC = column4Cell ? parseFloat(column4Cell.v) : 0;
    const RD = column5Cell ? parseFloat(column5Cell.v) : 0;
    const RC = column6Cell ? parseFloat(column6Cell.v) : 0;
    const SFD_old = column7Cell ? parseFloat(column7Cell.v) : 0;
    const SFD = SFD_old.toFixed(2);

    // UNBALANCED ACCOUNTS
    const unbalanced_accounts =
      (SID - SIC + RD - RC).toFixed(2) === SFD;

    if (!unbalanced_accounts) {
      addError(
        `Cont number: ${contNumber} in row ${row} unbalanced accounts`
      );
      isComplete = false;
    }
  };
  const checkingDenumireColumn = (row, secondColumnCell) => {
    // Check the second column for text format
    if (secondColumnCell && typeof secondColumnCell.v !== "string") {
      addError(
        `Row ${row}, Column B: Invalid data type, expected text.`
      );
      isComplete = false;
    }
  };
  const checkingDateColumn = (row, ninthColumnCell) => {
    // Convert the Excel date value in Column I to a date string
    let ninthColumnValue = ninthColumnCell?.v;
    if (typeof ninthColumnValue === "number") {
      // Convert Excel date to a JavaScript date
      const daysSince1900 = ninthColumnValue - 1;
      const date = new Date(Date.UTC(1900, 0, 1 + daysSince1900)); // January is month 0
      const month = date.getUTCMonth() + 1; // Add 1 to get 1-based month
      const day = date.getUTCDate();
      const year = date.getUTCFullYear();

      ninthColumnValue = `${month}/${day}/${year}`;
    }

    // Check the last column (Column I) for date format
    if (!isValid(parse(ninthColumnValue, "MM/dd/yyyy", new Date()))) {
      addError(
        `Row ${row}, Column I: Invalid date format, expected MM/DD/YYYY or MM/D/YYYY.`
      );
      isComplete = false;
    }
  };
  const calculateColumnSum = (worksheet, columnIdentifier, lastRow) => {
    let sum = 0;
  
    for (let row = 2; row <= lastRow; row++) {
      const cell = worksheet[`${columnIdentifier}${row}`];
      const value = cell ? parseFloat(cell.v) : 0;
      sum += value;
    }
  
    return sum;
  };
    // Function to calculate the sum of RD values for cont numbers starting with '6' or '7'
    const calculateSumRD = (worksheet, lastRow, startsWith6or7Numbers) => {
      let sumRD = 0;
  
      for (let row = 2; row <= lastRow; row++) {
        const contNumber = worksheet[`A${row}`]?.v;
  
        if (startsWith6or7Numbers.includes(contNumber)) {
          const RD = worksheet[`E${row}`]?.v || 0;
          sumRD += parseFloat(RD);
        }
      }
  
      return sumRD;
    };
  
    // Function to calculate SFD - SFC for cont numbers starting with '121'
    const calculateSFDMinusSFC = (worksheet, lastRow, startsWith121Numbers) => {
      let totalSFDMinusSFC = 0;
  
      for (let row = 2; row <= lastRow; row++) {
        const contNumber = worksheet[`A${row}`]?.v;
  
        if (startsWith121Numbers.includes(contNumber)) {
          const SFD = worksheet[`G${row}`]?.v || 0;
          const SFC = worksheet[`H${row}`]?.v || 0;
          totalSFDMinusSFC += parseFloat(SFD) - parseFloat(SFC);
        }
      }
  
      return totalSFDMinusSFC;
    };

  workbook.SheetNames.forEach((sheetName) => {
    const worksheet = workbook.Sheets[sheetName];
    const lastCell = worksheet["!ref"].split(":").pop();
    const lastRow = parseInt(lastCell.substring(1));

    // Define the expected column headers
    const expectedHeaders = ["Cont", "Denumire", "SID", "SIC", "RD", "RC", "SFD", "SFC", "Perioada"];

    let lastNonEmptyRowInFirstColumn = 1; // Initialize to the header row

    for (let row = 1; row < lastRow; row++) {
      if (row === 1) {
        // This is the header row
        const headers = [];
        for (let col = "A"; col <= lastCell[0]; col = String.fromCharCode(col.charCodeAt(0) + 1)) {
            const cell = worksheet[`${col}1`];
            if (cell && cell.v) {
                headers.push(cell.v);
            }
        }

        // Check if the headers match the expected order
        const headersMatch = JSON.stringify(headers) === JSON.stringify(expectedHeaders);

        if (!headersMatch) {
            // Headers do not match the expected order, handle this error condition
            addError("Column headers do not match the expected order. Please download the template for the column headers");
            isComplete = false;
            return; // Exit or throw an error as needed
        }

        // If headers match, skip processing this row and continue to the next row
        continue;
    }
      // Start from row 2 to skip the header row
      const firstColumnCell = worksheet[`A${row}`];
      const secondColumnCell = worksheet[`B${row}`];
      const ninthColumnCell = worksheet[`I${row}`];
      const contNumber = firstColumnCell.v;

      // Check for missing values in the first column
      if (!firstColumnCell || !firstColumnCell.v) {
        addError(`Row ${row}, Column A: Missing value.`);
        isComplete = false;
      } else {
        // Check the first column for numbers, converting if necessary
        let firstColumnValue = firstColumnCell.v;
        if (typeof firstColumnValue === "string") {
          // Try to convert text to a number
          const parsedValue = parseFloat(firstColumnValue);
          if (!isNaN(parsedValue)) {
            firstColumnValue = parsedValue;
          } else {
            addError(
              `Row ${row}, Column A: Invalid data type, expected number.`
            );
            isComplete = false;
          }
        }

        // Check that the current row is consecutive in the first column
        if (row !== lastNonEmptyRowInFirstColumn + 1) {
          addError(
            `Row ${row}, Column A: Missing value or gap in sequence.`
          );
          isComplete = false;
        }

        lastNonEmptyRowInFirstColumn = row;
      }

      checkingDenumireColumn(row, secondColumnCell);

      // Check columns 3 to 8 for numbers or set them as '0' if empty
      for (let col = 3; col <= 8; col++) {
        const cell = worksheet[`${String.fromCharCode(64 + col)}${row}`];
        if (!cell || !cell.v) {
          // Set as '0' if empty
          worksheet[`${String.fromCharCode(64 + col)}${row}`] = { v: 0 };
        } else if (isNaN(cell.v) || typeof cell.v !== "number") {
          addError(
            `Row ${row}, Column ${String.fromCharCode(
              64 + col
            )}: Invalid data type, expected number.`
          );
          isComplete = false;
        }
      }
      checkingDateColumn(row, ninthColumnCell);
      // checkingAccountBalance(row, worksheet, contNumber);
    }
    // Activ pasiv sold initial
    const sumC = calculateColumnSum(worksheet, 'C', lastRow);
    const sumD = calculateColumnSum(worksheet, 'D', lastRow);
    if (sumC.toFixed(2) !== sumD.toFixed(2)) {
      addError("Sum of values in Column C does not match the sum of values in Column D.");
      isComplete = false;
    }
    // Activ pasiv rulaj
    const sumE = calculateColumnSum(worksheet, 'E', lastRow);
    const sumF = calculateColumnSum(worksheet, 'F', lastRow);
    if (sumE.toFixed(2) !== sumF.toFixed(2)) {
      addError("Sum of values in Column E does not match the sum of values in Column F.");
      isComplete = false;
    }
    // Activ pasiv sold final
    const sumG = calculateColumnSum(worksheet, 'G', lastRow);
    const sumH = calculateColumnSum(worksheet, 'H', lastRow);
    if (sumG.toFixed(2) !== sumH.toFixed(2)) {
      addError("Sum of values in Column G does not match the sum of values in Column H.");
      isComplete = false;
    }
      // Function to categorize and store cont numbers
  const categorizeContNumbers = (worksheet, lastRow) => {
    const contNumbers = {
      startsWith6: [],
      startsWith7: [],
      startsWith121: [],
    };

    for (let row = 2; row <= lastRow; row++) {
      const firstColumnCell = worksheet[`A${row}`];
      const contNumber = firstColumnCell ? firstColumnCell.v : '';

      if (typeof contNumber === 'string') {
        if (contNumber.startsWith('6')) {
          contNumbers.startsWith6.push(contNumber);
        } else if (contNumber.startsWith('7')) {
          contNumbers.startsWith7.push(contNumber);
        } else if (contNumber.startsWith('121')) {
          contNumbers.startsWith121.push(contNumber);
        }
      }
    }

    return contNumbers;
  };
  const categorizedContNumbers = categorizeContNumbers(worksheet, lastRow)
  // Access the categorized numbers
  const startsWith6Numbers = categorizedContNumbers.startsWith6;
  const startsWith7Numbers = categorizedContNumbers.startsWith7;
  const startsWith121Numbers = categorizedContNumbers.startsWith121;

  // Calculate sumRD6, sumRD7, and totalSFDMinusSFC
  const sumRD6 = calculateSumRD(worksheet, lastRow, startsWith6Numbers);
  const sumRD7 = calculateSumRD(worksheet, lastRow, startsWith7Numbers);
  const totalSFDMinusSFC = calculateSFDMinusSFC(worksheet, lastRow, startsWith121Numbers);

  if(Math.abs(-sumRD6 + sumRD7 - totalSFDMinusSFC).toFixed(2) > 10) {
    addError("Sum of closing result is more than 10.");
      isComplete = false;
  }
  });

  return { isComplete, errorMessages };
};
