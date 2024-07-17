const downloadCsv = (req, res) => {
    res.download("./public/temp/output.csv")
}

export default downloadCsv ;