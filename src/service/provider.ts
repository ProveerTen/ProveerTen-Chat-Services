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

export const data_chat = (id:string, role:any): Promise<any> => {

    const query = `select name_${role},last_name_${role},profile_photo_${role} from ${role} where document_${role} = ?;`;
    return new Promise((resolve, reject) => {

        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err)
            }
            connection.query(query, [id], (error: any, result: any) => {
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

export const unic_chat = (idGrocer: string, idProvider: string): Promise<any> => {

    const query = "call get_unic_chat(?,?);";
    return new Promise((resolve, reject) => {

        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject(err)
            }
            connection.query(query, [idGrocer,idProvider], (error: any, result: any) => {
                connection.release()
                if (error) {
                    return reject(error)
                }   
                console.log(result);
                resolve(result)
            })
        })
    });
}