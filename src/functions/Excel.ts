

export const getActiveRangeValues = async ():Promise<any[][]> => {
    return await Excel.run(async (context) =>{
        let range = context
            .workbook
            .worksheets
            .getActiveWorksheet()
            .getUsedRangeOrNullObject();
        range.load('values');
        await context.sync();
        return range.values
    });
};