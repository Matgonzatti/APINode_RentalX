
import createConnection from "../index";
import { v4 as uuidv4 } from "uuid";

import { hash } from "bcrypt";

async function create() {
  const id = uuidv4();
  const password = await hash("123456", 8);
  const connection = await createConnection("localhost");

  connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license) 
    VALUES ('${id}', 'Matheus', 'matheus.gonzatti@gmail.com', '${password}', true, now(), '123456789')`
  )

  await connection.close();
}

create().then(() => console.log("User admin created"));