import pool from "../config/db-mysql";

export const get_providers_city = (data: any): Promise<any> => {

    const query = 'call get_providers_city (?,?)';
    return new Promise((resolve, reject) => {

        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err)
            }
            connection.query(query, [data.grocerId,data.companyId], (error: any, result: any) => {
                connection.release()
                if (error) {
                    return reject(error)
                }
                //console.log(result);         
                resolve(result)
            })
        })
    });
}