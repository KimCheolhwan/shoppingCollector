function getHeaderRow(sheet) {  // ? https://github.com/SheetJS/sheetjs/issues/214 참조
    const headers = [];
    const range = XLSX.utils.decode_range(sheet['!ref']);
    let C, R = range.s.r; /* start in the first row */

    /* walk every column in the range */
    for(C = range.s.c; C <= range.e.c; ++C) {
        const cell = sheet[XLSX.utils.encode_cell({c:C, r:R})] /* find the cell in the first row */

        let hdr = "UNKNOWN " + C; // <-- replace with your desired default
        if(cell && cell.t) hdr = XLSX.utils.format_cell(cell);

        headers.push(hdr);
    }
    return headers;
}