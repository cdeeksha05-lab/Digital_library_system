import "../styles/Table.css";

function DataTable({ columns, data }) {

    return (

        <div className="table-responsive">

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>

                        {

                            columns.map((column, index) => (

                                <th key={index}>

                                    {column}

                                </th>

                            ))

                        }

                    </tr>

                </thead>

                <tbody>

                    {

                        data.length === 0 ?

                        (

                            <tr>

                                <td
                                    colSpan={columns.length}
                                    className="text-center"
                                >

                                    No Records Found

                                </td>

                            </tr>

                        )

                        :

                        (

                            data.map((row, index) => (

                                <tr key={index}>

                                    {

                                        Object.values(row).map((value, i) => (

                                            <td key={i}>

                                                {value}

                                            </td>

                                        ))

                                    }

                                </tr>

                            ))

                        )

                    }

                </tbody>

            </table>

        </div>

    );

}

export default DataTable;